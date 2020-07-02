import { Substitute } from "@fluffy-spoon/substitute";
import { ItemDto } from "src/mett/communication/types";
import {
	getItemType,
	relatedItemsToItems,
	findItemByGuidRecursive,
	findRelatedItemsByIdRecursive,
	findContainerForItemGuid
} from "src/mett/helpers/item-helper";
import { ItemType } from "src/mett/helpers/types";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const containers = require("./containers.json");

describe("Item helper functions", () => {
	describe("getItemType", () => {
		it("should return 'relatedItem' of item if available", () => {
			// Item is optional for a relatedItemDto so cannot use substitute :(
			const relatedItem = {
				id: 91929823,
				likeCount: 9,
				item: Substitute.for<ItemDto>(),
				childItemCount: 2,
				createdById: 1,
				updatedById: 3,
				isBeingDeleted: false,
				guid: "meh",
				createdOn: new Date(),
				updatedOn: new Date()
			};
			expect(getItemType(relatedItem)).toBe(ItemType.relatedItem);
		});

		it("should return 'item' if it is not a relateditem", () => {
			const item = Substitute.for<ItemDto>();
			expect(getItemType(item)).toBe(ItemType.item);
		});
	});

	describe("relatedItemsToItems", () => {
		it("should return the items in relatedItems as an array", () => {
			expect(relatedItemsToItems(containers[0].relatedItems)).toHaveLength(1);
		});

		it("should return an empty items array if given no input", () => {
			expect(relatedItemsToItems()).toHaveLength(0);
		});
	});

	describe("findItemByGuidRecursive", () => {
		it("should find an item with a guid in a list of containers", () => {
			const item = findItemByGuidRecursive(containers, "7d416116-0a6f-43ad-a6f7-05d1ee4c1697");
			expect(item).toBeDefined();
			if (item) {
				expect(item.id).toBe(11);
			}
		});

		it("should return undefined if the item cannot be found", () => {
			const item = findItemByGuidRecursive(containers, "900f5ee9-8113-4f9d-b435-18bdd7e61e6f");
			expect(item).toBeUndefined();
		});

		it("should not find a relatedItem guid", () => {
			const item = findItemByGuidRecursive(containers, "2d8d83f9-3374-4587-b6cc-bff4582fe788");
			expect(item).toBeUndefined();
		});
	});

	describe("findRelatedItemsByIdRecursive", () => {
		it("should return all relatedItems with a certain id", () => {
			const items = findRelatedItemsByIdRecursive(containers, 2);
			expect(items).toHaveLength(1);
			items.forEach(item => {
				expect(getItemType(item)).toBe(ItemType.relatedItem);
				expect(item.id).toBe(2);
			});
		});

		it("should return an empty array if there is no relatedItem with that id", () => {
			const items = findRelatedItemsByIdRecursive(containers, 5);
			expect(items).toHaveLength(0);
		});
	});

	describe("findContainerForItemGuid", () => {
		it("should return the container the item is in", () => {
			const container = findContainerForItemGuid(containers, "c5c80f22-8bfc-4721-bf27-5d3b695bbc7c");
			expect(container).toEqual(containers[1]);
		});

		it("should not find a relatedItem guid", () => {
			const container = findContainerForItemGuid(containers, "2d8d83f9-3374-4587-b6cc-bff4582fe788");
			expect(container).toBeUndefined();
		});
	});
});

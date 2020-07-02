import { ItemRelatedToItemDto, ItemDto } from "src/mett/communication/types";
import { ItemType, CustomItemDto } from "src/mett/helpers/types";

export function getItemType(item: ItemRelatedToItemDto | ItemDto): ItemType {
	if ("item" in item) return ItemType.relatedItem;
	else return ItemType.item;
}

export function relatedItemsToItems(relatedItems?: ItemRelatedToItemDto[]): ItemDto[] {
	const items: ItemDto[] = [];

	if (!relatedItems) return items;

	// Todo: Check how to make the menuItem available on the items another way
	relatedItems.forEach(ri => {
		if (ri.item) {
			const item: CustomItemDto = ri.item;
			if (ri.menuItem) item.menuItem = ri.menuItem;
			items.push(item);
		}
	});

	return items;
}

export function findItemByGuidRecursive(items: ItemDto[], guid: string): ItemDto | undefined {
	for (const index in items) {
		const currentItem = items[index];

		if (currentItem.guid == guid) return currentItem;

		if (currentItem.relatedItems) {
			const relatedItems = relatedItemsToItems(currentItem.relatedItems);
			const relatedResult = findItemByGuidRecursive(relatedItems, guid);

			if (relatedResult) return relatedResult;
		}
	}

	return undefined;
}

export function findContainerForItemGuid(containers: ItemDto[], guid: string): ItemDto | undefined {
	let matchedContainer: ItemDto | undefined;

	for (const index in containers) {
		const currentContainer = containers[index];

		matchedContainer = currentContainer;

		if (currentContainer.relatedItems) {
			const relatedItems = relatedItemsToItems(currentContainer.relatedItems);
			const relatedResult = findItemByGuidRecursive(relatedItems, guid);

			if (relatedResult) return matchedContainer;
		}
	}

	return undefined;
}

export function findRelatedItemsByIdRecursive(items: ItemDto[], id: number): ItemRelatedToItemDto[] {
	let matchedRelatedItems: ItemRelatedToItemDto[] = [];

	for (const index in items) {
		const currentItem = items[index];

		if (currentItem.relatedItems)
			matchedRelatedItems = matchedRelatedItems.concat(currentItem.relatedItems.filter(ri => ri.id == id));

		if (currentItem.relatedItems) {
			const relatedItems = relatedItemsToItems(currentItem.relatedItems);
			const relatedResult = findRelatedItemsByIdRecursive(relatedItems, id);

			if (relatedResult) matchedRelatedItems = matchedRelatedItems.concat(relatedResult);
		}
	}

	return matchedRelatedItems;
}

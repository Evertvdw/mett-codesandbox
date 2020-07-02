import ItemsPlaceholder from "../ItemsPlaceholder.vue";
import { createWrapper } from "utils/wrapper";
import { TemplateElementDisplayTypeDto } from "src/mett/communication/types";
import { WrapperOptions } from "utils/types";

let defaultWrapperOptions: WrapperOptions;

beforeEach(() => {
	defaultWrapperOptions = {
		themePark: true,
		store: true,
		data: {
			dpType: {
				value: () => TemplateElementDisplayTypeDto.Default
			}
		}
	};
});

describe("ItemsPlaceholder", () => {
	it("should render a dynamic item by template element", async () => {
		const wrapper = await createWrapper(
			ItemsPlaceholder,
			Object.assign(defaultWrapperOptions, {
				props: {
					items: [
						{
							templateElement: {
								view: "ItemTitle",
								displayType: "Default"
							}
						}
					]
				}
			})
		);
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".dynamic-item-title").exists()).toBe(true);
	});

	it("should not render a dynamic item if the displayType is not default and does not match", async () => {
		const wrapper = await createWrapper(
			ItemsPlaceholder,
			Object.assign(defaultWrapperOptions, {
				props: {
					items: [
						{
							templateElement: {
								view: "ItemTitle",
								displayType: "List"
							}
						}
					]
				}
			})
		);
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".dynamic-item-title").exists()).toBe(false);
	});

	it("should render a dynamic item by templateModelElement", async () => {
		const wrapper = await createWrapper(
			ItemsPlaceholder,
			Object.assign(defaultWrapperOptions, {
				props: {
					items: [
						{
							templateModelElement: {
								displayType: "Default",
								modelElementType: "Test"
							}
						}
					]
				}
			})
		);
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".dynamic-types-test").exists()).toBe(true);
	});

	it("should not render a dynamic item by templateModelElement if displayType does not match", async () => {
		const wrapper = await createWrapper(
			ItemsPlaceholder,
			Object.assign(defaultWrapperOptions, {
				props: {
					items: [
						{
							templateModelElement: {
								displayType: "List",
								modelElementType: "Test"
							}
						}
					]
				}
			})
		);
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".dynamic-types-test").exists()).toBe(false);
	});

	it("should render a default item with no template or templateElement specified", async () => {
		const wrapper = await createWrapper(
			ItemsPlaceholder,
			Object.assign(defaultWrapperOptions, {
				props: {
					items: [{}]
				}
			})
		);
		await wrapper.vm.$nextTick();

		expect(wrapper.find(".dynamic-default").exists()).toBe(true);
	});

	it("should render multiple items", async () => {
		const wrapper = await createWrapper(
			ItemsPlaceholder,
			Object.assign(defaultWrapperOptions, {
				props: {
					items: [
						{
							templateElement: {
								view: "ItemTitle",
								displayType: "Default"
							},
							guid: 1
						},
						{
							templateModelElement: {
								displayType: "Default",
								modelElementType: "Test"
							},
							guid: 2
						},
						{
							templateElement: {
								view: "ItemDescription",
								displayType: "Default"
							},
							guid: 3
						}
					]
				}
			})
		);
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".dynamic-item-title").exists()).toBe(true);
		expect(wrapper.find(".dynamic-item-description").exists()).toBe(true);
		expect(wrapper.find(".dynamic-types-test").exists()).toBe(true);
	});
});

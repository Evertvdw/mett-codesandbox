import ItemsPage from "../ItemsPage.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";
import { MenuItemDto, ItemDto } from "src/mett/communication/types";
import { Substitute } from "@fluffy-spoon/substitute";
import mockAxios from "jest-mock-axios";
import { IError } from "src/store/error/types";

afterEach(() => {
	// cleaning up the mess left behind the previous test
	mockAxios.reset();
});

describe("pages/ItemsPage", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		loadOptimizer: { SSR: false },
		themePark: true,
		router: true
	};

	it("loads page data based on route", async () => {
		const wrapper = await createWrapper(ItemsPage, defaultWrapperOptions);
		let result: "resolved" | "rejected" | undefined;

		(wrapper.vm.$store.state.page.pageMenuItems as MenuItemDto[]) = [
			{
				id: 1,
				guid: "fakeGuid",
				urlSegment: "home",
				createdOn: new Date(),
				updatedOn: new Date(),
				relatedItem: {
					id: 2,
					childItemCount: 0,
					createdOn: new Date(),
					updatedOn: new Date(),
					guid: "123",
					sortId: 1,
					item: Substitute.for<ItemDto>()
				}
			}
		];

		await wrapper.vm.$nextTick();

		const asyncLoadPromise: Promise<any> = (wrapper.vm as any).asyncLoad({
			vm: wrapper.vm,
			router: wrapper.vm.$router,
			store: wrapper.vm.$store
		});
		asyncLoadPromise.then(
			() => (result = "resolved"),
			() => (result = "rejected")
		);

		await new Promise(resolve =>
			setTimeout(() => {
				resolve();
			}, 50)
		);

		expect(mockAxios.get).toHaveBeenCalled();
		mockAxios.mockResponse({ data: true });

		await asyncLoadPromise;

		expect(wrapper.vm.$store.getters["error/status"]).toBe(200);
		expect(result).toBe("resolved");
	});

	it("sets status to 404 if page does not exist in store", async () => {
		const wrapper = await createWrapper(ItemsPage, defaultWrapperOptions);

		let result: "resolved" | "rejected" | undefined;

		(wrapper.vm.$store.state.page.pageMenuItems as MenuItemDto[]) = [
			{
				id: 1,
				guid: "fakeGuid",
				urlSegment: "bla",
				createdOn: new Date(),
				updatedOn: new Date(),
				relatedItem: {
					id: 2,
					childItemCount: 0,
					createdOn: new Date(),
					updatedOn: new Date(),
					guid: "123",
					sortId: 1,
					item: Substitute.for<ItemDto>()
				}
			}
		];

		await wrapper.vm.$nextTick();

		const asyncLoadPromise: Promise<any> = (wrapper.vm as any).asyncLoad({
			vm: wrapper.vm,
			router: wrapper.vm.$router,
			store: wrapper.vm.$store
		});
		asyncLoadPromise.then(
			() => (result = "resolved"),
			() => (result = "rejected")
		);

		await new Promise(resolve =>
			setTimeout(() => {
				resolve();
			}, 50)
		);

		expect(mockAxios.get).not.toHaveBeenCalled();

		expect(result).toBe("rejected");
		expect(wrapper.vm.$store.getters["error/status"]).toBe(404);
	});

	it("sets status to 404 when API returns 404", async () => {
		const wrapper = await createWrapper(ItemsPage, defaultWrapperOptions);

		let result: "resolved" | "rejected" | undefined;

		(wrapper.vm.$store.state.page.pageMenuItems as MenuItemDto[]) = [
			{
				id: 1,
				guid: "fakeGuid",
				urlSegment: "home",
				createdOn: new Date(),
				updatedOn: new Date(),
				relatedItem: {
					id: 2,
					childItemCount: 0,
					createdOn: new Date(),
					updatedOn: new Date(),
					guid: "123",
					sortId: 1,
					item: Substitute.for<ItemDto>()
				}
			}
		];

		await wrapper.vm.$nextTick();

		const asyncLoadPromise: Promise<any> = (wrapper.vm as any).asyncLoad({
			vm: wrapper.vm,
			router: wrapper.vm.$router,
			store: wrapper.vm.$store
		});
		asyncLoadPromise.then(
			() => (result = "resolved"),
			() => (result = "rejected")
		);

		await new Promise(resolve =>
			setTimeout(() => {
				resolve();
			}, 50)
		);

		expect(mockAxios.get).toHaveBeenCalled();
		mockAxios.mockError({ response: { status: 404 } });

		await asyncLoadPromise;

		expect(wrapper.vm.$store.getters["error/status"]).toBe(404);
		expect(result).toBe("resolved");
	});

	it("sets status to 401 when API returns 401", async () => {
		const wrapper = await createWrapper(ItemsPage, defaultWrapperOptions);

		let result: "resolved" | "rejected" | undefined;

		(wrapper.vm.$store.state.page.pageMenuItems as MenuItemDto[]) = [
			{
				id: 1,
				guid: "fakeGuid",
				urlSegment: "home",
				createdOn: new Date(),
				updatedOn: new Date(),
				relatedItem: {
					id: 2,
					childItemCount: 0,
					createdOn: new Date(),
					updatedOn: new Date(),
					guid: "123",
					sortId: 1,
					item: Substitute.for<ItemDto>()
				}
			}
		];

		await wrapper.vm.$nextTick();

		const asyncLoadPromise: Promise<any> = (wrapper.vm as any).asyncLoad({
			vm: wrapper.vm,
			router: wrapper.vm.$router,
			store: wrapper.vm.$store
		});
		asyncLoadPromise.then(
			() => (result = "resolved"),
			() => (result = "rejected")
		);

		await new Promise(resolve =>
			setTimeout(() => {
				resolve();
			}, 50)
		);

		expect(mockAxios.get).toHaveBeenCalled();
		mockAxios.mockError({ response: { status: 401 } });

		await asyncLoadPromise;

		expect(wrapper.vm.$store.getters["error/status"]).toBe(401);
		expect(result).toBe("resolved");
	});

	it("adds warning when API returns 500", async () => {
		const wrapper = await createWrapper(ItemsPage, defaultWrapperOptions);

		let result: "resolved" | "rejected" | undefined;

		(wrapper.vm.$store.state.page.pageMenuItems as MenuItemDto[]) = [
			{
				id: 1,
				guid: "fakeGuid",
				urlSegment: "home",
				createdOn: new Date(),
				updatedOn: new Date(),
				relatedItem: {
					id: 2,
					childItemCount: 0,
					createdOn: new Date(),
					updatedOn: new Date(),
					guid: "123",
					sortId: 1,
					item: Substitute.for<ItemDto>()
				}
			}
		];

		await wrapper.vm.$nextTick();

		const asyncLoadPromise: Promise<any> = (wrapper.vm as any).asyncLoad({
			vm: wrapper.vm,
			router: wrapper.vm.$router,
			store: wrapper.vm.$store
		});
		asyncLoadPromise.then(
			() => (result = "resolved"),
			() => (result = "rejected")
		);

		await new Promise(resolve =>
			setTimeout(() => {
				resolve();
			}, 50)
		);

		expect(mockAxios.get).toHaveBeenCalled();
		mockAxios.mockError({ response: { status: 500 } });

		try {
			await asyncLoadPromise;
		} catch {
			//rejected
		}

		const errors: IError[] = wrapper.vm.$store.getters["error/errors"];

		expect(wrapper.vm.$store.getters["error/status"]).toBe(200);
		expect(result).toBe("rejected");
		expect(errors.length).toBeGreaterThan(0);
	});

	it("adds warning when API returns unknown error", async () => {
		const wrapper = await createWrapper(ItemsPage, defaultWrapperOptions);

		let result: "resolved" | "rejected" | undefined;

		(wrapper.vm.$store.state.page.pageMenuItems as MenuItemDto[]) = [
			{
				id: 1,
				guid: "fakeGuid",
				urlSegment: "home",
				createdOn: new Date(),
				updatedOn: new Date(),
				relatedItem: {
					id: 2,
					childItemCount: 0,
					createdOn: new Date(),
					updatedOn: new Date(),
					guid: "123",
					sortId: 1,
					item: Substitute.for<ItemDto>()
				}
			}
		];

		await wrapper.vm.$nextTick();

		const asyncLoadPromise: Promise<any> = (wrapper.vm as any).asyncLoad({
			vm: wrapper.vm,
			router: wrapper.vm.$router,
			store: wrapper.vm.$store
		});
		asyncLoadPromise.then(
			() => (result = "resolved"),
			() => (result = "rejected")
		);

		await new Promise(resolve => setTimeout(resolve, 50));

		expect(mockAxios.get).toHaveBeenCalled();
		mockAxios.mockError({ response: "Unknown" });

		try {
			await asyncLoadPromise;
		} catch {
			//rejected
		}

		const errors: IError[] = wrapper.vm.$store.getters["error/errors"];

		expect(wrapper.vm.$store.getters["error/status"]).toBe(200);
		expect(result).toBe("rejected");
		expect(errors.length).toBeGreaterThan(0);
	});

	it("shows mett-items-placeholder when container items exist", async () => {
		const wrapper = await createWrapper(ItemsPage, defaultWrapperOptions);

		wrapper.vm.$store.state.page.page = {
			containers: [Substitute.for<ItemDto>()]
		};

		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.find(".mett-items-placeholder").exists()).toBe(true);
	});

	it("shows 404 when container items are null", async () => {
		const wrapper = await createWrapper(ItemsPage, defaultWrapperOptions);

		wrapper.vm.$store.state.page.page = {
			containers: null
		};

		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();

		expect(wrapper.find(".mett-items-placeholder").exists()).toBe(false);
		expect(wrapper.text()).toContain(wrapper.vm.$t("errors.pageNotFound.title"));
	});
});

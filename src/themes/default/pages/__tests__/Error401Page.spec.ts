import Error401Page from "../Error401Page.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";
import { UserProfileDto } from "src/mett/communication/types";

describe("pages/Error401Page", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		themePark: true
	};

	const defaultUserProfile: UserProfileDto = {
		id: 1,
		birthDay: new Date(),
		createdOn: new Date(),
		guid: "FakeGuid",
		updatedOn: new Date(),
		firstName: "Rinze",
		lastName: "Douma"
	};

	it("shows the 401 error code", async () => {
		const wrapper = await createWrapper(Error401Page, defaultWrapperOptions);

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(wrapper.vm.$t("errors.unauthorized.code"));
	});

	it("shows the 401 error title", async () => {
		const wrapper = await createWrapper(Error401Page, defaultWrapperOptions);

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(wrapper.vm.$t("errors.unauthorized.title"));
	});

	it("shows the 401 error description", async () => {
		const wrapper = await createWrapper(Error401Page, defaultWrapperOptions);

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(wrapper.vm.$t("errors.unauthorized.description"));
	});

	it("opens a login dialog when user is not logged in", async () => {
		const mockFn = jest.fn();
		const wrapperOptions = {
			store: true,
			loadOptimizer: { SSR: false },
			themePark: true,
			router: true,
			methods: {
				openDialog() {
					mockFn();
					return new Promise(resolve => resolve());
				}
			}
		};
		const wrapper = await createWrapper(Error401Page, wrapperOptions);

		await wrapper.vm.$nextTick();

		expect(mockFn).toBeCalled();
	});

	it("shows the login dialog when user is not logged in", async () => {
		const wrapper = await createWrapper(Error401Page, defaultWrapperOptions);
		await wrapper.vm.$nextTick();
		await wrapper.vm.$nextTick();
		const dialog = wrapper.vm.$store.getters["dialog/dialogs"][0];
		expect(dialog).toBeDefined();
		const comp = await dialog.component();
		expect(comp.options.name).toBe("mettLoginDialog");
	});

	it("does not open a login dialog when user is logged in", async () => {
		const mockFn = jest.fn();
		const wrapperOptions = {
			store: true,
			loadOptimizer: { SSR: false },
			themePark: true,
			router: true,
			methods: {
				openDialog() {
					mockFn();
					return new Promise(resolve => resolve());
				}
			},
			computed: {
				applicationUser() {
					return defaultUserProfile;
				}
			}
		};
		wrapperOptions.methods = {
			openDialog() {
				mockFn();
				return new Promise(resolve => resolve());
			}
		};

		const wrapper = await createWrapper(Error401Page, wrapperOptions);

		await wrapper.vm.$nextTick();

		expect(mockFn).not.toBeCalled();
	});
});

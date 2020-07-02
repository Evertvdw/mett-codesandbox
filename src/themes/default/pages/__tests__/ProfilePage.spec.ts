import ProfilePage from "../ProfilePage.vue";
import { createWrapper } from "utils/wrapper";
import { WrapperOptions } from "utils/types";
import { UserProfileDto } from "src/mett/communication/types";

describe("pages/ProfilePage", () => {
	const defaultWrapperOptions: WrapperOptions = {
		store: true,
		loadOptimizer: { SSR: false },
		themePark: true,
		router: {
			route: "/profile"
		}
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

	it("returns the right full name", async () => {
		const wrapper = await createWrapper(ProfilePage, defaultWrapperOptions);

		wrapper.vm.$store.state.user.applicationUser = defaultUserProfile;

		await wrapper.vm.$nextTick();

		expect((wrapper.vm as any).fullName).toBe("Rinze Douma");
	});

	it("redirects if applicationUser is not set", async () => {
		const wrapper = await createWrapper(ProfilePage, defaultWrapperOptions);

		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$route.fullPath).toBe("/home");
	});

	it("does not redirect if applicationUser is set", async () => {
		const wrapper = await createWrapper(ProfilePage, {
			store: true,
			themePark: true,
			router: {
				route: "/profile"
			},
			computed: {
				applicationUser() {
					return defaultUserProfile;
				}
			}
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.vm.$route.fullPath).toBe("/profile");
	});

	// Todo: Add extra tests after front ProfilePage is completed
});

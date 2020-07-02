import EditButton from "../EditButton.vue";
import { createWrapper } from "utils/wrapper";

describe("EditButton", () => {
	it("should be closed if not in edit mode", async () => {
		const wrapper = await createWrapper(EditButton, {
			store: true,
			themePark: true,
			router: true,
			computed: {
				show() {
					return true;
				}
			}
		});
		// expect(wrapper.vm.$router).toBeUndefined();
		const btn = wrapper.find(".q-fab");
		expect(btn.exists()).toBe(true);
		expect((wrapper.vm as any).value).toBe(false);
	});

	it("should not be closed if in edit mode", async () => {
		const wrapper = await createWrapper(EditButton, {
			store: true,
			themePark: true,
			mocks: {
				$route: {
					name: "EditPage"
				}
			},
			computed: {
				show() {
					return true;
				}
			}
		});
		expect(wrapper.vm.$route.name).toBe("EditPage");
		const btn = wrapper.find(".q-fab");
		expect(btn.exists()).toBe(true);
		expect((wrapper.vm as any).value).toBe(true);
	});

	it("should change the route if clicked when on ViewPage", async () => {
		const wrapper = await createWrapper(EditButton, {
			store: true,
			themePark: true,
			mocks: {
				$route: {
					name: "ViewPage",
					path: "/home"
				},
				$router: {
					push: jest.fn()
				}
			},
			computed: {
				show() {
					return true;
				}
			}
		});
		const btn = wrapper.find(".q-fab");
		expect(btn.exists()).toBe(true);
		expect((wrapper.vm as any).value).toBe(false);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/home");
		btn.trigger("input");
		expect((wrapper.vm as any).value).toBe(true);
		expect(wrapper.vm.$router.push).toBeCalledWith({ path: "/home/edit" });
	});

	it("should change the route if clicked when on ViewItem", async () => {
		const wrapper = await createWrapper(EditButton, {
			store: true,
			themePark: true,
			mocks: {
				$route: {
					name: "ViewItem",
					path: "/home/item/hello"
				},
				$router: {
					push: jest.fn()
				}
			},
			computed: {
				show() {
					return true;
				}
			}
		});
		const btn = wrapper.find(".q-fab");
		expect(btn.exists()).toBe(true);
		expect((wrapper.vm as any).value).toBe(false);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/home/item/hello");
		btn.trigger("input");
		expect((wrapper.vm as any).value).toBe(true);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$router.push).toBeCalledWith({ path: "/home/edit/hello" });
	});

	it("should change the route if clicked when on ViewPage in Edit mode", async () => {
		const wrapper = await createWrapper(EditButton, {
			store: true,
			themePark: true,
			mocks: {
				$route: {
					name: "EditPage",
					path: "/home/edit"
				},
				$router: {
					push: jest.fn()
				}
			},
			computed: {
				show() {
					return true;
				}
			}
		});
		const btn = wrapper.find(".q-fab");
		expect(btn.exists()).toBe(true);
		expect((wrapper.vm as any).value).toBe(true);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/home/edit");
		btn.trigger("input");
		expect((wrapper.vm as any).value).toBe(false);
		expect(wrapper.vm.$router.push).toBeCalledWith({ path: "/home" });
	});

	it("should change the route if clicked when on ViewItem in Edit mode", async () => {
		const wrapper = await createWrapper(EditButton, {
			store: true,
			themePark: true,
			mocks: {
				$route: {
					name: "EditItem",
					path: "/home/edit/hello"
				},
				$router: {
					push: jest.fn()
				}
			},
			computed: {
				show() {
					return true;
				}
			}
		});
		const btn = wrapper.find(".q-fab");
		expect(btn.exists()).toBe(true);
		expect((wrapper.vm as any).value).toBe(true);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$route.path).toBe("/home/edit/hello");
		btn.trigger("input");
		expect((wrapper.vm as any).value).toBe(false);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$router.push).toBeCalledWith({ path: "/home/item/hello" });
	});

	it("should not close and change the route if there are unsaved changes", async () => {
		const wrapper = await createWrapper(EditButton, {
			store: true,
			themePark: true,
			mocks: {
				$route: {
					name: "EditItem",
					path: "/home/edit/hello"
				},
				$router: {
					push: jest.fn()
				}
			},
			computed: {
				show() {
					return true;
				}
			}
		});
		const btn = wrapper.find(".q-fab");
		expect(btn.exists()).toBe(true);
		expect((wrapper.vm as any).value).toBe(true);
		wrapper.vm.$store.commit("page/setOriginalValue", { guid: "hoi", value: "hallo" });
		const values = wrapper.vm.$store.getters["page/originalValues"];
		expect(Object.keys(values).length).toBe(1);
		await wrapper.vm.$nextTick();
		expect((wrapper.vm as any).saveButtonEnabled).toBe(true);
		expect(wrapper.vm.$route.path).toBe("/home/edit/hello");
		btn.trigger("input");
		expect((wrapper.vm as any).value).toBe(true);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
	});

	it("should have correct element configuration on mobile view", async () => {
		const wrapper = await createWrapper(EditButton, {
			store: true,
			themePark: true,
			mocks: {
				$route: {
					name: "ViewPage"
				}
			},
			computed: {
				show() {
					return true;
				}
			}
		});
		wrapper.vm.$q.screen.lt.md = true;
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".mett-mobile-actions-edit-button").exists()).toBe(true);
		expect(wrapper.find(".q-fab .q-btn--outline").exists()).toBe(true);
		expect(wrapper.find(".q-fab .bg-primary").exists()).toBe(false);
	});
});

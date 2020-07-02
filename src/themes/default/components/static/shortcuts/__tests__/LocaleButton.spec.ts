import LocaleButton from "../LocaleButton.vue";
import { createWrapper } from "utils/wrapper";

describe("LocaleButton", () => {
	it("should switch locale when setLocale is called", async () => {
		const wrapper = await createWrapper(LocaleButton, {
			themePark: true
		});
		expect(wrapper.vm.$i18n.locale).toBe("nl-nl");
		await wrapper.vm.$nextTick();
		(wrapper.vm as any).setLocale((wrapper.vm as any).langOptions[0].value);
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.$i18n.locale).toBe("en-us");
	});
});

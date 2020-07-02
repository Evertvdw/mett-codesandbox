import LoginDialog from "../LoginDialog.vue";
import { createWrapper } from "utils/wrapper";

const validAddresses: string[] = [
	"a@a.de",
	"email@example.com",
	"firstname.lastname@example.com",
	"email@subdomain.example.com",
	"firstname+lastname@example.com",
	"email@123.123.123.123",
	"1234567890@example.com",
	"email@example-one.com",
	"_______@example.com",
	"email@example.name",
	"email@example.museum",
	"email@example.co.jp",
	"firstname-lastname@example.com"
];

const invalidAddresses: string[] = [
	"plainaddress",
	"#@%^%#$@#$@#.com",
	"@example.com",
	"Joe Smith <email@example.com>",
	"email.example.com",
	"email@example@example.com",
	".email@example.com",
	"email.@example.com",
	"email..email@example.com",
	"あいうえお@example.com",
	"email@example.com (Joe Smith)",
	"email@example",
	"email@-example.com",
	"email@example..com",
	"Abc..123@example.com",
	'"(),:;<>[]@example.com',
	'just"not"right@example.com',
	'this is"really"not\\\\allowed@example.com'
];

describe("LoginDialog", () => {
	it("will pass valid e-mail addresses", async () => {
		const wrapper = await createWrapper(LoginDialog, {});
		validAddresses.forEach(email => {
			wrapper.setData({ email });
			expect((wrapper.vm as any).emailIsValid).toBe(true);
		});
	});

	it("will fail on wrong e-mail addresses", async () => {
		const wrapper = await createWrapper(LoginDialog, {});
		invalidAddresses.forEach(email => {
			wrapper.setData({ email });
			expect((wrapper.vm as any).emailIsValid).toBe(false);
		});
	});

	it("will pass filled in passwords", async () => {
		const wrapper = await createWrapper(LoginDialog, {});
		wrapper.setData({ password: "test" });
		expect((wrapper.vm as any).passwordIsValid).toBe(true);
	});

	it("will fail on empty password field", async () => {
		const wrapper = await createWrapper(LoginDialog, {});
		wrapper.setData({ password: "" });
		expect((wrapper.vm as any).passwordIsValid).toBe(false);
	});

	it("will show an error message when the e-mail address field is empty", async () => {
		const wrapper = await createWrapper(LoginDialog, {
			data: {
				email: "HI"
			}
		});
		wrapper.setData({
			email: ""
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(wrapper.vm.$t("dialogs.login.requiredEmail"));
	});

	it("will show an error message when the e-mail address is not valid", async () => {
		const wrapper = await createWrapper(LoginDialog, {});
		wrapper.setData({
			email: "fakeEmail@efe."
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(wrapper.vm.$t("dialogs.login.invalidEmail"));
	});

	it("will not show an error message when the e-mail address is valid", async () => {
		const wrapper = await createWrapper(LoginDialog, {
			data: {
				email: "example@example.com"
			}
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).not.toContain(wrapper.vm.$t("dialogs.login.invalidEmail"));
	});

	it("will show an error message when the password field is empty", async () => {
		const wrapper = await createWrapper(LoginDialog, {});
		wrapper.setData({
			password: ""
		});
		await wrapper.vm.$nextTick();

		expect(wrapper.text()).toContain(wrapper.vm.$t("dialogs.login.requiredPassword"));
	});

	it("will not show an error message when the password field is not empty", async () => {
		const wrapper = await createWrapper(LoginDialog, {
			data: {
				password: " "
			}
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.text()).not.toContain(wrapper.vm.$t("dialogs.login.requiredPassword"));
	});

	it("disables the login button when e-mail address field is empty", async () => {
		const wrapper = await createWrapper(LoginDialog, {
			data: {
				password: " ",
				email: ""
			}
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find("button[type='submit']").attributes()).toHaveProperty("disabled");
	});

	it("disables the login button when e-mail address is not valid", async () => {
		const wrapper = await createWrapper(LoginDialog, {
			data: {
				password: " ",
				email: "example@"
			}
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find("button[type='submit']").attributes()).toHaveProperty("disabled");
	});

	it("disables the login button when password field is empty", async () => {
		const wrapper = await createWrapper(LoginDialog, {
			data: {
				password: "",
				email: "example@example.com"
			}
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find("button[type='submit']").attributes()).toHaveProperty("disabled");
	});

	it("enables the login button when password field is not empty and e-mail address is valid", async () => {
		const wrapper = await createWrapper(LoginDialog, {
			data: {
				password: " ",
				email: "example@example.com"
			}
		});

		await wrapper.vm.$nextTick();

		expect(wrapper.find("button[type='submit']").attributes()).not.toHaveProperty("disabled");
	});
});

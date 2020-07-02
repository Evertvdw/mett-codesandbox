<template>
	<q-form ref="form" @submit.prevent="resolve">
		<q-card-section>
			<q-input
				v-model.trim="email"
				type="email"
				:label="$t('dialogs.login.email')"
				:rules="[
					val => !!val || $t('dialogs.login.requiredEmail'),
					val => emailIsValid || $t('dialogs.login.invalidEmail')
				]"
				class="q-mb-md"
				required
			/>

			<q-input
				v-model="password"
				type="password"
				:label="$t('dialogs.login.password')"
				:rules="[val => !!val || $t('dialogs.login.requiredPassword')]"
				class="q-mb-md"
				required
			/>
		</q-card-section>

		<q-card-actions align="right">
			<q-btn :label="$t('dialogs.login.reject')" color="primary" class="q-mr-sm" flat @click="reject" />

			<q-btn
				color="primary"
				type="submit"
				:disabled="!emailIsValid || !passwordIsValid"
				:label="$t('dialogs.login.resolve')"
			/>
		</q-card-actions>
	</q-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { IDialog } from "src/store/dialog/types";
import { Action } from "src/mett/components/decorators";

@Component
export default class LoginDialog extends Vue {
	$refs!: {
		form: HTMLFormElement;
	};

	@Prop() readonly dialog!: IDialog;

	@Action("user/login") login!: ({ email, password }: { email: string; password: string }) => string;
	@Action("dialog/rejectDialog") readonly rejectDialog!: ({
		dialog,
		reason
	}: {
		dialog: IDialog;
		reason?: any;
	}) => void;

	loading = false;

	// Todo: remove this
	email = "rinzed@gmail.com";
	password = "Test_123";
	// Use this instead
	// email = "";
	// password = "";

	get emailIsValid() {
		const pattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
		return pattern.test(this.email);
	}

	get passwordIsValid() {
		// Todo: Add a better password check
		return this.password != "";
	}

	async resolve() {
		if (this.emailIsValid && this.passwordIsValid) {
			this.loading = true;
			try {
				await this.login({ email: this.email, password: this.password });
				this.reject();
			} catch (error) {
				this.loading = false;
			}
		}
	}

	reject() {
		this.rejectDialog({ dialog: this.dialog });
	}
}
</script>

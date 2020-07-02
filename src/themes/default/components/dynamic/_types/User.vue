<template>
	<!-- Todo: make this dynamic //-->
	<!-- Todo: create date component //-->
	<q-item class="mett-user q-pa-none">
		<q-item-section avatar>
			<q-avatar>
				<img src="/demo-images/avatar-rinse.jpg" alt="" />
			</q-avatar>
		</q-item-section>

		<q-item-section>
			<q-item-label class="mett-user-full-name">Rinse Stellingwerf</q-item-label>
			<q-item-label class="mett-date" caption lines="1">17 maart 2020</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import Vue from "vue";
import Component, { mixins } from "vue-class-component";
import ItemContainer from "src/mixins/item-container";
import { Action, Getter } from "src/mett/components/decorators";
import { UserProfileDto, ItemDto } from "src/mett/communication/types";
import { ILoadUserRequest } from "src/store/user/types";
import { Watch } from "vue-property-decorator";

@Component
export default class DynamicUser extends mixins(ItemContainer) {
	@Getter("user/userById") userById!: (id: number) => UserProfileDto;
	@Getter("user/users") users!: () => UserProfileDto[];

	@Action("user/loadUsers") loadUsers!: ({
		serverSide,
		useCache
	}: {
		serverSide?: boolean;
		useCache?: boolean;
	}) => Promise<any>;

	asyncLoad({ vm, item }: { vm: Vue; item: ItemDto }) {
		return new Promise((resolve, reject) => {
			let serverSide = false;

			if (item.options) {
				const options: any = JSON.parse(item.options);

				if (options.serverSide) serverSide = true;
			}

			const loadUserRequest: ILoadUserRequest = {
				userId: parseInt(item.value.toString()),
				serverSide: serverSide
			};

			vm.$store.dispatch("user/loadUser", loadUserRequest).then(
				() => resolve(),
				reason => reject(reason)
			);
		});
	}

	get user() {
		return this.userById(parseInt(this.item.value.toString()));
	}

	get fullName() {
		return this.fullNameByUser(this.user);
	}

	@Watch("isEdit")
	onIsEditChanged() {
		if (this.isEdit) {
			this.loadUsers({}).then(
				() => {},
				() => {}
			);
		}
	}

	fullNameByUser(targetUser?: UserProfileDto) {
		if (!targetUser) return "";

		return targetUser.firstName + " " + targetUser.lastName;
	}

	changeAuthor(e: Event) {
		const newId = parseInt((e.target as HTMLSelectElement).value);

		this.updateValue({ value: newId });
	}

	mounted() {
		this.onIsEditChanged();
	}
}
</script>

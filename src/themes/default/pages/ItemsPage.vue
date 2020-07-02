<template>
	<section class="mett-items-page q-py-lg">
		<div class="mett-centered mett-max-width row justify-center">
			<div class="col-12">
				<mett-content-actions />

				<mett-items-placeholder v-if="items" :items="items" />

				<div v-else>
					<h1>
						<span class="text-bold">{{ $t("errors.pageNotFound.code") }}</span> -
						{{ $t("errors.pageNotFound.title") }}
					</h1>

					<p>{{ $t("errors.pageNotFound.description") }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from "vue";
import VueRouter from "vue-router";
import { Store } from "vuex";
import Component from "vue-class-component";
import { Getter, Comp } from "src/mett/components/decorators";
import { MenuItemDto, TemplateDto, ItemDto, PageDto } from "src/mett/communication/types";
import { IError } from "src/store/error/types";
import { relatedItemsToItems } from "src/mett/helpers/item-helper";
import { i18n } from "src/boot/i18n";

@Component
export default class ItemsPage extends Vue {
	@Comp("Components.Static.Actions.Content") mettContentActions!: Vue;
	@Comp("Components.Static.ItemsPlaceholder") mettItemsPlaceholder!: Vue;

	@Getter("template/templateById") templateById!: (templateId: number) => TemplateDto;
	@Getter("page/page") page!: PageDto;
	@Getter("page/containers") containers!: ItemDto[];

	asyncLoad({ vm, router, store }: { vm: Vue; router: VueRouter; store: Store<object> }) {
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve, reject) => {
			if (!(await loadPageData.apply(vm, [router, store] as any))) {
				reject();
				return;
			}

			resolve();
		});
	}

	get items() {
		if (this.$route.params.itemName) {
			if (this.containers && this.containers.length == 1)
				return relatedItemsToItems(this.containers[0].relatedItems);
		} else {
			return this.containers;
		}

		return [];
	}
}

function loadPageData(this: Vue, router: VueRouter, store: Store<object>) {
	const pageMenuItem: MenuItemDto | undefined = store.getters["page/pageMenuItemByUrlSegment"](
		router.currentRoute.params.pageName
	);
	const containerMenuItem: MenuItemDto | undefined = store.getters["page/pageMenuItemByUrlSegment"](
		router.currentRoute.params.itemName
	);

	if (!pageMenuItem || !pageMenuItem.relatedItem || !pageMenuItem.relatedItem.item) {
		const error: IError = {
			code: i18n.t("errors.pageItemNotFound.code"),
			title: i18n.t("errors.pageItemNotFound.title", [router.currentRoute.params.pageName]),
			message: i18n.t("errors.pageItemNotFound.description", [
				router.currentRoute.params.pageName,
				router.currentRoute.fullPath
			]),
			timestamp: new Date()
		};
		store.dispatch("error/addError", error);
		store.dispatch("error/raise404");
		return false;
	}

	if (router.currentRoute.params.itemName && (!containerMenuItem || !containerMenuItem.relatedItem)) {
		const error: IError = {
			code: i18n.t("errors.containerItemNotFound.code"),
			title: i18n.t("errors.containerItemNotFound.title", [router.currentRoute.params.itemName]),
			message: i18n.t("errors.containerItemNotFound.description", [
				router.currentRoute.params.itemName,
				router.currentRoute.fullPath
			]),
			timestamp: new Date()
		};
		store.dispatch("error/addError", error);
		store.dispatch("error/raise404");
		return false;
	}

	let containerGuid: string | undefined;

	if (containerMenuItem && containerMenuItem.relatedItem) containerGuid = containerMenuItem.relatedItem.guid;

	return store
		.dispatch("page/loadPageData", {
			guid: pageMenuItem.relatedItem.item.guid,
			containerGuid
		})
		.then(
			() => true,
			reason => {
				if (reason && reason.response) {
					switch (reason.response.status) {
						case 401:
						case 403:
							store.dispatch("error/raise401");
							return true;
						case 404:
							store.dispatch("error/raise404");
							return true;
						default:
							return false;
					}
				}
				return false;
			}
		);
}
</script>

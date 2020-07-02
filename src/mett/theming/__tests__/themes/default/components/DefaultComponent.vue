<template>
	<div>
		DefaultComponent
	</div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Vue, Component } from "vue-property-decorator";
import { Store } from "vuex";

@Component
export default class DefaultComponent extends Vue {
	asyncLoad({ vm, payload, store }: { vm: Vue; payload: any; store: Store<object> }) {
		return new Promise((resolve, reject) => {
			if (payload) {
				store.commit("test/test", payload);
			}
			resolve();
		});
	}
}
</script>

<template>
	<div class="mett-list-item-detail">
		<slot />

		<mett-comment-list />
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";

@Component
export default class ListItemDetail extends Vue {
	@Comp("Components.Dynamic.CommentList") mettCommentList!: Vue;
}
</script>

<template>
	<q-list padding class="mett-comment-list">
		<mett-add-comment />
		<mett-comment />
	</q-list>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Comp } from "src/mett/components/decorators";

@Component
export default class CommentList extends Vue {
	@Comp("Components.Dynamic.CommentList.AddComment") mettAddComment!: Vue;
	@Comp("Components.Dynamic.CommentList.Comment") mettComment!: Vue;
}
</script>

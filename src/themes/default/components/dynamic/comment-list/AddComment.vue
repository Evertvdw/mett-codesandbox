<template>
	<!-- Todo: make this dynamic //-->
	<div class="q-py-xl mett-comment-add">
		<q-item>
			<q-item-section avatar top>
				<q-avatar class="mett-comment-avatar">
					<img src="/demo-images/avatar-rinse.jpg" alt="" />
				</q-avatar>
			</q-item-section>

			<q-item-section>
				<q-input v-model="commentText" outlined type="textarea" :placeholder="$t('comments.add')" rows="5" />
			</q-item-section>
		</q-item>

		<q-item :inset-level="1">
			<q-btn :label="$t('buttons.comment')" color="secondary"></q-btn>
		</q-item>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AddComment extends Vue {
	commentText = "";
}
</script>

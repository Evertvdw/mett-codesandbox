<template>
	<section class="mett-error-404-page q-py-lg">
		<div class="mett-centered mett-max-width row justify-center">
			<div class="col-12">
				<h1>
					<span class="text-bold">{{ $t("errors.pageNotFound.code") }}</span> -
					{{ $t("errors.pageNotFound.title") }}
				</h1>

				<p>{{ $t("errors.pageNotFound.description") }}</p>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Error404Page extends Vue {}
</script>

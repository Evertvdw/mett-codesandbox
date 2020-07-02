<template>
	<section class="q-px-md q-px-lg row justify-center grid">
		<div class="row">
			<div class="col-12">
				<h1>{{ $t("state.error") }}</h1>
			</div>
		</div>

		<div class="row">
			<div class="col-12">
				<div v-for="(error, index) in errors" :key="index">
					<strong>{{ error.title }} </strong>
					<p>{{ error.message }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IError } from "src/store/error/types";
import { Getter } from "src/mett/components/decorators";

@Component
export default class ErrorPage extends Vue {
	@Getter("error/errors") errors!: IError[];
}
</script>

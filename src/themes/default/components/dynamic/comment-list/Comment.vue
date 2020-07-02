<template>
	<!-- Todo: make this dynamic //-->
	<div>
		<q-item class="mett-comment q-py-lg">
			<q-list>
				<q-item>
					<q-item-section avatar top>
						<q-avatar class="mett-avatar">
							<img src="/demo-images/avatar-tom.jpg" alt="" />
						</q-avatar>
					</q-item-section>

					<q-item-section top>
						<q-item-label class="mett-author">Tom Latijn</q-item-label>
						<q-item-label class="mett-date" caption lines="1">13 maart 2020</q-item-label>
					</q-item-section>
				</q-item>

				<q-item>
					<q-item-section avatar top class="column items-center mett-comment-like">
						<q-icon name="favorite" />
						<span>33</span>
					</q-item-section>

					<q-item-section class="mett-comment-content">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacinia finibus eleifend. Praesent
						ac convallis metus, eu mollis lorem. Donec molestie rhoncus leo in eleifend. Fusce eget euismod
						quam. Pellentesque eleifend tortor nec nulla malesuada, id blandit enim posuere. Phasellus
						tincidunt imperdiet neque, ut bibendum urna condimentum sed.

						<div class="q-py-lg">
							<q-btn label="reageren" color="secondary" icon="reply" size="sm" outline />
						</div>
					</q-item-section>
				</q-item>
			</q-list>
		</q-item>

		<!-- demo only, this should not be in this file //-->
		<q-item class="mett-comment q-py-lg" :inset-level="1">
			<q-list class="mett-border-left-2">
				<q-item>
					<q-item-section avatar top>
						<q-avatar icon="person" class="mett-avatar mett-no-avatar" />
					</q-item-section>

					<q-item-section top>
						<q-item-label class="mett-author">Rinze Douma</q-item-label>
						<q-item-label caption lines="1" class="mett-date">21 maart 2020</q-item-label>
					</q-item-section>
				</q-item>

				<q-item>
					<q-item-section avatar top class="column items-center mett-comment-liked">
						<q-icon name="favorite" />
						<span>22</span>
					</q-item-section>

					<q-item-section class="mett-comment-content">
						Ongelovelijke bazenstijl stijl. Quasar kan echt alles, niet normaal. Gewoon npm install en het
						werkt.

						<div class="q-py-lg">
							<q-btn label="reageren" color="secondary" icon="reply" size="sm" outline />
						</div>
					</q-item-section>
				</q-item>
			</q-list>
		</q-item>

		<!-- demo only, this should not be in this file //-->
		<q-item class="mett-comment q-py-lg" :inset-level="1">
			<q-list class="mett-border-left-2">
				<q-item>
					<q-item-section avatar top>
						<q-avatar class="mett-avatar">
							<img src="/demo-images/avatar-rinse.jpg" />
						</q-avatar>
					</q-item-section>

					<q-item-section top>
						<q-item-label class="mett-author">Rinse Stellingwerf</q-item-label>
						<q-item-label caption lines="1" class="mett-date">22 maart 2020</q-item-label>
					</q-item-section>
				</q-item>

				<q-item>
					<q-item-section avatar top class="column items-center mett-comment-liked">
						<q-icon name="favorite" />
						<span>305</span>
					</q-item-section>

					<q-item-section class="mett-comment-content">
						Wow, dit is echt prachtig!

						<div class="q-py-lg">
							<q-btn label="reageren" color="secondary" icon="reply" size="sm" outline />
						</div>
					</q-item-section>
				</q-item>
			</q-list>
		</q-item>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Comment extends Vue {}
</script>

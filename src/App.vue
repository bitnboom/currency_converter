<template>
	<div class="app">
		<h1 class="app__title">Currency converter</h1>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	},
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.app {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;

	height: 100%;
	padding: $gap-medium;
}

.app__title {
	margin-bottom: $gap-medium;
	text-align: center;
}
</style>

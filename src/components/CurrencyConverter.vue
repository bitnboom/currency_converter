<template>
	<div class="currency-converter">
		<div class="currency-converter__container">
			<label class="base-input-wrapper">
				<span class="base-input-title">From:</span>

				<input
					v-model="fromCurrencyValue"
					@input="onInput"
					:name="INPUT_NAMES.FROM"
					class="base-input"
					type="number"
					autocomplete="off"
				/>
			</label>

			<select
				v-model="fromCurrencyCode"
				@input="onInput"
				:name="INPUT_NAMES.FROM"
				class="base-select"
			>
				<option
					v-for="value in currencies"
					:key="value.code"
					:value="value.code"
				>
					{{ value.description }}
				</option>
			</select>
		</div>

		<div class="currency-converter__container">
			<label class="base-input-wrapper">
				<span class="base-input-title">To:</span>

				<input
					v-model="toCurrencyValue"
					@input="onInput"
					:name="INPUT_NAMES.TO"
					class="base-input"
					type="number"
					autocomplete="off"
				/>
			</label>

			<select
				v-model="toCurrencyCode"
				@input="onInput"
				:name="INPUT_NAMES.TO"
				class="base-select"
			>
				<option
					v-for="value in currencies"
					:key="value.code"
					:value="value.code"
				>
					{{ value.description }}
				</option>
			</select>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue';

import { CurrencyApi } from '@/services/api';
import { isNumeric } from '@/utils/helpers';

import {
	INPUT_NAMES,
	DEFAULT_CURRENCIES,
	SUPPORTED_LANGS,
} from '@/utils/constants';

import type { TCurrency, TGetCurrenciesQuery } from '@/types/index';

const getConvertionResult = async ({
	from,
	to,
	amount,
}: TGetCurrenciesQuery): Promise<number> => {
	const data = await CurrencyApi.convertCurrency({
		from,
		to,
		amount,
	});

	return data?.result || 0;
};

export default defineComponent({
	setup() {
		const currencies = reactive<TCurrency[]>([]);
		const fromCurrencyValue = ref<number>(0);
		const toCurrencyValue = ref<number>(0);
		const fromCurrencyCode = ref<string>('');
		const toCurrencyCode = ref<string>('');

		const convertCurrency = async ({ inputName }: { inputName: string }) => {
			switch (inputName) {
				case INPUT_NAMES.FROM:
					if (!isNumeric(fromCurrencyValue.value.toString())) return;

					toCurrencyValue.value = await getConvertionResult({
						from: fromCurrencyCode.value,
						to: toCurrencyCode.value,
						amount: fromCurrencyValue.value,
					});

					break;

				case INPUT_NAMES.TO:
					if (!isNumeric(toCurrencyValue.value.toString())) return;

					fromCurrencyValue.value = await getConvertionResult({
						from: toCurrencyCode.value,
						to: fromCurrencyCode.value,
						amount: toCurrencyValue.value,
					});

					break;
			}
		};

		const onInput = async (e: Event) => {
			const el = e.target as HTMLInputElement | HTMLSelectElement;

			nextTick(() => convertCurrency({ inputName: el.name }));
		};

		return {
			currencies,
			fromCurrencyCode,
			toCurrencyCode,
			fromCurrencyValue,
			toCurrencyValue,
			INPUT_NAMES,
			onInput,
		};
	},
	async created() {
		const data = await CurrencyApi.getCurrencies();

		if (data) {
			const keys = Object.keys(data.symbols);
			keys.forEach((key) => this.currencies.push(data.symbols[key]));
		}

		const currentLang = navigator.language;

		if (currentLang.includes(SUPPORTED_LANGS.en)) {
			this.fromCurrencyCode = DEFAULT_CURRENCIES.USD;
			this.toCurrencyCode = DEFAULT_CURRENCIES.EUR;
		} else if (currentLang.includes(SUPPORTED_LANGS.ru)) {
			this.fromCurrencyCode = DEFAULT_CURRENCIES.RUB;
			this.toCurrencyCode = DEFAULT_CURRENCIES.USD;
		}
	},
});
</script>

<style lang="scss" scoped>
@import '@/styles/_variables';

.currency-converter {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	gap: $gap-medium;

	padding: $gap-medium;
	border-radius: $border-radius-base;

	box-shadow: rgb(35 55 80 / 30%) 0px 6px 12px;
}

.currency-converter__container {
	display: flex;
	align-items: flex-end;
	gap: $gap-small;
}

.base-input-wrapper {
	width: 100%;
}

.base-input-title {
	display: block;
	margin-bottom: $gap-small;

	font-weight: 600;
}

.base-select,
.base-input {
	width: 100%;
	min-width: 200px;
	padding: $gap-small;
	border-radius: $border-radius-small;
	border: 1px solid rgba($color: $clr-base, $alpha: 0.6);
}

@media screen and (max-width: $tablet-width) {
	.currency-converter__container {
		flex-wrap: wrap;
	}
}
</style>

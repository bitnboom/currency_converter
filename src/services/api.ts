import axios from 'axios';

import { BASE_URL } from './config';

import type {
	TGetCurrenciesData,
	TConvertCyrrencyData,
	TGetCurrenciesQuery,
} from '@/types/index';

export class CurrencyApi {
	static async getCurrencies() {
		return axios
			.get<TGetCurrenciesData>(`${BASE_URL}symbols`)
			.then((response) => {
				return response.data;
			})
			.catch((e) => console.log('getCurrencies error: ', e));
	}

	static async convertCurrency({ from, to, amount }: TGetCurrenciesQuery) {
		return axios
			.get<TConvertCyrrencyData>(
				`${BASE_URL}convert?from=${from}&to=${to}&amount=${amount}`
			)
			.then((response) => {
				return response.data;
			})
			.catch((e) => console.log('convertCurrency error: ', e));
	}
}

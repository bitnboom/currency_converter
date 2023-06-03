type TCurrency = {
	description: string; // E.g United States Dollar
	code: string; // E.g USD
};

type TCurrencies = {
	[key: string]: TCurrency;
};

type TGetCurrenciesData = {
	success: true;
	symbols: TCurrencies;
};

type TGetCurrenciesQuery = {
	from: string;
	to: string;
	amount: number;
};

type TConvertCyrrencyData = {
	date: string;
	historical: false;
	info: {
		rate: number;
	};
	query: TGetCurrenciesQuery;
	result: number;
	success: true;
};

export type {
	TCurrencies,
	TCurrency,
	TGetCurrenciesData,
	TGetCurrenciesQuery,
	TConvertCyrrencyData,
};

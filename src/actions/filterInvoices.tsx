import { FILTER_INVOICES } from './types';

export interface FilterInvoices {
	type: string;
	payload: string;
}

export const filterInvoices = (filterSelection: string): FilterInvoices => {
	return {
		type: FILTER_INVOICES,
		payload: filterSelection,
	};
};

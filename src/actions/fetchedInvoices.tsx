import { FETCHED_INVOICES } from './types';

export interface FetchedInvoices {
	type: string;
	payload: [];
}

export const fetchedInvoices = (responseData: []): FetchedInvoices => {
	return {
		type: FETCHED_INVOICES,
		payload: responseData,
	};
};

import { FetchedInvoices } from '../actions';
import { FETCHED_INVOICES } from '../actions/types';

export const fetchedInvoicesReducer = (
	state: any = [],
	action: FetchedInvoices
) => {
	switch (action.type) {
		case FETCHED_INVOICES:
			return action.payload;
		default:
			return state;
	}
};

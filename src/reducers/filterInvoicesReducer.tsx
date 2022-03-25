import { FilterInvoices } from '../actions';
import { FILTER_INVOICES } from '../actions/types';

export const filterInvoicesReducer = (
	state: string = 'all',
	action: FilterInvoices
) => {
	switch (action.type) {
		case FILTER_INVOICES:
			return action.payload;
		default:
			return state;
	}
};

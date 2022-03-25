import { ToggleEditInvoice } from '../actions';
import { TOGGLE_EDIT_INVOICE } from '../actions/types';

export const editInvoiceReducer = (
	state: any = { toggle: false, selectedInvoice: {} },
	action: ToggleEditInvoice
) => {
	switch (action.type) {
		case TOGGLE_EDIT_INVOICE:
			return action.payload;
		default:
			return state;
	}
};

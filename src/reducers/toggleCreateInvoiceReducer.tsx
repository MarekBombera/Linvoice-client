import { ToggleCreateInvoice } from '../actions';
import { TOGGLE_CREATE_INVOICE } from '../actions/types';

export const toggleCreateInvoiceReducer = (
	state: boolean = false,
	action: ToggleCreateInvoice
) => {
	switch (action.type) {
		case TOGGLE_CREATE_INVOICE:
			return action.payload;

		default:
			return state;
	}
};

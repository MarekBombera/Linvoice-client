import { ToggleViewInvoice } from '../actions';
import { TOGGLE_VIEW_INVOICE } from '../actions/types';

type State = {
	toggle: boolean;
	invoiceId: string;
};

export const viewInvoiceReducer = (
	state: State = {
		toggle: false,
		invoiceId: '',
	},
	action: ToggleViewInvoice
) => {
	switch (action.type) {
		case TOGGLE_VIEW_INVOICE:
			return action.payload;

		default:
			return state;
	}
};

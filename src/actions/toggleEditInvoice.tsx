import { TOGGLE_EDIT_INVOICE } from './types';

export interface ToggleEditInvoice {
	type: string;
	payload: {
		toggle: boolean;
		selectedInvoice: {};
	};
}

type Payload = {
	toggle: boolean;
	selectedInvoice: {};
};

export const toggleEditInvoice = (payload: Payload): ToggleEditInvoice => {
	return {
		type: TOGGLE_EDIT_INVOICE,
		payload: payload,
	};
};

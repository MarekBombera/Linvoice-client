import { TOGGLE_VIEW_INVOICE } from './types';

export interface ToggleViewInvoice {
	type: string;
	payload: {
		toggle: boolean;
		invoiceId: string;
	};
}

type Payload = {
	toggle: boolean;
	invoiceId: string;
};

export const toggleViewInvoice = (payload: Payload): ToggleViewInvoice => {
	return {
		type: TOGGLE_VIEW_INVOICE,
		payload: payload,
	};
};

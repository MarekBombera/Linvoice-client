import { TOGGLE_CREATE_INVOICE } from './types';

export interface ToggleCreateInvoice {
	type: string;
	payload: boolean;
}

export const toggleCreateInvoice = (toggle: boolean): ToggleCreateInvoice => {
	return {
		type: TOGGLE_CREATE_INVOICE,
		payload: toggle,
	};
};

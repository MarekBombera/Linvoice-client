import axios from 'axios';

const URL: any = `${process.env.REACT_APP_URL}`;

export const httpGetAllInvoices = async (userId: string) => {
	const response = await axios.get(URL, { params: { userId: userId } });
	return response;
};

export const httpPostInvoice = async (invoice: {}) => {
	const response = await axios.post(URL, invoice);
	return response;
};

export const httpDeleteInvoice = async (invoiceId: string, userId: string) => {
	return await axios.delete(`${URL}/${invoiceId}/delete`, {
		params: { userId: userId },
	});
};

export const httpMarkAsPAid = async (invoiceId: string, userId: string) => {
	return await axios.patch(`${URL}/${invoiceId}/${userId}/mark-as-paid`);
};

export const httpEditInvoice = async (
	invoiceId: string,
	userId: string,
	invoice: {}
) => {
	return await axios.patch(
		`${URL}/${invoiceId}/${userId}/edit-invoice`,
		invoice
	);
};

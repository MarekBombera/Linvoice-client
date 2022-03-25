import { FormModel } from '../InvoiceForm/FormModel';

export const setInitialValues = (selectedInvoice: FormModel) => {
	const { userId, invoiceId, billFrom, billTo, itemList } = selectedInvoice;

	const initialValues = {
		userId: userId,
		invoiceId: invoiceId,
		billFrom: {
			country: billFrom.country,
			city: billFrom.city,
			streetAddress: billFrom.streetAddress,
			postCode: billFrom.postCode,
		},
		billTo: {
			clientName: billTo.clientName,
			clientEmail: billTo.clientEmail,
			country: billTo.country,
			city: billTo.city,
			streetAddress: billTo.streetAddress,
			postCode: billTo.postCode,
			invoiceDate: new Date(billTo.invoiceDate),
			paymentTerms: billTo.paymentTerms,
			projectDescription: billTo.projectDescription,
			status: billTo.status,
		},
		itemList: itemList,
	};

	return initialValues;
};

export const initialValues = {
	userId: '',
	invoiceId: '',
	billFrom: {
		country: '',
		city: '',
		streetAddress: '',
		postCode: '',
	},
	billTo: {
		clientName: '',
		clientEmail: '',
		country: '',
		city: '',
		streetAddress: '',
		postCode: '',
		invoiceDate: '',
		paymentTerms: '',
		projectDescription: '',
		status: 'pending',
	},
	itemList: [
		{
			itemName: '',
			quantity: 0,
			price: 0,
		},
	],
};

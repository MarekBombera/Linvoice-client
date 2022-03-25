export interface FormModel {
	userId: string;
	invoiceId: string;
	billFrom: {
		streetAddress: string;
		city: string;
		postCode: string;
		country: string;
	};
	billTo: {
		clientName: string;
		clientEmail: string;
		streetAddress: string;
		city: string;
		postCode: string;
		country: string;
		invoiceDate: any;
		paymentTerms: string;
		projectDescription: string;
		status: string;
	};
	itemList: {
		itemName: string;
		quantity: number;
		price: number;
	}[];
}

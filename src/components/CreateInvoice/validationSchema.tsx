import * as Yup from 'yup';

//Had to subtract one day from new Date() to be able to validate today
const validateToday = new Date(Date.now() - 86400000);

export const validationSchema = Yup.object({
	billFrom: Yup.object({
		city: Yup.string().required('Required'),
		country: Yup.string().required('Required'),
		postCode: Yup.string().required('Required'),
		streetAddress: Yup.string().required('Required'),
	}),
	billTo: Yup.object({
		clientEmail: Yup.string().email('Email is invalid').required('Required'),
		clientName: Yup.string().required('Required'),
		city: Yup.string().required('Required'),
		country: Yup.string().required('Required'),
		postCode: Yup.string().required('Required'),
		streetAddress: Yup.string().required('Required'),
		invoiceDate: Yup.date().min(validateToday, 'Date cannot be in the past'),
		paymentTerms: Yup.string().required('Required'),
		projectDescription: Yup.string().required('Required'),
	}),
	itemList: Yup.array().of(
		Yup.object({
			itemName: Yup.string().required('Required'),
			quantity: Yup.number().required('Required'),
			price: Yup.number().required('Required'),
		})
	),
});

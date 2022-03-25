import { useSelector, useDispatch } from 'react-redux';
import { toggleCreateInvoice } from '../../actions';
import { RootState } from '../../reducers/';

import { Formik } from 'formik';
import { initialValues } from './initialValues';
import { validationSchema } from './validationSchema';
import { InvoiceNav } from '../InvoiceNav/InvoiceNav';
import { InvoiceForm } from '../InvoiceForm/InvoiceForm';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';

import { generateId } from '../../utils/generateId';
import { handleDateFormatting } from '../../utils/handleDateFormatting';

import { httpPostInvoice } from '../../requests/requests';

type HandleSubmit = {
	userId: string;
	invoiceId: string;
	billTo: {
		invoiceDate: string;
	};
};

export const CreateInvoice = (): JSX.Element => {
	const { googleAuthReducer } = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const createInvoiceRef = useClickOutside(() => {
		dispatch(toggleCreateInvoice(false));
	});

	const handleSubmit = async (values: HandleSubmit): Promise<void> => {
		values.userId = googleAuthReducer.userId;
		values.invoiceId = generateId();
		values.billTo.invoiceDate = handleDateFormatting(values.billTo.invoiceDate);

		await httpPostInvoice(values);
		dispatch(toggleCreateInvoice(false));
	};

	return (
		<div className="createInvoice" role="create-invoice" ref={createInvoiceRef}>
			<InvoiceNav
				action={toggleCreateInvoice(false)}
				className={'displayTabletFalse'}
			/>
			<h4 className="createInvoice-heading">new invoice</h4>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					handleSubmit(values);
				}}
				validationSchema={validationSchema}
				component={InvoiceForm}
			></Formik>
		</div>
	);
};

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/';
import { toggleViewInvoice, toggleEditInvoice } from '../../actions';

import { Formik } from 'formik';
import { setInitialValues } from './initialValues';
import { validationSchema } from '../CreateInvoice/validationSchema';
import { InvoiceForm } from '../InvoiceForm/InvoiceForm';
import { InvoiceNav } from '../InvoiceNav/InvoiceNav';

import { useClickOutside } from '../../hooks/useClickOutside/useClickOutside';

import { handleDateFormatting } from '../../utils/handleDateFormatting';

import { httpEditInvoice } from '../../requests/requests';

type HandleSubmit = {
	userId: string;
	invoiceId: string;
	billTo: {
		invoiceDate: string;
	};
};

export const EditInvoice = (): JSX.Element => {
	const { viewInvoiceReducer, editInvoiceReducer } = useSelector(
		(state: RootState) => state
	);
	const { selectedInvoice } = editInvoiceReducer;

	const dispatch = useDispatch();

	const closeEditInvoice = (): void => {
		dispatch(
			toggleEditInvoice({
				toggle: false,
				selectedInvoice: {},
			})
		);
		dispatch(
			toggleViewInvoice({
				toggle: true,
				invoiceId: viewInvoiceReducer.invoiceId,
			})
		);
	};

	const editInvoiceRef = useClickOutside(() => {
		closeEditInvoice();
	});

	const handleSubmit = async (editedInvoice: HandleSubmit): Promise<void> => {
		const { userId, invoiceId } = editedInvoice;
		editedInvoice.billTo.invoiceDate = handleDateFormatting(
			editedInvoice.billTo.invoiceDate
		);

		if (JSON.stringify(editedInvoice) === JSON.stringify(selectedInvoice)) {
			closeEditInvoice();
			return;
		}
		await httpEditInvoice(invoiceId, userId, editedInvoice);
		closeEditInvoice();
	};

	return (
		<div className="editInvoice" role="edit-invoice" ref={editInvoiceRef}>
			<InvoiceNav
				action={toggleViewInvoice({
					toggle: true,
					invoiceId: viewInvoiceReducer.invoiceId,
				})}
				optionalAction={toggleEditInvoice({
					toggle: false,
					selectedInvoice: {},
				})}
				className={'displayTabletFalse'}
			/>
			<div className="editInvoice-heading">
				<h2>Edit</h2>
				<h2 className="editInvoice-heading-id">
					<span className="editInvoice-heading-id-tag">#</span>
					{selectedInvoice.invoiceId}
				</h2>
			</div>

			<Formik
				initialValues={setInitialValues(selectedInvoice)}
				onSubmit={(values) => {
					handleSubmit(values);
				}}
				validationSchema={validationSchema}
				component={InvoiceForm}
			></Formik>
		</div>
	);
};

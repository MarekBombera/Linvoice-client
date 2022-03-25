import { RootState } from '../../reducers/';
import { useSelector, useDispatch } from 'react-redux';
import {
	toggleCreateInvoice,
	toggleEditInvoice,
	toggleViewInvoice,
} from '../../actions';

import { FormikProps } from 'formik';
import { FormField } from './formFieldComponents/FormField/FormField';
import { DatePicker } from './formFieldComponents/DatePicker/DatePicker';
import { FormDropdown } from './formFieldComponents/FormDropdown/FormDropdown';
import { InvoiceItemList } from './InvoiceItemList/InvoiceItemList';
import { FormModel } from './FormModel';

import { Button } from '../Button/Button';

export const InvoiceForm: (props: FormikProps<FormModel>) => JSX.Element = ({
	handleSubmit,
	values,
}) => {
	const { viewInvoiceReducer, toggleCreateInvoiceReducer, editInvoiceReducer } =
		useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const { billFrom, billTo } = values;

	const formDropdownOptions = [
		{ key: 'Select an option', value: '' },
		{ key: '1 Day', value: '1 Day' },
		{ key: '7 Days', value: '7 Days' },
		{ key: '14 Days', value: '14 Days' },
		{ key: '30 Days', value: '30 Days' },
	];

	const handleClosingInvoiceForm = (): void => {
		if (toggleCreateInvoiceReducer) {
			dispatch(toggleCreateInvoice(false));
		}
		if (editInvoiceReducer.toggle) {
			dispatchCloseEditInvoice();
		}
	};

	const dispatchCloseEditInvoice = (): void => {
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

	return (
		<form onSubmit={handleSubmit} role="invoice-form">
			<h4 className="createInvoice-fieldset-heading">bill from</h4>
			<fieldset className="createInvoice__billFrom">
				<FormField
					className={'billFrom-streetAddress'}
					htmlFor={'billFrom.streetAddress'}
					labelText={'street address'}
					values={billFrom.streetAddress}
				/>
				<FormField
					className={'billFrom-city'}
					htmlFor={'billFrom.city'}
					labelText={'city'}
					values={billFrom.city}
				/>
				<FormField
					className={'billFrom-postCode'}
					htmlFor={'billFrom.postCode'}
					labelText={'post code'}
					values={billFrom.postCode}
				/>
				<FormField
					className={'billFrom-country'}
					htmlFor={'billFrom.country'}
					labelText={'country'}
					values={billFrom.country}
				/>
			</fieldset>
			<h4 className="createInvoice-fieldset-heading">bill to</h4>
			<fieldset className="createInvoice__billTo">
				<FormField
					className={'billTo-clientName'}
					htmlFor={'billTo.clientName'}
					labelText={"client's name"}
					values={billTo.clientName}
				/>
				<FormField
					className={'billTo-clientEmail'}
					htmlFor={'billTo.clientEmail'}
					labelText={"client's email"}
					values={billTo.clientEmail}
				/>
				<FormField
					className={'billTo-streetAddress'}
					htmlFor={'billTo.streetAddress'}
					labelText={'street address'}
					values={billTo.streetAddress}
				/>
				<FormField
					className={'billTo-city'}
					htmlFor={'billTo.city'}
					labelText={'city'}
					values={billTo.city}
				/>
				<FormField
					className={'billTo-postCode'}
					htmlFor={'billTo.postCode'}
					labelText={'post code'}
					values={billTo.postCode}
				/>
				<FormField
					className={'billTo-country'}
					htmlFor={'billTo.country'}
					labelText={'country'}
					values={billTo.country}
				/>
				<DatePicker
					className={'billTo-invoiceDate'}
					htmlFor={'billTo.invoiceDate'}
					labelText={'invoice date'}
					values={billTo.invoiceDate}
				/>
				<FormDropdown
					className={'billTo-paymentTerms'}
					htmlFor={'billTo.paymentTerms'}
					labelText={'payment terms'}
					values={formDropdownOptions}
				/>
				<FormField
					className={'billTo-projectDescription'}
					htmlFor={'billTo.projectDescription'}
					labelText={'project description'}
					values={billTo.projectDescription}
				/>
				<InvoiceItemList />
			</fieldset>
			<div className="createInvoice__buttons">
				<div className="createInvoice__buttons">
					<Button
						className="createInvoice__buttons-cancel"
						onClick={() => handleClosingInvoiceForm()}
						type={'button'}
						text={'Cancel'}
					/>
					<Button
						className="createInvoice__buttons-submit"
						type={'submit'}
						text={'Save & Send'}
					/>
				</div>
			</div>
		</form>
	);
};

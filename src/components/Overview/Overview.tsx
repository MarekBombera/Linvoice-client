import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/';
import { toggleCreateInvoice, fetchedInvoices } from '../../actions';

import { InvoicePreview } from './InvoicePreview/InvoicePreview';
import { FormModel } from '../InvoiceForm/FormModel';
import { Filter } from './Filter/Filter';

import { becomeBackgroundStyling } from '../../utils/becomeBackgroundStyling';

import { httpGetAllInvoices } from '../../requests/requests';

import { useMediaQueryMatch } from '../../hooks/useMediaQueryMatch/useMediaQueryMatch';

import plus_img from '../../assets/icon-plus.svg';
import empty_img from '../../assets/illustration-empty.svg';

export const Overview = (): JSX.Element => {
	const {
		toggleCreateInvoiceReducer,
		editInvoiceReducer,
		fetchedInvoicesReducer,
		googleAuthReducer,
		filterInvoicesReducer,
	} = useSelector((state: RootState) => state);
	const dispatch = useDispatch();

	const openCreateInvoice = (): void => {
		dispatch(toggleCreateInvoice(true));
	};

	const calculateNumberOfInvoices = (): string => {
		if (fetchedInvoicesReducer.length === 1) {
			return `${fetchedInvoicesReducer.length} invoice`;
		}
		if (fetchedInvoicesReducer.length > 1) {
			return `${fetchedInvoicesReducer.length} invoices`;
		}
		return `No invoices`;
	};

	const renderInvoicePreview = fetchedInvoicesReducer.map(
		(invoice: FormModel): JSX.Element | null => {
			const { invoiceId, billTo, itemList } = invoice;

			if (filterInvoicesReducer === 'pending' && billTo.status === 'pending') {
				return null;
			}
			if (filterInvoicesReducer === 'paid' && billTo.status === 'paid')
				return null;

			return (
				<Fragment key={invoiceId}>
					<InvoicePreview
						name={billTo.clientName}
						itemList={itemList}
						invoiceId={invoiceId}
						date={billTo.invoiceDate}
						paymentDue={billTo.paymentTerms}
						status={billTo.status}
					/>
				</Fragment>
			);
		}
	);

	const renderEmpty = (
		<div className="overview__empty">
			<img src={empty_img} alt="empty"></img>
			<h2>There is nothing here</h2>
			<p>
				Create an invoice by clicking the{' '}
				<span>{useMediaQueryMatch('phone') ? 'New' : 'New Invoice'}</span>{' '}
				button and get started
			</p>
		</div>
	);

	useEffect(() => {
		async function getInvoices() {
			const invoices = await httpGetAllInvoices(googleAuthReducer.userId);
			dispatch(fetchedInvoices(invoices.data));
			return;
		}
		getInvoices();
	}, [googleAuthReducer, dispatch]);

	return (
		<div
			className="overview"
			role="overview"
			style={becomeBackgroundStyling(
				toggleCreateInvoiceReducer,
				editInvoiceReducer.toggle,
				'overview'
			)}
		>
			<div className="overview__panel">
				<div className="overview__panel-invoice-count">
					<h4>Invoices</h4>
					<p>
						{useMediaQueryMatch('phone')
							? `${calculateNumberOfInvoices()}`
							: `There are ${calculateNumberOfInvoices()} total`}
					</p>
				</div>
				<div className="overview__panel-actions">
					<Filter />
					<div
						onClick={() => openCreateInvoice()}
						className="overview__panel-actions-new"
					>
						<img src={plus_img} alt="new invoice" />
						<button>
							{useMediaQueryMatch('phone') ? 'New' : 'New Invoice'}
						</button>
					</div>
				</div>
			</div>
			{fetchedInvoicesReducer.length === 0 ? renderEmpty : renderInvoicePreview}
		</div>
	);
};

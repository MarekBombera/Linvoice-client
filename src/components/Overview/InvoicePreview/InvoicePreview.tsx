import { useDispatch } from 'react-redux';
import { toggleViewInvoice } from '../../../actions/';

import { InvoiceStatus } from '../../InvoiceStatus/InvoiceStatus';

import { calculateGrandTotal } from '../../../utils/calculateGrandTotal';
import { getPaymentDue } from '../../../utils/getPaymentDue';

import arrow_right from '../../../assets/icon-arrow-right.svg';

type InvoicePreviewProps = {
	invoiceId: string;
	date: Date;
	itemList: { itemName: string; quantity: number; price: number }[];
	name: string;
	status: string;
	paymentDue: string;
};

export const InvoicePreview = ({
	invoiceId,
	date,
	itemList,
	name,
	status,
	paymentDue,
}: InvoicePreviewProps): JSX.Element => {
	const dispatch = useDispatch();

	const openViewInvoice = (): void => {
		dispatch(
			toggleViewInvoice({
				toggle: true,
				invoiceId: invoiceId,
			})
		);
	};

	const parsedPaymentDue = getPaymentDue(date, paymentDue);
	const grandTotal = calculateGrandTotal(itemList);

	return (
		<div
			onClick={() => openViewInvoice()}
			className="InvoicePreview"
			role="invoice-preview"
		>
			<div className="InvoicePreview-invoiceNumber">
				<p>#</p>
				<h4>{invoiceId}</h4>
			</div>
			<div className="InvoicePreview-date-price">
				<p>{`Due ${parsedPaymentDue[2]} ${parsedPaymentDue[1]} ${parsedPaymentDue[3]}`}</p>
				<h2>{`${'$'}${grandTotal}`}</h2>
			</div>
			<h2 className="InvoicePreview-total">{`${'$'}${grandTotal}`}</h2>
			<p className="InvoicePreview-name">{name}</p>

			<InvoiceStatus status={status} className={'InvoicePreview-status'} />
			<img className="InvoicePreview-arrow" src={arrow_right} alt="" />
		</div>
	);
};

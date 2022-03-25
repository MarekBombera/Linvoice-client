import { calculateTotalItemPrice } from '../../../utils/calculateTotalItemPrice';

type Props = {
	item: {
		itemName: string;
		quantity: number;
		price: number;
	};
};

export const ViewInvoiceItem = ({ item }: Props): JSX.Element => {
	const { itemName, quantity, price } = item;

	return (
		<div className="viewInvoiceItem">
			<h4 className="viewInvoiceItem-itemName">{itemName}</h4>
			<p className="viewInvoiceItem-quantity">
				{quantity}
				<span className="viewInvoiceItem-multiply">x</span>
			</p>
			<p className="viewInvoiceItem-price">{`${'$'} ${price}`}</p>
			<h4 className="viewInvoiceItem-total">{`${'$'} ${calculateTotalItemPrice(
				price,
				quantity
			)}`}</h4>
		</div>
	);
};

import { Field } from 'formik';
import { FormField } from '../formFieldComponents/FormField/FormField';

import { calculateTotalItemPrice } from '../../../utils/calculateTotalItemPrice';

import delete_img from '../../../assets/icon-delete.svg';

type Props = {
	index: string;
	remove: Function;
	item: {
		itemName: string;
		price: string;
		quantity: string;
	};
};

export const InvoiceItem = ({ index, remove, item }: Props): JSX.Element => {
	const { price, quantity } = item;

	return (
		<div className="invoiceItem" role="invoice-item">
			<FormField
				className={' invoiceItem-name'}
				htmlFor={`itemList[${index}].itemName`}
				labelText={'item name'}
				values={item.itemName}
			/>
			<FormField
				className={' invoiceItem-quantity'}
				htmlFor={`itemList[${index}].quantity`}
				labelText={'qty.'}
				values={item.quantity}
				numbersOnly={true}
			/>
			<FormField
				className={' invoiceItem-price'}
				htmlFor={`itemList[${index}].price`}
				labelText={'price'}
				values={item.price}
				numbersOnly={true}
			/>
			<div className="invoiceItem-total">
				<label
					htmlFor={`itemList[${index}].total`}
					className="createInvoice-fieldset-label"
				>
					Total
				</label>
				<Field
					className={'invoiceItem-total'}
					id={`itemList[${index}].total`}
					name={`itemList[${index}].total`}
					type="text"
					value={calculateTotalItemPrice(price, quantity)}
					disabled
				/>
			</div>

			<div onClick={() => remove(index)} className="invoiceItem-delete">
				<img src={delete_img} alt="delete item" />
			</div>
		</div>
	);
};

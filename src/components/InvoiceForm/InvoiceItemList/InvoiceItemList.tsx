import React from 'react';
import { FieldArray } from 'formik';
import { InvoiceItem } from '../InvoiceItem/InvoiceItem';

type ItemProps = {
	itemName: string;
	quantity: string;
	price: string;
};

export const InvoiceItemList = (): JSX.Element => {
	return (
		<div
			className="createInvoice__invoiceItemList invoiceItemList"
			role="invoice-item-list"
		>
			<div className="invoiceItemList-heading">
				<h2>item list</h2>
			</div>
			<FieldArray name="itemList">
				{(fieldArrayProps) => {
					const { push, remove, form } = fieldArrayProps;
					const { values } = form;
					const { itemList } = values;

					return (
						<>
							{itemList.map((item: ItemProps, index: string): JSX.Element => {
								let key = 0;
								key++;
								return (
									<React.Fragment key={`${key}${index}`}>
										<InvoiceItem index={index} remove={remove} item={item} />
									</React.Fragment>
								);
							})}
							<div
								onClick={() => push({ itemName: '', quantity: '', price: '' })}
								className="invoiceItemList-newItem"
							>
								<p>+ add new item</p>
							</div>
						</>
					);
				}}
			</FieldArray>
		</div>
	);
};

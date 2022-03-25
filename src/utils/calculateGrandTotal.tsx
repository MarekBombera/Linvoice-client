type Props = { quantity: number; price: number }[];

export const calculateGrandTotal = (itemList: Props): number => {
	let grandTotal = 0;
	for (let item of itemList) {
		grandTotal += item.quantity * item.price;
	}
	return grandTotal;
};

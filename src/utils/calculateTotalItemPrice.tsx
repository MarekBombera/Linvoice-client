type Price = number | string;
type Quantity = number | string;

export const calculateTotalItemPrice = (
	price: Price,
	quantity: Quantity
): string => {
	const pricePerItem = Number(price);
	const itemsQuantity = Number(quantity);
	const total = pricePerItem * itemsQuantity;
	return String(total);
};

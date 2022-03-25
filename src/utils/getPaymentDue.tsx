import { parseDate } from './parseDate';

const calculatePaymentDue = (date: Date, days: string): any => {
	const result = new Date(date);
	const getNumberOfDaysAdded = days.split(' ');
	const convertDaysAddedToNumber = Number(getNumberOfDaysAdded[0]);
	result.setDate(result.getDate() + convertDaysAddedToNumber);

	return result;
};

export const getPaymentDue = (date: Date, paymentDue: string): string[] => {
	const result = calculatePaymentDue(date, paymentDue);
	const parseResult = parseDate(result);
	return parseResult;
};

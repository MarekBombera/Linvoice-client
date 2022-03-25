export const parseDate = (date: string): string[] => {
	const dateToString = String(date);
	const dateSplit = dateToString.split(' ');

	return dateSplit;
};

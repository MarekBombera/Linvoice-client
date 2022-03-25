import { parseDate } from './parseDate';

//Format example - "18 Mar 2022"
export const handleDateFormatting = (date: string) => {
	const parsedDate = parseDate(date);
	const pickedValues = `${parsedDate[2]} ${parsedDate[1]} ${parsedDate[3]}`;
	return pickedValues;
};

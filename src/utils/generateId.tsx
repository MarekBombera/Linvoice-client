export const generateId = (): string => {
	let id = '';
	const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const possibleNumber = '1234567890';

	for (let i = 0; i < 2; i++)
		id += possibleLetters.charAt(
			Math.floor(Math.random() * possibleLetters.length)
		);

	for (let i = 0; i < 4; i++)
		id += possibleNumber.charAt(
			Math.floor(Math.random() * possibleNumber.length)
		);

	return id;
};

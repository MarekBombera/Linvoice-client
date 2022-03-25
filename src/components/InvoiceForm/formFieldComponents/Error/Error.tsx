type Props = {
	message: string;
};

export const Error = ({ message }: Props): JSX.Element => {
	return <p className="input-error">{message}</p>;
};

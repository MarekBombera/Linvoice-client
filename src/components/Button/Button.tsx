type Props = {
	className: string;
	onClick?: Function | undefined;
	text: string;
	type?: 'button' | 'submit' | 'reset' | undefined;
};

export const Button = ({
	className,
	onClick,
	text,
	type,
}: Props): JSX.Element => {
	return (
		<button
			className={className}
			onClick={onClick ? () => onClick() : undefined}
			type={type ? type : undefined}
		>
			{text}
		</button>
	);
};

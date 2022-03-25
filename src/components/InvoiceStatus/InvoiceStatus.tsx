type Props = {
	className?: string;
	status: string | undefined;
};

export const InvoiceStatus = ({ status, className }: Props): JSX.Element => {
	const assignClassName = (className: string | undefined): string => {
		if (className === undefined) {
			return '';
		}
		return className;
	};

	return (
		<div
			className={`InvoiceStatus InvoiceStatus-bg--${status} ${assignClassName(
				className
			)}`}
			role="invoice-status"
		>
			<div className={`InvoiceStatus-dot InvoiceStatus-dot--${status}`}></div>
			<h5 className={`InvoiceStatus-text InvoiceStatus-text--${status}`}>
				{status}
			</h5>
		</div>
	);
};

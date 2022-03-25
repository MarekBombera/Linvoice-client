type Props = {
	divClassName?: string;
	p?: string;
	h4?: string;
	multipleP?: string[];
};

type Text = string | undefined;
type TextOutput = JSX.Element | null;

export const ViewInvoiceField = ({
	divClassName,
	p,
	h4,
	multipleP,
}: Props): JSX.Element => {
	const renderMultipleP = (multipleP: string[] | undefined) => {
		if (multipleP === undefined) {
			return;
		}
		return multipleP.map((p: string): TextOutput => {
			return <p className="ViewInvoice-tag">{p}</p>;
		});
	};

	const renderP = (p: Text): TextOutput => {
		return p !== undefined ? <p className="ViewInvoice-tag">{p}</p> : null;
	};

	const renderH4 = (h4: Text): TextOutput => {
		return h4 !== undefined ? <h4>{h4}</h4> : null;
	};

	return (
		<div className={`ViewInvoice__${divClassName}`}>
			{renderP(p)}
			{renderH4(h4)}
			{renderMultipleP(multipleP)}
		</div>
	);
};

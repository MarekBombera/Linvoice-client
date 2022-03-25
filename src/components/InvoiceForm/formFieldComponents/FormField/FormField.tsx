import { Field, ErrorMessage, useFormikContext } from 'formik';
import { Error } from '../Error/Error';

type Props = {
	className: string;
	htmlFor: string;
	labelText: string;
	values: string;
	numbersOnly?: boolean;
};

export const FormField = ({
	className,
	htmlFor,
	labelText,
	values,
	numbersOnly,
}: Props): JSX.Element => {
	const { handleChange } = useFormikContext();

	return (
		<div className={`createInvoice__${className}`}>
			<label htmlFor={htmlFor} className="createInvoice-fieldset-label">
				{labelText}
			</label>
			<Field
				id={htmlFor}
				name={htmlFor}
				type={numbersOnly ? 'number' : 'text'}
				value={values}
				onChange={handleChange}
				autoComplete="off"
			/>
			<ErrorMessage
				name={htmlFor}
				component={() => <Error message="Required" />}
			/>
		</div>
	);
};

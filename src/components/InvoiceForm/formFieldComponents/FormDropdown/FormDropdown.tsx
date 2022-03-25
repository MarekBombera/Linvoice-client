import { Field, ErrorMessage, useFormikContext } from 'formik';
import { Error } from '../Error/Error';

type Props = {
	className: string;
	htmlFor: string;
	labelText: string;
	values: {}[];
};

export const FormDropdown = ({
	htmlFor,
	labelText,
	className,
	values,
}: Props): JSX.Element => {
	const { handleChange } = useFormikContext();

	return (
		<div className={`createInvoice__${className}`}>
			<label htmlFor={htmlFor} className="createInvoice-fieldset-label">
				{labelText}
			</label>
			<Field as="select" id={htmlFor} name={htmlFor} onChange={handleChange}>
				{values.map((value: any): JSX.Element => {
					return (
						<option key={value.value} value={value.value}>
							{value.key}
						</option>
					);
				})}
			</Field>
			<ErrorMessage
				name={htmlFor}
				component={() => <Error message="Required" />}
			/>
		</div>
	);
};

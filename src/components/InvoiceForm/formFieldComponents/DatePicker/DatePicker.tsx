import { Field, ErrorMessage, useFormikContext } from 'formik';
import DatePickerField from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Error } from '../Error/Error';

type Props = {
	className: string;
	htmlFor: string;
	labelText: string;
	values: Date;
};

export const DatePicker = ({
	htmlFor,
	labelText,
	values,
	className,
}: Props): JSX.Element => {
	const { setFieldValue } = useFormikContext();

	return (
		<div className={`createInvoice__${className}`}>
			<label htmlFor={htmlFor} className="createInvoice-fieldset-label">
				{labelText}
			</label>
			<Field name={htmlFor}>
				{() => {
					return (
						<DatePickerField
							dateFormat={'dd/MM/yyyy'}
							id={htmlFor}
							selected={values}
							onChange={(val) => setFieldValue(htmlFor, val)}
							autoComplete="off"
						></DatePickerField>
					);
				}}
			</Field>
			<ErrorMessage
				name={htmlFor}
				component={() => <Error message="Date cannot be in the past" />}
			/>
		</div>
	);
};

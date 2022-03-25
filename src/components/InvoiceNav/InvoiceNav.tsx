import { useDispatch } from 'react-redux';

import arrow_left_img from '../../assets/icon-arrow-left.svg';

type Props = {
	className?: string;
	action: {
		type: string;
		payload: any;
	};
	optionalAction?: {
		type: string;
		payload: any;
	};
};

export const InvoiceNav = ({
	action,
	optionalAction,
	className,
}: Props): JSX.Element => {
	const dispatch = useDispatch();

	const goBack = (): void => {
		dispatch(action);
	};

	const doSecondOptionalAction = (): void => {
		if (optionalAction === undefined) {
			return;
		}
		dispatch(optionalAction);
	};

	return (
		<nav
			onClick={() => [goBack(), doSecondOptionalAction()]}
			className={`invoice__mobile-nav ${className ? className : ''}`}
			style={{ display: `${className}` }}
		>
			<img src={arrow_left_img} alt="go back" />
			<p>Go back</p>
		</nav>
	);
};

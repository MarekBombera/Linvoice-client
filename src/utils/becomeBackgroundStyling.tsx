export const becomeBackgroundStyling = (
	componentToggle1: boolean,
	componentToggle2: boolean,
	selectedComponent: any
): any => {
	if (selectedComponent === 'overview') {
		return overviewStyle(componentToggle1, componentToggle2);
	}
	if (selectedComponent === 'viewInvoice') {
		return viewInvoiceStyle(componentToggle1, componentToggle2);
	}
};

const overviewStyle = (
	componentToggle1: boolean,
	componentToggle2: boolean
) => {
	if (componentToggle1 && !componentToggle2) {
		return {
			zIndex: '-1',
			position: 'fixed',
			marginRight: '0',
			marginTop: '8.75rem',
			top: '22.2%',
			left: '51.2%',
			transform: 'translate(-50%, -50%)',
		};
	}
	return {
		zIndex: '0',
		position: 'relative',
	};
};

const viewInvoiceStyle = (
	componentToggle1: boolean,
	componentToggle2: boolean
) => {
	if (componentToggle1 && !componentToggle2) {
		return {
			zIndex: '-1',
			position: 'fixed',
			marginRight: '1rem',
		};
	}
	return {
		zIndex: '0',
		position: 'relative',
	};
};

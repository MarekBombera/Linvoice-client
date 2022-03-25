import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../../../../reducers/';

import { InvoicePreview } from '../InvoicePreview';
import { ViewInvoice } from '../../../ViewInvoice/ViewInvoice';

const props = {
	invoiceId: '',
	date: new Date(),
	itemList: [],
	name: '',
	status: '',
	paymentDue: '',
};

beforeEach(() => {
	render(
		<Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
			<InvoicePreview {...props} />
		</Provider>
	);
});

const renderOption = (component: JSX.Element) => {
	render(
		<Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
			{component}
		</Provider>
	);
};

describe('<InvoicePreview />', () => {
	test('should render <InvoicePreview /> ', () => {
		expect(screen.getByRole('invoice-preview')).toBeInTheDocument;
	});

	test('should render <ViewInvoice on <InvoicePreview/> Click /> ', () => {
		renderOption(<ViewInvoice />);
		userEvent.click(screen.getByRole('invoice-preview'));
		expect(screen.getByRole('view-invoice')).toBeInTheDocument;
		expect(screen.getByRole('invoice-preview')).not.toBeInTheDocument;
	});
});

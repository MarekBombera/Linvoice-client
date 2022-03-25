import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../../../../reducers/';

import { DeleteModal } from '../DeleteModal';

const props = {
	invoiceId: '',
	deleteInvoice: () => {},
	toggleDeleteOption: () => {},
};

beforeEach(() => {
	render(
		<Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
			<DeleteModal {...props} />
		</Provider>
	);
});

describe('DeleteModal', () => {
	test('should render <DeleteModal /> ', () => {
		expect(screen.getByRole('delete-modal')).toBeInTheDocument;
	});
	test('should display Header ', () => {
		expect(screen.getByText(/confirm deletion/i)).toBeInTheDocument;
	});
	test('should display Button - Cancel ', () => {
		expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument;
	});
	test('should display Button - Delete ', () => {
		expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument;
	});
});

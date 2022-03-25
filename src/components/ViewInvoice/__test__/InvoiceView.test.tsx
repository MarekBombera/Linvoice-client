import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import {
	ReduxWrapper,
	mediaMatch,
	renderOption,
} from '../../../testUtils/testUtils';

import { ViewInvoice } from '../ViewInvoice';

mediaMatch();

beforeEach(() => {
	render(<ViewInvoice />, { wrapper: ReduxWrapper });
});

describe('ViewInvoice', () => {
	test('should render <ViewInvoice /> ', () => {
		expect(screen.getByRole('view-invoice')).toBeInTheDocument;
	});
	test('should render <InvoiceStatus /> ', () => {
		expect(screen.getByRole('invoice-status')).toBeInTheDocument;
	});
	test('should display Status - Text ', () => {
		expect(screen.getByText(/status/i)).toBeInTheDocument;
	});
	test('should display Invoice Date - Text ', () => {
		expect(screen.getByText(/Invoice Date/i)).toBeInTheDocument;
	});
	test('should display Bill To - Text ', () => {
		expect(screen.getByText(/Bill To/i)).toBeInTheDocument;
	});
	test('should display Payment Due - Text ', () => {
		expect(screen.getByText(/Payment Due/i)).toBeInTheDocument;
	});
	test('should display Sent To - Text ', () => {
		expect(screen.getByText(/Sent To/i)).toBeInTheDocument;
	});
});

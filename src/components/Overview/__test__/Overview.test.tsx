import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
	ReduxWrapper,
	mediaMatch,
	renderOption,
} from '../../../testUtils/testUtils';

import { Overview } from '../Overview';
import { CreateInvoice } from '../../CreateInvoice/CreateInvoice';

mediaMatch();

beforeEach(() => {
	render(<Overview />, { wrapper: ReduxWrapper });
});

describe('Overview', () => {
	test('should render <Overview /> ', () => {
		expect(screen.getByRole('overview')).toBeInTheDocument;
	});

	describe('New Invoice', () => {
		test('should show Button - New  ', () => {
			expect(screen.getByRole('button', { name: /new/i })).toBeInTheDocument;
		});

		test('should show Button - Plus Icon  ', () => {
			expect(screen.getByAltText(/new invoice/)).toBeInTheDocument;
		});

		test('should render <CreateInvoice/> when clicked Button - New  ', () => {
			renderOption(<CreateInvoice />);
			userEvent.click(screen.getByRole('button', { name: /new/i }));
			expect(screen.getByRole('create-invoice')).toBeInTheDocument;
			expect(screen.getByRole('overview')).not.toBeInTheDocument;
		});
	});

	describe('Filter', () => {
		test('should show Filter  ', () => {
			expect(screen.getByText(/filter/i)).toBeInTheDocument;
		});

		test('should show Filter - Expand Icon  ', () => {
			expect(screen.getByAltText(/filter expand/)).toBeInTheDocument;
		});
	});

	describe('Invoice Count', () => {
		test('should show X Invoices  ', () => {
			expect(screen.queryAllByText(/invoices/i)).toBeInTheDocument;
		});
	});

	describe('Empty Overview', () => {
		test('should show Empty Overview - IMG  ', () => {
			expect(screen.getByAltText(/empty/)).toBeInTheDocument;
		});

		test('should show Empty Overview - Heading  ', () => {
			expect(screen.getByText(/there is nothing here/i)).toBeInTheDocument;
		});

		test('should show Empty Overview - Body  ', () => {
			expect(
				screen.getByText(
					/create an invoice by clicking the button and get started/i
				)
			).toBeInTheDocument;
		});
	});
});

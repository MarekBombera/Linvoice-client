import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
	ReduxWrapper,
	mediaMatch,
	renderOption,
} from '../../../testUtils/testUtils';

import { CreateInvoice } from '../CreateInvoice';
import { Overview } from '../../Overview/Overview';

mediaMatch();

beforeEach(() => {
	render(<CreateInvoice />, { wrapper: ReduxWrapper });
});

describe('CreateInvoice', () => {
	test('should render <CreateInvoice /> ', () => {
		expect(screen.getByRole('create-invoice')).toBeInTheDocument;
	});

	test('should render <InvoiceForm /> ', () => {
		expect(screen.getByRole('invoice-form')).toBeInTheDocument;
	});

	test('should render <MobileNav/> ', () => {
		expect(screen.getByRole('navigation')).toBeInTheDocument;
	});

	test('should render <Overview/> when clicked on <MobileNav/> - GoBack ', () => {
		renderOption(<Overview />);
		userEvent.click(screen.getByRole('navigation'));
		expect(screen.getByRole('overview')).toBeInTheDocument;
		expect(screen.getByRole('create-invoice')).not.toBeInTheDocument;
	});
});

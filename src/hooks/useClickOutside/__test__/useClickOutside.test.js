import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Overview } from '../../../components/Overview/Overview';

import { ReduxWrapper, mediaMatch } from '../../../testUtils/testUtils';

mediaMatch();

beforeEach(() => {
	render(<Overview />, {
		wrapper: ReduxWrapper,
	});
});

describe('useClickOutside Hook', () => {
	test('Should close Mobile-Menu while clicking outside', () => {
		userEvent.click(screen.getByText(/new invoice/i));
		expect(screen.getByRole('create-invoice')).toBeInTheDocument;

		userEvent.click(screen.getByRole('banner'));
		expect(screen.getByRole('create-invoice')).not.toBeInTheDocument;
	});
});

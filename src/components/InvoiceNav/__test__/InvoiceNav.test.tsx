import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { InvoiceNav } from '../InvoiceNav';

import { ReduxWrapper, mediaMatch } from '../../../testUtils/testUtils';

const props = {
	action: {
		type: '',
		payload: () => {},
	},
};

mediaMatch();

beforeEach(() => {
	render(<InvoiceNav {...props} />, { wrapper: ReduxWrapper });
});

describe('InvoiceNav', () => {
	test('should render <InvoiceNav /> ', () => {
		expect(screen.getByRole('navigation')).toBeInTheDocument;
	});

	test('should render Invoice Mobile Nav - Text ', () => {
		expect(screen.getByText(/go back/i)).toBeInTheDocument;
	});

	test('should render Invoice Mobile Nav - Img ', () => {
		expect(screen.getByAltText(/go back/i)).toBeInTheDocument;
	});
});

import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

import { ReduxWrapper, mediaMatch } from '../../../testUtils/testUtils';

mediaMatch();

beforeEach(() => {
	render(<Header />, { wrapper: ReduxWrapper });
});

describe('Header', () => {
	test('should render <Header /> ', () => {
		expect(screen.getByRole('banner')).toBeInTheDocument;
	});
	test('should display Logo', () => {
		expect(screen.getByAltText(/logo/i)).toBeInTheDocument;
	});
	test('should display Dark Mode - IMG ', () => {
		expect(screen.getByAltText(/dark mode/i)).toBeInTheDocument;
	});

	test('should display User Profile Pic ', () => {
		expect(screen.getByAltText(/user image/i)).toBeInTheDocument;
	});
});

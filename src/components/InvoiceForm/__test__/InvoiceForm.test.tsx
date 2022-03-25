import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import { ReduxWrapper, mediaMatch } from '../../../testUtils/testUtils';

import { InvoiceForm } from '../InvoiceForm';
import { initialValues } from '../../CreateInvoice/initialValues';
import { Formik } from 'formik';

//Includes tests for <InvoiceItemList/> , <InvoiceItem/>

mediaMatch();

beforeEach(() => {
	render(
		<Formik
			initialValues={initialValues}
			onSubmit={jest.fn()}
			component={InvoiceForm}
		/>,
		{ wrapper: ReduxWrapper }
	);
});

describe('<InvoiceForm />', () => {
	test('should render <InvoiceForm /> ', () => {
		expect(screen.getByRole('invoice-form')).toBeInTheDocument;
	});

	test('should render <InvoiceItemList /> ', () => {
		expect(screen.getByRole('invoice-item-list')).toBeInTheDocument;
	});

	test('should display Bill From - Heading ', () => {
		expect(screen.getByText(/bill from/i)).toBeInTheDocument;
	});
	test('should display Bill To - Heading ', () => {
		expect(screen.getByText(/bill to/i)).toBeInTheDocument;
	});

	test('should display Label - Street Address 2x ', () => {
		expect(screen.queryAllByLabelText(/street address/i).length).toBe(2);
	});
	test('should display Label - City 2x ', () => {
		expect(screen.queryAllByLabelText(/City/i).length).toBe(2);
	});
	test('should display Label - Post Code 2x ', () => {
		expect(screen.queryAllByLabelText(/Post Code/i).length).toBe(2);
	});
	test('should display Label - Country 2x ', () => {
		expect(screen.queryAllByLabelText(/Country/i).length).toBe(2);
	});
	test('should display Label - Clients Name ', () => {
		expect(screen.getByLabelText(/client's name/i)).toBeInTheDocument;
	});
	test('should display Label - Clients Email ', () => {
		expect(screen.getByLabelText(/client's email/i)).toBeInTheDocument;
	});
	test('should display Label - Invoice Date ', () => {
		expect(screen.getByLabelText(/invoice date/i)).toBeInTheDocument;
	});
	test('should display Label - Payment Terms ', () => {
		expect(screen.getByLabelText(/Payment Terms/i)).toBeInTheDocument;
	});
	test('should display Label - Project Description ', () => {
		expect(screen.getByLabelText(/Project Description/i)).toBeInTheDocument;
	});

	describe('Dropdown options', () => {
		test('should render Dropdown - Select an option', () => {
			expect(screen.getByText(/Select an option/i)).toBeInTheDocument;
		});
		test('should render Dropdown - 1 day', () => {
			expect(screen.getByText(/1 day/i)).toBeInTheDocument;
		});
		test('should render Dropdown - 7 days', () => {
			expect(screen.getByText(/7 days/i)).toBeInTheDocument;
		});
		test('should render Dropdown - 14 days', () => {
			expect(screen.getByText(/14 days/i)).toBeInTheDocument;
		});
		test('should render Dropdown - 30 days', () => {
			expect(screen.getByText(/30 days/i)).toBeInTheDocument;
		});
	});

	describe('Input typing functionality', () => {
		test('should be able to type into Input - Clients Name ', () => {
			userEvent.type(screen.getByLabelText(/client's name/i), 'Hello World');
			expect(screen.getByLabelText(/client's name/i)).toHaveValue(
				'Hello World'
			);
		});
		test('should be able to type into Input - Clients Email ', () => {
			userEvent.type(screen.getByLabelText(/client's email/i), 'Hello World');
			expect(screen.getByLabelText(/client's email/i)).toHaveValue(
				'Hello World'
			);
		});
		test('should be able to type into Input - Project Description ', () => {
			userEvent.type(
				screen.getByLabelText(/Project Description/i),
				'Hello World'
			);
			expect(screen.getByLabelText(/Project Description/i)).toHaveValue(
				'Hello World'
			);
		});
	});
});

describe('<InvoiceItem', () => {
	test('should render <InvoiceItem /> ', () => {
		expect(screen.getByRole('invoice-item')).toBeInTheDocument;
	});

	test('should display Label - Item Name ', () => {
		expect(screen.getByLabelText(/Item Name/i)).toBeInTheDocument;
	});

	test('should display Label - Qty ', () => {
		expect(screen.getByLabelText(/Qty/i)).toBeInTheDocument;
	});

	test('should display Label - Price ', () => {
		expect(screen.getByLabelText(/Price/i)).toBeInTheDocument;
	});

	test('should display Label - Total ', () => {
		expect(screen.getByLabelText(/Total/i)).toBeInTheDocument;
	});

	test('should display Delete Item - IMG ', () => {
		expect(screen.getByAltText(/delete item/i)).toBeInTheDocument;
	});

	test('should delete <InvoiceItem/> when clicked on Delete Item - IMG ', () => {
		expect(screen.getByRole('invoice-item')).toBeInTheDocument;
		userEvent.click(screen.getByAltText(/delete item/i));
		expect(screen.queryByRole('invoice-item')).not.toBeInTheDocument();
	});

	test('should add new <InvoiceItem/> when clicked on + Add New Item ', () => {
		userEvent.click(screen.getByText(/Add New Item/i));
		expect(screen.queryAllByRole('invoice-item').length).toBe(2);
	});

	describe('Input typing functionality', () => {
		test('should be able to type into Input - Item Name ', () => {
			userEvent.type(screen.getByLabelText(/item name/i), 'Hello World');
			expect(screen.getByLabelText(/item name/i)).toHaveValue('Hello World');
		});
		test('should not be able to take string Input - Quantity', () => {
			userEvent.type(screen.getByLabelText(/qty/i), 'Hello World');
			expect(screen.getByLabelText(/qty/i)).toHaveValue(null);
		});
		test('should not be able to take string Input - Price ', () => {
			userEvent.type(screen.getByLabelText(/price/i), 'Hello World');
			expect(screen.getByLabelText(/price/i)).toHaveValue(null);
		});
	});

	test('Total price should be correct amount ', () => {
		userEvent.type(screen.getByLabelText(/price/i), '200');
		userEvent.type(screen.getByLabelText(/qty/i), '2');
		expect(screen.getByLabelText(/total/i)).toHaveValue('400');
	});
});

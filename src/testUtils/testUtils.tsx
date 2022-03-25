import { render } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

export const ReduxWrapper = ({ children }: any) => {
	return (
		<Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
			{children}
		</Provider>
	);
};

export const renderOption = (component: JSX.Element) => {
	render(component, { wrapper: ReduxWrapper });
};

export const mediaMatch = () => {
	window.matchMedia =
		window.matchMedia ||
		function () {
			return {
				matches: true,
				media: '(max-width: 767px)',
				onchange: null,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			};
		};
};

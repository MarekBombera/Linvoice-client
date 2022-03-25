import { combineReducers } from 'redux';
import { toggleCreateInvoiceReducer } from './toggleCreateInvoiceReducer';
import { viewInvoiceReducer } from './viewInvoiceReducer';
import { editInvoiceReducer } from './editInvoiceReducer';
import { googleAuthReducer } from './googleAuthReducer';
import { fetchedInvoicesReducer } from './fetchedInvoicesReducer';
import { filterInvoicesReducer } from './filterInvoicesReducer';

export const rootReducer = combineReducers({
	toggleCreateInvoiceReducer,
	viewInvoiceReducer,
	editInvoiceReducer,
	googleAuthReducer,
	fetchedInvoicesReducer,
	filterInvoicesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

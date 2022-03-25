import { useSelector } from 'react-redux';
import { RootState } from '../reducers/';

import { CreateInvoice } from './CreateInvoice/CreateInvoice';
import { ViewInvoice } from './ViewInvoice/ViewInvoice';
import { EditInvoice } from './EditInvoice/EditInvoice';
import { LoginWindow } from './LoginWindow/LoginWindow';
import { Overview } from './Overview/Overview';
import { Header } from './Header/Header';

import '../styles/css/main.css';

export const App = (): JSX.Element => {
	const {
		toggleCreateInvoiceReducer,
		viewInvoiceReducer,
		editInvoiceReducer,
		googleAuthReducer,
	} = useSelector((state: RootState) => state);

	const renderGoogleLogin = (): JSX.Element | null => {
		if (!googleAuthReducer.isSignedIn) {
			return <LoginWindow />;
		}
		return null;
	};

	const renderComponents = (): JSX.Element | JSX.Element[] => {
		if (toggleCreateInvoiceReducer) {
			return [<CreateInvoice />, <Overview />];
		} else if (editInvoiceReducer.toggle) {
			return [<EditInvoice />, <ViewInvoice />];
		} else if (viewInvoiceReducer.toggle) {
			return <ViewInvoice />;
		}
		return <Overview />;
	};

	const addOverlay = (): JSX.Element | null => {
		if (toggleCreateInvoiceReducer || editInvoiceReducer.toggle) {
			return <div className="window-overlay"></div>;
		}
		return null;
	};

	return (
		<div className="App">
			{renderGoogleLogin()}
			<Header />
			{renderComponents()}
			{addOverlay()}
		</div>
	);
};

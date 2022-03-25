import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/';

import { signOut, fetchedInvoices, toggleViewInvoice } from '../../actions';

import logo from '../../assets/logo.svg';

export const Header = (): JSX.Element => {
	const { googleAuthReducer } = useSelector((state: RootState) => state);
	const { userImg } = googleAuthReducer;

	const dispatch = useDispatch();
	const signOutButtonRef = useRef<HTMLDivElement>(null);

	const closeViewInvoice = () => {
		dispatch(
			toggleViewInvoice({
				toggle: false,
				invoiceId: '',
			})
		);
	};

	const handleSignOut = () => {
		window.gapi.auth2.getAuthInstance().signOut();
		dispatch(fetchedInvoices([]));

		dispatch(
			signOut({
				isSignedIn: false,
				userId: '',
				userImg: '',
			})
		);
		showSignOut();
		closeViewInvoice();
	};

	const showSignOut = () => {
		signOutButtonRef.current?.classList.toggle('header__user-signOut--active');
	};

	const displayUserProfilePic = (): JSX.Element | null => {
		if (userImg === undefined || userImg === '') {
			return null;
		}
		return <img className="header__user-pic" src={userImg} alt="" />;
	};

	return (
		<header className="header">
			<div className="header__logo-wrapper">
				<img src={logo} alt="logo" />
				<div className="header__logo-decoration"></div>
			</div>

			<div className="header__user">
				<div className="header__user-signOut" ref={signOutButtonRef}>
					<button type="button" onClick={() => handleSignOut()}>
						SIGN OUT
					</button>
				</div>
				<div className="header__user-profilePic" onClick={() => showSignOut()}>
					{displayUserProfilePic()}
				</div>
			</div>
		</header>
	);
};

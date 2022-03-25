import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../actions';

export const GoogleLogin = (): JSX.Element => {
	const dispatch = useDispatch();

	const onSuccess = (googleUser: any): void => {
		const userBasicInfo = googleUser.getBasicProfile();

		dispatch(
			signIn({
				isSignedIn: true,
				userId: userBasicInfo.getId(),
				userImg: userBasicInfo.getImageUrl(),
			})
		);
	};

	const onFailure = (error: {}): void => {
		console.log(error);

		dispatch(
			signIn({
				isSignedIn: false,
				userId: '',
				userImg: '',
			})
		);
	};

	//SetTimeout is there because sometimes in Chrome the button doesn't render at all without it.
	//Firefox or Edge doesn't have this issue
	const renderButton = (): any => {
		setTimeout(() => {
			gapi.signin2.render('my-signin2', {
				scope: 'profile email',
				width: 250,
				height: 50,
				longtitle: true,
				theme: 'dark',
				onsuccess: onSuccess,
				onfailure: onFailure,
			});
		}, 100);
	};

	useEffect(() => {
		document
			.querySelector('meta[name="google-signin-client_id"]')!
			.setAttribute('content', `${process.env.REACT_APP_CLIENT}`);
	}, []);

	return (
		<>
			<div id="my-signin2">{renderButton()}</div>
		</>
	);
};

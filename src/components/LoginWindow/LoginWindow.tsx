import { GoogleLogin } from './GoogleLogin/GoogleLogin';

import login_background from '../../assets/login-background.svg';

export const LoginWindow = (): JSX.Element => {
	return (
		<>
			<div className="modal-overlay modal-overlay-login"></div>
			<div className="LoginWindow">
				<div className="LoginWindow__background">
					<img src={login_background} alt="" />
				</div>
				<div className="LoginWindow__login">
					<GoogleLogin />
				</div>
			</div>
		</>
	);
};

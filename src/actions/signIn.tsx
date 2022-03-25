import { SIGN_IN } from './types';

export interface SignIn {
	type: string;
	payload: {};
}

type SingInProps = {
	isSignedIn: boolean;
	userId: string;
	userImg: string;
};

export const signIn = (signIn: SingInProps): SignIn => {
	return {
		type: SIGN_IN,
		payload: signIn,
	};
};

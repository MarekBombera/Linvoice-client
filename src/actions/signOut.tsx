import { SIGN_OUT } from './types';

export interface SignOut {
	type: string;
	payload: {};
}

type SingOutProps = {
	isSignedIn: boolean;
	userId: string;
	userImg: string;
};

export const signOut = (signOut: SingOutProps): SignOut => {
	return {
		type: SIGN_OUT,
		payload: signOut,
	};
};

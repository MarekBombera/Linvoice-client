import { SignIn } from '../actions';
import { SIGN_IN, SIGN_OUT } from '../actions/types';

export const googleAuthReducer = (
	state: any = { isSignedIn: false, userId: '', userImg: '' },
	action: SignIn
) => {
	switch (action.type) {
		case SIGN_IN:
			return action.payload;
		case SIGN_OUT:
			return action.payload;
		default:
			return state;
	}
};

import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

type actionType = {
	type: string;
	payload?: any;
};

const initialState = {
	isAuthenticated: false,
	user: null,
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
			};
		case LOGIN_FAIL:
			return {
				...state,
				...action.payload,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};

export default AuthReducer;

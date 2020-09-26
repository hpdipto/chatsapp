import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADING,
	LOGOUT_SUCCESS,
} from "../actions/types";

type actionType = {
	type: string;
	payload?: any;
};

const initialState = {
	isLoading: false,
	isAuthenticated: false,
	// user: null,
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				// user: action.payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case LOGIN_FAIL:
			return {
				...state,
				...action.payload,
				isAuthenticated: false,
				isLoading: false,
			};
		case USER_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};

export default AuthReducer;

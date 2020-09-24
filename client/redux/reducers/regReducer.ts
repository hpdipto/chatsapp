import { RESIGTSER_SUCCESS, REGISTER_SUCCESS_SHOWN } from "../actions/types";

type actionType = {
	type: string;
	payload?: any;
};

const initialState = {
	registerSuccess: false,
};

const regSuccessReducer = (state = initialState, action) => {
	switch (action.type) {
		case RESIGTSER_SUCCESS:
			return {
				...state,
				registerSuccess: true,
			};
		case REGISTER_SUCCESS_SHOWN:
			return {
				...state,
				registerSuccess: false,
			};
		default:
			return {
				...state,
			};
	}
};

export default regSuccessReducer;

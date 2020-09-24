import { RESIGTSER_SUCCESS, CLOSE_FLASH_MESSAGE } from "../actions/types";

type actionType = {
	type: string;
	payload?: any;
};

const initialState = {
	registerSuccess: false,
	closeFlashMessage: true,
};

const regSuccessReducer = (state = initialState, action) => {
	switch (action.type) {
		case RESIGTSER_SUCCESS:
			return {
				...state,
				registerSuccess: true,
				closeFlashMessage: false,
			};
		case CLOSE_FLASH_MESSAGE: {
			return {
				...state,
				closeFlashMessage: true,
			};
		}
		default:
			return {
				...state,
			};
	}
};

export default regSuccessReducer;

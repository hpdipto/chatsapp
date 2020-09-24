import axios from "axios";

import {
	RESIGTSER_SUCCESS,
	REGISTER_USER,
	REGISTER_FAIL,
	LOGIN_USER,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	USER_LOADING,
	CLOSE_FLASH_MESSAGE,
} from "./types";

export const LoginAction = (loginData) => (dispatch) => {
	// this one line takes many of my time :(
	dispatch({ type: USER_LOADING });

	axios
		.post("http://localhost:5000/authenticate", loginData)
		.then((res) => {
			// if login failed, object will have "message" property
			if (!res.data.hasOwnProperty("message")) {
				return dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data,
				});
			} else {
				return dispatch({
					type: LOGIN_FAIL,
					payload: res.data,
				});
			}
		})
		.catch((err) =>
			dispatch({
				type: LOGIN_FAIL,
			})
		);
};

export const RegistrationSuccess = () => (dispatch) => {
	dispatch({ type: RESIGTSER_SUCCESS });
};

export const RegistrationSuccessClose = () => (dispatch) => {
	dispatch({ type: CLOSE_FLASH_MESSAGE });
};

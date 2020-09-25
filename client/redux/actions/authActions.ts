import axios from "axios";

import {
	RESIGTSER_SUCCESS,
	REGISTER_USER,
	REGISTER_FAIL,
	REGISTER_SUCCESS_SHOWN,
	LOGIN_USER,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	USER_LOADING,
} from "./types";

export const LoginAction = (loginData) => (dispatch) => {
	// missing this one line takes many of my time :(
	dispatch({ type: USER_LOADING });

	axios
		.post("http://localhost:5000/authenticate", loginData, {
			withCredentials: true,
		})
		.then((res) => {
			// if login failed, object will have "message" property
			if (!res.data.hasOwnProperty("message")) {
				return dispatch({
					type: LOGIN_SUCCESS,
					// payload: res.data,
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

export const RegisterSuccessShown = () => (dispatch) => {
	dispatch({ type: REGISTER_SUCCESS_SHOWN });
};

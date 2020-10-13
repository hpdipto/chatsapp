import axios from "axios";

import {
	RESIGTSER_SUCCESS,
	REGISTER_USER,
	REGISTER_FAIL,
	REGISTER_SUCCESS_SHOWN,
	LOGIN_USER,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	FORCE_AUTHENTICATION,
	USER_LOADED,
	USER_LOADING,
} from "./types";

import { SERVER } from "../../server";

export const LoginAction = (loginData) => (dispatch) => {
	// missing this one line takes many of my time :(
	dispatch({ type: USER_LOADING });

	axios
		.post(`${SERVER}/login`, loginData, {
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

export const LogoutAction = () => (dispatch) => {
	dispatch({ type: USER_LOADING });

	axios
		.get(`${SERVER}/logout`, { withCredentials: true })
		.then((res) => {
			return dispatch({
				type: LOGOUT_SUCCESS,
			});
		})
		.catch((err) => {
			return dispatch({
				type: LOGOUT_FAIL,
			});
		});
};

export const ForceAuthentication = () => (dispatch) => {
	return dispatch({
		type: FORCE_AUTHENTICATION,
	});
};

export const RegistrationSuccess = () => (dispatch) => {
	dispatch({ type: RESIGTSER_SUCCESS });
};

export const RegisterSuccessShown = () => (dispatch) => {
	dispatch({ type: REGISTER_SUCCESS_SHOWN });
};

import axios from "axios";

import {
	REGISTER_USER,
	REGISTER_FAIL,
	LOGIN_USER,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
} from "./types";

export const LoginAction = (loginData) => (dispatch) => {
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

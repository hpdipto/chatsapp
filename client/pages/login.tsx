import * as React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Provider, useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import { SuccessMessages, ErrorMessages } from "../components/FlashMessages";

import { LoginQuery } from "../queries/login";

import store from "../redux/store";
import {
	LoginAction,
	RegisterSuccessShown,
} from "../redux/actions/authActions";

const Login: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [errorMessages, setErrorMessages] = React.useState([]);
	const [
		errorMessagesForRendering,
		setErrorMessagesForRendering,
	] = React.useState([]);
	const [successMessages, setSuccessMessages] = React.useState([]);
	const [refresh, setRefresh] = React.useState(false);
	const { isAuthenticated, isLoading, message } = useSelector(
		(state) => state.auth
	);
	const { registerSuccess } = useSelector((state) => state.regSuccess);

	React.useEffect(() => {
		if (isAuthenticated) {
			router.push("/");
		}

		if (registerSuccess) {
			setSuccessMessages((msg) => [
				...msg,
				"Registration successfully completed. Please Login to continue.",
			]);
			RegisterSuccessShown();
		}

		// error messages if something goes wrong in server side
		if (message) {
			setErrorMessages((msg) => [message]);
		}
	}, [isAuthenticated, isLoading]);

	const validate = (values: any) => {
		if (!values.emailOrUserName) {
			setErrorMessages((em) => [...em, "Please provide an email or username"]);
		}
		if (!values.password) {
			setErrorMessages((em) => [...em, "Please provide a password"]);
		}
	};

	const formik = useFormik({
		initialValues: {
			emailOrUserName: "",
			password: "",
		},
		validate,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			let loginUser = {
				...values,
			};

			// if no error messages then submit the form
			if (errorMessages.length === 0) {
				dispatch(LoginAction(loginUser));
			} else {
				// putting errorMessages to errorMessagesForRendering
				setErrorMessagesForRendering(() => [...errorMessages]);
				// then make errorMessages empty so that it will collect
				// information for new submit
				setErrorMessages(() => []);
			}
		},
	});

	return (
		<div>
			<Navbar />
			{successMessages.length ? (
				<SuccessMessages
					messages={["Registration Success. Please Login to continue."]}
					setMessages={setSuccessMessages}
				/>
			) : null}
			{errorMessagesForRendering.length ? (
				<ErrorMessages
					messages={errorMessagesForRendering}
					setMessages={setErrorMessagesForRendering}
				/>
			) : null}
			<div className="container mt-3 col-sm-8">
				<form onSubmit={formik.handleSubmit}>
					<div className="form-group row">
						<label htmlFor="emailOrUsername" className="col-sm-3">
							Email or Username
						</label>
						<input
							type="text"
							id="emailOrUserName"
							value={formik.values.emailOrUserName}
							onChange={formik.handleChange}
							className="form-control col-sm-9 mb-3"
						/>
						<label htmlFor="password" className="col-sm-3">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							className="form-control col-sm-9 mb-3"
						/>
						<label htmlFor="empty" className="col-sm-3"></label>
						<input
							type="submit"
							className="form-control btn btn-primary col-sm-9 mb-2"
							value="Login"
						/>
						<label htmlFor="empty" className="col-sm-3"></label>
						<p className="col-sm-9">
							Don't have an account?
							<a href="/register" className="btn btn-link">
								Register
							</a>
							here.
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

import * as React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import { SuccessMessage, ErrorMessage } from "../components/FlashMessages";

import store from "../redux/store";
import {
	LoginAction,
	RegisterSuccessShown,
} from "../redux/actions/authActions";

const Login: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [successMessages, setSuccessMessages] = React.useState("");
	const [serverError, setServerError] = React.useState(null);
	const { isAuthenticated, isLoading, message } = useSelector(
		(state) => state.auth
	);
	const { registerSuccess } = useSelector((state) => state.regSuccess);

	React.useEffect(() => {
		if (isAuthenticated) {
			router.push("/");
		}

		if (registerSuccess) {
			setSuccessMessages(
				() => "Registration successfully completed. Please Login to continue."
			);
			RegisterSuccessShown();
		}

		if (message) {
			setServerError(message);
		}
	}, [isAuthenticated, isLoading]);

	const validate = (values: any) => {
		const errors: any = {};

		if (!values.emailOrUserName) {
			errors.emailOrUserName = "Please provide an email or username";
		}
		if (!values.password) {
			errors.password = "Please provide a password";
		}

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			emailOrUserName: "",
			password: "",
		},
		validate,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (values) => {
			let loginUser = {
				...values,
			};
			// clearing server error so that it can hold new server side error
			setServerError(() => "");

			dispatch(LoginAction(loginUser));
		},
	});

	return (
		<div>
			<Navbar user={undefined} />

			<div className="container mt-3 col-sm-8">
				<form onSubmit={formik.handleSubmit}>
					<div className="form-group row">
						{successMessages.length ? (
							<SuccessMessage message={successMessages} />
						) : null}

						{serverError ? <ErrorMessage message={serverError} /> : null}
						{formik.errors.emailOrUserName ? (
							<ErrorMessage message={formik.errors.emailOrUserName} />
						) : null}
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

						{formik.errors.password ? (
							<ErrorMessage message={formik.errors.password} />
						) : null}
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

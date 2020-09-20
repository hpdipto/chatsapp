import * as React from "react";
import { useMutation } from "@apollo/client";

import { LoginQuery } from "../queries/login";

const Login: React.FC = () => {
	const [emailOrUserName, setEmailOrUserName] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [login, { loading, data }] = useMutation(LoginQuery, {
		onCompleted: (data) => console.log(data),
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ variables: { emailOrUserName, password } });
	};

	return (
		<div className="container mt-3 col-sm-8">
			<form onSubmit={handleSubmit}>
				<div className="form-group row">
					<label htmlFor="emailOrUsername" className="col-sm-3">
						Email or Username
					</label>
					<input
						type="text"
						onChange={(e) => setEmailOrUserName(e.target.value)}
						className="form-control col-sm-9 mb-3"
					/>
					<label htmlFor="password" className="col-sm-3">
						Password
					</label>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
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
						<a href="" className="btn btn-link">
							Register
						</a>
						here.
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;

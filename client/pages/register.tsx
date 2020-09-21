import * as React from "react";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";

const Register: React.FC = () => {
	const [errorMessages, setErrorMessages] = React.useState([]);

	const validate = (values: any) => {
		if (!values.firstName) {
			setErrorMessages((em) => [...em, "Please enter First Name"]);
		}
		if (!values.lastName) {
			setErrorMessages((em) => [...em, "Please enter Last Name"]);
		}
		if (!values.username) {
			setErrorMessages((em) => [...em, "Please enter Username"]);
		}
		if (!values.email) {
			setErrorMessages((em) => [...em, "Please enter Email"]);
		}
		if (!values.password) {
			setErrorMessages((em) => [...em, "Please enter Password"]);
		}
		if (!values.password2) {
			setErrorMessages((em) => [...em, "Please enter Password again"]);
		}
		if (values.password.length < 6 || values.password2.length < 6) {
			setErrorMessages((em) => [
				...em,
				"Password should contains at least 6 characters",
			]);
		}
		if (values.password !== values.password2) {
			setErrorMessages((em) => [...em, "Password should be matched"]);
		}
	};

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			password2: "",
			gender: "",
			dob: "",
		},
		validate,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (values) => {
			let newUser = {
				...values,
			};

			if (errorMessages.length > 0) {
				console.log(errorMessages);
				setErrorMessages((em) => []);
			}
			console.log(newUser);
		},
	});

	return (
		<div className="container mt-3 col-sm-8">
			<form onSubmit={formik.handleSubmit}>
				<div className="form-group row">
					<label htmlFor="firstName" className="col-sm-3">
						First Name
					</label>
					<input
						type="text"
						className="form-control col-sm-9 mb-3"
						id="firstName"
						value={formik.values.firstName}
						onChange={formik.handleChange}
					/>

					<label htmlFor="lastName" className="col-sm-3">
						Last Name
					</label>
					<input
						type="text"
						className="form-control col-sm-9 mb-3"
						id="lastName"
						value={formik.values.lastName}
						onChange={formik.handleChange}
					/>

					<label htmlFor="username" className="col-sm-3">
						Username
					</label>
					<input
						type="text"
						className="form-control col-sm-9 mb-3"
						id="username"
						value={formik.values.username}
						onChange={formik.handleChange}
					/>

					<label htmlFor="email" className="col-sm-3">
						Email
					</label>
					<input
						type="email"
						className="form-control col-sm-9 mb-3"
						id="email"
						value={formik.values.email}
						onChange={formik.handleChange}
					/>

					<label htmlFor="password" className="col-sm-3">
						Password
					</label>
					<input
						type="password"
						className="form-control col-sm-9 mb-3"
						id="password"
						value={formik.values.password}
						onChange={formik.handleChange}
					/>

					<label htmlFor="password2" className="col-sm-3">
						Password Again
					</label>
					<input
						type="password"
						className="form-control col-sm-9 mb-3"
						id="password2"
						value={formik.values.password2}
						onChange={formik.handleChange}
					/>

					<label htmlFor="gender" className="col-sm-3">
						Gender
					</label>
					<select
						name="gender"
						className="form-control col-sm-9 mb-3"
						id="gender"
						value={formik.values.gender}
						onChange={formik.handleChange}
					>
						<option value="">Choose</option>
						<option value="female">Female</option>
						<option value="male">Male</option>
						<option value="other">Other</option>
					</select>

					<label htmlFor="dob" className="col-sm-3">
						Date of Birth
					</label>
					<div className="col-sm-9 mb-3">
						<DatePicker
							className="form-control col-sm"
							id="dob"
							value={formik.values.dob}
							selected={formik.values.dob}
							onChange={(date) => formik.setFieldValue("dob", date)}
						/>
					</div>

					<label htmlFor="empty" className="col-sm-3"></label>
					<input
						type="submit"
						className="form-control btn btn-primary col-sm-9 mb-2"
						value="Register"
					/>
					<label htmlFor="empty" className="col-sm-3"></label>
					<p className="col-sm-9">
						Already have an account?
						<a href="" className="btn btn-link">
							Login
						</a>
						instead.
					</p>
				</div>
			</form>
		</div>
	);
};

export default Register;

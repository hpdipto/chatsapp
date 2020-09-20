import * as React from "react";
import DatePicker from "react-datepicker";

const Register: React.FC = () => {
	return (
		<div className="container mt-3 col-sm-8">
			<form>
				<div className="form-group row">
					<label htmlFor="firstName" className="col-sm-3">
						First Name
					</label>
					<input type="text" className="form-control col-sm-9 mb-3" />

					<label htmlFor="lastName" className="col-sm-3">
						Last Name
					</label>
					<input type="text" className="form-control col-sm-9 mb-3" />

					<label htmlFor="username" className="col-sm-3">
						Username
					</label>
					<input type="text" className="form-control col-sm-9 mb-3" />

					<label htmlFor="email" className="col-sm-3">
						Email
					</label>
					<input type="email" className="form-control col-sm-9 mb-3" />

					<label htmlFor="password" className="col-sm-3">
						Password
					</label>
					<input type="password" className="form-control col-sm-9 mb-3" />

					<label htmlFor="password2" className="col-sm-3">
						Password Again
					</label>
					<input type="password" className="form-control col-sm-9 mb-3" />

					<label htmlFor="gender" className="col-sm-3">
						Gender
					</label>
					<select name="gender" className="form-control col-sm-9 mb-3">
						<option value="">Choose</option>
						<option value="female">Female</option>
						<option value="male">Male</option>
						<option value="other">Other</option>
					</select>

					<label htmlFor="dob" className="col-sm-3">
						Date of Birth
					</label>
					<div className="col-sm-9 mb-3">
						<DatePicker className="form-control col-sm" />
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

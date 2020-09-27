import * as React from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import Navbar from "../components/Navbar";
import { ErrorMessage } from "../components/FlashMessages";

type RoomType = {
	roomName: string;
	roomId: string;
};

const CreateRoom: React.FC = () => {
	const [errorMessages, setErrorMessages] = React.useState([]);

	const validate = (values: any) => {
		const errors: RoomType = { roomName: "", roomId: "" };

		if (!values.roomName.length) {
			errors.roomName = "Please enter a room name";
		}
		if (!values.roomId) {
			errors.roomId = "Please enter a room ID";
		}

		return errors;
	};

	const formik = useFormik({
		initialValues: {
			roomName: "",
			roomId: "",
		},
		validate,
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (values) => {
			console.log("#####");
			console.log(values);
		},
		validator: () => ({}),
	});

	console.log(formik);

	return (
		<div>
			<Navbar user={undefined} />
			<div className="container mt-3 col-sm-8">
				<form onSubmit={formik.handleSubmit}>
					<div className="form-group row">
						{formik.errors.roomName ? (
							<ErrorMessage message={formik.errors.roomName} />
						) : null}
						<label htmlFor="roomName" className="col-sm-3">
							Room Name
						</label>
						<input
							type="text"
							className="form-control col-sm-9 mb-3"
							id="roomName"
							value={formik.values.roomName}
							onChange={formik.handleChange}
						/>

						{formik.errors.roomId ? (
							<ErrorMessage message={formik.errors.roomId} />
						) : null}
						<label htmlFor="roomId" className="col-sm-3">
							Room ID
						</label>
						<input
							type="text"
							className="form-control col-sm-9 mb-3"
							id="roomId"
							value={formik.values.roomId}
							onChange={formik.handleChange}
						/>

						<label htmlFor="empty" className="col-sm-3"></label>
						<input
							type="submit"
							className="form-control btn btn-primary col-sm-9 mb-2"
							onClick={formik.handleSubmit}
							value="Create Room"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRoom;

import * as React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useQuery, useMutation } from "@apollo/client";

import CreateRoomQuery from "../queries/createRoom";
import GetUserQuery from "../queries/fetchUser";

import { useSelector, useDispatch } from "react-redux";
import { ForceAuthentication } from "../redux/actions/authActions";

import Navbar from "../components/Navbar";
import { ErrorMessage } from "../components/FlashMessages";

const CreateRoom: React.FC = () => {
	const [roomIdError, setRoomIdError] = React.useState("");
	const [userId, setUserId] = React.useState(null);
	const [queryKey, setQueyrKey] = React.useState(null);
	const [user, setUser] = React.useState(null);
	const router = useRouter();
	const dispatch = useDispatch();

	// mutation for create chat room
	const [createNewRoom] = useMutation(CreateRoomQuery, {
		ignoreResults: false,

		onCompleted: (data) => {
			let errorMessage = data["createRoom"]["message"];
			if (errorMessage) {
				setRoomIdError(() => errorMessage);
			} else {
				router.push("/");
			}
		},
	});

	// query for fetching user
	const { loading, error, data } = useQuery(GetUserQuery, {
		variables: { id: userId, key: queryKey },
		onCompleted: (data) => setUser(data.getUser),
	});

	React.useEffect(() => {
		axios
			.get("http://localhost:5000/user", { withCredentials: true })
			.then((res) => {
				if (res.data.hasOwnProperty("userId")) {
					setUserId(res.data.userId);
					setQueyrKey(res.data.queryKey);
				} else {
					router.push("/");
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const validate = (values: any) => {
		const errors: any = {};

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
			let newRoom = {
				...values,
				user: userId,
				admin: userId,
			};

			// clearing roomIdError before submitting
			// so that it can dol fesh errors
			setRoomIdError(() => "");

			createNewRoom({ variables: newRoom });
		},
	});

	return (
		<div>
			<Navbar user={user} />

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
						{roomIdError ? <ErrorMessage message={roomIdError} /> : null}
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
							value="Create Room"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRoom;

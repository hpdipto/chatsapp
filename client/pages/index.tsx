import * as React from "react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import Login from "./login";
import Register from "./register";
import Navbar from "../components/Navbar";
import Body from "../components/Body";
import EmptyBody from "../components/EmptyBody";

import GetUserQuery from "../queries/fetchUser";
import GetRoomsDataQuery from "../queries/getRoomsData";

import { useSelector, useDispatch } from "react-redux";

import { ForceAuthentication } from "../redux/actions/authActions";

const Index: React.FC = () => {
	const [userId, setUserId] = React.useState(null);
	const [queryKey, setQueryKey] = React.useState(null);
	const [user, setUser] = React.useState(null);
	const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const router = useRouter();

	React.useEffect(() => {
		if (!isAuthenticated) {
			setUserId(null);
			setQueryKey(null);
			setUser(null);
		}

		// if logged in user manually refresh page
		// we need to load user from server
		axios
			.get("http://localhost:5000/user", { withCredentials: true })
			.then((res) => {
				if (res.data.hasOwnProperty("userId")) {
					setUserId(() => res.data.userId);
					setQueryKey(() => res.data.queryKey);

					// user is authenticated on server side but refresh the page
					// in that time redux state will be swipt
					// so we'll authnticate forcefully again
					if (res.data.userId || res.data.queryKey) {
						dispatch(ForceAuthentication());
					}
				}
			})
			.catch((err) => console.log(err));
	}, [isAuthenticated, isLoading]);

	const { loading, error, data } = useQuery(GetUserQuery, {
		variables: { id: userId, key: queryKey },
		fetchPolicy: "network-only",
		onCompleted: (data) => setUser(() => data.getUser),
	});

	return (
		<div>
			<Navbar user={user} />

			<div className="container">
				{user ? (
					<Body user={user} userID={userId} queryKey={queryKey} />
				) : (
					<EmptyBody />
				)}
			</div>
		</div>
	);
};

export default Index;

import * as React from "react";
import axios from "axios";
import Head from "next/head";
import { useQuery } from "@apollo/client";

import Login from "./login";
import Register from "./register";
import Navbar from "../components/Navbar";

import { GetUserQuery } from "../queries/fetchUser";

import { connect, useSelector } from "react-redux";

const Index: React.FC = () => {
	const [userId, setUserId] = React.useState(null);
	const [queryKey, setQueryKey] = React.useState(null);
	const [user, setUser] = React.useState(null);
	const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

	const { loading, error, data } = useQuery(GetUserQuery, {
		variables: { id: userId, key: queryKey },
		onCompleted: (data) => setUser(data.getUser),
	});

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
					setUserId(res.data.userId);
					setQueryKey(res.data.queryKey);
				}
			})
			.catch((err) => console.log(err));
	}, [isAuthenticated, isLoading]);

	return (
		<div>
			<Navbar user={user} />

			<div className="container">
				{user ? (
					<h3>
						Hello <strong>{user.firstName}</strong>, how are you today?
					</h3>
				) : (
					<h3> Hello NextJS</h3>
				)}
			</div>
		</div>
	);
};

export default Index;

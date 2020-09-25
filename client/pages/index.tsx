import * as React from "react";
import axios from "axios";
import Head from "next/head";
import { useQuery } from "@apollo/client";

import Login from "./login";
import Register from "./register";
import Navbar from "../components/Navbar";

import { GetUserQuery } from "../queries/fetchUser";

const Index: React.FC = () => {
	const [userId, setUseId] = React.useState(null);
	const [queryKey, setQueryKey] = React.useState(null);
	const [user, setUser] = React.useState(null);

	const { loading, error, data } = useQuery(GetUserQuery, {
		variables: { id: userId, key: queryKey },
		onCompleted: (data) => setUser(data.getUser),
	});

	React.useState(() => {
		axios
			.get("http://localhost:5000/user", { withCredentials: true })
			.then((res) => {
				if (res.data.hasOwnProperty("userId")) {
					setUseId(res.data.userId);
					setQueryKey(res.data.queryKey);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<Navbar />

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

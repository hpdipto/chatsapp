import * as React from "react";
import axios from "axios";
import Head from "next/head";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	useQuery,
} from "@apollo/client";

import Login from "./login";
import Register from "./register";
import Navbar from "../components/Navbar";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

// eable axios cookies
// axios.defaults.withCredentials = true;

const Index: React.FC = () => {
	const [userId, setUseId] = React.useState(null);
	const [queryKey, setQueryKey] = React.useState(null);
	const [user, setUser] = React.useState(null);

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
				{userId ? (
					<h1>
						Hello {userId}, Your Query Key is: {queryKey}
					</h1>
				) : (
					<h1> Hello NextJS</h1>
				)}
			</div>
		</div>
	);
};

export default Index;

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

	React.useState(() => {
		axios
			.get("http://localhost:5000/user", { withCredentials: true })
			.then((res) => {
				if (res.data.hasOwnProperty("passport")) {
					setUseId(res.data.passport.user);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<Navbar />

			<div>{userId ? <h1>Hello {userId}</h1> : <h1> Hello NextJS</h1>}</div>
		</div>
	);
};

export default Index;

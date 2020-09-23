import * as React from "react";
import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import Login from "./login";
import Register from "./register";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

const Index: React.FC = () => {
	const { user } = useSelector((state) => state.auth);
	const [userId, setUseId] = React.useState(user);

	React.useState(() => {
		if (!userId) {
			axios
				.get("http://localhost:5000/user")
				.then((res) => {
					if (res.data.hasOwnProperty("passport"))
						setUseId(res.data.passport.user);
				})
				.catch((err) => console.log(err));
		}
	});

	return (
		// 	<ApolloProvider client={client}></ApolloProvider>

		<div>{userId ? <h1>Hello User!</h1> : <h1> Hello NextJS</h1>}</div>
	);
};

export default Index;

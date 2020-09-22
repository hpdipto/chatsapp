import * as React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import Login from "./login";
import Register from "./register";

// server side rendering stopped because of `window` object
// source: https://github.com/vercel/next.js/issues/6080#issuecomment-496820953
// const store = dynamic(import("../redux/store"), { ssr: false });
import store from "../redux/store";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

const Index: React.FC = () => {
	const [user, setUser] = React.useState({});

	// React.useEffect(() => {
	// 	const storeData = store.getState();
	// 	if (storeData.auth.isAuthenticatd) {
	// 		setUser((usr) => ({
	// 			...user,
	// 			...storeData,
	// 		}));
	// 	}
	// });

	return (
		// 	<ApolloProvider client={client}></ApolloProvider>

		<div>{user ? <h1>Hello {user.firstName}</h1> : <h1> Hello NextJS</h1>}</div>
	);
};

export default Index;

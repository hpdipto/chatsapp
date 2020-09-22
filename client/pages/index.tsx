import * as React from "react";
import Head from "next/head";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import Login from "./login";
import Register from "./register";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

const Index: React.FC = () => {
	return (
		<ApolloProvider client={client}>
			{/* <Login /> */}
			{/*<Register />*/}
		</ApolloProvider>
	);
};

export default Index;

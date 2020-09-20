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
			<div className="container">
				<Head>
					<link
						rel="stylesheet"
						href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
						integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
						crossOrigin="anonymous"
					/>
					<title>ChatsApp</title>
				</Head>
				<nav className="navbar navbar-dark bg-primary">
					<h2>ChatsApp</h2>
				</nav>
				{/*<Login />*/}
				<Register />
			</div>
		</ApolloProvider>
	);
};

export default Index;

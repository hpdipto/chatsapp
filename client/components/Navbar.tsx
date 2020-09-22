import * as React from "react";
import Head from "next/head";

const Navbar: React.FC = () => {
	return (
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
				<h2 style={{ color: "white" }}>ChatsApp</h2>
			</nav>
		</div>
	);
};

export default Navbar;

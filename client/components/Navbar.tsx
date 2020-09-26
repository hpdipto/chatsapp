import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const GuestUser: React.FC = () => {
	return (
		<div className="dropdown">
			<img
				src="/guest.png"
				alt="user"
				width="40"
				style={{ cursor: "pointer" }}
				className="dropdown-toggle"
				id="dropdownMenuButton"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			/>
			<div
				className="dropdown-menu dropdown-menu-right"
				aria-labelledby="dropdownMenuButton"
			>
				<a href="/login" className="dropdown-item">
					Login
				</a>
				<a href="/register" className="dropdown-item">
					Register
				</a>
			</div>
		</div>
	);
};

const LoggedInUser: React.FC<{ user: any }> = ({ user }: { user: any }) => {
	return (
		<div className="dropdown">
			<img
				src="/user.png"
				alt="user"
				width="40"
				style={{ cursor: "pointer" }}
				className="dropdown-toggle"
				id="dropdownMenuButton"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			/>
			<div
				className="dropdown-menu dropdown-menu-right"
				aria-labelledby="dropdownMenuButton"
			>
				<a href="#" className="dropdown-item">
					Profile
				</a>
				<a href="/register" className="dropdown-item">
					Log Out
				</a>
			</div>
		</div>
	);
};

const Navbar: React.FC<{ user: any }> = ({ user }: { user: any }) => {
	const router = useRouter();

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
				<h2
					style={{ color: "white", cursor: "pointer" }}
					onClick={() => router.push("/")}
				>
					ChatsApp
				</h2>

				{user ? <LoggedInUser user={user} /> : <GuestUser />}
			</nav>

			<script
				src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
				integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
				crossOrigin="anonymous"
			></script>
			<script
				src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
				integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
				crossOrigin="anonymous"
			></script>
			<script
				src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
				integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
				crossOrigin="anonymous"
			></script>
		</div>
	);
};

export default Navbar;

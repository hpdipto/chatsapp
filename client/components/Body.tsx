import * as React from "react";
import { useRouter } from "next/router";

import ChatRooms from "./ChatRooms";

const Body: React.FC<{ user: any }> = ({ user }: { user: any }) => {
	const router = useRouter();

	console.log(user);

	return (
		<div className="container px-lg-5">
			<div className="row mx-lg-n5" style={{ height: "90vh" }}>
				<ChatRooms rooms={user.chatRooms} userId={user.id} />

				<div className="col-9 border bg-light">
					<div
						className="left-panel-top border mx-lg-n3"
						style={{ background: "#c6e2f7" }}
					>
						<h3 className="pt-2  px-3">Room Name</h3>
						<h5 className="px-3">roomId</h5>
					</div>
					<p>Chat contents...</p>
					<p>Chat contents...</p>
					<p>Chat contents...</p>
					<p>Chat contents...</p>
				</div>
			</div>
		</div>
	);
};

export default Body;

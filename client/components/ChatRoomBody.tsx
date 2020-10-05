import * as React from "react";

const ChatRoomBody: React.FC = () => {
	return (
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
	);
};

export default ChatRoomBody;

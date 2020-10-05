import * as React from "react";

const ChatRoomBody: React.FC<{ selectedRoomData }> = ({
	selectedRoomData,
}: {
	selectedRoomData: any;
}) => {
	return (
		<div className="col-9 border bg-light">
			<div
				className="left-panel-top border mx-lg-n3"
				style={{ background: "#c6e2f7" }}
			>
				{selectedRoomData ? (
					<h3 className="pt-2  px-3">{selectedRoomData.roomName}</h3>
				) : (
					<h3 className="pt-2  px-3">Select A Room</h3>
				)}
				{selectedRoomData ? (
					<h5 className="px-3">{selectedRoomData.roomId}</h5>
				) : (
					<h5 className="px-3">selectARoom</h5>
				)}
			</div>
			<p>Chat contents...</p>
			<p>Chat contents...</p>
			<p>Chat contents...</p>
			<p>Chat contents...</p>
		</div>
	);
};

export default ChatRoomBody;

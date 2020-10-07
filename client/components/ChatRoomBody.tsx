import * as React from "react";

const ChatRoomBody: React.FC<{
	userId;
	queryKey;
	selectedRoomData;
	selectedNotJoinedRoomData;
}> = ({
	userId,
	queryKey,
	selectedRoomData,
	selectedNotJoinedRoomData,
}: {
	userId;
	queryKey;
	selectedRoomData: any;
	selectedNotJoinedRoomData: any;
}) => {
	return (
		<div className="col-9 border bg-light">
			<div
				className="left-panel-top border mx-lg-n3"
				style={{ background: "#c6e2f7" }}
			>
				{selectedRoomData && (
					<h3 className="pt-2  px-3">{selectedRoomData.roomName}</h3>
				)}
				{selectedNotJoinedRoomData && (
					<h3 className="pt-2  px-3">{selectedNotJoinedRoomData.roomName}</h3>
				)}
				{!selectedRoomData && !selectedNotJoinedRoomData && (
					<h3 className="pt-2  px-3">Select A Room</h3>
				)}

				{selectedRoomData && (
					<h5 className="px-3">{selectedRoomData.roomId}</h5>
				)}
				{selectedNotJoinedRoomData && (
					<h5 className="px-3">{selectedNotJoinedRoomData.roomId}</h5>
				)}
				{!selectedRoomData && !selectedNotJoinedRoomData && (
					<h5 className="px-3">selectARoom</h5>
				)}
			</div>

			{!selectedNotJoinedRoomData && (
				<div>
					<p>Chat contents...</p>
					<p>Chat contents...</p>
					<p>Chat contents...</p>
					<p>Chat contents...</p>
				</div>
			)}
			{selectedNotJoinedRoomData && (
				<div className="text-center">
					<button className="btn btn-primary mt-5">Join</button>
				</div>
			)}
		</div>
	);
};

export default ChatRoomBody;

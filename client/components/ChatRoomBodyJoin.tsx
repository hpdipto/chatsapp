import * as React from "react";

const ChatRoomBodyJoin: React.FC<{ notJoinedRoomData }> = ({
	notJoinedRoomData,
}: {
	notJoinedRoomData: any;
}) => {
	return (
		<div className="col-9 border bg-light">
			<div
				className="left-panel-top border mx-lg-n3"
				style={{ background: "#c6e2f7" }}
			>
				{notJoinedRoomData ? (
					<h3 className="pt-2  px-3">{notJoinedRoomData.roomName}</h3>
				) : (
					<h3 className="pt-2  px-3">Select A Room</h3>
				)}
				{notJoinedRoomData ? (
					<h5 className="px-3">{notJoinedRoomData.roomId}</h5>
				) : (
					<h5 className="px-3">selectARoom</h5>
				)}
			</div>
		</div>
	);
};

export default ChatRoomBodyJoin;

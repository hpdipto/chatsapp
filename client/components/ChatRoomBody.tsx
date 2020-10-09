import * as React from "react";
import { useMutation } from "@apollo/client";

import JoinRoomQuery from "../queries/joinRoom";
import SendTextQuery from "../queries/sendText";

const ChatRoomBody: React.FC<{
	userId;
	queryKey;
	userName;
	userChatRooms;
	setUserChatRooms;
	selectedRoomData;
	selectedNotJoinedRoomData;
	loadRoomData;
	loadNotJoinedRoomData;
}> = ({
	userId,
	queryKey,
	userName,
	userChatRooms,
	setUserChatRooms,
	selectedRoomData,
	selectedNotJoinedRoomData,
	loadRoomData,
	loadNotJoinedRoomData,
}: {
	userId;
	queryKey;
	userName;
	userChatRooms;
	setUserChatRooms;
	selectedRoomData: any;
	selectedNotJoinedRoomData: any;
	loadRoomData;
	loadNotJoinedRoomData;
}) => {
	const [chatText, setChatText] = React.useState("");

	// mutation for joining a room
	const [joinRoom, { data }] = useMutation(JoinRoomQuery, {
		ignoreResults: false,

		onCompleted: (data) => {
			setUserChatRooms(() => [...userChatRooms, data.joinRoom.id]);
			loadRoomData({
				variables: {
					userIDs: [...userChatRooms, data.joinRoom.id],
					userID: userId,
				},
			});
			loadNotJoinedRoomData({
				variables: {
					userIDs: [...userChatRooms, data.joinRoom.id],
					userID: userId,
				},
			});
		},
	});

	// mutation for sending text
	const [sendTextFunc, { data: data_ }] = useMutation(SendTextQuery, {
		ignoreResults: false,

		onCompleted: (data_) => {
			// some more operation needed
			console.log(data_.sendText);
		},
	});

	const sendText = () => {
		let textBody = {
			roomId: selectedRoomData.id,
			userName: userName,
			userId: userId,
			queryKey: queryKey,
			text: chatText,
			time: Date.now().toString(),
		};

		setChatText(() => "");

		if (textBody.text.length !== 0) {
			// useMutation
			sendTextFunc({ variables: { ...textBody } });
		}
	};

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

			<div
				className="d-flex flex-column"
				style={{ height: "calc(100vh - 39vh)" }}
			>
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
						<button
							className="btn btn-primary mt-5"
							onClick={() =>
								joinRoom({
									variables: {
										userId: userId,
										queryKey: queryKey,
										roomId: selectedNotJoinedRoomData.id,
									},
								})
							}
						>
							Join
						</button>
					</div>
				)}
			</div>

			{selectedRoomData && (
				<div className="input-group">
					<textarea
						id="chatText"
						className="form-control chatText"
						rows={3}
						cols={71}
						value={chatText}
						onChange={(e) => setChatText(e.target.value)}
					/>
					<div className="input-group-append">
						<button className="input-group-text" onClick={sendText}>
							Send
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatRoomBody;

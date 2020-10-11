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
	setSelectedRoomData;
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
	setSelectedRoomData,
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
	setSelectedRoomData;
	selectedNotJoinedRoomData: any;
	loadRoomData;
	loadNotJoinedRoomData;
}) => {
	const [chatText, setChatText] = React.useState("");
	var lastChatRef = React.useRef(null);

	React.useEffect(() => {
		if (lastChatRef.current !== null) {
			lastChatRef.current.scrollIntoView();
		}
	});

	// mutation for joining a room
	const [joinRoom, { data }] = useMutation(JoinRoomQuery, {
		ignoreResults: false,

		onCompleted: (data) => {
			setUserChatRooms(() => [...userChatRooms, data.joinRoom.id]);
			loadRoomData({
				variables: {
					roomIDs: [...userChatRooms, data.joinRoom.id],
					userID: userId,
				},
			});
			loadNotJoinedRoomData({
				variables: {
					roomIDs: [...userChatRooms, data.joinRoom.id],
					userID: userId,
				},
			});
		},
	});

	// mutation for sending text
	const [sendTextFunc, { data: data_ }] = useMutation(SendTextQuery, {
		ignoreResults: false,

		onCompleted: (data_) => {
			loadRoomData({
				variables: { userIDs: [...userChatRooms], userId: userId },
			});
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
			sendTextFunc({ variables: textBody });
		}
	};

	const convertToDate = (date: string) => {
		let d = new Date(parseInt(date));
		let dateSring = d.toDateString();
		let hours = d.getHours();
		let minutes = d.getMinutes();

		return `${dateSring} ${hours}:${minutes}`;
	};

	return (
		<div className="col-9 border bg-light overflow-auto">
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
				className="d-flex flex-column overflow-auto"
				style={{ height: "calc(100vh - 41vh)", backgroundColor: "#e4e8f2" }}
			>
				{selectedRoomData && (
					<div>
						{selectedRoomData["chats"].map((chat, index) => (
							<div
								key={index}
								ref={(e) => (lastChatRef.current = e)}
								className={
									"card mb-2 w-50" +
									(selectedRoomData["chats"][index].userId === userId
										? " ml-auto"
										: "")
								}
							>
								<div className="card-header">{chat.userName}</div>
								<div className="card-body">{chat.text}</div>
								<div className="card-footer">{convertToDate(chat.time)}</div>
							</div>
						))}
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

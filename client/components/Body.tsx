import * as React from "react";
import { useRouter } from "next/router";
import { useQuery, useLazyQuery } from "@apollo/client";

import GetRoomsDataQuery from "../queries/getRoomData";
import GetNotJoinedRooms from "../queries/getNotJoinedRooms";

import ChatRooms from "./ChatRooms";
import ChatRoomBody from "./ChatRoomBody";

const Body: React.FC<{ user: any; userID: any; queryKey: any }> = ({
	user,
	userID,
	queryKey,
}: {
	user: any;
	userID: any;
	queryKey: any;
}) => {
	const [userChatRooms, setUserChatRooms] = React.useState(null);

	const [roomsData, setRoomsData] = React.useState(null);
	const [roomsInfo, setRoomsInfo] = React.useState(null);
	const [selectedRoomIndex, setSelectedRoomIndex] = React.useState(null);
	const [selectedRoomData, setSelectedRoomData] = React.useState(null);

	const [notJoinedRoomsData, setNotJoinedRoomsData] = React.useState(null);
	const [notJoinedRoomsInfo, setNotJoinedRoomsInfo] = React.useState(null);
	const [
		selectedNotJoinedRoomIndex,
		setSelectedNotJoinedRoomIndex,
	] = React.useState(null);
	const [
		selectedNotJoinedRoomData,
		setSelectedNotJoinedRoomData,
	] = React.useState(null);

	const router = useRouter();

	const [loadRoomData, { called, loading, data }] = useLazyQuery(
		GetRoomsDataQuery,
		{
			variables: { roomIDs: userChatRooms, userID: userID },
			fetchPolicy: "network-only",
			onCompleted: (data) => setRoomsData(() => [...data.getRoomsData]),
		}
	);

	const [
		loadNotJoinedRoomData,
		{ called: called_, loading: loading_, data: data_ },
	] = useLazyQuery(GetNotJoinedRooms, {
		variables: { roomIDs: userChatRooms, userID: userID },
		fetchPolicy: "network-only",
		onCompleted: (data_) =>
			setNotJoinedRoomsData(() => [...data_.getNotJoinedRooms]),
	});

	React.useEffect(() => {
		if (user.chatRooms && userChatRooms === null) {
			setUserChatRooms(user.chatRooms);
		}

		if (!roomsData || !notJoinedRoomsData) {
			loadRoomData();
			loadNotJoinedRoomData();
		}

		// some unnecessary calls will happen
		if (roomsData) {
			let rInfo = [];
			roomsData.map((rd, i) =>
				rInfo.push({ roomName: rd.roomName, roomId: rd.roomId, index: i })
			);
			setRoomsInfo(() => [...rInfo]);
		}

		// some unnecessary calls will happen
		if (notJoinedRoomsData) {
			let njrInfo = [];
			notJoinedRoomsData.map((njrd, i) =>
				njrInfo.push({ roomName: njrd.roomName, roomId: njrd.roomId, index: i })
			);
			setNotJoinedRoomsInfo(() => [...njrInfo]);
		}

		if (selectedRoomIndex !== null) {
			setSelectedRoomData(() => roomsData[selectedRoomIndex]);
			setSelectedNotJoinedRoomData(() => null);
		}

		if (selectedNotJoinedRoomIndex !== null) {
			setSelectedNotJoinedRoomData(
				() => notJoinedRoomsData[selectedNotJoinedRoomIndex]
			);
			setSelectedRoomData(() => null);
		}
	}, [
		roomsData,
		notJoinedRoomsData,
		selectedRoomIndex,
		selectedNotJoinedRoomIndex,
	]);

	return (
		<div className="container px-lg-5">
			<div className="row mx-lg-n5" style={{ height: "90vh" }}>
				<ChatRooms
					roomsInfo={roomsInfo}
					setSelectedRoomIndex={setSelectedRoomIndex}
					notJoinedRoomsInfo={notJoinedRoomsInfo}
					setSelectedNotJoinedRoomIndex={setSelectedNotJoinedRoomIndex}
				/>

				<ChatRoomBody
					userId={userID}
					queryKey={queryKey}
					userChatRooms={userChatRooms}
					setUserChatRooms={setUserChatRooms}
					selectedRoomData={selectedRoomData}
					selectedNotJoinedRoomData={selectedNotJoinedRoomData}
					refetchRoomData={loadRoomData}
					refetchNotJoinedRoomData={loadNotJoinedRoomData}
				/>
			</div>
		</div>
	);
};

export default Body;

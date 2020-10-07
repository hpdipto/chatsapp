import * as React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import GetRoomsDataQuery from "../queries/getRoomData";
import GetNotJoinedRooms from "../queries/getNotJoinedRooms";

import ChatRooms from "./ChatRooms";
import ChatRoomBody from "./ChatRoomBody";
import ChatRoomBodyJoin from "./ChatRoomBodyJoin";

const Body: React.FC<{ user: any; userID: any }> = ({
	user,
	userID,
}: {
	user: any;
	userID: any;
}) => {
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

	const { loading, error, data } = useQuery(GetRoomsDataQuery, {
		variables: { roomIDs: user.chatRooms, userID: userID },
		fetchPolicy: "network-only",
		onCompleted: (data) => setRoomsData(() => [...data.getRoomsData]),
	});

	const { loading: loading_, error: error_, data: data_ } = useQuery(
		GetNotJoinedRooms,
		{
			variables: { roomIDs: user.chatRooms, userID: userID },
			fetchPolicy: "network-only",
			onCompleted: (data_) =>
				setNotJoinedRoomsData(() => [...data_.getNotJoinedRooms]),
		}
	);

	React.useEffect(() => {
		if (roomsData && !roomsInfo) {
			let rInfo = [];
			roomsData.map((rd, i) =>
				rInfo.push({ roomName: rd.roomName, roomId: rd.roomId, index: i })
			);
			setRoomsInfo(() => [...rInfo]);
		}

		if (notJoinedRoomsData && !notJoinedRoomsInfo) {
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
					selectedRoomData={selectedRoomData}
					selectedNotJoinedRoomData={selectedNotJoinedRoomData}
				/>
			</div>
		</div>
	);
};

export default Body;

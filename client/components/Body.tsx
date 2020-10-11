import * as React from "react";
import { useRouter } from "next/router";
import { useQuery, useLazyQuery, useSubscription } from "@apollo/client";

import GetRoomsDataQuery from "../queries/getRoomsData";
import GetNotJoinedRooms from "../queries/getNotJoinedRooms";
import NewChatSubscriptonQuery from "../queries/newChatSubscription";

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

	const [roomsData, setRoomsData] = React.useState([]);
	const [roomsInfo, setRoomsInfo] = React.useState([]);
	const [selectedRoomIndex, setSelectedRoomIndex] = React.useState(null);
	const [selectedRoomData, setSelectedRoomData] = React.useState(null);

	const [notJoinedRoomsData, setNotJoinedRoomsData] = React.useState([]);
	const [notJoinedRoomsInfo, setNotJoinedRoomsInfo] = React.useState([]);
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

	const LatestChat = () => {
		const { data: data_subs, loading: subs_loading } = useSubscription(
			NewChatSubscriptonQuery,
			{
				variables: { rooms: userChatRooms },
				onSubscriptionData: (data_subs) => loadRoomData(),
			}
		);
	};

	React.useEffect(() => {
		console.log(roomsData);

		if (user.chatRooms && userChatRooms === null) {
			setUserChatRooms(() => user.chatRooms);
		}

		// not sure about the '&&' condition
		if (roomsData.length === 0 && notJoinedRoomsData.length === 0) {
			loadRoomData();
			loadNotJoinedRoomData();
		}

		// if user joined a new room then we'll change
		// selectedRoomIndex and selectedNotJoinedRoomIndex
		if (roomsInfo.length !== 0 && roomsData.length > roomsInfo.length) {
			setSelectedRoomIndex(roomsData.length - 1);
			setSelectedNotJoinedRoomIndex(null);
		}

		if (roomsData.length !== roomsInfo.length) {
			let rInfo = [];
			roomsData.map((rd, i) =>
				rInfo.push({ roomName: rd.roomName, roomId: rd.roomId, index: i })
			);
			setRoomsInfo(() => [...rInfo]);
		}
		if (notJoinedRoomsData.length !== notJoinedRoomsInfo.length) {
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
					selectedRoomIndex={selectedRoomIndex}
					setSelectedRoomIndex={setSelectedRoomIndex}
					notJoinedRoomsInfo={notJoinedRoomsInfo}
					setSelectedNotJoinedRoomIndex={setSelectedNotJoinedRoomIndex}
				/>

				<ChatRoomBody
					userId={userID}
					queryKey={queryKey}
					userName={`${user.firstName} ${user.lastName}`}
					userChatRooms={userChatRooms}
					setUserChatRooms={setUserChatRooms}
					selectedRoomData={selectedRoomData}
					setSelectedRoomData={setSelectedRoomData}
					selectedNotJoinedRoomData={selectedNotJoinedRoomData}
					loadRoomData={loadRoomData}
					loadNotJoinedRoomData={loadNotJoinedRoomData}
				/>
			</div>
		</div>
	);
};

export default Body;

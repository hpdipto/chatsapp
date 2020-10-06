import * as React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";

import GetRoomsDataQuery from "../queries/getRoomData";
import GetNotJoinedRooms from "../queries/getNotJoinedRooms";

import ChatRooms from "./ChatRooms";
import ChatRoomBody from "./ChatRoomBody";

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

	const [notJoinedRooms, setNotJoinedRooms] = React.useState(null);
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
				setNotJoinedRooms(() => [...data_.getNotJoinedRooms]),
		}
	);

	console.log("notJoinedRooms: ", notJoinedRooms);

	React.useEffect(() => {
		if (roomsData && !roomsInfo) {
			let rInfo = [];
			roomsData.map((rd, i) =>
				rInfo.push({ roomName: rd.roomName, roomId: rd.roomId, index: i })
			);
			setRoomsInfo(() => [...rInfo]);
		}

		if (selectedRoomIndex !== null) {
			setSelectedRoomData(roomsData[selectedRoomIndex]);
		}
	}, [roomsData, selectedRoomIndex]);

	return (
		<div className="container px-lg-5">
			<div className="row mx-lg-n5" style={{ height: "90vh" }}>
				<ChatRooms
					roomsInfo={roomsInfo}
					setSelectedRoomIndex={setSelectedRoomIndex}
				/>

				<ChatRoomBody selectedRoomData={selectedRoomData} />
			</div>
		</div>
	);
};

export default Body;

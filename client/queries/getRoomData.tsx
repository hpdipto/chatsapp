import { gql } from "@apollo/client";

const GetRoomDataQuery = gql`
	query GetRoomData($roomID: String, $userId: String) {
		getRoomData(roomCredentials: { roomId: $roomId, userId: $userId }) {
			roomName
			roomId
			users
			blockedUser
			message
		}
	}
`;

export default GetRoomDataQuery;

import { gql } from "@apollo/client";

const GetNotJoinedRooms = gql`
	query GetNotJoinedRooms($roomIDs: [String]!, $userID: String!) {
		getNotJoinedRooms(roomCredentials: { roomIds: $roomIDs, userId: $userID }) {
			id
			roomName
			roomId
		}
	}
`;

export default GetNotJoinedRooms;

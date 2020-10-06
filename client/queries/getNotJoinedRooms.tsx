import { gql } from "@apollo/client";

const GetNotJoinedRooms = gql`
	query GetNotJoinedRooms($roomIDs: [String]!, $userID: String!) {
		getNotJoinedRooms(roomCredentials: { roomIds: $roomIDs, userId: $userID }) {
			roomName
			roomId
			id
		}
	}
`;

export default GetNotJoinedRooms;

import { gql } from "@apollo/client";

const GetRoomsDataQuery = gql`
	query GetRoomsData($roomIDs: [String]!, $userID: String!) {
		getRoomsData(roomCredentials: { roomIds: $roomIDs, userId: $userID }) {
			roomName
			roomId
			users
			blockedUser
			message
		}
	}
`;

export default GetRoomsDataQuery;

import { gql } from "@apollo/client";

const GetRoomsDataQuery = gql`
	query GetRoomsData($roomIDs: [String]!, $userID: String!) {
		getRoomsData(roomCredentials: { roomIds: $roomIDs, userId: $userID }) {
			id
			roomName
			roomId
			users
			blockedUser
			message
			chats {
				userName
				userId
				text
				time
			}
		}
	}
`;

export default GetRoomsDataQuery;

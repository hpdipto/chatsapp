import { gql } from "@apollo/client";

const JoinRoomQuery = gql`
	mutation JoinRoom($userId: String!, $queryKey: String!, $roomId: String!) {
		joinRoom(
			joinRoomCredentials: {
				userId: $userId
				queryKey: $queryKey
				roomId: $roomId
			}
		) {
			id
			roomName
			roomId
			message
		}
	}
`;

export default JoinRoomQuery;

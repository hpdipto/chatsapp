import { gql } from "@apollo/client";

const CreateRoomQuery = gql`
	mutation CreateRoom(
		$roomName: String!
		$roomId: String!
		$user: String!
		$admin: String!
	) {
		createRoom(
			room: {
				roomName: $roomName
				roomId: $roomId
				users: [$user]
				admins: [$admin]
			}
		) {
			roomName
			roomId
			message
		}
	}
`;

export default CreateRoomQuery;

import { gql } from "@apollo/client";

const SendTextQuery = gql`
	mutation SendText(
		$roomId: String!
		$userName: String!
		$userId: String!
		$queryKey: String!
		$text: String!
		$time: String!
	) {
		sendText(
			textBody: {
				roomId: $roomId
				userName: $userName
				userId: $userId
				queryKey: $queryKey
				text: $text
				time: $time
			}
		) {
			userName
			userId
			text
			time
			message
		}
	}
`;

export default SendTextQuery;

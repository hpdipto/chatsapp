import { gql } from "@apollo/client";

const NewChatSubscriptionQuery = gql`
	subscription NewChatSubscription($rooms: [String]) {
		newChatSubscription(rooms: $rooms) {
			userName
			text
			time
		}
	}
`;

export default NewChatSubscriptionQuery;

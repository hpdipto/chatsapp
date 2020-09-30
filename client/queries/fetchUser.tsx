import { gql } from "@apollo/client";

const GetUserQuery = gql`
	query GetUser($id: ID!, $key: ID!) {
		getUser(userCredentials: { id: $id, key: $key }) {
			firstName
			lastName
			username
			gender
			dateOfBirth
			chatRooms
		}
	}
`;

export default GetUserQuery;

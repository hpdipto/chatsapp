import { gql } from "@apollo/client";

export const LoginQuery = gql`
	mutation Login($emailOrUserName: String!, $password: String!) {
		loginUser(
			credential: { emailOrUserName: $emailOrUserName, password: $password }
		) {
			firstName
			lastName
		}
	}
`;

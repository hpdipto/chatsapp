import { gql } from "@apollo/client";

export const RegisterQuery = gql`
	mutation RegisterUser(
		$firstName: String!
		$lastName: String!
		$email: String!
		$username: String!
		$password: String!
		$password2: String!
		$gender: String
		$dateOfBirth: String
	) {
		registerUser(
			user: {
				firstName: $firstName
				lastName: $lastName
				email: $email
				username: $username
				password: $password
				password2: $password2
				gender: $gender
				dateOfBirth: $dateOfBirth
			}
		) {
			firstName
			lastName
			username
		}
	}
`;

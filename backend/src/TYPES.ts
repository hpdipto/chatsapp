export type UserType {
	firstName: string,
	lastName: string,
	email: string,
	username: string,
	password: string,
	password2: string,
	gender?: string,
	dateOfBirth?: Date,
	activityStatus?: boolean,
	chatRooms?: Array<string>,
}
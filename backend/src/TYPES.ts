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
};

export type Credentials {
	emailOrUserName: string,
	password: string
};

export type RoomType {
	name: string,
	roomId: string,
	users: Array<string>,
	admins: Array<string>,
	blockedUser?: Array<string>
}
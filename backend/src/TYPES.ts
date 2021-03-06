export type UserType = {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	password: string;
	password2: string;
	gender?: string;
	dateOfBirth?: Date;
	activityStatus?: boolean;
	chatRooms?: Array<string>;
};

export type Credentials = {
	emailOrUserName: string;
	password: string;
};

export type RoomType = {
	roomName: string;
	roomId: string;
	users: Array<string>;
	admins: Array<string>;
	blockedUser?: Array<string>;
};

export type JoinRoomCredentials = {
	userId: string;
	queryKey: string;
	roomId: string;
};

export type TextBodyType = {
	roomId: string;
	userName: string;
	userId: string;
	queryKey: string;
	text: string;
	time: Date;
};

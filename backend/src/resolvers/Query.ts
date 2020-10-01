import { ApolloError } from "apollo-server-express";
import mongoose from "mongoose";

import { User } from "../models/User";
import Room from "../models/Room";

const allUser = (parent: any, args: any, context: any) => {
	return User.find({});
};

const getUser = async (parent: any, args: any, context: any) => {
	const { id, key } = args.userCredentials;

	let user: any = await User.findById(id);
	// user data is in _doc field
	user = user._doc;
	if (user !== null && user.queryKey === key) {
		// if id and queryKey matched then return user
		// except password, password2 and queryKey
		let userData = { ...user };
		delete userData.password;
		delete userData.password2;
		delete userData.queryKey;

		return userData;
	} else {
		throw new ApolloError("Authentication Failed");
	}
};

// Resolvers for chat Room
const allRooms = () => {
	return Room.find({});
};

// Resolvers for retrieving data of a particular room
const getRoomsData = async (parent: any, args: any, context: any) => {
	const { roomIds, userId } = args.roomCredentials;

	let roomData: any = [];

	for (var r = 0; r < roomIds.length; r++) {
		let room = await Room.findById(mongoose.Types.ObjectId(roomIds[r]));
		//@ts-ignore
		let roomUsers = room.users;
		for (var i = 0; i < roomUsers.length; i++) {
			if (roomUsers[i] === userId.toString()) {
				roomData.push(room);
				break;
			}
		}
	}

	if (roomData.length) {
		return roomData;
	}

	let emptyRoom = {
		//@ts-ignore
		...room._doc,
		users: [],
		admins: [],
		blockedUser: [],
		message: "Unauthorized user",
	};
	return emptyRoom;
};

const Query = {
	allUser,
	getUser,
	allRooms,
	getRoomsData,
};

export default Query;

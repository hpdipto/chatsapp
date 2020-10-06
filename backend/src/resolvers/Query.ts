import { ApolloError } from "apollo-server-express";
import mongoose from "mongoose";

import { User } from "../models/User";
import Room from "../models/Room";

// Resolver for getting all user
const allUser = (parent: any, args: any, context: any) => {
	return User.find({});
};

// Resolver for getting a particular user
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

// Resolver for chat Room
const allRooms = () => {
	return Room.find({});
};

// Resolver for retrieving data of a particular room
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

// Resolver for getting not joined rooms for a particular user
const getNotJoinedRooms = async (parent: any, args: any, context: any) => {
	const { roomIds, userId } = args.roomCredentials;

	var roomIDs: any[] = [];
	for (var i = 0; i < roomIds.length; i++) {
		roomIDs.push(mongoose.Types.ObjectId(roomIds[i]));
	}
	// console.log(roomIDs);

	var notJoinedRooms = await Room.find({ _id: { $nin: roomIDs } });
	return notJoinedRooms;
};

const Query = {
	allUser,
	getUser,
	allRooms,
	getRoomsData,
	getNotJoinedRooms,
};

export default Query;

import { ApolloError, UserInputError } from "apollo-server-express";
import passport from "passport";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

import { User } from "../models/User";
import Room from "../models/Room";
import {
	UserType,
	Credentials,
	RoomType,
	JoinRoomCredentials,
	TextBodyType,
} from "../TYPES";

// 'registerUser' resolver
const registerUser = async (parent: any, args: { user: UserType }) => {
	let newUser = new User({
		...args.user,
		password: bcrypt.hashSync(args.user.password, 11),
		password2: bcrypt.hashSync(args.user.password2, 11),
		queryKey: uuidv4(),
	});

	try {
		let savedUser = await newUser.save();
		return savedUser;
	} catch (e) {
		if (e.keyValue.hasOwnProperty("email")) {
			return {
				...args.user,
				password: "",
				password2: "",
				message: "Email already exist",
			};
		}
		if (e.keyValue.hasOwnProperty("username")) {
			return {
				...args.user,
				password: "",
				password2: "",
				message: "Username already taken",
			};
		}
	}
};

// resolvers for chat Room
const createRoom = async (parent: any, args: { room: RoomType }) => {
	let newRoom = new Room({
		...args.room,
	});

	try {
		let savedRoom = await newRoom.save();

		// update user field too
		let userId = mongoose.Types.ObjectId({ ...args.room }["admins"][0]);
		let updateUser = await User.findByIdAndUpdate(
			userId,
			{ $push: { chatRooms: savedRoom.id } },
			{ new: true }
		);

		return savedRoom;
	} catch (e) {
		if (e.keyValue.hasOwnProperty("roomId")) {
			return {
				...args.room,
				id: { ...args.room }["admins"][0],
				message: "Room ID already taken",
			};
		}
	}
};

// 'joinRoom' resolver
const joinRoom = async (
	parent: any,
	args: { joinRoomCredentials: JoinRoomCredentials },
	context: any
) => {
	const { userId, queryKey, roomId } = args.joinRoomCredentials;

	var errorObject: any = {
		id: "",
		roomName: "",
		roomId: "",
		users: [""],
		admins: [""],
		message: "",
	};

	const user = await User.findById(mongoose.Types.ObjectId(userId));
	//@ts-ignore
	if (user !== null && user.queryKey === queryKey) {
		const room = await Room.findByIdAndUpdate(
			mongoose.Types.ObjectId(roomId),
			{ $push: { users: mongoose.Types.ObjectId(userId) } },
			{ new: true }
		);

		if (room !== null) {
			const updateUserInfo = await User.findByIdAndUpdate(
				mongoose.Types.ObjectId(userId),
				{ $push: { chatRooms: mongoose.Types.ObjectId(roomId) } },
				{ new: true }
			);

			return room;
		} else {
			errorObject.message = "Room not found";
			return errorObject;
		}
	} else {
		errorObject.message = "User not found or credentials missing";
		return errorObject;
	}
};

// 'sendText' resolver
const sendText = async (
	parent: any,
	args: { textBody: TextBodyType },
	context: any
) => {
	const { roomId, userName, userId, queryKey, text, time } = args.textBody;
	const { pubsub } = context;

	var room = await Room.findByIdAndUpdate(
		mongoose.Types.ObjectId(roomId),
		{ $push: { chats: args.textBody } },
		{ new: true }
	);

	const result: any = {
		userName: userName,
	};
	if (room === null) {
		result["message"] = "Room not found";
	} else {
		result["userId"] = userId;
		result["text"] = text;
		result["time"] = time;
		result["message"] = "Message send successfully";
	}

	pubsub.publish("NEW_CHAT", result);
	return result;
};

// Mutation
const Mutation = {
	registerUser,
	createRoom,
	joinRoom,
	sendText,
};

export default Mutation;

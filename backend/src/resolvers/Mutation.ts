import { ApolloError, UserInputError } from "apollo-server-express";
import passport from "passport";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";
import Room from "../models/Room";
import { UserType, Credentials, RoomType } from "../TYPES";

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
const createRoom = (parent: any, args: { room: RoomType }) => {
	let newRoom = new Room({
		...args.room,
	});

	return newRoom.save();
};

// Mutation
const Mutation = {
	registerUser,
	createRoom,
};

export default Mutation;

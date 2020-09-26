import passport from "passport";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";
import Room from "../models/Room";
import { UserType, Credentials, RoomType } from "../TYPES";

// 'registerUser' resolver
const registerUser = (parent: any, args: { user: UserType }) => {
	let newUser = new User({
		...args.user,
		password: bcrypt.hashSync(args.user.password, 11),
		password2: bcrypt.hashSync(args.user.password2, 11),
		queryKey: uuidv4(),
	});

	return newUser.save();
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

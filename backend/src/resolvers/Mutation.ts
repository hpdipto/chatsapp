import passport from "passport";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { UserType, Credentials } from "../TYPES";

// 'registerUser' resolver
const registerUser = (parent: any, args: { user: UserType }) => {
	let newUser = new User({
		...args.user,
		password: bcrypt.hashSync(args.user.password, 11),
		password2: bcrypt.hashSync(args.user.password2, 11),
	});

	return newUser.save();
};

// Mutation
const Mutation = {
	registerUser,
};

export default Mutation;

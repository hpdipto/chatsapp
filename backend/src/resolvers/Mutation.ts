import { User } from "../models/User";
import { UserType } from "../TYPES";

// 'registerUser' resolver
const registerUser = (parent: any, args: { user: UserType }) => {
	let newUser = new User({
		...args.user,
	});

	return newUser.save();
};

// Mutation
const Mutation = {
	registerUser,
};

export default Mutation;

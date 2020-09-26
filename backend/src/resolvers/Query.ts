import { ApolloError } from "apollo-server-express";

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

const Query = {
	allUser,
	getUser,
	allRooms,
};

export default Query;

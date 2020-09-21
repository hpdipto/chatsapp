import { User } from "../models/User";

const allUser = (parent: any, args: any, context: any) => {
	return User.find({});
};

const Query = {
	allUser,
};

export default Query;

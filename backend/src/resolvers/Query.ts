import { User } from "../models/User";

const allUser = () => {
	return User.find({});
};

const Query = {
	allUser,
};

export default Query;

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

// 'loginUser' resolver
const loginUser = (parent: any, args: { credential: Credentials }) => {
	let email = undefined;
	let username = undefined;

	if (args.credential.emailOrUserName.includes("@")) {
		email = args.credential.emailOrUserName;
	} else {
		username = args.credential.emailOrUserName;
	}
	const password = args.credential.password;

	if (email) {
		return User.find({ email })
			.then((profile: any) => {
				if (
					profile.length !== 0 &&
					bcrypt.compareSync(password, profile[0].password)
				) {
					return profile[0];
				} else {
					return { error: "Invalid Password" };
				}
			})
			.catch((err) => console.log(err));
	} else {
		return User.find({ username })
			.then((profile: any) => {
				if (
					profile.length !== 0 &&
					bcrypt.compareSync(password, profile[0].password)
				) {
					return profile[0];
				} else {
					return { error: "Invalid Password" };
				}
			})
			.catch((err) => console.log(err));
	}
};

// Mutation
const Mutation = {
	registerUser,
	loginUser,
};

export default Mutation;

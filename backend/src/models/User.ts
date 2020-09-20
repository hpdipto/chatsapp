import mongoose from "mongoose";
import { UserType } from "../TYPES";

const Schema = mongoose.Schema;

const UserSchema: mongoose.Schema<UserType> = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	password2: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: Date,
	},
	activeStatus: {
		type: Boolean,
	},
	chatRooms: {
		type: [String],
	},
});

const User = mongoose.model("User", UserSchema);

export { User };

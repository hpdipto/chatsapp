import mongoose from "mongoose";
import { RoomType } from "../TYPES";

const Schema = mongoose.Schema;

const RoomSchema: mongoose.Schema<RoomType> = new Schema({
	roomName: {
		type: String,
		required: true,
	},
	roomId: {
		type: String,
		required: true,
		unique: true,
	},
	users: {
		type: [String],
		required: true,
	},
	admins: {
		type: [String],
		required: true,
	},
	blockedUsers: {
		type: [String],
	},
	chats: {
		type: [Object],
	},
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;

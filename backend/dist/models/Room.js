"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const RoomSchema = new Schema({
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
const Room = mongoose_1.default.model("Room", RoomSchema);
exports.default = Room;

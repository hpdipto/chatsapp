"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
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
    queryKey: {
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
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;

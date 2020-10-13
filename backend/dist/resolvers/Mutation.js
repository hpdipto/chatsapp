"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Room_1 = __importDefault(require("../models/Room"));
// 'registerUser' resolver
const registerUser = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    let newUser = new User_1.User(Object.assign(Object.assign({}, args.user), { password: bcrypt_1.default.hashSync(args.user.password, 11), password2: bcrypt_1.default.hashSync(args.user.password2, 11), queryKey: uuid_1.v4() }));
    try {
        let savedUser = yield newUser.save();
        return savedUser;
    }
    catch (e) {
        if (e.keyValue.hasOwnProperty("email")) {
            return Object.assign(Object.assign({}, args.user), { password: "", password2: "", message: "Email already exist" });
        }
        if (e.keyValue.hasOwnProperty("username")) {
            return Object.assign(Object.assign({}, args.user), { password: "", password2: "", message: "Username already taken" });
        }
    }
});
// resolvers for chat Room
const createRoom = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    let newRoom = new Room_1.default(Object.assign({}, args.room));
    try {
        let savedRoom = yield newRoom.save();
        // update user field too
        let userId = mongoose_1.default.Types.ObjectId(Object.assign({}, args.room)["admins"][0]);
        let updateUser = yield User_1.User.findByIdAndUpdate(userId, { $push: { chatRooms: savedRoom.id } }, { new: true });
        return savedRoom;
    }
    catch (e) {
        if (e.keyValue.hasOwnProperty("roomId")) {
            return Object.assign(Object.assign({}, args.room), { id: Object.assign({}, args.room)["admins"][0], message: "Room ID already taken" });
        }
    }
});
// 'joinRoom' resolver
const joinRoom = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, queryKey, roomId } = args.joinRoomCredentials;
    var errorObject = {
        id: "",
        roomName: "",
        roomId: "",
        users: [""],
        admins: [""],
        message: "",
    };
    const user = yield User_1.User.findById(mongoose_1.default.Types.ObjectId(userId));
    //@ts-ignore
    if (user !== null && user.queryKey === queryKey) {
        const room = yield Room_1.default.findByIdAndUpdate(mongoose_1.default.Types.ObjectId(roomId), { $push: { users: mongoose_1.default.Types.ObjectId(userId) } }, { new: true });
        if (room !== null) {
            const updateUserInfo = yield User_1.User.findByIdAndUpdate(mongoose_1.default.Types.ObjectId(userId), { $push: { chatRooms: mongoose_1.default.Types.ObjectId(roomId) } }, { new: true });
            return room;
        }
        else {
            errorObject.message = "Room not found";
            return errorObject;
        }
    }
    else {
        errorObject.message = "User not found or credentials missing";
        return errorObject;
    }
});
// 'sendText' resolver
const sendText = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, userName, userId, queryKey, text, time } = args.textBody;
    var room = yield Room_1.default.findByIdAndUpdate(mongoose_1.default.Types.ObjectId(roomId), { $push: { chats: args.textBody } }, { new: true });
    const newChat = {
        userName: userName,
    };
    if (room === null) {
        newChat["message"] = "Room not found";
    }
    else {
        newChat["userId"] = userId;
        newChat["text"] = text;
        newChat["time"] = time;
        newChat["message"] = "Message send successfully";
    }
    context.pubsub.publish(roomId, { newChatSubscription: newChat });
    return newChat;
});
// Mutation
const Mutation = {
    registerUser,
    createRoom,
    joinRoom,
    sendText,
};
exports.default = Mutation;

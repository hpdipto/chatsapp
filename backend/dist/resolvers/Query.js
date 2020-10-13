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
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Room_1 = __importDefault(require("../models/Room"));
// Resolver for getting all user
const allUser = (parent, args, context) => {
    return User_1.User.find({});
};
// Resolver for getting a particular user
const getUser = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, key } = args.userCredentials;
    let user = yield User_1.User.findById(id);
    // user data is in _doc field
    user = user._doc;
    if (user !== null && user.queryKey === key) {
        // if id and queryKey matched then return user
        // except password, password2 and queryKey
        let userData = Object.assign({}, user);
        delete userData.password;
        delete userData.password2;
        delete userData.queryKey;
        return userData;
    }
    else {
        throw new apollo_server_express_1.ApolloError("Authentication Failed");
    }
});
// Resolver for chat Room
const allRooms = () => {
    return Room_1.default.find({});
};
// Resolver for retrieving data of a particular room
const getRoomsData = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomIds, userId } = args.roomCredentials;
    let roomData = [];
    for (var r = 0; r < roomIds.length; r++) {
        let room = yield Room_1.default.findById(mongoose_1.default.Types.ObjectId(roomIds[r]));
        //@ts-ignore
        let roomUsers = room.users;
        for (var i = 0; i < roomUsers.length; i++) {
            if (roomUsers[i] === userId.toString()) {
                roomData.push(room);
                break;
            }
        }
        // if user not found in the room
        if (i === roomUsers.length) {
            roomData.push({
                id: room.id,
                roomName: room.roomName,
                roomId: room.roomId,
                users: [],
                admins: [],
                blockedUser: [],
                message: "Unauthorized user",
            });
        }
    }
    if (roomData.length) {
        return roomData;
    }
    else {
        return [];
    }
});
// Resolver for getting not joined rooms for a particular user
const getNotJoinedRooms = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomIds, userId } = args.roomCredentials;
    var roomIDs = [];
    for (var i = 0; i < roomIds.length; i++) {
        roomIDs.push(mongoose_1.default.Types.ObjectId(roomIds[i]));
    }
    // console.log(roomIDs);
    var notJoinedRooms = yield Room_1.default.find({ _id: { $nin: roomIDs } });
    return notJoinedRooms;
});
const Query = {
    allUser,
    getUser,
    allRooms,
    getRoomsData,
    getNotJoinedRooms,
};
exports.default = Query;

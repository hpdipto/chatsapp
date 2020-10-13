"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStrategy = require("passport-local").Strategy;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../models/User");
function passportConfig() {
    passport_1.default.use(new LocalStrategy({ usernameField: "emailOrUserName" }, (emailOrUserName, password, done) => {
        let email = undefined;
        let username = undefined;
        emailOrUserName.includes("@")
            ? (email = emailOrUserName)
            : (username = emailOrUserName);
        if (email) {
            User_1.User.findOne({ email }).then((user) => {
                if (!user) {
                    return done(null, false, { message: "Email is not registered" });
                }
                // Match password
                bcrypt_1.default.compare(password, user.password, (err, isMatch) => {
                    if (err)
                        throw err;
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: "Password incorrect" });
                    }
                });
            });
        }
        else {
            User_1.User.findOne({ username }).then((user) => {
                if (!user) {
                    return done(null, false, { message: "Username is not found" });
                }
                // Match password
                bcrypt_1.default.compare(password, user.password, (err, isMatch) => {
                    if (err)
                        throw err;
                    if (isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: "Password incorrect" });
                    }
                });
            });
        }
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        User_1.User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
exports.default = passportConfig;

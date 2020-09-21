const LocalStrategy = require("passport-local").Strategy;
import bcrypt from "bcrypt";
import passport from "passport";

import { User } from "../models/User";

export default function passportConfig() {
	passport.use(
		new LocalStrategy(
			{ usernameField: "emailOrUserName" },
			(emailOrUserName: string, password: string, done: any) => {
				let email = undefined;
				let username = undefined;

				emailOrUserName.includes("@")
					? (email = emailOrUserName)
					: (username = emailOrUserName);

				if (email) {
					User.findOne({ email }).then((user: any) => {
						if (!user) {
							return done(null, false, { message: "Email is not registered" });
						}

						// Match password
						bcrypt.compare(password, user.password, (err, isMatch) => {
							if (err) throw err;

							if (isMatch) {
								return done(null, user);
							} else {
								return done(null, false, { message: "Password incorrect" });
							}
						});
					});
				} else {
					User.findOne({ username }).then((user: any) => {
						if (!user) {
							return done(null, false, { message: "Username is not found" });
						}

						// Match password
						bcrypt.compare(password, user.password, (err, isMatch) => {
							if (err) throw err;

							if (isMatch) {
								return done(null, user);
							} else {
								return done(null, false, { message: "Password incorrect" });
							}
						});
					});
				}
			}
		)
	);

	passport.serializeUser((user: any, done: any) => {
		done(null, user.id);
	});

	passport.deserializeUser((id: any, done: any) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
}

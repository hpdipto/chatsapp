import fs from "fs";
import path from "path";
import express, { Application, Request, Response, NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import morgan from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

// Passport Configuration
import passportConfig from "./config/passport.config";
passportConfig();

// DB Configuration
const URI: string = "mongodb://localhost/ChaptsApp";
mongoose
	.connect(URI, { useNewUrlParser: true })
	.then(() => console.log(`MongoDB connected successfully!`))
	.catch((err) => console.log(err));

// Express App setup
const app: Application = express();

// Express session
app.use(
	session({
		secret: "SSHHH!!!",
		saveUninitialized: true,
		resave: false,
		cookie: { sameSite: "strict", secure: false },
	})
);

// Body parser
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Morgan middleware
app.use(morgan("dev"));

// // context
const authenticator = (req: Request, res: Response, next: NextFunction) => ({
	req,
});

// loading schema file, typeDefs and resolvers
const schemaFile = path.join(__dirname, "./schemas/UserSchema.gql");
const typeDefs = fs.readFileSync(schemaFile, "utf-8");
import resolvers from "./resolvers/resolvers";

// graphQL server setup
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authenticator,
});

// graphQL server middleware
server.applyMiddleware({ app, path: "/graphql" });

// Home route
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to ChaptsApp");
});

// login route, can't handle it on graphql
app.post("/authenticate", (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate("local", (e, user, info) => {
		if (e) return next(e);
		if (info) return res.send(info);
		req.logIn(user, (e) => {
			if (e) return next(e);
			res.send(user);
		});
	})(req, res, next);
});

// get current user route
app.get("/user", (req: Request, res: Response) => {
	res.send(req.session);
});

// PORT setup
const PORT: string | number = process.env.PORT || 5000;

// server start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

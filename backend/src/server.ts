import fs from "fs";
import path from "path";
import express, { Application, Request, Response, NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import ConnectMongo from "connect-mongo";
// import ejs from "ejs";

// Connect mongo initialization
var MongoStore = ConnectMongo(session);

// Passport Configuration
import passportConfig from "./config/passport.config";
passportConfig();

// DB Configuration
const URI: string = "mongodb://localhost/ChaptsApp";
mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => console.log(`MongoDB connected successfully!`))
	.catch((err) => console.log(err));

// Express App setup
const app: Application = express();

// Cors
app.use(cors());

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static folder
// app.use(express.static("public"));
// app.set("view engine", "ejs");

// Express session
app.use(
	session({
		secret: "SSHHH!!!",
		saveUninitialized: false,
		resave: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

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
	// res.render("home");
});

// login route, can't handle it on graphql
// reference: https://stackoverflow.com/a/57540210/9481106
app.post("/authenticate", (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate("local", (e, user, info) => {
		if (e) return next(e);
		if (info) return res.send(info);
		req.logIn(user, (e) => {
			if (e) return next(e);
			// only sending userId
			res.send(user.id);
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

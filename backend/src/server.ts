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
// The gem for CORS setup: https://stackoverflow.com/a/46412839/9481106
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// context for apollo server - may be won't need
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

// Routes
import routes from "./routes/authentication";

// Home route
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to ChaptsApp");
});

app.use(routes);

// PORT setup
const PORT: string | number = process.env.PORT || 5000;

// server start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

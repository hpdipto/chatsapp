import fs from "fs";
import path from "path";
import http from "http";
import express, { Application, Request, Response, NextFunction } from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
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

// GraphQL subscription
export const pubsub = new PubSub();

// loading schema file, typeDefs and resolvers
const userScemaFile = path.join(__dirname, "./schemas/UserSchema.gql");
let typeDefs = fs.readFileSync(userScemaFile, "utf-8");

const roomSchemaFile = path.join(__dirname, "./schemas/RoomSchema.gql");
typeDefs = typeDefs + "\n" + fs.readFileSync(roomSchemaFile, "utf-8");

const queryAndMutationFile = path.join(
	__dirname,
	"./schemas/QueryAndMutation.gql"
);
typeDefs = typeDefs + "\n" + fs.readFileSync(queryAndMutationFile, "utf-8");

import resolvers from "./resolvers/resolvers";

// graphQL server setup
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: { pubsub },
});

// graphQL server middleware
server.applyMiddleware({ app, path: "/graphql" });

// server for subscription
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

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
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

httpServer.listen(PORT, () => {
	console.log(
		`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
	);
	console.log(
		`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
	);
});

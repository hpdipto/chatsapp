"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
// Connect mongo initialization
var MongoStore = connect_mongo_1.default(express_session_1.default);
// Passport Configuration
const passport_config_1 = __importDefault(require("./config/passport.config"));
passport_config_1.default();
// DB Configuration
// const URI: string = "mongodb://localhost/ChaptsApp";
const URI = "mongodb+srv://admin:admin123@chatsapp.wt8jk.mongodb.net/ChatsApp?retryWrites=true&w=majority";
mongoose_1.default
    .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log(`MongoDB connected successfully!`))
    .catch((err) => console.log(err));
// Express App setup
const app = express_1.default();
// Cors
// The gem for CORS setup: https://stackoverflow.com/a/46412839/9481106
app.use(cors_1.default({
    origin: "http://localhost:3000",
    credentials: true,
}));
// Body parser
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Express session
app.use(express_session_1.default({
    secret: "SSHHH!!!",
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose_1.default.connection }),
}));
// Passport middleware
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Morgan middleware
app.use(morgan_1.default("dev"));
// context for apollo server - may be won't need
const authenticator = (req, res, next) => ({
    req,
});
// GraphQL subscription
exports.pubsub = new apollo_server_express_1.PubSub();
// loading schema file, typeDefs and resolvers
const userScemaFile = path_1.default.join(__dirname, "./schemas/UserSchema.gql");
let typeDefs = fs_1.default.readFileSync(userScemaFile, "utf-8");
const roomSchemaFile = path_1.default.join(__dirname, "./schemas/RoomSchema.gql");
typeDefs = typeDefs + "\n" + fs_1.default.readFileSync(roomSchemaFile, "utf-8");
const queryAndMutationFile = path_1.default.join(__dirname, "./schemas/QueryAndMutation.gql");
typeDefs = typeDefs + "\n" + fs_1.default.readFileSync(queryAndMutationFile, "utf-8");
const resolvers_1 = __importDefault(require("./resolvers/resolvers"));
// graphQL server setup
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.default,
    context: { pubsub: exports.pubsub },
});
// graphQL server middleware
server.applyMiddleware({ app, path: "/graphql" });
// server for subscription
const httpServer = http_1.default.createServer(app);
server.installSubscriptionHandlers(httpServer);
// Routes
const authentication_1 = __importDefault(require("./routes/authentication"));
// Home route
app.get("/", (req, res) => {
    res.send("Welcome to ChaptsApp");
});
app.use(authentication_1.default);
// PORT setup
const PORT = process.env.PORT || 5000;
// server start
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});

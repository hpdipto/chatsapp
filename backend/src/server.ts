import fs from "fs";
import path from "path";
import express, { Application, Request, Response, NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import morgan from "morgan";
import mongoose from "mongoose";

// DB Configuration
const URI: string = "mongodb://localhost/ChaptsApp";
mongoose
	.connect(URI, { useNewUrlParser: true })
	.then(() => console.log(`MongoDB connected successfully!`))
	.catch((err) => console.log(err));

// loading schema file, typeDefs and resolvers
const schemaFile = path.join(__dirname, "./schemas/UserSchema.gql");
const typeDefs = fs.readFileSync(schemaFile, "utf-8");
import resolvers from "./resolvers/resolvers";

// graphQL server setup
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Express App setup
const app: Application = express();

// Morgan middleware
app.use(morgan("dev"));

// graphQL server middleware
server.applyMiddleware({ app, path: "/graphql" });

// Home route
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to ChaptsApp");
});

// PORT setup
const PORT: string | number = process.env.PORT || 5000;

// server start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

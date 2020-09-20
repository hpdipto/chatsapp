import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import mongoose from "mongoose";

// DB Configuration
const URI: string = "mongodb://localhost/ChaptsApp";
mongoose
	.connect(URI, { useNewUrlParser: true })
	.then(() => console.log(`MongoDB connected successfully!`))
	.catch((err) => console.log(err));

// Express App setup
const app: Application = express();

// Morgan middleware
app.use(morgan("dev"));

// Home route
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome to ChaptsApp");
});

// PORT setup
const PORT: string | number = process.env.PORT || 5000;

// server start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

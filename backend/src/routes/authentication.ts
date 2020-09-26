import express, { Application, Request, Response, NextFunction } from "express";
import passport from "passport";
const router = express.Router();

// login route, can't handle it on graphql
// reference: https://stackoverflow.com/a/57540210/9481106
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate("local", (e, user, info) => {
		if (e) return next(e);
		if (info) return res.send(info);
		req.logIn(user, (e) => {
			if (e) return next(e);
			// only sending userId and queryKey
			res.json({ id: user.id, queryKey: user.queryKey });
		});
	})(req, res, next);
});

// logout
router.get("/logout", (req: any, res: Response) => {
	req.logOut();
	req.session.destroy();
	res.send("logged out");
});

// get current user route
router.get("/user", (req: Request | any, res: Response) => {
	if (req.isAuthenticated()) {
		res.json({ userId: req.user.id, queryKey: req.user.queryKey });
	} else {
		res.json({ message: "user unauthorized" });
	}
});

export default router;

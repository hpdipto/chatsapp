"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
// login route, can't handle it on graphql
// reference: https://stackoverflow.com/a/57540210/9481106
router.post("/login", (req, res, next) => {
    passport_1.default.authenticate("local", (e, user, info) => {
        if (e)
            return next(e);
        if (info)
            return res.send(info);
        req.logIn(user, (e) => {
            if (e)
                return next(e);
            // only sending userId and queryKey
            res.json({ id: user.id, queryKey: user.queryKey });
        });
    })(req, res, next);
});
// logout
router.get("/logout", (req, res) => {
    req.logOut();
    req.session.destroy();
    res.send("logged out");
});
// get current user route
router.get("/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ userId: req.user.id, queryKey: req.user.queryKey });
    }
    else {
        res.json({ message: "user unauthorized" });
    }
});
exports.default = router;

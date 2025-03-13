"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const sessionRoutes = express_1.default.Router();
const user = { id: 1, username: 'user' };
sessionRoutes.use((0, express_session_1.default)({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
    },
}));
sessionRoutes.post('/login', (req, res) => {
    req.session.userId = user.id;
    res.json({ user });
});
sessionRoutes.post('/verify', (req, res) => {
    if (req.session.userId) {
        res.json({
            user,
        });
        return;
    }
    res.status(401).json({ message: 'Unauthorized: Please login' });
});
sessionRoutes.post('/logout', (req, res) => {
    if (req.session.userId) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ message: 'Error logging out' });
                return;
            }
            res.clearCookie('connect.sid');
            res.json({ message: 'Logout successful' });
            return;
        });
    }
    else {
        res.status(401).json({ message: 'Unauthorized: Please login' });
    }
});
exports.default = sessionRoutes;

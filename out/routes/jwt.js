"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = __importDefault(require("../helper/jwt"));
const jwtRoutes = express_1.default.Router();
const user = { id: 1, username: 'user' };
jwtRoutes.post('/login', async (req, res) => {
    const token = await jwt_1.default.generateToken(user, '1d');
    res.json({ token });
});
jwtRoutes.post('/verify', express_1.default.json(), async (req, res) => {
    const token = req.body.token;
    const decoded = await jwt_1.default.verifyToken(token);
    res.json({ decoded });
});
jwtRoutes.post('/verify-header', async (req, res) => {
    const authorization = console.log(req.header);
    const token = req.body.token;
    const decoded = await jwt_1.default.verifyToken(token);
    res.json({ headers: req.headers });
});
exports.default = jwtRoutes;

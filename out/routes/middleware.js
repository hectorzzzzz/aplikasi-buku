"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonRoute = express_1.default.Router();
//untuk kirim data, pakai POST, PUT, PATCH
jsonRoute.post('/', (req, res) => {
    res.json({
        body: req.body,
    });
});
exports.default = jsonRoute;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routerQueries = express_1.default.Router();
routerQueries.get('/', (req, res) => {
    if (req.query.search)
        console.log('search', req.query.search);
    res.json({
        message: 'success',
        data: req.query,
    });
});
exports.default = routerQueries;

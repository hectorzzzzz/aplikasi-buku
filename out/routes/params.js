"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routerParams = express_1.default.Router();
routerParams.get('/:id', (req, res) => {
    // coba dapetin params `id`
    if (req.params.id)
        console.log('params id:', req.params.id);
    res.json({
        message: 'success',
        data: req.params,
    });
});
routerParams.get('/', (req, res) => {
    // coba dapetin params `id`
    res.json({
        message: 'success',
        data: 'root endpoint /params',
    });
});
routerParams.get('/:firstId/:secondId', (req, res) => {
    // coba dapetin params `firstId`
    if (req.params.firstId)
        console.log('params firstId:', req.params.firstId);
    // coba dapetin params `secondId`
    if (req.params.secondId)
        console.log('params secondId:', req.params.secondId);
    res.json({
        message: 'success',
        data: req.params,
    });
});
exports.default = routerParams;

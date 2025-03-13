"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = async (payload, expiresIn) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, 'secret_key', {
            expiresIn,
        }, function (err, token) {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};
const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, 'secret_key', (err, decodeToken) => {
            if (err) {
                return reject(err);
            }
            resolve(decodeToken);
        });
    });
};
exports.default = {
    generateToken,
    verifyToken,
};

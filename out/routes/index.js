"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// contoh crud untuk endpoint /books
let books = [];
const routerBooks = express_1.default.Router();
routerBooks.get('/', (req, res) => {
    res.json({
        message: 'success',
        data: books,
    });
});
routerBooks.post('/', (req, res) => {
    const book = req.body;
    book.id = crypto.randomUUID();
    books.push(book);
    res.status(201).json({
        message: 'success',
        data: null,
    });
});
routerBooks.get('/:id', (req, res) => {
    const bookId = req.params.id;
    const book = books.find(({ id }) => id === bookId);
    res.json({
        message: 'success',
        data: book,
    });
});
routerBooks.delete('/:id', (req, res) => {
    const bookId = req.params.id;
    books = books.filter(({ id }) => id !== bookId);
    res.json({
        message: 'success',
        data: null,
    });
});
exports.default = routerBooks;

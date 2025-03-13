"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const queries_1 = __importDefault(require("./routes/queries"));
const params_1 = __importDefault(require("./routes/params"));
const middleware_1 = __importDefault(require("./routes/middleware"));
const jwt_1 = __importDefault(require("./routes/jwt"));
const app = (0, express_1.default)();
const port = 3000;
// middleware untuk parsing payload json
const jsonParser = express_1.default.json();
app.use(jsonParser);
app.use('/books', index_1.default);
app.use('/queries', queries_1.default);
app.use('/params', params_1.default);
app.use('/json', middleware_1.default);
app.use('/jwt', jwt_1.default);
const homePageHandler = (_req, res) => {
    res.json({
        message: 'hello from Express',
    });
};
app.get('/', homePageHandler);
app.get('/hello', homePageHandler);
// mengambil query dari url
app.get('/query', (req, res) => {
    const query = req.query;
    res.json({
        query,
    });
});
// mengambil params dari url
// app.get('/:username', (req, res) => {
//   const params = req.params
//   res.json({
//     params,
//   })
// })
// mengambil params dari url
// app.post('/', (req, res) => {
//   const body = req.body
//   console.info(body.name)
//   res.json({
//     body,
//   })
// })
// mengambil params dari url
app.post('/json', jsonParser, (req, res) => {
    const body = req.body;
    console.info(body.name);
    res.json({
        body,
    });
});
// middleware error
const errorLogger = (err, _req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: err.message,
    });
    next();
};
app.use(errorLogger);
app.listen(port, () => {
    console.info('Server running at port ', port);
});

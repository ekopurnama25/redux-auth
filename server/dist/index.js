"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
const Express = require('express');
require("./config/typeorm");
const AuthRouter_1 = __importDefault(require("./router/AuthRouter"));
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = Express();
const corsOptions = {
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookie_parser_1.default());
app.use(Express.json());
app.use('/api', UserRouter_1.default);
app.use('/api', AuthRouter_1.default);
app.listen(5000, () => {
    try {
        console.log("Server Is Connection");
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=index.js.map
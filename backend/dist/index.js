"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import ejs from "ejs"
const ejs = require('ejs');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require('./app/config/database');
const app = (0, express_1.default)();
const port = process.env.PORT;
const route_1 = __importDefault(require("./app/route"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', route_1.default);
app.set('view engine', 'ejs');
app.engine('ejs', ejs.__express);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

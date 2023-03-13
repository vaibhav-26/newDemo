import express, { Express, Request, Response } from 'express';
import cors from 'cors';
// import ejs from "ejs"
const ejs = require('ejs');
import dotenv from 'dotenv';
dotenv.config();
require('./app/config/database');

const app: Express = express();
const port = process.env.PORT;

import indexRouter from './app/route';
import path from 'path';
app.use(express.json());
app.use(cors());
app.use('/', indexRouter);
app.set('view engine', 'ejs');
app.engine('ejs', ejs.__express);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

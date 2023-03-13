"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(process.env.DATABASE_URL);
const db = mongoose_1.default.connection;
db.on("connected", function () {
    console.log("database is connected successfully");
});
db.on("disconnected", function () {
    console.log("database is disconnected successfully");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));
exports.default = db;

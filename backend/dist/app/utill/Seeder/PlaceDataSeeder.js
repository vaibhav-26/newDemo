"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const placedata_json_1 = __importDefault(require("../json/placedata.json"));
const mongoose_1 = __importDefault(require("mongoose"));
const Location_1 = __importDefault(require("../../Models/Location"));
const Floor_1 = __importDefault(require("../../Models/Floor"));
const Wing_1 = __importDefault(require("../../Models/Wing"));
const Desk_1 = __importDefault(require("../../Models/Desk"));
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(`mongodb://localhost:27017/vdesk`);
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    placedata_json_1.default.location.map((location) => __awaiter(void 0, void 0, void 0, function* () {
        const locationData = yield Location_1.default.create({
            name: location.name,
        });
        location.floor.map((floor) => __awaiter(void 0, void 0, void 0, function* () {
            const floorData = yield Floor_1.default.create({
                name: floor.name,
                locationId: locationData._id,
            });
            floor.wings.map((wing) => __awaiter(void 0, void 0, void 0, function* () {
                const wingData = yield Wing_1.default.create({
                    name: wing.name,
                    floorId: floorData._id,
                    locationId: locationData._id,
                });
                wing.desks.map((desk) => __awaiter(void 0, void 0, void 0, function* () {
                    const deskData = yield Desk_1.default.create({
                        name: desk.name,
                        row: desk.row,
                        floorId: floorData._id,
                        locationId: locationData._id,
                        wingId: wingData._id,
                    });
                }));
            }));
        }));
    }));
});
seedDB().then((data) => {
    // mongoose.connection.close()
});

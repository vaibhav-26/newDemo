import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    locationId: { type: Schema.Types.ObjectId, ref: "Location" },
    floorId: { type: Schema.Types.ObjectId, ref: "Floor" },
    wingId: { type: Schema.Types.ObjectId, ref: "Wing" },
    row: String,
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
});

export default mongoose.model('Desk', schema);
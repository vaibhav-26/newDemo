import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    deskId: { type: Schema.Types.ObjectId, ref: "Desk" },
    wingId: { type: Schema.Types.ObjectId, ref: "Wing" },
    floorId: { type: Schema.Types.ObjectId, ref: "Floor" },
    locationId: { type: Schema.Types.ObjectId, ref: "Location" },
    requestedUserId: { type: Schema.Types.ObjectId, ref: "User" },
    approvedUserId: { type: Schema.Types.ObjectId, ref: "User" },
    status: String,
    priority: String,
    approvedAt: String,
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
});

export default mongoose.model('AllocationHistory', schema);
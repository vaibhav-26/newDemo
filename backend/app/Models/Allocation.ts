import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    deskId: { type: Schema.Types.ObjectId, ref: 'Desk' },
    wingId: { type: Schema.Types.ObjectId, ref: 'Wing' },
    floorId: { type: Schema.Types.ObjectId, ref: 'Floor' },
    locationId: { type: Schema.Types.ObjectId, ref: 'Location' },
    projectName: String,
    description: String,
    status: String,
    priority: String,
    approvedAt: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
  }
);

schema.virtual('user', {
  ref: 'User',
  foreignField: '_id',
  localField: 'userId',
});

export default mongoose.model('Allocation', schema);

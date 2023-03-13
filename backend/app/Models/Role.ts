import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: String,
    permissions: {
      name: String,
      isActive: {
        type: Boolean,
        default: true,
      },
    },
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

export default mongoose.model('Allocation', schema);

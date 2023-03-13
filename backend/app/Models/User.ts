import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    email: String,
    phoneNumber: String,
    role: String,
    profilePic: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    token: String,
    otp: { type: Number, select: false },
    lastOtpDate: { type: String, select: false },
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
  }
);

export default mongoose.model('User', schema);

import mongoose from 'mongoose';

mongoose.set("strictQuery", true);

mongoose.connect(process.env.DATABASE_URL!);

const db = mongoose.connection;

db.on("connected", function () {
  console.log("database is connected successfully");
});
db.on("disconnected", function () {
  console.log("database is disconnected successfully");
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default db;
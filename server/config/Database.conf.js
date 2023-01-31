import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose.connect(process.env.mongooseURL)
    .then(() => console.log("Connection is successfully"))
    .catch((err) => console.log("Connection is failure",err))
    mongoose.set('strictQuery', false);
}
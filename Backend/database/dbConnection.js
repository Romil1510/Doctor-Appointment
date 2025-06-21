import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Doctor_appoiment",
    }).then(() => {
        console.log("DB connected");
    }).catch((err) => {
        console.log(`error occurred: ${err}`);
    });
};

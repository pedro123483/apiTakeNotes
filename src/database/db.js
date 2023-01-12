import mongoose from "mongoose";

export const connectToDatabase = () => {
    console.log("Waiting connecting to database...");

    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(process.env.CONNECTION_STRING, params).then(() => console.log("Connected succesfully to the database!")).catch((error) => console.log(error));
};
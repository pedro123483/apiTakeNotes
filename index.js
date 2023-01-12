import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectToDatabase } from "./src/database/db.js";
import userRoute from "./src/routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
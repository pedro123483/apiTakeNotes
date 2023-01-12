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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});

app.use("/user", userRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
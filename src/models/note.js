import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
});

export const noteModel = mongoose.model("note", noteSchema);
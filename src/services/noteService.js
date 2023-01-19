import { noteModel } from "../models/note.js";

const create = (body) => noteModel.create(body);
const getAll = () => noteModel.find().populate("user");
const getByUserId = (id) => noteModel.find({ user: id }).sort({ _id: -1 }).populate("user");
const deleteNote = (id) => noteModel.findOneAndDelete({ _id: id });

export default {
    create,
    getAll,
    getByUserId,
    deleteNote,
};
import { noteModel } from "../models/note.js";

const create = (body) => noteModel.create(body);
const getAll = () => noteModel.find().populate("user");
const getByUserId = (id) => noteModel.find({ user: id }).populate("user");

export default {
    create,
    getAll,
    getByUserId,
};
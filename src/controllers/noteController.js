import noteService from "../services/noteService.js";
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const create = async (request, response) => {
    try {
        const { title, category, user } = request.body;
        let explanation = "";

        if(!title || !category || !user) {
            response.status(400).send({
                message: "Please, submit all the fields required!",
            })
        }

        const resultExplanation = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `O que é ${title}? Explique detalhadamente.`,
            temperature: 0.6,
            max_tokens: 2000
        });

        explanation = resultExplanation.data.choices[0].text;

        request.body.explanation = explanation;

        const note = await noteService.create(request.body);

        if(!note) {
            response.status(400).send({ message: "Error creating note!" });
        }

        response.status(201).send({
            message: "Note successfully created!",
            note: {
                id: note._id,
                title: note.title,
                explanation: note.explanation,
                category: note.category,
                user: note.user,
            }
        });
    } catch (error) {
        response.status(500).send({
            message: error.message,
        });   
    }
};

const getAll = async (request, response) => {
    try {
        const notes = await noteService.getAll();
        
        if(notes.length === 0) {
            return response.status(404).send({
                message: "There is no notes in the database",
            });
        }

        response.send(notes);
    } catch (error) {
        response.status(500).send({
            message: error.message,
        });
    }
};

const getByUserId = async (request, response) => {
    try {
        const { userId } = request.params;

        const notes = await noteService.getByUserId(userId);

        if(notes.length === 0) {
            return response.status(404).send({
                message: "This user there is no notes!",
            });
        }

        response.send(notes);
    } catch (error) {
        response.status(500).send({
            message: error.message,
        });
    }
};

export default {
    create,
    getAll,
    getByUserId,
};
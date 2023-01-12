import userService from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const create = async (request, response) => {
    try {
        const { firstName, lastName, email, password } = request.body;

        if(!firstName || !lastName || !email || !password) {
            response.status(400).send({ message: "Please, submit all the fields required!" });
        }

        const user = await userService.create(request.body);

        if(!user) {
            return response.status(400).send({ message: "Error creating user!" });
        }

        response.status(201).send({
            message: "User successfully created!",
            user: {
                id: user._id,
                firstName,
                lastName,
                email,
            },
        });
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await userService.findUser(email);

        if(!user) {
            return response.status(404).send({ message: "There is no user with this email!" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if(!passwordIsValid) {
            return response.status(400).send({
                message: "Password does not match!",
            });
        }

        const token = jwt.sign({
            userId: user._id,
            userEmail: user.email,
            userFirstName: user.firstName,
            userLastName: user.lastName,
        }, "RANDOM-TOKEN", { expiresIn: 86400 } );

        response.status(200).send({
            message: "Login successfull!",
            userEmail: user.email,
            token: token
        });

    } catch (error) {
        response.status(500).send({ message: error.message });
    }
};

const authUser = (request, response) => {
    try {
        response.status(200).send({
            user: request.user,
        });
    } catch (error) {
        return response.status(500).send({ message: error.message });      
    }
};

export default {
    create,
    login,
    authUser,
};
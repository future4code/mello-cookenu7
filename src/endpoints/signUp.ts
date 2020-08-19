import { Request, Response } from "express";
import { idGenerator } from "../services/idGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const signUp = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        if (!name || !email || !password) {
            throw new Error ("Insert all required informations");
        }

        if (email.indexOf("@") === -1) {
            throw new Error ("Invalid e-mail");
        }

        const generateId = new idGenerator;
        const id = generateId.generateId();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password)

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(
            id,
            name,
            email,
            hashPassword
        );

        const authenticator = new Authenticator;
        const token = authenticator.generateToken({ id })

        res
            .status(200)
            .send({
                message: "User create successfully!",
                token
            })
    } catch(error) {
        res
            .status(400)
            .send({
                message: error.sqlMessage || error.message
            });
    } finally {
        await BaseDatabase.destroyConnection();
    }
};
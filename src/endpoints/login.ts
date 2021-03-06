import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserByEmail(email);

        const hashManager = new HashManager();
        const isPasswordCorrect = await hashManager.compare(password, user.password);

        if (!req.body.email || req.body.email.indexOf("@") === -1) {
            throw new Error("Invalid email");
        }

        if (!email || !isPasswordCorrect) {
            throw new Error ("User or password incorrect")
        }

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({ 
            id: user.id,
            role: user.role
        });

        res
            .status(200)
            .send({
                message: "User logged successfully!",
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
}
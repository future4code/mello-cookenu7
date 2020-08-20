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

        if (!isPasswordCorrect) {
            throw new Error ("User or password incorrect")
        }

        const token = Authenticator.generateToken({ 
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
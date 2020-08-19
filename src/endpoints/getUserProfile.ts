import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(authenticationData.id);

        res
            .status(200)
            .send({
                message: "Success!",
                userName: user.name,
                userEmail: user.email,
                userId: user.id,
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
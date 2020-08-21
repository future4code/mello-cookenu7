import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const getAnotherProfile = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const id = req.params.id;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(id);

        res
            .status(200)
            .send({
                name: user.name,
                email: user.email,
                id: user.id
            })
    } catch(error) {
        res
            .status(400)
            .send({
                message: error.sqlMessage || error.message
            })
    }  finally {
        await BaseDatabase.destroyConnection();
    }
}
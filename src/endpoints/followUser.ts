import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { FollowDatabase } from "../data/FollowDatabase";

export const followUser = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;

        const userIdToFollow = req.body.userIdToFollow;

        if (!userIdToFollow || userIdToFollow === "") {
            throw new Error("Incorrect id!")
        }

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token)

        const followDatabase = new FollowDatabase();
        await followDatabase.followUser(authenticationData.id, userIdToFollow)

        res
            .status(200)
            .send({
                message: "Congratulations! Now, you are following your friend."
            })
    } catch(error) {
        res
            .status(400)
            .send({
                message: error.sqlMessage || error.message
            })
    } finally {
        await BaseDatabase.destroyConnection();
    }
}
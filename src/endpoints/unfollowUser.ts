import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { FollowDatabase } from "../data/FollowDatabase";

export const unfollowUser = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;

        const userIdToUnfollow = req.body.userIdToUnfollow;

        if (!userIdToUnfollow || userIdToUnfollow === "") {
            throw new Error("Incorrect id!")
        }

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const followDatabase = new FollowDatabase();
        await followDatabase.unfollowUser(authenticationData.id, userIdToUnfollow)

        res
        .status(200)
        .send({
            message: "Unfollowing friend."
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
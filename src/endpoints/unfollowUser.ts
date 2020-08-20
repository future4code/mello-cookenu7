import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { FollowDatabase } from "../data/FollowDatabase";

export const unfollowUser = async (req: Request, res: Response) => {
    try {
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
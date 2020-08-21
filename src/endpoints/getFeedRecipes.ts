import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipeDatabase } from "../data/RecipeDatabase";

export default async function getFeedRecipes (req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const recipeDatabase = new RecipeDatabase();
        const feed = await recipeDatabase.getFeed(authenticationData.id)

        res
            .status(200)
            .send({
                message: "Feed",
                recipes: feed
            })
    } catch (error) {
        res
            .status(400)
            .send({
                message: error.sqlMessage || error.message
            })
    } finally {
        await BaseDatabase.destroyConnection();
    }
}
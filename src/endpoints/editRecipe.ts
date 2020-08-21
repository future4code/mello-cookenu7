import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipeDatabase } from "../data/RecipeDatabase";

export default async function editRecipe (req: Request, res: Response) {
    try {
        const { title, description } = req.body;

        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        if (title === "" || description === "") {
            throw new Error("Cannot have empty keys")
        } 

        const recipeDatabase = new RecipeDatabase();
        await recipeDatabase.editRecipe(
            authenticationData.id,
            title,
            description
        )

        res
            .status(200)
            .send({
                message: "Recipe edited successfully!",
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
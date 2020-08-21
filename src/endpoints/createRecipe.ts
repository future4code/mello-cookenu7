import { Request, Response } from "express";
import { idGenerator } from "../services/idGenerator";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export default async function createRecipe (req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string;

        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;

        if (!title || !description || !date) {
            throw new Error ("Insert all required informations");
        }

        const generateId = new idGenerator();
        const id = generateId.generateId();

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token)

        const recipeDatabase = new RecipeDatabase();
        await recipeDatabase.addRecipe(
            id,
            title,
            description,
            date,
            authenticationData.id
        );

        res
            .status(200)
            .send({
                message: "Recipe created successfully!",
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

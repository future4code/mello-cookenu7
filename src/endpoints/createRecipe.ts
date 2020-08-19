import { Request, Response } from "express";
import { idGenerator } from "../services/idGenerator";
import { RecipeDatabase } from "../data/RecipeDatabase";

export default async function createRecipe (req: Request, res: Response) {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const date = req.body.date;
        const creatorUserId = req.body.creatorUserId;

        if (!title || !description || !date) {
            throw new Error ("Insert all required informations");
        }

        const generateId = new idGenerator;
        const id = generateId.generateId();

        const recipeDatabase = new RecipeDatabase();
        await recipeDatabase.addRecipe(
            id,
            title,
            description,
            date,
            creatorUserId
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
    }
}

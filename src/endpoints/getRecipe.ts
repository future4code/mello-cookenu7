import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipeDatabase } from "../data/RecipeDatabase";
import moment from "moment";

export const getRecipe = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string;
        const id = req.params.id;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        const recipeDataBase = new RecipeDatabase;
        const recipe = await recipeDataBase.getRecipeById(id);

        const formattedDate = moment(recipe.date).format("DD/MM/YYYY")

        res
            .status(200)
            .send({
                title: recipe.title,
                description: recipe.description,
                date: formattedDate
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
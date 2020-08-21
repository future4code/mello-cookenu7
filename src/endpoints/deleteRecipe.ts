import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipeDatabase } from "../data/RecipeDatabase";

export default async function deleteRecipe (req: Request, res: Response) {
    try {
        const token = req.headers.authorization as string;
        const id = req.params.id;

        const authenticator = new Authenticator();
        const authenticationData = authenticator.getData(token);

        if (authenticationData.role !== "ADMIN") {
            throw new Error("Only an admin user can access this funcionality")
        }

        const recipeDatabase = new RecipeDatabase();
        await recipeDatabase.deleteRecipe(id);

        res
            .status(200)
            .send({
                message: "Recipe deleted successfully!",
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
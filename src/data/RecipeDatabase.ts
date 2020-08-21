import { BaseDatabase } from "./BaseDatabase";
import moment from "moment";

export class RecipeDatabase extends BaseDatabase {
    private static TABLE_NAME_RECIPES: string = "CookenuRecipes";

    public async addRecipe(
        id: string,
        title: string,
        description: string,
        date: moment.Moment,
        creatorUserId: string
    ) :Promise<void> {
        await this.getConnection()
            .insert({
                id,
                title,
                description,
                date: moment(date, "DD/MM/YYYY").format("YYYY-MM-DD"),
                creator_user_id: creatorUserId
            })
            .into(RecipeDatabase.TABLE_NAME_RECIPES)
    }

    public async getRecipeById(
        id: string
    ) :Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(RecipeDatabase.TABLE_NAME_RECIPES)
            .where({ id });

        return result[0]
    }

    public async deleteRecipe(
        id: string
    ) :Promise<any> {
        await this.getConnection()
        .delete()
        .from(RecipeDatabase.TABLE_NAME_RECIPES)
        .where({ id })
    }
}
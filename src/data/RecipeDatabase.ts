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
}
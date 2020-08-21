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
    
    public async getFeedRecipes(
        id: string
    ) :Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT
                u.id,
                u.name,
                r.id as recipe_id,
                r.title,
                r.description,
                r.date
            FROM 
                CookenuRecipes r
            JOIN
                CookenuUserFollow f ON r.user_id = f.user_id_to_follow
            JOIN
                CookenuUsers u ON f.user_id_to_follow = u.id
            WHERE 
                f.user_id = "${id}"
            ORDER BY
                date DESC;
        `)

        const feed = [];

        for(const item of result[0]) {
            
            const creationFormattedDate = moment(item.date). format("DD/MM/YYYY");

            feed.push({
                id:item.recipe_id,
                title: item.title,
                description: item.description,
                createdAt: creationFormattedDate,
                userId: item.user_to_follow_id,
                userName: item.name
            })
        }

        return feed;
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
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
    
    public async getFeed(
        id: string
    ) :Promise<any> {
        const result = await this.getConnection().raw(`
            SELECT
                f.user_id_to_follow,
                u.name,
                r.id,
                r.title,
                r.description,
                r.date
            FROM 
                CookenuRecipes r
            JOIN
                CookenuUserFollow f ON r.creator_user_id = f.user_id_to_follow
            JOIN
                CookenuUsers u ON f.user_id_to_follow = u.id
            WHERE 
                f.user_id = "${id}"
            ORDER BY
                date DESC;
        `);

        const feed = [];

        for(const item of result[0]) {
            
            const creationFormattedDate = moment(item.date).format("DD/MM/YYYY");

            feed.push({
                createdAt: creationFormattedDate,
                userName: item.name,
                title: item.title,
                description: item.description,
            })
        }

        return feed;
    }

    public async editRecipe(
        id: string,
        title: string,
        description: string
    ) :Promise<any> {
        let queryFields = [
            title && `title = ${title}`,
            description && `description = ${description}`
        ]

        queryFields = queryFields.filter(field => field)

        if(!queryFields.length) {
            throw new Error("Enter a value to edit")
        }

        await this.getConnection().raw(`
            UPDATE ${RecipeDatabase.TABLE_NAME_RECIPES}
            SET ${queryFields.join(",")}
            WHERE id = "${id}"
        `)
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
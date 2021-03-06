import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    private static TABLE_NAME_USERS: string = "CookenuUsers";

    public async createUser(
        id: string, 
        name: string, 
        email: string, 
        password: string,
        role?: string
    ) :Promise<void> {
        await this.getConnection()
            .insert({
                id,
                name,
                email,
                password,
                role
            })
            .into(UserDatabase.TABLE_NAME_USERS)
        
    }

    public async getUserByEmail(
        email: string
    ) :Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME_USERS)
            .where ({ email });

        return result[0];
    }

    public async getUserById(
        id: string
    ) :Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME_USERS)
            .where ({ id });

        return result[0];
    }
    public async getUser(
    ) :Promise<any> {
        const result = await this.getConnection()
            .select("*")
            .from(UserDatabase.TABLE_NAME_USERS)
            
        
        return result[0]  
    }
}
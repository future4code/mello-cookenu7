import { BaseDatabase } from "./BaseDatabase";

export class FollowDatabase extends BaseDatabase {
    private static TABLE_NAME_FOLLOW: string = "CookenuUserFollow";

    public async followUser(
        userId: string,
        userIdToFollow: string
    ) :Promise<void> {
        await this.getConnection()
            .insert({
                user_id: userId,
                user_id_to_follow: userIdToFollow
            })
            .into(FollowDatabase.TABLE_NAME_FOLLOW)
    }
}
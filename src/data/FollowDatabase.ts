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

    public async unfollowUser(
        userId: string,
        userIdToUnfollow: string
    ) :Promise<void> {
        await this.getConnection()
            .delete()
            .from(FollowDatabase.TABLE_NAME_FOLLOW)
            .where({
                user_id: userId,
                user_id_to_follow: userIdToUnfollow
            })
    }
}
import { BaseSQLModel } from "../../database/model/sqlmodel.base";
export default class MemberModel extends BaseSQLModel {
    private _recentName;
    private _recentNickname;
    private _active;
    private _joinTimestamp;
    private _discriminator;
    private _discordID;
    constructor(recentName: string, recentNickname: string, active: boolean, joinTimestamp: Date, discriminator: string, discordID: string, id?: string);
    get RecentName(): string;
    get RecentNickname(): string;
    get Active(): boolean;
    get JoinTimestamp(): Date;
    get Discriminator(): string;
    get DiscordID(): string;
}

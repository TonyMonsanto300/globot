import { GuildMember } from "discord.js";
import { BaseSQLModel } from "../../database/model/sqlmodel.base";

export default class MemberModel extends BaseSQLModel {
    private _recentName: string;
    private _recentNickname: string;
    private _active: boolean;
    private _joinTimestamp: Date;
    private _discriminator: string;
    private _discordID: string;

    //Generate a constructor that sates both of the above constructors
    constructor(recentName: string, recentNickname: string, active: boolean, joinTimestamp: Date, 
        discriminator: string, discordID: string,  id?: string) {
        super('members', id);
        this._recentName = recentName;
        this._recentNickname = recentNickname;
        this._active = active;
        this._joinTimestamp = joinTimestamp;
        this._discriminator = discriminator;
        this._discordID = discordID;
    }

    public get RecentName(): string {
        return this._recentName;
    }

    public get RecentNickname(): string {
        return this._recentNickname;
    }

    public get Active(): boolean {
        return this._active;
    }

    public get JoinTimestamp(): Date {
        return this._joinTimestamp;
    }

    public get Discriminator(): string {
        return this._discriminator;
    }

    public get DiscordID(): string {
        return this._discordID;
    }
}
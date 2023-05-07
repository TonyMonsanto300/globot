import { GuildMember } from "discord.js";
import MemberModel from "./Member.model";
export declare class DiscordMemberModel extends MemberModel {
    constructor(guildMember: GuildMember);
}

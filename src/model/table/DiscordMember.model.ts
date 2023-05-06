import { GuildMember } from "discord.js";
import MemberModel from "./Member.model";

export class DiscordMemberModel extends MemberModel {
    constructor(guildMember: GuildMember){
        super(guildMember.user.username, guildMember.nickname || guildMember.user.username, true, guildMember.joinedAt || new Date(), 
        guildMember.user.discriminator, guildMember.id);
    }
}
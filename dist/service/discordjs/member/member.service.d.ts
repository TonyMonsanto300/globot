import { GuildMember } from 'discord.js';
import { GuildService } from '../guild/guild.service';
export declare class MemberService {
    private guildService;
    constructor(guildService: GuildService);
    GetAllMembers(): Promise<import("@discordjs/collection").Collection<string, GuildMember>>;
    getMemberByID(id: string): Promise<GuildMember>;
}

import { GuildMember } from 'discord.js';
import { GuildService } from '../guild/guild.service';

export class MemberService {
    private guildService: GuildService;
    
    constructor(guildService: GuildService) {
        this.guildService = guildService;
    }
    
    async GetAllMembers() {
        const members = this.guildService.getGuild().members.fetch();
        return members;
    }

    async getMemberByID(id: string): Promise<GuildMember> {
        return (await this.guildService.getGuild()).members.fetch(id);
    }
}
        

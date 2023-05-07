import { TextChannel } from 'discord.js';
import { GuildService } from '../guild/guild.service';
export declare enum ChannelName {
    BOT = "globot-world",
    REACTIONROLE = "roles"
}
export declare class ChannelService {
    private guildService;
    constructor(guildService: GuildService);
    getChannelByName(channelName: ChannelName): Promise<TextChannel>;
    getChannelByID(channelId: string): Promise<TextChannel>;
}

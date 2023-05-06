import {TextChannel } from 'discord.js';
import {GuildService} from '../guild/guild.service'

export enum ChannelName {
    BOT = "globot-world",
    REACTIONROLE = "roles"
}

export class ChannelService {
    private guildService: GuildService;
    constructor(guildService: GuildService){
        this.guildService = guildService;
    }
    async getChannelByName(channelName: ChannelName): Promise<TextChannel> {
        channelName.toString();
        JSON.stringify(await this.guildService.getGuild());
        return (await this.guildService.getGuild().channels.fetch()).find(channel => channel?.name === channelName.toString()) as TextChannel;
    }
}
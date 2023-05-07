import { CommandInteraction, Interaction, PermissionsBitField } from "discord.js";
import { ServiceModule } from "../../service.module";
import { ChannelName, ChannelService } from "../channel/channel.service";
import { GuildService } from "../guild/guild.service";

export class InteractionService {
    _channelService: ChannelService
    _guildService: GuildService
    constructor(channelService: ChannelService, guildService: GuildService){
        this._channelService = channelService
        this._guildService = guildService
    }
    async inBotChannel(interaction: Interaction): Promise<boolean> {
        const _interaction = interaction as CommandInteraction;
        if ((((await this._channelService.getChannelByID(_interaction.channelId)).name) == ChannelName.BOT) 
        && (_interaction.member!.permissions as PermissionsBitField).has(PermissionsBitField.Flags.Administrator)) {
            //TODO: MESSAGE SERVICE
          await _interaction.reply({ content: 'You cannot use slash commands in this channel.', ephemeral: true });
          return new Promise(() => true);
        } else {
          return new Promise(() => false)
        }
      }
    
      async isOwner(interaction: CommandInteraction): Promise<boolean>{
        if (interaction.user.id !== this._guildService.getGuild().ownerId) {
            //TODO: MESSAGE SERVICE
          await (interaction as CommandInteraction).reply('You do not have permission to use this command.');
          return true;
        } else {
            return false;
        }
      }

        async isAdmin(interaction: CommandInteraction): Promise<boolean>{
        if((this._guildService.getGuild()).members.cache.get(interaction.user.id)!.permissions.has(PermissionsBitField.Flags.Administrator)){
            return false
        } else {
            //TODO: MESSAGE SERVICE
            await interaction.reply('You do not have permission to use this command!')
            return true
        }
    }
}
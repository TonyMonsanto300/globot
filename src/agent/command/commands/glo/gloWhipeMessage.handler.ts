import { ChannelName } from "../../../../service/discordjs/channel/channel.service";
import { AbstractCommandHandler } from "../../model/commandHandler.base";
import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from 'discord.js';


const _commandBuilder: RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
    .setName('wipe').setDescription('Wipe the last messages in the channel').toJSON()

export class GloWhipeMessageHandler extends AbstractCommandHandler {
    constructor(serviceModule: any) {
        super(_commandBuilder, serviceModule)
    }

    protected async _execute(interaction: CommandInteraction): Promise<void> {
        const channel = await this._serviceModule.Discord.Channel.getChannelByName(ChannelName.BOT);
        if (channel) {
        const messages = await channel.messages.fetch({ limit: 100 });
        messages.forEach(async (msg) => {
            if (msg.author.bot) {
                await msg.delete();
            }
        });
        await interaction.reply('Messages have been wiped!');
        }
    }
}
import { ChannelName } from "../../../../service/discordjs/channel/channel.service";
import { AbstractCommandHandler } from "../../model/commandHandler.base";
import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from 'discord.js';


const _commandBuilder: RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder().setName('glo')
    .setDescription('Get a random Glo Gang media file').toJSON()

export class GloRandomMediaHandler extends AbstractCommandHandler {
    constructor(serviceModule: any) {
        super(_commandBuilder, serviceModule)
    }

    protected async _execute(interaction: CommandInteraction): Promise<void> {
        const botChannel = await this._serviceModule.Discord.Channel.getChannelByName(ChannelName.BOT);
        if (botChannel) {
          const messages = await botChannel.messages.fetch({ limit: 25 });
          messages.forEach(async (msg) => {
            if (msg.author.bot && msg.content.includes('(Globert is offline.)')) {
              await msg.delete();
            }
          });

          //BotMessageHelper.SendGoodbyeMessage()
          const goodbyeMessages = [
            'Goodbye!',
            'See you later!',
            'Until next time!',
          ];
          const randomIndex = Math.floor(Math.random() * goodbyeMessages.length);
          await interaction.channel!.send(`${goodbyeMessages[randomIndex]} (Globert is offline.)`);
    }
    }
}
import { CommandInteraction, CacheType, SlashCommandBuilder, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { AbstractCommandHandler } from '../../model/commandHandler.base';
import { ChannelName } from '../../../../service/discordjs/channel/channel.service';

const _commandBuilder: RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder().setName('shutdown').setDescription('Shut down the bot').toJSON()
export class GloShutdownHandler extends AbstractCommandHandler {
    constructor(serviceModule: any){
        super(_commandBuilder, serviceModule)
    }
        protected async _execute(interaction: CommandInteraction<CacheType>): Promise<void> {
            if((await this._serviceModule.Discord.Interaction.isOwner(interaction)) === false){
                interaction.reply('You do not have permission to use this command!')
                return
            }
        //BotMessageHelper.DeleteBotMessages()
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
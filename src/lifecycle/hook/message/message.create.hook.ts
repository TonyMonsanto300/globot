import { TextChannel } from "discord.js";
import { BaseHook } from "../base.hook";
import { ChannelName } from "../../../service/discordjs/channel/channel.service";

export class MessageCreateHook extends BaseHook {
    protected _name = 'messageCreate';
    async init(): Promise<void> {
        this._client.on(this._name, async (message) => {
            if (message.author.bot || (message.channel.isTextBased() && (message.channel as TextChannel).name !== ChannelName.BOT)) return;
            
            // Delete the user's message and warn them
            await message.delete();
            const warningMessage = await message.channel.send(`${message.author}, please do not send messages in this channel.`);
            
            // Delete the warning message and the user's message after 20 seconds
            setTimeout(async () => {
                await warningMessage.delete();
            }, 20000);
        }
        );
    }
    
}
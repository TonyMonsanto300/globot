import { ServiceModule } from "../service.module";
import { ChannelName } from '../discordjs/channel/channel.service';

export class GloMessageHelperService {
    private _serviceModule: ServiceModule;
    constructor(serviceModule: ServiceModule) {
        this._serviceModule = serviceModule;
    }

    async deleteGloMessages(channelName: ChannelName = ChannelName.BOT): Promise<void> {
        const channel = (await this._serviceModule.Discord.Channel.getChannelByName(channelName));
        //! Log
        const messages = await channel.messages.fetch({ limit: 25 });
        const botMessages = messages.filter(message => message.author.id === this._serviceModule.Discord.Client.getClient().user?.id);
        for (const botMessage of botMessages.values()) {
            if (this._serviceModule.System.Message.Login.some(loginMessage => botMessage.content.startsWith(loginMessage) && botMessage.content.includes("(Globert is back online!)"))) {
                botMessage.delete();
            }
        } 
    }
}
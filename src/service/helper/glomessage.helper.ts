import { ServiceModule } from "../service.module";
import { ChannelName, ChannelService } from '../discordjs/channel/channel.service';
import { MessageService } from '../system/message/message.service';

export class GloMessageHelperService {
    private _channelService: ChannelService;
    private _messageService: MessageService;
    constructor(channelService: ChannelService, messageService: MessageService) {
        this._channelService = channelService;
        this._messageService = messageService;
    }

    async deleteGloMessages(channelName: ChannelName = ChannelName.BOT): Promise<void> {
        const channel = (await this._channelService.getChannelByName(channelName));
        //! Log
        const messages = await channel.messages.fetch({ limit: 25 });
        const botMessages = messages.filter(message => message.author.bot);
        for (const botMessage of botMessages.values()) {
            if (this._messageService.Login.some(loginMessage => botMessage.content.startsWith(loginMessage) && botMessage.content.includes("(Globert is back online!)"))) {
                botMessage.delete();
            }
        } 
    }
}
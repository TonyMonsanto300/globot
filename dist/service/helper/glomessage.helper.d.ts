import { ChannelName, ChannelService } from '../discordjs/channel/channel.service';
import { MessageService } from '../system/message/message.service';
export declare class GloMessageHelperService {
    private _channelService;
    private _messageService;
    constructor(channelService: ChannelService, messageService: MessageService);
    deleteGloMessages(channelName?: ChannelName): Promise<void>;
}

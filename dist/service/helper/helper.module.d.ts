import { ChannelService } from '../discordjs/channel/channel.service';
import { MessageService } from '../system/message/message.service';
import { GloMessageHelperService } from './glomessage.helper';
import { JSONHelperService } from './json.helper.service';
export declare class HelperModule {
    constructor();
    getGloMessage(channelService: ChannelService, messageService: MessageService): GloMessageHelperService;
    getJSON(): JSONHelperService;
}

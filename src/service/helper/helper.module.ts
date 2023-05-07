import { ChannelService } from '../discordjs/channel/channel.service'
import { MessageService } from '../system/message/message.service'
import { GloMessageHelperService } from './glomessage.helper';
import { JSONHelperService } from './json.helper.service'

export class HelperModule {
    constructor() {
    }
    public getGloMessage(channelService: ChannelService, messageService: MessageService) {
        return new GloMessageHelperService(channelService, messageService)
    }
    public getJSON() {
        return new JSONHelperService()
    }
}
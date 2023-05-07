"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GloMessageHelperService = void 0;
const channel_service_1 = require("../discordjs/channel/channel.service");
class GloMessageHelperService {
    _channelService;
    _messageService;
    constructor(channelService, messageService) {
        this._channelService = channelService;
        this._messageService = messageService;
    }
    async deleteGloMessages(channelName = channel_service_1.ChannelName.BOT) {
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
exports.GloMessageHelperService = GloMessageHelperService;
//# sourceMappingURL=glomessage.helper.js.map
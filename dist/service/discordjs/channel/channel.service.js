"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelService = exports.ChannelName = void 0;
var ChannelName;
(function (ChannelName) {
    ChannelName["BOT"] = "globot-world";
    ChannelName["REACTIONROLE"] = "roles";
})(ChannelName = exports.ChannelName || (exports.ChannelName = {}));
class ChannelService {
    guildService;
    constructor(guildService) {
        this.guildService = guildService;
    }
    async getChannelByName(channelName) {
        return (await this.guildService.getGuild().channels.fetch()).find(channel => channel?.name === channelName.toString());
    }
    async getChannelByID(channelId) {
        return (await this.guildService.getGuild().channels.fetch()).find(channel => channel?.id === channelId);
    }
}
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map
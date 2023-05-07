"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordModule = void 0;
const channel_service_1 = require("./discordjs/channel/channel.service");
const guild_service_1 = require("./discordjs/guild/guild.service");
const member_service_1 = require("./discordjs/member/member.service");
const role_service_1 = require("./discordjs/role/role.service");
const config_service_1 = require("./system/config/config.service");
const interaction_service_1 = require("./discordjs/interaction/interaction.service");
class DiscordModule {
    _clientService;
    _configService;
    _guildService;
    _channelService;
    _memberService;
    _roleService;
    _interactionService;
    constructor(clientService) {
        this._clientService = clientService;
        this._configService = new config_service_1.ConfigService();
        this._guildService = new guild_service_1.GuildService(this._clientService);
        this._roleService = new role_service_1.RoleService(this._guildService, this._configService);
        this._channelService = new channel_service_1.ChannelService(this._guildService);
        this._memberService = new member_service_1.MemberService(this._guildService);
        this._interactionService = new interaction_service_1.InteractionService(this._channelService, this._guildService);
    }
    get Client() {
        return this._clientService;
    }
    get Guild() {
        return this._guildService;
    }
    get Channel() {
        return this._channelService;
    }
    get Member() {
        return this._memberService;
    }
    get Role() {
        return this._roleService;
    }
    get Interaction() {
        return this._interactionService;
    }
}
exports.DiscordModule = DiscordModule;
//# sourceMappingURL=discord.module.js.map
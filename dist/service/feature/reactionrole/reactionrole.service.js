"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionRoleService = void 0;
const channel_service_1 = require("../../discordjs/channel/channel.service");
const config_service_1 = require("../../system/config/config.service");
class ReactionRoleService {
    _channelService;
    _memberService;
    _roleService;
    _configservice;
    constructor(channelService, memberService, roleservice, configService) {
        this._channelService = channelService;
        this._memberService = memberService;
        this._roleService = roleservice;
        this._configservice = configService;
    }
    async setupMessagesAndReactions() {
        const rolesChannel = await this._channelService.getChannelByName(channel_service_1.ChannelName.REACTIONROLE);
        if (!rolesChannel) {
            console.log(`Could not find roles channel '${channel_service_1.ChannelName.REACTIONROLE}'`);
            return;
        }
        const reactionRoleConfig = await this._configservice.getConfig(config_service_1.ConfigName.REACTIONROLE);
        const reactionRoleSets = reactionRoleConfig.options;
        for (const roleSet in reactionRoleSets) {
            let messageText = `${roleSet}\n\n`;
            const reactionRoleSet = reactionRoleSets[roleSet];
            for (const reactionRole of reactionRoleSet.ReactionRoles) {
                messageText += `${reactionRole.Emoji} for ${reactionRole.RoleName}\n`;
            }
            // Trim extra newline characters from messageText before comparing or sending
            messageText = messageText.slice(0, -2);
            const lastMessages = await rolesChannel.messages.fetch({ limit: 50 });
            // Check if the complete message text already exists in the last 50 messages
            let messageAlreadySent = false;
            for (const message of lastMessages.values()) {
                if (message.content === messageText) {
                    messageAlreadySent = true;
                    break;
                }
            }
            if (messageAlreadySent) {
                continue;
            }
            const message = await rolesChannel.send(messageText);
            for (const reactionRole of reactionRoleSet.ReactionRoles) {
                await message.react(reactionRole.Emoji);
            }
        }
    }
    async handleReactionAdd(reaction, user) {
        const reactionRolesConfig = await this._configservice.getConfig(config_service_1.ConfigName.REACTIONROLE);
        const reactionRoleSets = reactionRolesConfig.options;
        for (const [key, value] of Object.entries(reactionRoleSets)) {
            for (const reactionRole of value.ReactionRoles) {
                if (reactionRole.Emoji === reaction.emoji.name) {
                    const role = await this._roleService.getRoleByName(reactionRole.RoleName);
                    if (role) {
                        const guildMember = await this._memberService.getMemberByID(user.id);
                        this._roleService.addRoleToMember(guildMember, role);
                    }
                }
            }
        }
    }
    async handleReactionRemove(reaction, user) {
        const reactionRolesConfig = this._configservice.getConfig(config_service_1.ConfigName.REACTIONROLE);
        const reactionRoleSets = Object.entries(reactionRolesConfig.options);
        for (const [key, value] of reactionRoleSets) {
            for (const reactionRole of value.ReactionRoles) {
                if (reactionRole.Emoji === reaction.emoji.name) {
                    const role = await this._roleService.getRoleByName(reactionRole.RoleName);
                    if (role) {
                        const guildMember = await this._memberService.getMemberByID(user.id);
                        this._roleService.removeRoleFromMember(guildMember, role);
                    }
                }
            }
        }
    }
}
exports.ReactionRoleService = ReactionRoleService;
//# sourceMappingURL=reactionrole.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMemberAddHook = void 0;
const DiscordMember_model_1 = require("../../../model/table/DiscordMember.model");
const role_service_1 = require("../../../service/discordjs/role/role.service");
const guildmember_base_hook_1 = require("./guildmember.base.hook");
class GuildMemberAddHook extends guildmember_base_hook_1.GuildMemberHookBase {
    _name = 'guildMemberAdd';
    constructor(serviceModule) {
        super(serviceModule);
    }
    async setup(member) {
        await this._database.addOrUpdateMember(new DiscordMember_model_1.DiscordMemberModel(member));
        const defaultRole = await this._serviceModule.Discord.Role.getRoleByName(role_service_1.RoleName.DEFAULT);
        console.log(defaultRole);
        this._serviceModule.Discord.Role.addRoleToMember(member, defaultRole);
    }
}
exports.GuildMemberAddHook = GuildMemberAddHook;
//# sourceMappingURL=guildmember.add.hook.js.map
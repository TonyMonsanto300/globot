"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMemberRemoveHook = void 0;
const guildmember_base_hook_1 = require("./guildmember.base.hook");
class GuildMemberRemoveHook extends guildmember_base_hook_1.GuildMemberHookBase {
    constructor(serviceModule) {
        super(serviceModule);
    }
    _name = 'guildMemberRemove';
    async setup(member) {
        await this._database.switchMemberActiveStatus(member);
    }
}
exports.GuildMemberRemoveHook = GuildMemberRemoveHook;
//# sourceMappingURL=guildmember.remove.hook.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMemberHookBase = void 0;
const base_hook_1 = require("../base.hook");
class GuildMemberHookBase extends base_hook_1.BaseHook {
    init() {
        this._client.on(this._name, async (member) => {
            this.setup(member);
        });
    }
}
exports.GuildMemberHookBase = GuildMemberHookBase;
//# sourceMappingURL=guildmember.base.hook.js.map
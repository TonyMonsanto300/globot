"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReactionHookBase = void 0;
const base_hook_1 = require("../base.hook");
class MessageReactionHookBase extends base_hook_1.BaseHook {
    init() {
        this._client.on(this._name, async (reaction, user) => {
            this.setup(reaction, user);
        });
    }
}
exports.MessageReactionHookBase = MessageReactionHookBase;
//# sourceMappingURL=messagereaction.base.hook.js.map
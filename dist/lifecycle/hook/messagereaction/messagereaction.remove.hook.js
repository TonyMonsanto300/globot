"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReactionRemoveHook = void 0;
const messagereaction_base_hook_1 = require("./messagereaction.base.hook");
class MessageReactionRemoveHook extends messagereaction_base_hook_1.MessageReactionHookBase {
    _name = 'messageReactionRemove';
    setup(reaction, user) {
        this._serviceModule.Feature.ReactionRole.handleReactionRemove(reaction, user);
    }
}
exports.MessageReactionRemoveHook = MessageReactionRemoveHook;
//# sourceMappingURL=messagereaction.remove.hook.js.map
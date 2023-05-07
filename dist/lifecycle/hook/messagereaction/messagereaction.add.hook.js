"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageReactionAddHook = void 0;
const messagereaction_base_hook_1 = require("./messagereaction.base.hook");
class MessageReactionAddHook extends messagereaction_base_hook_1.MessageReactionHookBase {
    _name = 'messageReactionAdd';
    setup(reaction, user) {
        this._serviceModule.Feature.ReactionRole.handleReactionAdd(reaction, user);
    }
}
exports.MessageReactionAddHook = MessageReactionAddHook;
//# sourceMappingURL=messagereaction.add.hook.js.map
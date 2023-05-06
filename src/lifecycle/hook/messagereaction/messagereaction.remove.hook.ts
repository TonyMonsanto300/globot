import { MessageReactionHookBase } from "./messagereaction.base.hook";

export class MessageReactionRemoveHook extends MessageReactionHookBase {
    protected _name = 'messageReactionRemove';
    protected setup(reaction: any, user: any): void {
        this._serviceModule.Feature.ReactionRole.handleReactionRemove(reaction, user);
    }
}
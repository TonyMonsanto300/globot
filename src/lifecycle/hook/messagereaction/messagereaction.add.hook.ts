import { MessageReactionHookBase } from "./messagereaction.base.hook";

export class MessageReactionAddHook extends MessageReactionHookBase {
    protected _name = 'messageReactionAdd';
    protected setup(reaction: any, user: any): void {
        this._serviceModule.Feature.ReactionRole.handleReactionAdd(reaction, user);
    }
}
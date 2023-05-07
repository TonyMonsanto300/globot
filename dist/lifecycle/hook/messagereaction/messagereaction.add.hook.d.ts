import { MessageReactionHookBase } from "./messagereaction.base.hook";
export declare class MessageReactionAddHook extends MessageReactionHookBase {
    protected _name: string;
    protected setup(reaction: any, user: any): void;
}

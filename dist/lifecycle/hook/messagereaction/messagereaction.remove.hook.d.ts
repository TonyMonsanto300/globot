import { MessageReactionHookBase } from "./messagereaction.base.hook";
export declare class MessageReactionRemoveHook extends MessageReactionHookBase {
    protected _name: string;
    protected setup(reaction: any, user: any): void;
}

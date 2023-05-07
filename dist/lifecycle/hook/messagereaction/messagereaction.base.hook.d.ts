import { BaseHook } from "../base.hook";
export declare abstract class MessageReactionHookBase extends BaseHook {
    protected abstract setup(reaction: any, user: any): void;
    init(): void;
}

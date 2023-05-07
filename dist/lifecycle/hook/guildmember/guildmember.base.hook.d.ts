import { BaseHook } from "../base.hook";
export declare abstract class GuildMemberHookBase extends BaseHook {
    protected abstract setup(member: any): void;
    init(): void;
}

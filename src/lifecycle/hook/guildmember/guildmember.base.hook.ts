import { BaseHook } from "../base.hook";

export abstract class GuildMemberHookBase extends BaseHook {
    protected abstract setup(member: any): void;

    public init(): void {
        this._client.on(this._name, async (member: any) => {
                this.setup(member);
            }
        );
    }
}
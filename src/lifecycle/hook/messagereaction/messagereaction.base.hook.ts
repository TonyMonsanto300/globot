import { BaseHook } from "../base.hook";

export abstract class MessageReactionHookBase extends BaseHook {
    protected abstract setup(reaction: any, user: any): void;

    public init(): void {
        this._client.on(this._name, async (reaction: any, user: any) => {
                this.setup(reaction, user);
            }
        );
    }
}
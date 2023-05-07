import CommandAgent from "../../agent/command/command.agent";
import { ServiceModule } from "../../service/service.module";
import { GuildMemberAddHook } from "./guildmember/guildmember.add.hook";
import { GuildMemberChunkHook } from "./guildmember/guildmember.chunk.hook";
import { GuildMemberRemoveHook } from "./guildmember/guildmember.remove.hook";
import { MessageCreateHook } from "./message/message.create.hook";
import { MessageReactionAddHook } from "./messagereaction/messagereaction.add.hook";
import { MessageReactionRemoveHook } from "./messagereaction/messagereaction.remove.hook";
import { ReadyHook } from "./ready.hook";

export class HookManager {
    _serviceModule: ServiceModule;
    _commandAgent: CommandAgent;
    constructor(serviceModule: ServiceModule, commandAgent: CommandAgent) {
        this._serviceModule = serviceModule;
        this._commandAgent = commandAgent;
    }
    init(): void {
        [
            new MessageReactionAddHook(this._serviceModule),
            new MessageReactionRemoveHook(this._serviceModule),
            new GuildMemberAddHook(this._serviceModule),
            new GuildMemberRemoveHook(this._serviceModule),
            new GuildMemberChunkHook(this._serviceModule),
            new MessageCreateHook(this._serviceModule),
            new ReadyHook(this._serviceModule, this._commandAgent),
        ].forEach((hook) => {
            hook.init();
        });
    }
}
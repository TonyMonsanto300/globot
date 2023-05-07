import { GuildMember } from "discord.js";
import { GuildMemberHookBase } from './guildmember.base.hook';
import { ServiceModule } from "../../../service/service.module";
export declare class GuildMemberAddHook extends GuildMemberHookBase {
    protected _name: string;
    constructor(serviceModule: ServiceModule);
    protected setup(member: GuildMember): Promise<void>;
}

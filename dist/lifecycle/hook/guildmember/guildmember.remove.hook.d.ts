import { ServiceModule } from "../../../service/service.module";
import { GuildMemberHookBase } from "./guildmember.base.hook";
export declare class GuildMemberRemoveHook extends GuildMemberHookBase {
    constructor(serviceModule: ServiceModule);
    protected _name: string;
    protected setup(member: any): Promise<void>;
}

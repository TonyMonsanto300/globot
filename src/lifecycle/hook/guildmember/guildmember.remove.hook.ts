import { DatabaseService } from "../../../database/database.service";
import { ServiceModule } from "../../../service/service.module";
import { GuildMemberHookBase } from "./guildmember.base.hook";

export class GuildMemberRemoveHook extends GuildMemberHookBase {
    constructor(serviceModule: ServiceModule){
        super(serviceModule)   
    }
    protected _name = 'guildMemberRemove';
    protected async setup(member: any): Promise<void> {
        await this._database.switchMemberActiveStatus(member);
    }
}
import { GuildMember } from "discord.js";
import { RoleName } from "../../../service/discordjs/role/role.service";
import { GuildMemberHookBase } from './guildmember.base.hook';
import { ServiceModule } from "../../../service/service.module";

export class GuildMemberAddHook extends GuildMemberHookBase  {
    protected _name = 'guildMemberAdd'
    constructor(serviceModule: ServiceModule){
        super(serviceModule)   
    }
    protected async setup(member: GuildMember): Promise<void> {
        const defaultRole = await this._serviceModule.Discord.Role.getRoleByName(RoleName.DEFAULT);
        this._serviceModule.Discord.Role.addRoleToMember(member, defaultRole);
    }
}
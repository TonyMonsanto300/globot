import { GuildMember } from "discord.js";
import { DiscordMemberModel } from "../../../model/table/DiscordMember.model";
import { RoleName } from "../../../service/discordjs/role/role.service";
import { GuildMemberHookBase } from './guildmember.base.hook';
import { ServiceModule } from "../../../service/service.module";

export class GuildMemberAddHook extends GuildMemberHookBase  {
    protected _name = 'guildMemberAdd'
    constructor(serviceModule: ServiceModule){
        super(serviceModule)   
    }
    protected async setup(member: GuildMember): Promise<void> {
        await this._database.addOrUpdateMember(new DiscordMemberModel(member));
        const defaultRole = await this._serviceModule.Discord.Role.getRoleByName(RoleName.DEFAULT);
        console.log(defaultRole)
        this._serviceModule.Discord.Role.addRoleToMember(member, defaultRole);
    }
}
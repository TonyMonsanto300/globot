import { Collection, GuildMember, Role } from "discord.js";
import { GuildService } from '../guild/guild.service';
import { ConfigModel } from "../../system/config/model/config.model";
import { ConfigService } from "../../system/config/config.service";
export declare enum RoleName {
    DEFAULT = "Glopithecus"
}
export declare class RoleService {
    _guildService: GuildService;
    _roleConfig: ConfigModel;
    constructor(guildService: GuildService, configService: ConfigService);
    getGuildRoles(): Promise<Collection<string, Role>>;
    getRoleByName(roleName: string): Promise<Role>;
    getRoleById(roleId: string): Promise<Role>;
    getRolesByNames(roleNames: string[]): Role[];
    getRolesByIds(roleIDs: string[]): Role[];
    addRoleToMember(member: GuildMember, role: Role): void;
    removeRoleFromMember(member: GuildMember, role: Role): void;
}

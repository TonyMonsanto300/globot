import { Collection, GuildMember, Role } from "discord.js";
import { GuildService } from '../guild/guild.service';
import { ConfigModel } from "../../system/config/model/config.model";
import { ConfigName, ConfigService } from "../../system/config/config.service";

export enum RoleName {
    DEFAULT = "Glopithecus"
}

export class RoleService {
    _guildService: GuildService;
    _roleConfig: ConfigModel;

    constructor(guildService: GuildService, configService: ConfigService) {
        this._guildService = guildService;
        this._roleConfig = configService.getConfig(ConfigName.ROLE)!;
    }

    async getGuildRoles(): Promise<Collection<string, Role>> {
        const roles = (await this._guildService.getGuild().roles.fetch()).mapValues(role => role);
        return roles;
    }

    async getRoleByName(roleName: string): Promise<Role> {
        const role = (await this.getGuildRoles()).find(role => role.name === roleName);
        if(!role){
            throw new Error(`Role ${roleName} not found`);
        }
        return role!;
    }

    async getRoleById(roleId: string): Promise<Role> {
        const role = (await this.getGuildRoles()).find(role => role.id === roleId);
        if(!role){
            throw new Error(`Role ${roleId} not found`);
        }
        return role!;
    }

    getRolesByNames(roleNames: string[]) {
        const roles: Role[] = [];
        roleNames.forEach(async (roleName) => {
            const role = await this.getRoleById(roleName)
            roles.push(role)
        });
        return roles;
    }

    getRolesByIds(roleIDs: string[]) {
        const roles: Role[] = [];
        roleIDs.forEach((roleID) => {
            this.getRoleById(roleID).then((role) => {
              roles.push(role);
            });
          });
        return roles;
    }

    addRoleToMember(member: GuildMember, role: Role): void {
        member.roles.add(role);
        console.log(`Added role ${role.name} to ${member.user.username}`);
    }

    removeRoleFromMember(member: GuildMember, role: Role): void {
        member.roles.remove(role);
        console.log(`Removed role ${role.name} from ${member.user.username}`);
    }
}
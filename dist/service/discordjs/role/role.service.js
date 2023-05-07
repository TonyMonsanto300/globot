"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = exports.RoleName = void 0;
const config_service_1 = require("../../system/config/config.service");
var RoleName;
(function (RoleName) {
    RoleName["DEFAULT"] = "Glopithecus";
})(RoleName = exports.RoleName || (exports.RoleName = {}));
class RoleService {
    _guildService;
    _roleConfig;
    constructor(guildService, configService) {
        this._guildService = guildService;
        this._roleConfig = configService.getConfig(config_service_1.ConfigName.ROLE);
    }
    async getGuildRoles() {
        const roles = (await this._guildService.getGuild().roles.fetch()).mapValues(role => role);
        return roles;
    }
    async getRoleByName(roleName) {
        const role = (await this.getGuildRoles()).find(role => role.name === roleName);
        if (!role) {
            throw new Error(`Role ${roleName} not found`);
        }
        return role;
    }
    async getRoleById(roleId) {
        const role = (await this.getGuildRoles()).find(role => role.id === roleId);
        if (!role) {
            throw new Error(`Role ${roleId} not found`);
        }
        return role;
    }
    getRolesByNames(roleNames) {
        const roles = [];
        roleNames.forEach(async (roleName) => {
            const role = await this.getRoleById(roleName);
            roles.push(role);
        });
        return roles;
    }
    getRolesByIds(roleIDs) {
        const roles = [];
        roleIDs.forEach((roleID) => {
            this.getRoleById(roleID).then((role) => {
                roles.push(role);
            });
        });
        return roles;
    }
    addRoleToMember(member, role) {
        member.roles.add(role);
        console.log(`Added role ${role.name} to ${member.user.username}`);
    }
    removeRoleFromMember(member, role) {
        member.roles.remove(role);
        console.log(`Removed role ${role.name} from ${member.user.username}`);
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map
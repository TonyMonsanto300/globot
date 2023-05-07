"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionRoleConfig = void 0;
const config_model_1 = require("./config.model");
class ReactionRoleConfig extends config_model_1.ConfigModel {
    options = {};
    constructor(name, options) {
        super(name, options);
        this.parseOptions(options);
    }
    parseOptions(optionsData) {
        this.options = {};
        for (const key in optionsData) {
            const value = optionsData[key];
            const text = value.Text;
            const reactionRolesData = value.ReactionRoles;
            const reactionRoles = reactionRolesData.map((roleData) => new config_model_1.ReactionRole(roleData.RoleName, roleData.Emoji));
            this.options[key] = new config_model_1.OptionSet(text, reactionRoles);
        }
    }
}
exports.ReactionRoleConfig = ReactionRoleConfig;
//# sourceMappingURL=reactionrole.config.model.js.map
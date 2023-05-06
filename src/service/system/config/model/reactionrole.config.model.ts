import { ConfigModel, OptionSet, ReactionRole } from "./config.model";

export class ReactionRoleConfig extends ConfigModel {
    options: { [key: string]: OptionSet } = {}
    constructor(name: string, options: { [key: string]: any }) {
      super(name, options);
      this.parseOptions(options);
    }
  
    parseOptions(optionsData: { [key: string]: any }): void {
      this.options = {};
      for (const key in optionsData) {
        const value = optionsData[key];
        const text = value.Text;
        const reactionRolesData = value.ReactionRoles;
        const reactionRoles = reactionRolesData.map((roleData: any) => new ReactionRole(roleData.RoleName, roleData.Emoji));
        this.options[key] = new OptionSet(text, reactionRoles);
      }
    }
  }
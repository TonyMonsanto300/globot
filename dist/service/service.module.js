"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceModule = void 0;
const feature_module_1 = require("./feature/feature.module");
const glomedia_service_1 = require("./feature/globot/glomedia/glomedia.service");
const reactionrole_service_1 = require("./feature/reactionrole/reactionrole.service");
const discord_module_1 = require("./discord.module");
const system_module_1 = require("./system/system.module");
class ServiceModule {
    _discord;
    _system;
    _feature;
    constructor(clientService) {
        this._discord = new discord_module_1.DiscordModule(clientService);
        this._system = new system_module_1.SystemModule();
        this._feature = new feature_module_1.FeatureModule(new reactionrole_service_1.ReactionRoleService(this._discord.Channel, this._discord.Member, this._discord.Role, this._system.Config), new glomedia_service_1.GloMediaService());
    }
    get Discord() {
        return this._discord;
    }
    get System() {
        return this._system;
    }
    get Feature() {
        return this._feature;
    }
}
exports.ServiceModule = ServiceModule;
//# sourceMappingURL=service.module.js.map
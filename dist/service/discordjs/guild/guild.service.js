"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildService = void 0;
class GuildService {
    _clientAgent;
    constructor(clientService) {
        this._clientAgent = clientService;
    }
    getGuild() {
        return this._clientAgent.getClient().guilds.cache.get("1101935766524936225");
    }
}
exports.GuildService = GuildService;
//# sourceMappingURL=guild.service.js.map
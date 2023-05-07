"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAgent = void 0;
const discord_js_1 = require("discord.js");
class ClientAgent {
    _client = new discord_js_1.Client({ intents: 32767 });
    constructor() {
        this._client.login(process.env.BOT_TOKEN);
    }
    getClient() {
        return this._client;
    }
}
exports.ClientAgent = ClientAgent;
//# sourceMappingURL=client.agent.js.map
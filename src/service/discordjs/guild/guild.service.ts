import { Guild, OAuth2Guild } from "discord.js";
import { ClientAgent } from "../../../agent/client/client.agent";

export class GuildService {
    private _clientAgent: ClientAgent;

    constructor(clientService: ClientAgent) {
        this._clientAgent = clientService
    }

    public getGuild(): Guild {
        return this._clientAgent.getClient().guilds.cache.get("1101935766524936225")!
    }
}
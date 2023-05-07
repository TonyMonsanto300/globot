import { Guild } from "discord.js";
import { ClientAgent } from "../../../agent/client/client.agent";
export declare class GuildService {
    private _clientAgent;
    constructor(clientService: ClientAgent);
    getGuild(): Guild;
}

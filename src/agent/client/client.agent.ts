import { Client } from 'discord.js';

export class ClientAgent {
    private _client: Client = new Client({ intents: 32767 });
    constructor(){
        this._client.login(process.env.BOT_TOKEN)
    }

    public getClient(): Client {
        return this._client;
    }
}
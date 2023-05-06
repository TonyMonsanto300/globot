import { Client } from "discord.js";
import { ServiceModule } from "../../service/service.module";
import { DatabaseService } from "../../database/database.service";

export abstract class BaseHook {
    protected _serviceModule: ServiceModule;
    protected _database: DatabaseService
    constructor(serviceModule: ServiceModule){
        this._serviceModule = serviceModule;
        this._client = serviceModule.Discord.Client.getClient();
        this._database = new DatabaseService(this._serviceModule.Discord.Member)
    }
    protected _client: Client
    protected abstract _name: string;
    public abstract init(): void;
}




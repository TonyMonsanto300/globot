import { Client } from "discord.js";
import { ServiceModule } from '../../service/service.module';
import { DatabaseService } from "../../database/database.service";

export abstract class BaseHook {
    _serviceModule: ServiceModule;
    constructor(serviceModule: ServiceModule){
        this._serviceModule = serviceModule;
        this._client = this._serviceModule.Discord.Client.getClient();
    }
    protected _client: Client
    protected abstract _name: string;
    public abstract init(): void;
    public setServiceModule(serviceModule: ServiceModule){
        serviceModule = serviceModule;
    }

    public get ServiceModule(): ServiceModule{
        return this._serviceModule;
    }
}




import { Client } from "discord.js";
import { ServiceModule } from "../../service/service.module";
import { DatabaseService } from "../../database/database.service";
export declare abstract class BaseHook {
    protected _serviceModule: ServiceModule;
    protected _database: DatabaseService;
    constructor(serviceModule: ServiceModule);
    protected _client: Client;
    protected abstract _name: string;
    abstract init(): void;
}

import { BroadcastService } from "./broadcast/broadcast.service";
import { ConfigService } from "./config/config.service";
import LogService from "./logging/logging.service";

export class SystemModule {
    private _config: ConfigService;
    private _logger: LogService;
    private _broadcast: BroadcastService;

    constructor(config: ConfigService = new ConfigService(), logger: LogService = new LogService(), 
        broadcast: BroadcastService = new BroadcastService()) {
        this._config = config;
        this._logger = logger;
        this._broadcast = broadcast;
    }

    public get Config(): ConfigService {
        return this._config;
    }

    public get Logger(): LogService {
        return this._logger;
    }

    public get Broadcast(): BroadcastService {
        return this._broadcast;
    }
}
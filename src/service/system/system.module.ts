import { BroadcastService } from "./broadcast/broadcast.service";
import { ConfigService } from "./config/config.service";
import LogService from "./logging/logging.service";
import { MessageService } from "./message/message.service";

export class SystemModule {
    private _config: ConfigService;
    private _logger: LogService;
    private _broadcast: BroadcastService;
    private _message: MessageService

    constructor(config: ConfigService = new ConfigService(), logger: LogService = new LogService(), 
        broadcast: BroadcastService = new BroadcastService(), message: MessageService) {
        this._config = config;
        this._logger = logger;
        this._broadcast = broadcast;
        this._message = message;
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

    public get Message(): MessageService {
        return this._message;
    }
}
import { BroadcastService } from "./broadcast/broadcast.service";
import { ConfigService } from "./config/config.service";
import LoggingService from "./logging/logging.service";
import { MessageService } from "./message/message.service";

export class SystemModule {
    private _config: ConfigService;
    private _logging: LoggingService;
    private _broadcast: BroadcastService;
    private _message: MessageService

    constructor(logging: LoggingService, config: ConfigService,
        broadcast: BroadcastService = new BroadcastService(), message: MessageService = new MessageService()) {
        this._config = config;
        this._logging = logging;
        this._broadcast = broadcast;
        this._message = message;
    }

    public get Config(): ConfigService {
        return this._config;
    }

    public get Logging(): LoggingService {
        return this._logging;
    }

    public get Broadcast(): BroadcastService {
        return this._broadcast;
    }

    public get Message(): MessageService {
        return this._message;
    }
}
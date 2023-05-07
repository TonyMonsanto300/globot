import { BroadcastService } from "./broadcast/broadcast.service";
import { ConfigService } from "./config/config.service";
import LogService from "./logging/logging.service";
import { MessageService } from "./message/message.service";
export declare class SystemModule {
    private _config;
    private _logger;
    private _broadcast;
    private _message;
    constructor(config?: ConfigService, logger?: LogService, broadcast?: BroadcastService, message?: MessageService);
    get Config(): ConfigService;
    get Logger(): LogService;
    get Broadcast(): BroadcastService;
    get Message(): MessageService;
}

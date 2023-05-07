import { BroadcastService } from "./broadcast/broadcast.service";
import { ConfigService } from "./config/config.service";
import LogService from "./logging/logging.service";
export declare class SystemModule {
    private _config;
    private _logger;
    private _broadcast;
    constructor(config?: ConfigService, logger?: LogService, broadcast?: BroadcastService);
    get Config(): ConfigService;
    get Logger(): LogService;
    get Broadcast(): BroadcastService;
}

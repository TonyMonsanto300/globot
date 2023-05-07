"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemModule = void 0;
const broadcast_service_1 = require("./broadcast/broadcast.service");
const config_service_1 = require("./config/config.service");
const logging_service_1 = __importDefault(require("./logging/logging.service"));
const message_service_1 = require("./message/message.service");
class SystemModule {
    _config;
    _logger;
    _broadcast;
    _message;
    constructor(config = new config_service_1.ConfigService(), logger = new logging_service_1.default(), broadcast = new broadcast_service_1.BroadcastService(), message = new message_service_1.MessageService()) {
        this._config = config;
        this._logger = logger;
        this._broadcast = broadcast;
        this._message = message;
    }
    get Config() {
        return this._config;
    }
    get Logger() {
        return this._logger;
    }
    get Broadcast() {
        return this._broadcast;
    }
    get Message() {
        return this._message;
    }
}
exports.SystemModule = SystemModule;
//# sourceMappingURL=system.module.js.map
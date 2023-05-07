"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
var MessageCode;
(function (MessageCode) {
    MessageCode["SYSTEM"] = "system";
    MessageCode["SUCCESS"] = "success";
    MessageCode["ERROR"] = "error";
    MessageCode["DEBUG"] = "debug";
})(MessageCode || (MessageCode = {}));
class LogService {
    Log = {
        System(message) {
            this.LogMessage(MessageCode.SYSTEM, message, chalk_1.default.yellow);
        },
        Error(error) {
            if (error instanceof Error) {
                this.LogMessage(MessageCode.ERROR, error.message, chalk_1.default.red);
            }
        },
        Success(message) {
            this.LogMessage(MessageCode.SUCCESS, message, chalk_1.default.green);
        },
        LogMessage: (type, message, consoleColor) => {
            let prefix = consoleColor(chalk_1.default.yellow);
            let logTime = chalk_1.default.blueBright(`${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`);
            console.log(`<${prefix}>: ${message} [${logTime}]`);
        }
    };
}
exports.default = LogService;
//# sourceMappingURL=logging.service.js.map
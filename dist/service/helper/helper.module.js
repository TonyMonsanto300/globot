"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperModule = void 0;
const glomessage_helper_1 = require("./glomessage.helper");
const json_helper_service_1 = require("./json.helper.service");
class HelperModule {
    constructor() {
    }
    getGloMessage(channelService, messageService) {
        return new glomessage_helper_1.GloMessageHelperService(channelService, messageService);
    }
    getJSON() {
        return new json_helper_service_1.JSONHelperService();
    }
}
exports.HelperModule = HelperModule;
//# sourceMappingURL=helper.module.js.map
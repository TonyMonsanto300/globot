"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperModule = void 0;
const json_helper_service_1 = require("./json.helper.service");
class HelperModule {
    jsonHelperService;
    constructor() {
        this.jsonHelperService = new json_helper_service_1.JSONHelperService();
    }
}
exports.HelperModule = HelperModule;
//# sourceMappingURL=helper.module.js.map
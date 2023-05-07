"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelConfig = void 0;
const config_model_1 = require("./config.model");
class ChannelConfig extends config_model_1.ConfigModel {
    options = {};
    constructor(name, options) {
        super(name, options);
        this.parseOptions(options);
    }
    parseOptions(optionsData) {
        this.options = optionsData;
    }
}
exports.ChannelConfig = ChannelConfig;
//# sourceMappingURL=channel.config.model.js.map
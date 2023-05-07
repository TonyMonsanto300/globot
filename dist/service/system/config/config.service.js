"use strict";
//create a class that can return the config files from the json folder in this same directory, as a singleton, and make it user a pattern that 
//safely reads and updates the json files.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = exports.ConfigName = void 0;
const fs = __importStar(require("fs"));
const helper_module_1 = require("../../helper/helper.module");
const path_1 = __importDefault(require("path"));
const json_helper_service_1 = require("../../helper/json.helper.service");
const reactionrole_config_model_1 = require("./model/reactionrole.config.model");
const channel_config_model_1 = require("./model/channel.config.model");
var ConfigName;
(function (ConfigName) {
    ConfigName["ROLE"] = "role";
    ConfigName["REACTIONROLE"] = "reactionrole";
    ConfigName["CHANNEL"] = "channel";
})(ConfigName = exports.ConfigName || (exports.ConfigName = {}));
class ConfigService {
    _configDir = path_1.default.join(__dirname, "..", "..", "..", "..", "src", "service", "system", "config", "json");
    _configModels = new Map();
    constructor() {
        this.loadConfigModels();
    }
    loadConfigModel(configName) {
        const data = new json_helper_service_1.JSONHelperService().readJSONFromFile(`${this._configDir}\\${configName}.json`);
        const name = data.name;
        const options = data.options;
        switch (name) {
            case ConfigName.REACTIONROLE:
                return new reactionrole_config_model_1.ReactionRoleConfig(name, options);
            case ConfigName.CHANNEL:
                return new channel_config_model_1.ChannelConfig(name, options);
        }
    }
    getConfig(configName) {
        for (const config of this._configModels.values()) {
            if (config.name === configName) {
                return config;
            }
        }
        return null;
    }
    //Rewrite the above in a an exception handled way
    loadConfigModels() {
        const jsonFiles = fs.readdirSync(this._configDir).filter(file => file.endsWith('.json'));
        jsonFiles.forEach((jsonFile) => {
            try {
                const configModel = new helper_module_1.HelperModule().getJSON().readJSONFromFile(`${this._configDir}\\${jsonFile}`);
                console.log(`Loaded config model ${JSON.stringify(configModel)}`);
                this._configModels.set(configModel.name, configModel);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw Error;
                }
                else {
                    console.log(error);
                }
            }
        });
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map
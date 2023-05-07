import { ConfigModel } from './model/config.model';
export declare enum ConfigName {
    ROLE = "role",
    REACTIONROLE = "reactionrole",
    CHANNEL = "channel"
}
export declare class ConfigService {
    private _configDir;
    private _configModels;
    constructor();
    loadConfigModel(configName: ConfigName): ConfigModel | undefined;
    getConfig(configName: ConfigName): ConfigModel | null;
    loadConfigModels(): void;
}

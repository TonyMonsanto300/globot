import { ConfigModel, OptionSet } from "./config.model";
export declare class ReactionRoleConfig extends ConfigModel {
    options: {
        [key: string]: OptionSet;
    };
    constructor(name: string, options: {
        [key: string]: any;
    });
    parseOptions(optionsData: {
        [key: string]: any;
    }): void;
}

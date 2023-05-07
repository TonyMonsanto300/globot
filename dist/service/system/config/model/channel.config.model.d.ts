import { ConfigModel } from "./config.model";
export declare class ChannelConfig extends ConfigModel {
    options: {
        [key: string]: any;
    };
    constructor(name: string, options: {
        [key: string]: any;
    });
    parseOptions(optionsData: {
        [key: string]: any;
    }): void;
}

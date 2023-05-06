import { ConfigModel } from "./config.model";

export class ChannelConfig extends ConfigModel {
    options: { [key: string]: any } = {};
  
    constructor(name: string, options: { [key: string]: any }) {
      super(name, options);
      this.parseOptions(options);
    }
  
    parseOptions(optionsData: { [key: string]: any }): void {
      this.options = optionsData;
    }
  }
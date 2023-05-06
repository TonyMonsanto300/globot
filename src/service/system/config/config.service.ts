//create a class that can return the config files from the json folder in this same directory, as a singleton, and make it user a pattern that 
//safely reads and updates the json files.

import { ConfigModel } from './model/config.model'
import * as fs from 'fs';
import { HelperModule } from '../../helper/helper.module';
import path from 'path';
import { JSONHelperService } from '../../helper/json.helper.service';
import { ReactionRoleConfig } from './model/reactionrole.config.model';
import { ChannelConfig } from './model/channel.config.model';

export enum ConfigName {
    ROLE = "role",
    REACTIONROLE = "reactionrole",
    CHANNEL = "channel"
}

export class ConfigService {
    private _configDir = path.join(__dirname, "..", "..", "..", "..", "src", "service", "system", "config", "json")
    private _configModels : Map<string, ConfigModel> = new Map<string, ConfigModel>()
    constructor() {
        this.loadConfigModels();
    }

    loadConfigModel(configName: ConfigName): ConfigModel | undefined {
        const data = new JSONHelperService().readJSONFromFile<ConfigModel>(`${this._configDir}\\${configName}.json`)
        const name = data.name;
        const options = data.options
        
        switch(name){
            case ConfigName.REACTIONROLE:
                return new ReactionRoleConfig(name, options);
            case ConfigName.CHANNEL:
                return new ChannelConfig(name, options);   
        }

    }

    getConfig(configName: ConfigName): ConfigModel | null {
        for (const config of this._configModels.values()) {
          if (config.name === configName) {
            return config;
          }
        }
        return null;
      }

    //Rewrite the above in a an exception handled way
    public loadConfigModels(): void {
        const jsonFiles = fs.readdirSync(this._configDir).filter(file => file.endsWith('.json'));
        jsonFiles.forEach((jsonFile) => {
            try {
                const configModel : ConfigModel = new HelperModule().jsonHelperService.readJSONFromFile<ConfigModel>(`${this._configDir}\\${jsonFile}`)
                console.log(`Loaded config model ${JSON.stringify(configModel)}`)
                this._configModels.set(configModel.name, configModel);
            } catch (error) {
                if(error instanceof Error){
                    throw Error
                } else {
                    console.log(error)
                }
            }
        })
    }
}
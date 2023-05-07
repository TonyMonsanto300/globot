import { FeatureModule } from './feature/feature.module';
import { ClientAgent } from '../agent/client/client.agent';
import { DiscordModule } from './discord.module';
import { SystemModule } from './system/system.module';
export declare class ServiceModule {
    private _discord;
    private _system;
    private _feature;
    constructor(clientService: ClientAgent);
    get Discord(): DiscordModule;
    get System(): SystemModule;
    get Feature(): FeatureModule;
}

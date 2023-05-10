import { FeatureModule } from './feature/feature.module';
import { GloMediaService } from './feature/globot/glomedia/glomedia.service';
import { ReactionRoleService } from './feature/reactionrole/reactionrole.service';
import { ClientAgent } from '../agent/client/client.agent';
import { DiscordModule } from './discord.module';
import { SystemModule } from './system/system.module';
import LoggingService from './system/logging/logging.service';
import { ConfigService } from './system/config/config.service';

export class ServiceModule{
    private _discord: DiscordModule;
    private _system: SystemModule;
    private _feature: FeatureModule;


    constructor(clientAgent: ClientAgent, configService: ConfigService, loggingService: LoggingService){
        this._discord = new DiscordModule(clientAgent, configService, loggingService);
        this._system = new SystemModule(loggingService, configService);
        this._feature = new FeatureModule(
            new ReactionRoleService(
                this._discord.Channel,
                this._discord.Member,
                this._discord.Role,
                this._system.Config,
                this._system.Logging
            ),
            new GloMediaService()
        );
    }

    public get Discord(): DiscordModule{ 
        return this._discord; 
    }

    public get System(): SystemModule{
        return this._system;
    }

    public get Feature(): FeatureModule{
        return this._feature;
    }
}
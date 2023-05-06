import { FeatureModule } from './feature/feature.module';
import { GloMediaService } from './feature/globot/glomedia/glomedia.service';
import { ReactionRoleService } from './feature/reactionrole/reactionrole.service';
import { ClientAgent } from '../agent/client/client.agent';
import { DiscordModule } from './discord.module';
import { SystemModule } from './system/system.module';

export class ServiceModule{
    private _discord: DiscordModule;
    private _system: SystemModule;
    private _feature: FeatureModule;


    constructor(clientService: ClientAgent){
        this._discord = new DiscordModule(clientService);
        this._system = new SystemModule();
        this._feature = new FeatureModule(
            new ReactionRoleService(
                this._discord.Channel,
                this._discord.Member,
                this._discord.Role,
                this._system.Config
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
import { GloMediaService } from './globot/glomedia/glomedia.service';
import { ReactionRoleService } from './reactionrole/reactionrole.service';
export declare class FeatureModule {
    _reactionRoleService: ReactionRoleService;
    _gloMediaService: GloMediaService;
    constructor(reactionRoleService: ReactionRoleService, gloMediaService: GloMediaService);
    get ReactionRole(): ReactionRoleService;
    get GloMedia(): GloMediaService;
}

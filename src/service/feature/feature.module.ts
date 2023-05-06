import { GloMediaService } from './globot/glomedia/glomedia.service';
import { ReactionRoleService } from './reactionrole/reactionrole.service';
export class FeatureModule{
    _reactionRoleService: ReactionRoleService
    _gloMediaService: GloMediaService
    constructor(reactionRoleService: ReactionRoleService, gloMediaService: GloMediaService) {
        this._reactionRoleService = reactionRoleService;
        this._gloMediaService = gloMediaService;
    }
    public get ReactionRole(): ReactionRoleService {
        return this._reactionRoleService;
    }
    public get GloMedia(): GloMediaService {
        return this._gloMediaService;
    }
}

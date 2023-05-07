"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureModule = void 0;
class FeatureModule {
    _reactionRoleService;
    _gloMediaService;
    constructor(reactionRoleService, gloMediaService) {
        this._reactionRoleService = reactionRoleService;
        this._gloMediaService = gloMediaService;
    }
    get ReactionRole() {
        return this._reactionRoleService;
    }
    get GloMedia() {
        return this._gloMediaService;
    }
}
exports.FeatureModule = FeatureModule;
//# sourceMappingURL=feature.module.js.map
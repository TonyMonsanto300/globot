"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionRole = exports.OptionSet = exports.ConfigOptions = exports.ConfigModel = void 0;
class ConfigModel {
    name;
    options;
    constructor(name, options) {
        this.name = name;
        this.options = options;
    }
}
exports.ConfigModel = ConfigModel;
class ConfigOptions {
}
exports.ConfigOptions = ConfigOptions;
class OptionSet {
    _text;
    _reactionRoles;
    constructor(text, reactionRoles) {
        this._text = text;
        this._reactionRoles = reactionRoles;
    }
    get Text() {
        return this._text;
    }
    get ReactionRoles() {
        return this._reactionRoles;
    }
}
exports.OptionSet = OptionSet;
class ReactionRole {
    _roleName;
    _emoji;
    constructor(roleName, emoji) {
        this._roleName = roleName;
        this._emoji = emoji;
    }
    get RoleName() {
        return this._roleName;
    }
    get Emoji() {
        return this._emoji;
    }
}
exports.ReactionRole = ReactionRole;
//# sourceMappingURL=config.model.js.map
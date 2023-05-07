"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlmodel_base_1 = require("../../database/model/sqlmodel.base");
class MemberModel extends sqlmodel_base_1.BaseSQLModel {
    _recentName;
    _recentNickname;
    _active;
    _joinTimestamp;
    _discriminator;
    _discordID;
    //Generate a constructor that sates both of the above constructors
    constructor(recentName, recentNickname, active, joinTimestamp, discriminator, discordID, id) {
        super('members', id);
        this._recentName = recentName;
        this._recentNickname = recentNickname;
        this._active = active;
        this._joinTimestamp = joinTimestamp;
        this._discriminator = discriminator;
        this._discordID = discordID;
    }
    get RecentName() {
        return this._recentName;
    }
    get RecentNickname() {
        return this._recentNickname;
    }
    get Active() {
        return this._active;
    }
    get JoinTimestamp() {
        return this._joinTimestamp;
    }
    get Discriminator() {
        return this._discriminator;
    }
    get DiscordID() {
        return this._discordID;
    }
}
exports.default = MemberModel;
//# sourceMappingURL=Member.model.js.map
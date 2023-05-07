"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordMemberModel = void 0;
const Member_model_1 = __importDefault(require("./Member.model"));
class DiscordMemberModel extends Member_model_1.default {
    constructor(guildMember) {
        super(guildMember.user.username, guildMember.nickname || guildMember.user.username, true, guildMember.joinedAt || new Date(), guildMember.user.discriminator, guildMember.id);
    }
}
exports.DiscordMemberModel = DiscordMemberModel;
//# sourceMappingURL=DiscordMember.model.js.map
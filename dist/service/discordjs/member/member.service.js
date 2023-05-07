"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
class MemberService {
    guildService;
    constructor(guildService) {
        this.guildService = guildService;
    }
    async GetAllMembers() {
        const members = this.guildService.getGuild().members.fetch();
        return members;
    }
    async getMemberByID(id) {
        return (await this.guildService.getGuild()).members.fetch(id);
    }
}
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map
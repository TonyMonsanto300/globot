"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildMemberChunkHook = void 0;
const base_hook_1 = require("../base.hook");
class GuildMemberChunkHook extends base_hook_1.BaseHook {
    _name = 'guildMembersChunk';
    constructor(serviceModule) {
        super(serviceModule);
    }
    async init() {
        this._client.on(this._name, async (members) => {
            for (const member of members) {
                await this._database.addOrUpdateMember(member);
                const guild = this._serviceModule.Discord.Guild.getGuild();
                if (!guild.members.cache.has(member.id)) {
                    await this._database.switchMemberActiveStatus(member);
                }
                console.log(`Added user: ${member.user.username}#${member.user.discriminator}`);
            }
        });
    }
}
exports.GuildMemberChunkHook = GuildMemberChunkHook;
//# sourceMappingURL=guildmember.chunk.hook.js.map
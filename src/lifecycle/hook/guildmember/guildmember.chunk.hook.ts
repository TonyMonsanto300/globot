import { ServiceModule } from "../../../service/service.module";
import { BaseHook } from "../base.hook";
import { GuildMemberHookBase } from "./guildmember.base.hook";

export class GuildMemberChunkHook extends BaseHook {
    protected _name = 'guildMembersChunk'
    constructor(serviceModule: ServiceModule){
        super(serviceModule)
    }
    async init(): Promise<void> {
        this._client.on(this._name, async (members: any) => {
            for (const member of members) {
                await this._database.addOrUpdateMember(member);
                
                const guild = this._serviceModule.Discord.Guild.getGuild();
                if (!guild.members.cache.has(member.id)) {
                    await this._database.switchMemberActiveStatus(member);
                }
                
                console.log(`Added user: ${member.user.username}#${member.user.discriminator}`);
            }
        }
    );
    }
    
}
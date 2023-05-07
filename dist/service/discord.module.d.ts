import { ChannelService } from "./discordjs/channel/channel.service";
import { ClientAgent } from '../agent/client/client.agent';
import { GuildService } from "./discordjs/guild/guild.service";
import { MemberService } from "./discordjs/member/member.service";
import { RoleService } from "./discordjs/role/role.service";
import { InteractionService } from "./discordjs/interaction/interaction.service";
export declare class DiscordModule {
    private _clientService;
    private _configService;
    private _guildService;
    private _channelService;
    private _memberService;
    private _roleService;
    private _interactionService;
    constructor(clientService: ClientAgent);
    get Client(): ClientAgent;
    get Guild(): GuildService;
    get Channel(): ChannelService;
    get Member(): MemberService;
    get Role(): RoleService;
    get Interaction(): InteractionService;
}

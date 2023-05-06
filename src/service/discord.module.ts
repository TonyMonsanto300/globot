import { ChannelService } from "./discordjs/channel/channel.service";
import { ClientAgent } from '../agent/client/client.agent';
import { GuildService } from "./discordjs/guild/guild.service";
import { MemberService } from "./discordjs/member/member.service";
import { RoleService } from "./discordjs/role/role.service";
import { ConfigService } from './system/config/config.service';


export class DiscordModule { 
    private _clientService: ClientAgent
    private _configService: ConfigService
    private _guildService: GuildService
    private _channelService: ChannelService
    private _memberService: MemberService
    private _roleService: RoleService


    constructor(clientService: ClientAgent) {
        

        this._clientService = clientService
        this._configService = new ConfigService()
        this._guildService = new GuildService(this._clientService)
        this._roleService = new RoleService(this._guildService, this._configService)
        this._channelService = new ChannelService(this._guildService)
        this._memberService = new MemberService(this._guildService)
    }

    public get Client(): ClientAgent {
        return this._clientService;
    }

    public get Guild(): GuildService {
        return this._guildService;
    }

    public get Channel(): ChannelService {
        return this._channelService;
    }

    public get Member(): MemberService {
        return this._memberService;
    }

    public get Role(): RoleService {
        return this._roleService;
    }
}
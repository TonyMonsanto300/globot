import { MessageReaction, User } from 'discord.js';
import { ChannelService } from '../../discordjs/channel/channel.service';
import { MemberService } from '../../discordjs/member/member.service';
import { RoleService } from '../../discordjs/role/role.service';
import { ConfigService } from '../../system/config/config.service';
export declare class ReactionRoleService {
    _channelService: ChannelService;
    _memberService: MemberService;
    _roleService: RoleService;
    _configservice: ConfigService;
    constructor(channelService: ChannelService, memberService: MemberService, roleservice: RoleService, configService: ConfigService);
    setupMessagesAndReactions(): Promise<void>;
    handleReactionAdd(reaction: MessageReaction, user: User): Promise<void>;
    handleReactionRemove(reaction: MessageReaction, user: User): Promise<void>;
}

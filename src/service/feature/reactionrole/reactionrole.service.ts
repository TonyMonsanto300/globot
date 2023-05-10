import { GuildMember, MessageReaction, TextChannel, User } from 'discord.js';
import { ChannelService, ChannelName } from '../../discordjs/channel/channel.service';
import { MemberService } from '../../discordjs/member/member.service';
import { RoleService } from '../../discordjs/role/role.service';
import { ConfigName, ConfigService } from '../../system/config/config.service';
import { ConfigModel, ConfigOptions, OptionSet, ReactionRole } from '../../system/config/model/config.model';
import LoggingService from '../../system/logging/logging.service';

export class ReactionRoleService {
  _channelService: ChannelService;
  _memberService: MemberService;
  _roleService: RoleService;
  _configservice: ConfigService;
  _loggingService: LoggingService;
  constructor(channelService: ChannelService, memberService: MemberService, roleservice: RoleService, configService: ConfigService, loggingService: LoggingService){
    this._channelService = channelService;
    this._memberService = memberService;
    this._roleService = roleservice;
    this._configservice = configService;
    this._loggingService = loggingService;
  }
  async setupMessagesAndReactions() {
    const rolesChannel: TextChannel = await this._channelService.getChannelByName(ChannelName.REACTIONROLE)
    if (!rolesChannel) {
      this._loggingService.Log.Error(`Could not find roles channel '${ChannelName.REACTIONROLE}'`);
      return;
    }
  
    const reactionRoleConfig: ConfigModel = await this._configservice.getConfig(ConfigName.REACTIONROLE)!;
    const reactionRoleSets = reactionRoleConfig.options;
    for(const roleSet in reactionRoleSets as OptionSet[]){
      let messageText = `${roleSet}\n\n`;
      const reactionRoleSet = reactionRoleSets[roleSet];
      for (const reactionRole of reactionRoleSet.ReactionRoles as {Emoji: string, RoleName: string}[]) {
        messageText += `${reactionRole.Emoji} for ${reactionRole.RoleName}\n`;
      }
      // Trim extra newline characters from messageText before comparing or sending
      messageText = messageText.slice(0, -2);
  
      const lastMessages = await rolesChannel.messages.fetch({ limit: 50 });
  
      // Check if the complete message text already exists in the last 50 messages
      let messageAlreadySent = false;
      for (const message of lastMessages.values()) {
        if (message.content === messageText) {
          messageAlreadySent = true;
          break;
        }
      }
  
      if (messageAlreadySent) {
        continue;
      }
  
      //TODO: MESSAGE SERVICE
      const message = await rolesChannel.send(messageText);
      for (const reactionRole of reactionRoleSet.ReactionRoles as {Emoji: string, RoleName: string}[]) {
        await message.react(reactionRole.Emoji);
      }
    }
  }
  async handleReactionAdd(reaction: MessageReaction, user: User) {
    const reactionRolesConfig: ConfigModel = await this._configservice.getConfig(ConfigName.REACTIONROLE)!;
    const reactionRoleSets = reactionRolesConfig.options;
    for(const [key, value] of Object.entries(reactionRoleSets)){
      for (const reactionRole of value.ReactionRoles as {Emoji: string, RoleName: string}[]) {
        if (reactionRole.Emoji === reaction.emoji.name) {
          const role = await this._roleService.getRoleByName(reactionRole.RoleName);
          if (role) {
            const guildMember = await this._memberService.getMemberByID(user.id);
            this._roleService.addRoleToMember(guildMember, role);
          }
        }
      }
    }
  }
  async handleReactionRemove(reaction: MessageReaction, user: User) {
    const reactionRolesConfig: ConfigModel = this._configservice.getConfig(ConfigName.REACTIONROLE)!;
    const reactionRoleSets = Object.entries(reactionRolesConfig.options) as any;
    for(const [key, value] of reactionRoleSets){
      for (const reactionRole of value.ReactionRoles as {Emoji: string, RoleName: string}[]) {
        if (reactionRole.Emoji === reaction.emoji.name) {
          const role = await this._roleService.getRoleByName(reactionRole.RoleName);
          if (role) {
            const guildMember = await this._memberService.getMemberByID(user.id);
            this._roleService.removeRoleFromMember(guildMember, role);
          }
        }
      }
    }
    }
  }
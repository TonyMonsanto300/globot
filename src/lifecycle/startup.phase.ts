import CommandAgent from '../agent/command/command.agent';
import { ChannelName } from '../service/discordjs/channel/channel.service';
import { ServiceModule } from '../service/service.module';
import { GuildMemberAddHook } from './hook/guildmember/guildmember.add.hook';
import { GuildMemberChunkHook } from './hook/guildmember/guildmember.chunk.hook';
import { GuildMemberRemoveHook } from './hook/guildmember/guildmember.remove.hook';
import { MessageCreateHook } from './hook/message.create.hook';
import { MessageReactionAddHook } from './hook/messagereaction/messagereaction.add.hook';
import { MessageReactionRemoveHook } from './hook/messagereaction/messagereaction.remove.hook';

export class StartupPhase {
    private _hooks: (() => Promise<void>)[] = [];
    private _serviceModule: ServiceModule;
    private _commandAgent: CommandAgent;
    constructor(serviceModule: ServiceModule, commandAgent: CommandAgent){
        this._serviceModule = serviceModule;
        this._commandAgent = commandAgent;
        this._hooks = [
            async () => new MessageReactionAddHook(serviceModule).init(),
            async () => new MessageReactionRemoveHook(serviceModule).init(),
            async () => new GuildMemberAddHook(serviceModule).init(),
            async () => new GuildMemberRemoveHook(serviceModule).init(),
            async () => new GuildMemberChunkHook(serviceModule).init(),
            async () => new MessageCreateHook(serviceModule).init(),
          ];
    }

    private async _setupHooks(): Promise<void> {
        await Promise.all(this._hooks.map(hook => hook()));
    }

    public async init(){
        await this._setupHooks();
        this._serviceModule.Discord.Client.getClient().on('ready', async () => {
            console.log(`Logged in successfully!`);
        
            //scan client text channels and find the one named from ConfigManager.getChannelConfig() listed under "BotChannel" in its json file
            const botChannel = await this._serviceModule.Discord.Channel.getChannelByName(ChannelName.BOT);

            const loginMessages = [
                "Ya'll already know how I'm rockin man like cut off stockings",
                "These bitches act local and think global",
                "Shout out to all my Turnipseedros #TSG",
                `"RealTime Chris may seem like a computer geek, but when it comes to handling business, that man is a straight savage. He ain't afraid to pick up that P90 and spray down opps, no hesitation.`
            ]

            if (botChannel) {
                // Delete the last bot login message in the channel
                const messages = await botChannel.messages.fetch({ limit: 25 });
                const botMessages = messages.filter(message => message.author.id === this._serviceModule.Discord.Client.getClient().user?.id);
                for (const botMessage of botMessages.values()) {
                    if (loginMessages.some(loginMessage => botMessage.content.startsWith(loginMessage) && botMessage.content.includes("(Globert is back online!)"))) {
                        botMessage.delete();
                    }
                }
        
                const randomIndex = Math.floor(Math.random() * loginMessages.length);
                botChannel.send(`${loginMessages[randomIndex]} (Globert is back online!)`);
            }
        
            this._serviceModule.Feature.ReactionRole.setupMessagesAndReactions();
            this._commandAgent.registerCommands();
            this._commandAgent.handleCommandsSetup();
        }) 
    }
}

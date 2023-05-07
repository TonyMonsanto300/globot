"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartupPhase = void 0;
const channel_service_1 = require("../service/discordjs/channel/channel.service");
const guildmember_add_hook_1 = require("./hook/guildmember/guildmember.add.hook");
const guildmember_chunk_hook_1 = require("./hook/guildmember/guildmember.chunk.hook");
const guildmember_remove_hook_1 = require("./hook/guildmember/guildmember.remove.hook");
const message_create_hook_1 = require("./hook/message.create.hook");
const messagereaction_add_hook_1 = require("./hook/messagereaction/messagereaction.add.hook");
const messagereaction_remove_hook_1 = require("./hook/messagereaction/messagereaction.remove.hook");
class StartupPhase {
    _hooks = [];
    _serviceModule;
    _commandAgent;
    constructor(serviceModule, commandAgent) {
        this._serviceModule = serviceModule;
        this._commandAgent = commandAgent;
        this._hooks = [
            async () => new messagereaction_add_hook_1.MessageReactionAddHook(serviceModule).init(),
            async () => new messagereaction_remove_hook_1.MessageReactionRemoveHook(serviceModule).init(),
            async () => new guildmember_add_hook_1.GuildMemberAddHook(serviceModule).init(),
            async () => new guildmember_remove_hook_1.GuildMemberRemoveHook(serviceModule).init(),
            async () => new guildmember_chunk_hook_1.GuildMemberChunkHook(serviceModule).init(),
            async () => new message_create_hook_1.MessageCreateHook(serviceModule).init(),
        ];
    }
    async _setupHooks() {
        await Promise.all(this._hooks.map(hook => hook()));
    }
    async init() {
        await this._setupHooks();
        this._serviceModule.Discord.Client.getClient().on('ready', async () => {
            console.log(`Logged in successfully!`);
            //scan client text channels and find the one named from ConfigManager.getChannelConfig() listed under "BotChannel" in its json file
            const botChannel = await this._serviceModule.Discord.Channel.getChannelByName(channel_service_1.ChannelName.BOT);
            const loginMessages = [
                "Ya'll already know how I'm rockin man like cut off stockings",
                "These bitches act local and think global",
                "Shout out to all my Turnipseedros #TSG",
                `"RealTime Chris may seem like a computer geek, but when it comes to handling business, that man is a straight savage. He ain't afraid to pick up that P90 and spray down opps, no hesitation.`
            ];
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
            this._commandAgent.setupSlashCommands();
        });
    }
}
exports.StartupPhase = StartupPhase;
//# sourceMappingURL=startup.phase.js.map
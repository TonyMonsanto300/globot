import CommandAgent from "../../agent/command/command.agent";
import { ChannelName } from "../../service/discordjs/channel/channel.service";
import { ServiceModule } from "../../service/service.module";
import { BaseHook } from "./base.hook";

export class ReadyHook extends BaseHook {
    protected _name: string = 'ready';
    constructor(serviceModule: ServiceModule, private _commandAgent: CommandAgent) {
        super(serviceModule)
    }
    public init(): void {
        this._client.on('ready', async () => {
            //TODO: MessageService

            const botChannel = await this._serviceModule.Discord.Channel.getChannelByName(ChannelName.BOT);
            //! Log
            if (botChannel) {
                // Delete the last bot login message in the channel
                //? BotMessageHelperService
                const messages = await botChannel.messages.fetch({ limit: 25 });
                const botMessages = messages.filter(message => message.author.id === this._serviceModule.Discord.Client.getClient().user?.id);
                for (const botMessage of botMessages.values()) {
                    if (this._serviceModule.System.Message.Login.some(loginMessage => botMessage.content.startsWith(loginMessage) && botMessage.content.includes("(Globert is back online!)"))) {
                        botMessage.delete();
                    }
                }
        
                //TODO: MessageService
                const randomIndex = Math.floor(Math.random() * this._serviceModule.System.Message.Login.length);
                botChannel.send(`${this._serviceModule.System.Message.Login[randomIndex]} (Globert is back online!)`);
            }
        
            
            this._serviceModule.Feature.ReactionRole.setupMessagesAndReactions();
            this._commandAgent.registerCommands();
            this._commandAgent.handleCommandsSetup();

            //TODO: MessageService
            console.log(`Logged in successfully!`);
        }) 
    }
}
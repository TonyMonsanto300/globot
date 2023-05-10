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
            if(botChannel) {
                this._serviceModule.System.Logging.Log.Success(`Bot Channel found: ${botChannel.name}`);
            } else {
                this._serviceModule.System.Logging.Log.Error(`Bot Channel not found!`);
            }
            if (botChannel) {
                //? BotMessageHelperService
                const messages = await botChannel.messages.fetch({ limit: 25 });
                const botMessages = messages.filter(message => message.author.id === this._serviceModule.Discord.Client.getClient().user?.id);
                for (const botMessage of botMessages.values()) {
                    if (this._serviceModule.System.Message.Login.some(loginMessage => botMessage.content.startsWith(loginMessage) 
                        && botMessage.content.includes("(Globert is back online!)"))) {
                        await botMessage.delete();
                        this._serviceModule.System.Logging.Log.System(`Deleted previous message: ${botMessage.content}`);
                    } else {
                        this._serviceModule.System.Logging.Log.System(`No previous Login messages found, nothing to delete.`);
                    }
                }
        
                //TODO: Create helper service with array random function
                //TODO: MessageService
                const randomIndex = Math.floor(Math.random() * this._serviceModule.System.Message.Login.length);
                botChannel.send(`${this._serviceModule.System.Message.Login[randomIndex]} (Globert is back online!)`);
            }
        
            //TODO: Move into it's own hook
            this._serviceModule.Feature.ReactionRole.setupMessagesAndReactions();
            this._commandAgent.registerCommands();
            this._commandAgent.handleCommandsSetup();

            //TODO: MessageService
            this._serviceModule.System.Logging.Log.Success(`Logged in successfully!`);
        }) 
    }
}
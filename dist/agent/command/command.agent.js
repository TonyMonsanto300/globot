"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const gloRandomMedia_handler_1 = require("./commands/glo/gloRandomMedia.handler");
const gloWhipeMessage_handler_1 = require("./commands/glo/gloWhipeMessage.handler");
const gloShutdownHandler_1 = require("./commands/glo/gloShutdownHandler");
class CommandAgent {
    _serviceModule;
    _clientAgent;
    commandHandlers = [];
    constructor(serviceModule, clientAgent) {
        this._serviceModule = serviceModule;
        this._clientAgent = clientAgent;
        this._clientAgent.getClient();
        this.commandHandlers.push(new gloRandomMedia_handler_1.GloRandomMediaHandler(this._serviceModule));
        this.commandHandlers.push(new gloWhipeMessage_handler_1.GloWhipeMessageHandler(this._serviceModule));
        this.commandHandlers.push(new gloShutdownHandler_1.GloShutdownHandler(this._serviceModule));
    }
    async registerCommands() {
        const rest = new discord_js_1.REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
        try {
            //messageService.Command.RefreshApplicationStart()
            console.log('Started refreshing application (/) commands.');
            await rest.put(discord_js_1.Routes.applicationGuildCommands(this._clientAgent.getClient().application?.id, this._serviceModule.Discord.Guild.getGuild().id), { body: this.commandHandlers.map(handler => handler.Command) });
            //mesageService.Command.RefreshApplicationDone()
            console.log('Successfully reloaded application (/) commands.');
        }
        catch (error) {
            console.error(error);
        }
    }
    async handleCommandsSetup() {
        this._clientAgent.getClient().on('interactionCreate', async (interaction) => {
            if ((!interaction.isCommand()) || (await this._serviceModule.Discord.Interaction.inBotChannel(interaction)))
                return;
            try {
                this.commandHandlers.find(handler => handler._command.name === interaction.command.name).execute(interaction);
            }
            catch {
                console.log(`Command ${interaction.commandName} not found`);
            }
            console.log('Shutdown command received. Shutting down bot...');
            await interaction.reply('Shutting down Globert...');
            this._clientAgent.getClient().destroy();
        });
    }
}
exports.default = CommandAgent;
//# sourceMappingURL=command.agent.js.map
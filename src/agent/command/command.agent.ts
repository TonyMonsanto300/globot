import { Interaction, PermissionsBitField, REST, Routes, TextChannel, Guild, OAuth2Guild, ApplicationCommand, SlashCommandBuilder, RESTPostAPIApplicationCommandsJSONBody, User, CommandInteraction, GuildMember } from 'discord.js';
import { ChannelName } from "../../service/discordjs/channel/channel.service";
import { ServiceModule } from "../../service/service.module";
import { ClientAgent } from "../client/client.agent";
import { AbstractCommandHandler } from './model/commandHandler.base';
import { GloRandomMediaHandler } from './commands/glo/gloRandomMedia.handler';
import { GloWhipeMessageHandler } from './commands/glo/gloWhipeMessage.handler';
import { GloShutdownHandler } from './commands/glo/gloShutdownHandler';

export default class CommandAgent {
  private _serviceModule: ServiceModule;
  private _clientAgent: ClientAgent;
  commandHandlers: AbstractCommandHandler[ ] = []

  constructor(serviceModule: ServiceModule, clientAgent: ClientAgent) {
    this._serviceModule = serviceModule;
    this._clientAgent = clientAgent;
    this._clientAgent.getClient()

    this.commandHandlers.push(new GloRandomMediaHandler(this._serviceModule));
    this.commandHandlers.push(new GloWhipeMessageHandler(this._serviceModule));
    this.commandHandlers.push(new GloShutdownHandler(this._serviceModule));
    
  } 

  async registerCommands(){
    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN!);
    try {
      //messageService.Command.RefreshApplicationStart()
      this._serviceModule.System.Logging.Log.System('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationGuildCommands(
        this._clientAgent.getClient().application?.id!, this._serviceModule.Discord.Guild.getGuild().id!), 
          { body: this.commandHandlers.map(handler => handler.Command) }
        );
      
        
      //mesageService.Command.RefreshApplicationDone()
      this._serviceModule.System.Logging.Log.Success('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }

  async handleCommandsSetup() {
  
    this._clientAgent.getClient().on('interactionCreate', async (interaction: Interaction) => {
      if ((!interaction.isCommand()) || (await this._serviceModule.Discord.Interaction.inBotChannel(interaction)))  return;

      try{
        this.commandHandlers.find(handler => handler._command.name === interaction.command!.name)!.execute(interaction)
      } catch {
        this._serviceModule.System.Logging.Log.Error(`Command ${interaction.commandName} not found`)
      }
      
        this._serviceModule.System.Logging.Log.System('Shutdown command received. Shutting down bot...');
        await interaction.reply('Shutting down Globert...');
        this._clientAgent.getClient().destroy();
    })
  }
}
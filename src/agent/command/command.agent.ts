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
      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationGuildCommands(
        this._clientAgent.getClient().application?.id!, this._serviceModule.Discord.Guild.getGuild().id!), 
          { body: this.commandHandlers.map(handler => handler.Command) }
        );
      
        
      //mesageService.Command.RefreshApplicationDone()
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }

  async inBotChannel(interaction: Interaction): Promise<boolean> {
    const _interaction = interaction as CommandInteraction;
    if ((((await this._serviceModule.Discord.Channel.getChannelByID(_interaction.channelId)).name) == ChannelName.BOT) 
    && (_interaction.member!.permissions as PermissionsBitField).has(PermissionsBitField.Flags.Administrator)) {
      await _interaction.reply({ content: 'You cannot use slash commands in this channel.', ephemeral: true });
      return new Promise(() => true);
    } else {
      return new Promise(() => false)
    }
  }

  async isOwner(interaction: Interaction){
    if (interaction.user.id !== this._serviceModule.Discord.Guild.getGuild().ownerId) {
      await (interaction as CommandInteraction).reply('You do not have permission to use this command.');
      return;
    }
  }

  async handleCommandsSetup() {
  
    this._clientAgent.getClient().on('interactionCreate', async (interaction: Interaction) => {
      if ((!interaction.isCommand()) || (await this.inBotChannel(interaction)))  return;

      try{
        this.commandHandlers.find(handler => handler._command.name === interaction.command!.name)!.execute(interaction)
      } catch {
        console.log(`Command ${interaction.commandName} not found`)
      }
      
        console.log('Shutdown command received. Shutting down bot...');
        await interaction.reply('Shutting down Globert...');
        this._clientAgent.getClient().destroy();
    })
  }
}
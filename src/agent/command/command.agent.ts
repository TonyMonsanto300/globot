import { Interaction, PermissionsBitField, REST, Routes, TextChannel, Guild, OAuth2Guild } from 'discord.js';
import { ChannelName } from "../../service/discordjs/channel/channel.service";
import { ServiceModule } from "../../service/service.module";
import { ClientAgent } from "../client/client.agent";

export default class CommandAgent {
    private _serviceModule: ServiceModule;
    private _clientAgent: ClientAgent;

    constructor(serviceModule: ServiceModule, clientAgent: ClientAgent) {
        this._serviceModule = serviceModule;
        this._clientAgent = clientAgent;
    }
  
    async registerCommands() {
      const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN!);
    
      const commands = [
        {
          name: 'glo',
          description: 'Get a random Glo Gang media file',
        },
        {
          name: 'wipe',
          description: 'Wipe the last messages in the channel',
          defaultPermission: false // hidden by default,
        },
        {
          name: 'shutdown',
          description: 'Shut down the bot',
          defaultPermission: false
        },
      ];
  
      try {
        console.log('Started refreshing application (/) commands.');
        const guild: Guild = await this._serviceModule.Discord.Guild.getGuild();
        await rest.put(Routes.applicationGuildCommands(this._clientAgent.getClient().application?.id!, guild.id!), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
    }
  
    async setupSlashCommands() {
      this.registerCommands();
    
      this._clientAgent.getClient().on('interactionCreate', async (interaction: Interaction) => {
        if (!interaction.isCommand()) return;
    
        const { commandName, user, guild, channel } = interaction;
        const interactionChannel = channel as TextChannel;
    
        if (interactionChannel.name == ChannelName.BOT
        && (await this._serviceModule.Discord.Member.getMemberByID(user.id)).permissions.has(PermissionsBitField.Flags.Administrator)) {
          await interaction.reply({ content: 'You cannot use slash commands in this channel.', ephemeral: true });
          return;
        }
    
        if (commandName === 'glo') {
          const mediaPath = await this._serviceModule.Feature.GloMedia.getRandomGloMedia();
          const media: any = { files: [mediaPath] };
          await interaction.reply(media);
        } else if (commandName === 'shutdown') {
          if (user.id !== guild!.ownerId) {
            await interaction.reply('You do not have permission to use this command.');
            return;
          }
        
          const goodbyeMessages = [
            'Goodbye!',
            'See you later!',
            'Until next time!',
          ];
        
          const channel = await this._serviceModule.Discord.Channel.getChannelByName(ChannelName.BOT);
          if (channel) {
            const messages = await channel.messages.fetch({ limit: 25 });
            messages.forEach(async (msg) => {
              if (msg.author.id === this._clientAgent.getClient().user!.id && msg.content.includes('(Globert is offline.)')) {
                await msg.delete();
              }
            });
            const randomIndex = Math.floor(Math.random() * goodbyeMessages.length);
            await channel.send(`${goodbyeMessages[randomIndex]} (Globert is offline.)`);
          }
        
          console.log('Shutdown command received. Shutting down bot...');
          await interaction.reply('Shutting down Globert...');
          this._clientAgent.getClient().destroy();
        } else if (commandName === 'wipe') {
          const channel = await this._serviceModule.Discord.Channel.getChannelByName(ChannelName.BOT);
          if (channel) {
            const messages = await channel.messages.fetch({ limit: 100 });
            messages.forEach(async (msg) => {
              if (msg.author.id === this._clientAgent.getClient().user!.id) {
                await msg.delete();
              }
            });
            await interaction.reply('Messages have been wiped!');
          }
        }
      });
    }
  }
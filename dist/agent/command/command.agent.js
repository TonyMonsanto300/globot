"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const channel_service_1 = require("../../service/discordjs/channel/channel.service");
class CommandAgent {
    _serviceModule;
    _clientAgent;
    constructor(serviceModule, clientAgent) {
        this._serviceModule = serviceModule;
        this._clientAgent = clientAgent;
    }
    async registerCommands() {
        const rest = new discord_js_1.REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
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
            const guild = await this._serviceModule.Discord.Guild.getGuild();
            await rest.put(discord_js_1.Routes.applicationGuildCommands(this._clientAgent.getClient().application?.id, guild.id), { body: commands });
            console.log('Successfully reloaded application (/) commands.');
        }
        catch (error) {
            console.error(error);
        }
    }
    async setupSlashCommands() {
        this.registerCommands();
        this._clientAgent.getClient().on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand())
                return;
            const { commandName, user, guild, channel } = interaction;
            const interactionChannel = channel;
            if (interactionChannel.name == channel_service_1.ChannelName.BOT
                && (await this._serviceModule.Discord.Member.getMemberByID(user.id)).permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator)) {
                await interaction.reply({ content: 'You cannot use slash commands in this channel.', ephemeral: true });
                return;
            }
            if (commandName === 'glo') {
                const mediaPath = await this._serviceModule.Feature.GloMedia.getRandomGloMedia();
                const media = { files: [mediaPath] };
                await interaction.reply(media);
            }
            else if (commandName === 'shutdown') {
                if (user.id !== guild.ownerId) {
                    await interaction.reply('You do not have permission to use this command.');
                    return;
                }
                const goodbyeMessages = [
                    'Goodbye!',
                    'See you later!',
                    'Until next time!',
                ];
                const channel = await this._serviceModule.Discord.Channel.getChannelByName(channel_service_1.ChannelName.BOT);
                if (channel) {
                    const messages = await channel.messages.fetch({ limit: 25 });
                    messages.forEach(async (msg) => {
                        if (msg.author.id === this._clientAgent.getClient().user.id && msg.content.includes('(Globert is offline.)')) {
                            await msg.delete();
                        }
                    });
                    const randomIndex = Math.floor(Math.random() * goodbyeMessages.length);
                    await channel.send(`${goodbyeMessages[randomIndex]} (Globert is offline.)`);
                }
                console.log('Shutdown command received. Shutting down bot...');
                await interaction.reply('Shutting down Globert...');
                this._clientAgent.getClient().destroy();
            }
            else if (commandName === 'wipe') {
                const channel = await this._serviceModule.Discord.Channel.getChannelByName(channel_service_1.ChannelName.BOT);
                if (channel) {
                    const messages = await channel.messages.fetch({ limit: 100 });
                    messages.forEach(async (msg) => {
                        if (msg.author.id === this._clientAgent.getClient().user.id) {
                            await msg.delete();
                        }
                    });
                    await interaction.reply('Messages have been wiped!');
                }
            }
        });
    }
}
exports.default = CommandAgent;
//# sourceMappingURL=command.agent.js.map
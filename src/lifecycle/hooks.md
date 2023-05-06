
client.on('guildMembersChunk', async (members, guild) => {
    for (const member of members) {
        await databaseService.addOrUpdateUser(member);
        
        if (!guild.members.cache.has(member.id)) {
            await databaseService.updateUserActiveStatusByMemberId(member.id, false);
        }
        
        console.log(`Added user: ${member.user.username}#${member.user.discriminator}`);
    }
}
);

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.channel.name !== config.channelName) return;
    
    // Delete the user's message and warn them
    await message.delete();
    const warningMessage = await message.channel.send(`${message.author}, please do not send messages in this channel.`);
    
    // Delete the warning message and the user's message after 20 seconds
    setTimeout(async () => {
        await warningMessage.delete();
    }, 20000);
}
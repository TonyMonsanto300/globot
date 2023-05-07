"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCreateHook = void 0;
const base_hook_1 = require("./base.hook");
const channel_service_1 = require("../../service/discordjs/channel/channel.service");
class MessageCreateHook extends base_hook_1.BaseHook {
    _name = 'messageCreate';
    async init() {
        this._client.on(this._name, async (message) => {
            if (message.author.bot || (message.channel.isTextBased() && message.channel.name !== channel_service_1.ChannelName.BOT))
                return;
            // Delete the user's message and warn them
            await message.delete();
            const warningMessage = await message.channel.send(`${message.author}, please do not send messages in this channel.`);
            // Delete the warning message and the user's message after 20 seconds
            setTimeout(async () => {
                await warningMessage.delete();
            }, 20000);
        });
    }
}
exports.MessageCreateHook = MessageCreateHook;
//# sourceMappingURL=message.create.hook.js.map
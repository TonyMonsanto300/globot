"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
class MessageService {
    _loginMessages = [
        "Ya'll already know how I'm rockin man like cut off stockings",
        "These bitches act local and think global",
        "Shout out to all my Turnipseedros #TSG",
        `RealTime Chris may seem like a computer geek, but when it comes to handling business, that man is a straight savage. He ain't afraid to pick up that P90 and spray down opps, no hesitation.`
    ];
    _logoutMessages = [
        'Goodbye!',
        'See you later!',
        'Until next time!',
    ];
    get Login() {
        return this._loginMessages;
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map
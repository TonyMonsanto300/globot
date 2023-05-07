export class MessageService {
    _loginMessages: string[] = [
        "Ya'll already know how I'm rockin man like cut off stockings",
        "These bitches act local and think global",
        "Shout out to all my Turnipseedros #TSG",
        `RealTime Chris may seem like a computer geek, but when it comes to handling business, that man is a straight savage. He ain't afraid to pick up that P90 and spray down opps, no hesitation.`
    ]

    _logoutMessages: string[] = [
        'Goodbye!',
        'See you later!',
        'Until next time!',
    ];

    public get Login(): string[]{
        return this._loginMessages
    }
}
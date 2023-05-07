export declare abstract class ConfigModel {
    name: string;
    options: {
        [key: string]: any;
    };
    constructor(name: string, options: {
        [key: string]: any;
    });
    abstract parseOptions(optionsData: {
        [key: string]: any;
    }): void;
}
export declare class ConfigOptions {
    [key: string]: ConfigOptions | string;
}
export declare class OptionSet {
    _text: string;
    _reactionRoles: ReactionRole[];
    constructor(text: string, reactionRoles: ReactionRole[]);
    get Text(): string;
    get ReactionRoles(): ReactionRole[];
}
export declare class ReactionRole {
    _roleName: string;
    _emoji: string;
    constructor(roleName: string, emoji: string);
    get RoleName(): string;
    get Emoji(): string;
}

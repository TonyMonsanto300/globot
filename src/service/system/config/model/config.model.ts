export abstract class ConfigModel {
    name: string;
    options: { [key: string]: any };

    constructor(name: string, options: { [key: string]: any }) {
        this.name = name;
        this.options = options;
    }

    abstract parseOptions(optionsData: { [key: string]: any }): void;
}

export class ConfigOptions {
    [key: string]: ConfigOptions | string;
}

export class OptionSet {
    _text: string;
    _reactionRoles: ReactionRole[];
    constructor(text: string, reactionRoles: ReactionRole[]) {
        this._text = text;
        this._reactionRoles = reactionRoles;
    }
    get Text(): string {
        return this._text;
    }
    get ReactionRoles(): ReactionRole[] {
        return this._reactionRoles;
    }
}

export class ReactionRole{
    _roleName: string
    _emoji: string

    constructor(roleName: string, emoji: string){
        this._roleName = roleName;
        this._emoji = emoji;
    }

    public get RoleName(): string{
        return this._roleName;
    }

    public get Emoji(): string{
        return this._emoji;
    }
}
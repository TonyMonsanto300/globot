import { CommandInteraction, Interaction, RESTPatchAPIApplicationCommandJSONBody } from "discord.js";
import { ServiceModule } from "../../../service/service.module";

export abstract class AbstractCommandHandler {
    _command: RESTPatchAPIApplicationCommandJSONBody;
    _serviceModule: ServiceModule;
    constructor(
        command: RESTPatchAPIApplicationCommandJSONBody, 
        serviceModule: ServiceModule
    ){
        this._command = command;
        this._serviceModule = serviceModule;
    }

    protected abstract _execute(interaction: CommandInteraction): void;

    execute(interaction: Interaction) {
        const _interaction = interaction as CommandInteraction
        this._execute(_interaction)
    }

    get Command(): RESTPatchAPIApplicationCommandJSONBody{
        return this._command;
    }
}
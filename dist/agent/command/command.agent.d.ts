import { ServiceModule } from "../../service/service.module";
import { ClientAgent } from "../client/client.agent";
import { AbstractCommandHandler } from './model/commandHandler.base';
export default class CommandAgent {
    private _serviceModule;
    private _clientAgent;
    commandHandlers: AbstractCommandHandler[];
    constructor(serviceModule: ServiceModule, clientAgent: ClientAgent);
    registerCommands(): Promise<void>;
    handleCommandsSetup(): Promise<void>;
}

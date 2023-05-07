import { ServiceModule } from "../../service/service.module";
import { ClientAgent } from "../client/client.agent";
export default class CommandAgent {
    private _serviceModule;
    private _clientAgent;
    constructor(serviceModule: ServiceModule, clientAgent: ClientAgent);
    registerCommands(): Promise<void>;
    setupSlashCommands(): Promise<void>;
}

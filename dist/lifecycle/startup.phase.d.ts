import CommandAgent from '../agent/command/command.agent';
import { ServiceModule } from '../service/service.module';
export declare class StartupPhase {
    private _hooks;
    private _serviceModule;
    private _commandAgent;
    constructor(serviceModule: ServiceModule, commandAgent: CommandAgent);
    private _setupHooks;
    init(): Promise<void>;
}

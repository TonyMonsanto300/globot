import CommandAgent from '../agent/command/command.agent';
import { ServiceModule } from '../service/service.module';
import { HookManager } from './hook/hook.manager';


export class Startup {
    constructor(private _serviceModule: ServiceModule, private _commandAgent: CommandAgent, private _hookManager: HookManager){

    }
    public async init(){
        this._hookManager.init();
    }
}

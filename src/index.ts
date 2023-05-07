import { ClientAgent } from './agent/client/client.agent';
import CommandAgent from './agent/command/command.agent';
import { HookManager } from './lifecycle/hook/hook.manager';
import { Startup } from './lifecycle/startup';
import { ServiceModule } from './service/service.module';

const clientAgent= new ClientAgent()
const serviceModule = new ServiceModule(clientAgent)
const commandAgent = new CommandAgent(serviceModule, clientAgent)
new Startup(new HookManager(serviceModule, commandAgent)).init()
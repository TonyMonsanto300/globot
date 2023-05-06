import { ClientAgent } from './agent/client/client.agent';
import CommandAgent from './agent/command/command.agent';
import { StartupPhase } from './lifecycle/startup.phase';

import { ServiceModule } from './service/service.module';

const clientAgent= new ClientAgent()
const serviceModule = new ServiceModule(clientAgent)
new StartupPhase(serviceModule, new CommandAgent(serviceModule, clientAgent)).init()
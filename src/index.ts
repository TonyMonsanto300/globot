import { ClientAgent } from './agent/client/client.agent';
import CommandAgent from './agent/command/command.agent';
import { HookManager } from './lifecycle/hook/hook.manager';
import { Startup } from './lifecycle/startup';
import { ServiceModule } from './service/service.module';
import LoggingService from './service/system/logging/logging.service';
import { ConfigService } from './service/system/config/config.service';

const clientAgent= new ClientAgent()
const loggingService = new LoggingService()
const configService = new ConfigService(loggingService)
const serviceModule = new ServiceModule(clientAgent, configService, loggingService)
const commandAgent = new CommandAgent(serviceModule, clientAgent)
new Startup(new HookManager(serviceModule, commandAgent)).init()
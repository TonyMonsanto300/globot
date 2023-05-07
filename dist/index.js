"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_agent_1 = require("./agent/client/client.agent");
const command_agent_1 = __importDefault(require("./agent/command/command.agent"));
const hook_manager_1 = require("./lifecycle/hook/hook.manager");
const startup_1 = require("./lifecycle/startup");
const service_module_1 = require("./service/service.module");
const clientAgent = new client_agent_1.ClientAgent();
const serviceModule = new service_module_1.ServiceModule(clientAgent);
const commandAgent = new command_agent_1.default(serviceModule, clientAgent);
new startup_1.Startup(new hook_manager_1.HookManager(serviceModule, commandAgent)).init();
//# sourceMappingURL=index.js.map
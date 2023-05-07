"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseHook = void 0;
const database_service_1 = require("../../database/database.service");
class BaseHook {
    _serviceModule;
    _database;
    constructor(serviceModule) {
        this._serviceModule = serviceModule;
        this._client = serviceModule.Discord.Client.getClient();
        this._database = new database_service_1.DatabaseService(this._serviceModule.Discord.Member);
    }
    _client;
}
exports.BaseHook = BaseHook;
//# sourceMappingURL=base.hook.js.map
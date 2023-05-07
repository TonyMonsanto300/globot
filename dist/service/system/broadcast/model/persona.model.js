"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Persona {
    Login;
    Logout;
    System;
    Relational;
    Personal;
    constructor(personaName) {
        this.Login = this.loadJsonFile(personaName, 'login.json');
        this.Logout = this.loadJsonFile(personaName, 'logout.json');
        this.System = this.loadJsonFile(personaName, 'system.json');
        this.Relational = this.loadJsonFile(personaName, 'relational.json');
        this.Personal = this.loadJsonFile(personaName, 'personal.json');
    }
    loadJsonFile(personaName, fileName) {
        const filePath = path.join(__dirname, 'personas', personaName, fileName);
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(jsonData);
    }
}
exports.Persona = Persona;
//# sourceMappingURL=persona.model.js.map
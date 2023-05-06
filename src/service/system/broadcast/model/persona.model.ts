import MessageMap from './message.map';
import * as fs from 'fs';
import * as path from 'path';

export interface TSPersona {
  Login: MessageMap;
  Logout: MessageMap;
  System: MessageMap;
  Relational: MessageMap;
  Personal: MessageMap;
}

export class Persona implements TSPersona {
    Login: MessageMap;
    Logout: MessageMap;
    System: MessageMap;
    Relational: MessageMap;
    Personal: MessageMap;
  
    constructor(personaName: string) {
      this.Login = this.loadJsonFile<MessageMap>(personaName, 'login.json');
      this.Logout = this.loadJsonFile<MessageMap>(personaName, 'logout.json');
      this.System = this.loadJsonFile<MessageMap>(personaName, 'system.json');
      this.Relational = this.loadJsonFile<MessageMap>(personaName, 'relational.json');
      this.Personal = this.loadJsonFile<MessageMap>(personaName, 'personal.json');
    }
  
    private loadJsonFile<T>(personaName: string, fileName: string): T {
      const filePath = path.join(__dirname, 'personas', personaName, fileName);
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(jsonData) as T;
    }
  }
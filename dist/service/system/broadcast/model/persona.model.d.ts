import MessageMap from './message.map';
export interface TSPersona {
    Login: MessageMap;
    Logout: MessageMap;
    System: MessageMap;
    Relational: MessageMap;
    Personal: MessageMap;
}
export declare class Persona implements TSPersona {
    Login: MessageMap;
    Logout: MessageMap;
    System: MessageMap;
    Relational: MessageMap;
    Personal: MessageMap;
    constructor(personaName: string);
    private loadJsonFile;
}

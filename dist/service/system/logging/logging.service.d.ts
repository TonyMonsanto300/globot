declare enum MessageCode {
    SYSTEM = "system",
    SUCCESS = "success",
    ERROR = "error",
    DEBUG = "debug"
}
export default class LogService {
    Log: {
        System(message: string): void;
        Error(error: unknown): void;
        Success(message: string): void;
        LogMessage: (type: MessageCode, message: string, consoleColor: any) => void;
    };
}
export {};

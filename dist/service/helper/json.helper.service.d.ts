export declare class JSONHelperService {
    readJSONFromFile<T>(filePath: string): T;
    writeJSONToFile(filePath: string, json: JSON): void;
}

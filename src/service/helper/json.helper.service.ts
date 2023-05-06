//Generate a service to read json into objects, read json without object, and save to files

import * as fs from 'fs';

export class JSONHelperService {

    readJSONFromFile<T>(filePath: string) {
        const fileContents = fs.readFileSync(filePath);
        const json = JSON.parse(fileContents.toString()) as T;
        return json;
    }
    
    writeJSONToFile(filePath: string, json: JSON) {
        const jsonContents = JSON.stringify(json, null, 2);
        fs.writeFileSync(filePath, jsonContents);
    }
}
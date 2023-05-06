import { JSONHelperService } from './json.helper.service';

export class HelperModule {
    jsonHelperService: JSONHelperService;
    constructor() {
        this.jsonHelperService = new JSONHelperService();
    }
}
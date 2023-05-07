import { GloMessageHelperService } from './glomessage.helper';
import { JSONHelperService } from './json.helper.service';

export class HelperModule {
    _gloMessageHelperService: GloMessageHelperService;
    _jsonHelperService: JSONHelperService;
    constructor(gloMessageHelperService: GloMessageHelperService, jsonHelperService: JSONHelperService) {
        this._gloMessageHelperService = gloMessageHelperService;
        this._jsonHelperService = jsonHelperService;
    }
}
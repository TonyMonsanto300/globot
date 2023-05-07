import { HookManager } from './hook/hook.manager';

export class Startup {
    constructor(private _hookManager: HookManager){

    }
    public async init(){
        this._hookManager.init();
    }
}
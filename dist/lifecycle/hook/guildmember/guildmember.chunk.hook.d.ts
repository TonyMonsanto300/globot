import { ServiceModule } from "../../../service/service.module";
import { BaseHook } from "../base.hook";
export declare class GuildMemberChunkHook extends BaseHook {
    protected _name: string;
    constructor(serviceModule: ServiceModule);
    init(): Promise<void>;
}

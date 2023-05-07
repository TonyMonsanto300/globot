export declare class BaseSQLModel {
    private tableName;
    private id?;
    private _id;
    private _tableName;
    constructor(tableName: string, id?: string | undefined);
    get TableName(): string;
    get ID(): string;
}

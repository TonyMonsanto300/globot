//interface for models associated with tables, has a table name and a primary key
//Require a tablename in the counstructor

export class BaseSQLModel {
    private _id: string | undefined;
    private _tableName: string;
    
    constructor(private tableName: string, private id?: string) { 
        this._tableName = tableName;
    }
    
    public get TableName(): string {
        return this._tableName;
    }
    
    public get ID(): string {
        if(this.ID == null){
            throw new Error(`This ${this.tableName} object has not been saved to the database yet.`);
        } else {
            return this._id!;
        }
    }
}
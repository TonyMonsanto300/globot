"use strict";
//interface for models associated with tables, has a table name and a primary key
//Require a tablename in the counstructor
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSQLModel = void 0;
class BaseSQLModel {
    tableName;
    id;
    _id;
    _tableName;
    constructor(tableName, id) {
        this.tableName = tableName;
        this.id = id;
        this._tableName = tableName;
    }
    get TableName() {
        return this._tableName;
    }
    get ID() {
        if (this.ID == null) {
            throw new Error(`This ${this.tableName} object has not been saved to the database yet.`);
        }
        else {
            return this._id;
        }
    }
}
exports.BaseSQLModel = BaseSQLModel;
//# sourceMappingURL=sqlmodel.base.js.map
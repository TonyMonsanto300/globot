"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
class DatabaseManager {
    static db;
    static getDatabase() {
        return this.db;
    }
}
class DatabaseDriver {
    db;
    constructor() {
        this.db = DatabaseManager.getDatabase();
    }
    //the sql lite3 database name will be in the root config.json as "staticDB"
    createDatabase() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3_1.Database("Globert", (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    console.log('Connected to the Globert database.');
                }
            });
        });
    }
    async createOrConnectDatabase() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3_1.Database('Globert.db', (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    console.log('Connected to the Globert database.');
                }
            });
        });
    }
    async createSchema() {
    }
}
class TableManager {
    db;
    tableModels;
    constructor(tableModels) {
        this.db = DatabaseManager.getDatabase();
        this.tableModels = tableModels;
    }
    async createTableIfNotExist() {
        this.tableModels.forEach((tableModel) => {
            //Use reflection to get the non ID fields of the tableModel
            const fields = Object.getOwnPropertyNames(tableModel).filter((field) => {
                return field !== 'ID';
            });
            //Create the table if it doesnt exist
            const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableModel.TableName} (${fields.join(', ')})`;
            this.db.run(createTableSQL, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
}
//# sourceMappingURL=database.module.js.map
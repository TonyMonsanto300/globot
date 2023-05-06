// FAQ
//Q: Where should I put the database service functionality? It shouldnt be in the service layer because it comes before repository.
//A: Create a repository for all DB data functions for members. Use DatabaseService to connect to the DB and use the member service to get all members.
// No I said dont use the service layer. Create a repository for all DB data functions for members. Use DatabaseService to connect to the DB and use the member service to get all members.
// Generate a DatabaseDriver layer for the most agnositc DB functions from DatabaseService that actually make DB Calls. Use DatabaseService as a reference for what functions to create.
import { GuildMember } from 'discord.js';
import { Database, sqlite3 } from 'sqlite3';
import { BaseSQLModel } from './model/sqlmodel.base';

class DatabaseManager {
    private static db : Database;
    public static getDatabase(): Database {
        return this.db;
    }
}

class DatabaseDriver {
    private db: Database;
    constructor() {
        this.db = DatabaseManager.getDatabase(); 
    }

    //the sql lite3 database name will be in the root config.json as "staticDB"
    createDatabase() {
        return new Promise((resolve, reject) => {
            this.db = new Database("Globert", (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    console.log('Connected to the Globert database.');
                }
            });
        });
    }

    async createOrConnectDatabase() {
        return new Promise((resolve, reject) => {
            this.db = new Database('Globert.db', (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    console.log('Connected to the Globert database.');
                }
            });
        });
    }

    async createSchema(){
        
    }
}

class TableManager {
    private db: Database;
    private tableModels: BaseSQLModel[];
    constructor(tableModels: BaseSQLModel[]) {
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const DiscordMember_model_1 = require("../model/table/DiscordMember.model");
class DatabaseService {
    memberService;
    db;
    constructor(memberService) {
        this.memberService = memberService;
        this.db = null;
    }
    async createOrConnectDatabase() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3_1.default.Database('Globert.db', (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    console.log('Connected to the Globert database.');
                    resolve();
                }
            });
        });
    }
    async createMemberTable() {
        return new Promise((resolve, reject) => {
            const query = `
                CREATE TABLE IF NOT EXISTS member (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    active INTEGER NOT NULL,
                    joined_at INTEGER NOT NULL,
                    member_id INTEGER NOT NULL
                )
            `;
            this.db?.run(query, (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    console.log('Created member table.');
                    resolve();
                }
            });
        });
    }
    async getAllNewMembers() {
        const members = await this.memberService.GetAllMembers();
        return members.filter((member) => this.db?.get(`SELECT * FROM user WHERE id = ${member.id}`));
    }
    async getAllInactiveMembers() {
        const members = await this.memberService.GetAllMembers();
        return members.filter((member) => this.db?.get(`SELECT * FROM user WHERE id = ${member.id}`));
    }
    async addOrUpdateMember(member) {
        const existingMember = await this.getMemberById(member.ID);
        if (existingMember) {
            const query = `
                Update member  
                SET recentName = ?,
                    recentNickname = ?,
                    active = ?,
                    joined_at = ?,
                    member_id = ?
                WHERE id = ?
            `;
            const values = [member.RecentName, member.RecentNickname, member.Active.toString(),
                member.JoinTimestamp.toDateString(), member.DiscordID, member.ID];
            this.db?.run(query, values, (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        }
        else {
            const query = `
                INSERT INTO member (recentName, recentNickname, active, joined_at, member_id)
                VALUES (?, ?, ?, ?)
            `;
            const values = [member.RecentName, member.RecentNickname, member.Active.toString(), member.JoinTimestamp.toDateString(), member.DiscordID];
        }
    }
    getMemberById(memberId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM user
                WHERE id = ?
            `;
            const values = [memberId];
            this.db?.get(query, values, (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    async switchMemberActiveStatus(memberId) {
        const member = await this.getMemberById(memberId);
        const newActiveValue = !member.Active;
        if (member) {
            return new Promise((resolve, reject) => {
                const query = `
                    UPDATE user
                    SET active = ?
                    WHERE id = ?
                `;
                const values = [newActiveValue, memberId];
                this.db?.run(query, values, (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    }
                    else {
                        console.log(`Switched active status for user: ${member.RecentName}#${member.Discriminator} to ${newActiveValue}`);
                        resolve();
                    }
                });
            });
        }
        else {
            console.error(`Could not find user with id: ${memberId}`);
        }
    }
    async init() {
        // Create or connect to the database
        await this.createOrConnectDatabase();
        // Create the member table
        await this.createMemberTable();
        // Get all new members and add them to the database
        const newMembers = await this.getAllNewMembers();
        for (const member of newMembers) {
            await this.addOrUpdateMember(new DiscordMember_model_1.DiscordMemberModel(member[1]));
        }
        // Get all inactive members and switch their active status to false
        const inactiveMembers = await this.getAllInactiveMembers();
        for (const member of inactiveMembers) {
            await this.switchMemberActiveStatus(new DiscordMember_model_1.DiscordMemberModel(member[1]).ID);
        }
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map
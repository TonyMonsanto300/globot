import MemberModel from '../model/table/Member.model';
import { MemberService } from '../service/discordjs/member/member.service';
import { GuildMember } from 'discord.js';
export declare class DatabaseService {
    private memberService;
    private db;
    constructor(memberService: MemberService);
    createOrConnectDatabase(): Promise<void>;
    createMemberTable(): Promise<void>;
    getAllNewMembers(): Promise<import("@discordjs/collection").Collection<string, GuildMember>>;
    getAllInactiveMembers(): Promise<import("@discordjs/collection").Collection<string, GuildMember>>;
    addOrUpdateMember(member: MemberModel): Promise<void>;
    getMemberById(memberId: string): Promise<MemberModel>;
    switchMemberActiveStatus(memberId: string): Promise<void>;
    init(): Promise<void>;
}

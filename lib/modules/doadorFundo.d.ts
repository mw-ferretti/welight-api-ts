import { Tastypie } from "ts-resource-tastypie";
import { Doador } from "./doador";
import { Address } from "./utils";
export declare class Org extends Tastypie.Model<Org> {
    static resource: Tastypie.Resource<Org>;
    activity_id: number;
    name: string;
    email: string;
    registry: string;
    website: string;
    phone: string;
    logo: string;
    slug: string;
    currency: string;
    dt_created: string;
    dt_updated: string;
    private _adm;
    private _rs_category_fund;
    private _rs_activity;
    private _rs_fund;
    private _rs_fund_balance_source;
    private _rs_auth_group;
    private _activity;
    constructor(obj?: any);
    get rs_adm(): Tastypie.Resource<OrgAdm>;
    get rs_fund(): Tastypie.Resource<OrgFund>;
    get rs_fund_balance_source(): Tastypie.Resource<OrgFundBalanceSource>;
    get rs_auth_group(): Tastypie.Resource<OrgAuthGroup>;
    get rs_category_fund(): Tastypie.Resource<OrgCategoryFund>;
    get rs_activity(): Tastypie.Resource<OrgActivity>;
    get md_activity(): OrgActivity;
    send_invite_adm(name: string, email: string, passw: string): Promise<OrgAdm>;
    getAddress(): Promise<OrgAddress>;
}
export declare class OrgActivity extends Tastypie.Model<OrgActivity> {
    static resource: Tastypie.Resource<OrgActivity>;
    name: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class OrgAddress extends Address {
    static resource: Tastypie.Resource<OrgAddress>;
    org_id: number;
    constructor(obj?: any);
}
export declare class OrgAdmInvited extends Tastypie.Model<OrgAdmInvited> {
    static resource: Tastypie.Resource<OrgAdmInvited>;
    org: Org;
    moderator: OrgAdm;
    invited: OrgAdm;
    has_user: boolean;
    username: string;
    apikey: string;
    user_app_id: number;
    constructor(obj?: any);
}
export declare class OrgAdmVote extends Tastypie.Model<OrgAdmVote> {
    static resource: Tastypie.Resource<OrgAdmVote>;
    invited: OrgAdm;
    status: string;
    constructor(obj?: any);
}
export declare class OrgAdm extends Tastypie.Model<OrgAdm> {
    static resource: Tastypie.Resource<OrgAdm>;
    static resource_add: Tastypie.Resource<OrgAdm>;
    org_id: number;
    parent_id: number;
    parent: OrgAdm;
    doador: Doador;
    status: string;
    status_display: string;
    invite_name: string;
    invite_email: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
    static add(obj: {
        name: string;
        email: string;
        org_id: number;
        passw: string;
    }): Promise<OrgAdm>;
    static accept(obj: {
        name: string;
        email: string;
        org_id: number;
        passw: string;
    }): Promise<any>;
}
export declare class OrgCategoryFund extends Tastypie.Model<OrgCategoryFund> {
    static resource: Tastypie.Resource<OrgCategoryFund>;
    name: string;
    org_id: number;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export interface OrgFundSummary {
    current_balance: number;
    qty_projects_pending: number;
    qty_projects_accepted: number;
    qty_projects_total: number;
    qty_giving_stream: number;
    donated: number;
    balance: number;
    realtime: number;
    commited: number;
}
export declare class OrgFund extends Tastypie.Model<OrgFund> {
    static resource: Tastypie.Resource<OrgFund>;
    static resource_check_step: Tastypie.Resource<any>;
    org_id: number;
    name: string;
    logo: string;
    slug: string;
    description: string;
    country: string;
    currency: string;
    initial_credit: number;
    private: boolean;
    summary: OrgFundSummary;
    categories_id: Array<number>;
    dt_created: string;
    dt_updated: string;
    private _categories;
    private _rs_balance;
    private _rs_member;
    private _rs_category;
    constructor(obj?: any);
    save(obj?: any): Promise<OrgFund>;
    private _init;
    get rs_balance(): Tastypie.Resource<OrgFundBalance>;
    get rs_member(): Tastypie.Resource<OrgFundMember>;
    get rs_category(): Tastypie.Resource<OrgFundCategory>;
    get categories(): Array<OrgCategoryFund>;
    add_credit(source_id: number, amount: number, passw: string): Promise<OrgFundBalance>;
    send_invite_member(name: string, email: string, auth_group_list: Array<number>, passw: string): Promise<OrgFundMember>;
    check_step(): Promise<any>;
}
export declare class OrgFundCategory extends Tastypie.Model<OrgFundCategory> {
    static resource: Tastypie.Resource<OrgFundCategory>;
    org_fund_id: number;
    category_id: number;
    constructor(obj?: any);
}
export declare class OrgFundMemberInvited extends Tastypie.Model<OrgFundMemberInvited> {
    static resource: Tastypie.Resource<OrgFundMemberInvited>;
    org: Org;
    fund: OrgFund;
    moderator: {
        name: string;
        email: string;
    };
    invited: OrgFundMember;
    has_user: boolean;
    username: string;
    apikey: string;
    user_app_id: number;
    constructor(obj?: any);
}
export declare class OrgFundMember extends Tastypie.Model<OrgFundMember> {
    static resource: Tastypie.Resource<OrgFundMember>;
    static resource_add: Tastypie.Resource<OrgFundMember>;
    org_fund_id: number;
    doador: Doador;
    status: string;
    status_display: string;
    invite_name: string;
    invite_email: string;
    dt_created: string;
    dt_updated: string;
    private _permissions;
    constructor(obj?: any);
    get permissions(): Array<OrgAuthGroup>;
    static add(obj: {
        name: string;
        email: string;
        org_fund_id: number;
        auth_group_list: Array<number>;
        passw: string;
    }): Promise<OrgFundMember>;
}
export declare class OrgFundBalanceSource extends Tastypie.Model<OrgFundBalanceSource> {
    static resource: Tastypie.Resource<OrgFundBalanceSource>;
    name: string;
    token: string;
    group: string;
    source_id: number;
    org_id: number;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class OrgFundBalance extends Tastypie.Model<OrgFundBalance> {
    static resource: Tastypie.Resource<OrgFundBalance>;
    static resource_add: Tastypie.Resource<OrgFundBalance>;
    org_fund_id: number;
    source_id: number;
    credit: boolean;
    amount: number;
    status: string;
    dt_created: string;
    dt_updated: string;
    private _md_source;
    private _md_credit_custom;
    constructor(obj?: any);
    static add_credit(obj: {
        org_fund_id: number;
        source_id: number;
        amount: number;
        passw: string;
    }): Promise<OrgFundBalance>;
    get md_source(): OrgFundBalanceSource;
    get md_credit_custom(): OrgFundBalanceCreditCustom;
}
export declare class OrgFundBalanceCreditCustom {
    user_id: number;
    user_name: string;
    user_email: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OrgAuthGroup extends Tastypie.Model<OrgAuthGroup> {
    static resource: Tastypie.Resource<OrgAuthGroup>;
    org_id: number;
    name: string;
    permissions: Array<string>;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class OrgMember extends Tastypie.Model<OrgMember> {
    name: string;
    auth_group_display: string;
    admin: boolean;
    token: string;
    private _auth_group;
    constructor(obj?: any);
    get auth_group(): Array<OrgAuthGroup>;
}

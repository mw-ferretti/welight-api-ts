import { Tastypie } from "ts-resource-tastypie";
export declare class GsForm extends Tastypie.Model<GsForm> {
    static resource: Tastypie.Resource<GsForm>;
    gs_id: number;
    type: string;
    topic: string;
    content: any;
    document: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}

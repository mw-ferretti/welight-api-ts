import { Tastypie } from "ts-resource-tastypie";
import { Ong } from "./ong";
import { Doador } from "./doador";
import { Empresa } from "./doadorEmpresa";
export declare class Campanha extends Tastypie.Model<Campanha> {
    static resource: Tastypie.Resource<Campanha>;
    empresa_id: number;
    nome: string;
    slug: string;
    moeda: string;
    page_img_fundo: string;
    page_img_logo: string;
    titulo_banner_msg: string;
    subtitulo_banner_msg: string;
    titulo_doacao_msg: string;
    subtitulo_doacao_msg: string;
    titulo_sucesso_msg: string;
    subtitulo_sucesso_msg: string;
    style_ui: any;
    dt_updated: string;
    dt_created: string;
    private _md_empresa;
    private _rs_ong;
    constructor(obj?: any);
    get md_empresa(): Empresa;
    get rs_ong(): Tastypie.Resource<CampanhaOng>;
    gerar_fatura(metodo_pgto: string, valor_doacao: number, recorrente: boolean, anonimo: boolean, ongs: Array<number>, cpf?: string): Promise<DoacaoFatura>;
}
export declare class CampanhaOng extends Tastypie.Model<CampanhaOng> {
    static resource: Tastypie.Resource<CampanhaOng>;
    campanha_id: number;
    ong_id: number;
    dt_created: string;
    private _md_campanha;
    private _md_ong;
    constructor(obj?: any);
    get md_campanha(): Campanha;
    get md_ong(): Ong;
}
export declare class CampanhaDoacao extends Tastypie.Model<CampanhaDoacao> {
    static resource: Tastypie.Resource<CampanhaDoacao>;
    campanha_id: number;
    doador_id: number;
    cpf: string;
    valor_doacao: number;
    metodo_pgto: string;
    recorrente: boolean;
    anonimo: boolean;
    ativa: boolean;
    dt_updated: string;
    dt_created: string;
    private _md_campanha;
    private _md_doador;
    constructor(obj?: any);
    get md_campanha(): Campanha;
    get md_doador(): Doador;
}
export declare class DoacaoFatura {
    static rs_fatura_add: Tastypie.Resource<DoacaoFatura>;
    static rs_fatura_check: Tastypie.Resource<DoacaoFatura>;
    id: number;
    token: string;
    nome: string;
    email: string;
    cpf: string;
    moeda: string;
    total: number;
    pago: boolean;
    dt_vencimento: string;
    dt_updated: string;
    dt_created: string;
    private _md_campanha_doacao;
    private _md_pagamento;
    private _md_ongs;
    constructor(obj?: any);
    get md_campanha_doacao(): CampanhaDoacao;
    get md_pagamento(): DoacaoFaturaPagamento;
    get md_ongs(): Array<Ong>;
    static gerar_fatura(obj: {
        campanha_id: number;
        metodo_pgto: string;
        valor_doacao: number;
        recorrente: boolean;
        anonimo: boolean;
        ongs: Array<number>;
        cpf?: string;
    }): Promise<DoacaoFatura>;
    static check_fatura(token: string): Promise<DoacaoFatura>;
}
export declare class DoacaoFaturaPagamento {
    id: number;
    invoice_id: number;
    tipo: string;
    status: string;
    secure_url: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}

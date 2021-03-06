import * as api from "ts-resource-tastypie";
import * as weauth_models from "./weAuth";
import { Ods, MetricCategory, MetricUnit, Metric } from "./onu";
import { Address } from "./utils";
export declare class OngActivity extends api.Tastypie.Model<OngActivity> {
    static resource: api.Tastypie.Resource<OngActivity>;
    name: string;
    dt_created: string;
    dt_updated: string;
    constructor(obj?: any);
}
export declare class Ong extends api.Tastypie.Model<Ong> {
    static resource: api.Tastypie.Resource<Ong>;
    nome: string;
    email: string;
    razao_social: string;
    cnpj: string;
    slug: string;
    activity_id: number;
    publish_mode: string;
    checked: Boolean;
    children_id: number;
    private _status;
    private _ativo;
    private _parceira;
    private _invite;
    private _qtde_pontos;
    private _qtde_doadores;
    private _profile_detail;
    private _site_custom;
    private _address;
    private _ods;
    private _dt_updated;
    private _dt_created;
    private _user;
    private _timeline;
    private _fotos;
    private _videos;
    private _projetos;
    private _bancos;
    private _recursos;
    private _status_carteira;
    private _projeto_entrega;
    private _carteira;
    constructor(obj?: any);
    save(): Promise<Ong>;
    private initProfile;
    get status(): OngStatus;
    get ativo(): boolean;
    get parceira(): boolean;
    get invite(): string;
    get qtde_pontos(): number;
    get qtde_doadores(): number;
    get profile_detail(): OngDetail;
    get site_custom(): OngSiteCustom;
    get address(): OngAddress;
    get ods(): Array<Ods>;
    get dt_updated(): string;
    get dt_created(): string;
    get timeline(): api.Tastypie.Resource<OngTimeLine>;
    get fotos(): api.Tastypie.Resource<OngTimeLine>;
    get videos(): api.Tastypie.Resource<OngTimeLine>;
    get user(): weauth_models.User;
    get projetos(): api.Tastypie.Resource<OngProjeto>;
    get bancos(): api.Tastypie.Resource<OngBanco>;
    get recursos(): api.Tastypie.Resource<OngRecurso>;
    get status_carteira(): api.Tastypie.Resource<OngStatusCarteira>;
    get projeto_entrega(): api.Tastypie.Resource<OngProjetoEntrega>;
    get carteira(): api.Tastypie.Resource<OngCarteira>;
    getEndereco(): Promise<OngEndereco>;
    createAccount(nome: string, email: string, razao_social: string, cnpj: string, kwargs?: any): Promise<Ong>;
    quickLogin(auth?: {
        username: string;
        apikey: string;
    }, kwargs?: any): Promise<Ong>;
}
export declare class OngDetail extends api.Tastypie.Model<OngDetail> {
    static resource: api.Tastypie.Resource<OngDetail>;
    ong_id: number;
    contato_fone: string;
    missao: string;
    missao_resumo: string;
    realizacao: string;
    realizacao_resumo: string;
    publico_alvo: string;
    img_avatar: string;
    img_fundo: string;
    cor_filtro: string;
    video_institucional: string;
    estatuto_social: string;
    estatuto_social_url: string;
    ultima_assembleia: string;
    ultima_assembleia_url: string;
    website: string;
    youtube: string;
    facebook: string;
    instagram: string;
    twitter: string;
    oscip: boolean;
    oscip_number: string;
    diretor_nome: string;
    diretor_assinatura: string;
    diretor_assinatura_url: string;
    currency: string;
    dt_fundacao: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngSiteCustom {
    descricao: string;
    img_avatar: string;
    img_fundo: string;
    cor_filtro: string;
    constructor(obj?: any);
}
export declare class OngEndereco extends api.Tastypie.Model<OngEndereco> {
    static resource: api.Tastypie.Resource<OngEndereco>;
    ong_id: number;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    constructor(obj?: any);
}
export declare class OngAddress extends Address {
    static resource: api.Tastypie.Resource<OngAddress>;
    ong_id: number;
    constructor(obj?: any);
}
export declare class OngBanco extends api.Tastypie.Model<OngBanco> {
    static resource: api.Tastypie.Resource<OngBanco>;
    ong_id: number;
    desc: string;
    banco_codigo: string;
    banco_nome: string;
    agencia: string;
    agencia_digito: string;
    conta_corrente: string;
    conta_corrente_digito: string;
    pessoa_fisica: boolean;
    titular: string;
    cpf_cnpj: string;
    iban: string;
    bic_swift: string;
    aba: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngPostScrap extends api.Tastypie.Model<OngPostScrap> {
    static resource: api.Tastypie.Resource<OngPostScrap>;
    description: string;
    image: string;
    source: string;
    title: string;
    url: string;
    video: string;
    constructor(obj?: any);
}
export declare class OngPost extends api.Tastypie.Model<OngPost> {
    static resource: api.Tastypie.Resource<OngPost>;
    tipo: string;
    descricao: string;
    fotos: Array<string>;
    site_scraped: OngPostScrap;
    dt_updated: string;
    dt_created: string;
    private _fotos_resource;
    constructor(obj?: any, _resource?: api.Tastypie.Resource<OngPost>);
    setScraper(url: string): Promise<OngPostScrap>;
    addFiles(event: any): Promise<Array<string>>;
}
export declare class OngTimeLine extends OngPost {
    static resource: api.Tastypie.Resource<OngTimeLine>;
    ong: Ong;
    projeto: OngProjeto;
    doacao_credito: OngCarteira;
    recurso: OngRecurso;
    entrega: OngProjetoEntrega;
    constructor(obj?: any);
}
export declare class OngProjeto extends api.Tastypie.Model<OngProjeto> {
    static resource: api.Tastypie.Resource<OngProjeto>;
    ong_id: number;
    nome: string;
    descricao: string;
    img_capa: string;
    periodo_continuo: boolean;
    dt_inicio: string;
    dt_fim: string;
    ativo: boolean;
    inicializado: boolean;
    dt_updated: string;
    dt_created: string;
    private _endereco;
    private _metric;
    private _ods;
    getSobre(): Promise<OngProjetoSobre>;
    constructor(obj?: any);
    get endereco(): api.Tastypie.Resource<OngProjetoEndereco>;
    get metric(): api.Tastypie.Resource<OngProjetoMetric>;
    get ods(): api.Tastypie.Resource<OngProjetoOds>;
    get_metric_summary(): Promise<OngProjetoMetricSummary>;
}
export declare class OngProjetoSobre extends api.Tastypie.Model<OngProjetoSobre> {
    static resource: api.Tastypie.Resource<OngProjetoSobre>;
    ong_projeto_id: number;
    problema: string;
    impacto: string;
    meta: string;
    como_alcacar_meta: string;
    como_medir_impacto: string;
    website: string;
    video: string;
    key_audience: string;
    outcomes: string;
    outputs: string;
    activities: string;
    inputs: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoMetricSummary extends api.Tastypie.Model<OngProjetoMetricSummary> {
    static resource: api.Tastypie.Resource<OngProjetoMetricSummary>;
    categories: Array<MetricCategory>;
    ods: Array<Ods>;
    constructor(obj?: any);
}
export declare class OngProjetoEndereco extends Address {
    static resource: api.Tastypie.Resource<OngProjetoEndereco>;
    ong_projeto_id: number;
    constructor(obj?: any);
}
export declare class OngProjetoOds extends api.Tastypie.Model<OngProjetoOds> {
    static resource: api.Tastypie.Resource<OngProjetoOds>;
    ong_projeto_id: number;
    ods_id: number;
    ods: Ods;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoMetricRegisterEvidence extends api.Tastypie.Model<OngProjetoMetricRegisterEvidence> {
    static resource: api.Tastypie.Resource<OngProjetoMetricRegisterEvidence>;
    ong_projeto_metric_register_id: number;
    titulo: string;
    descricao: string;
    comprovante: string;
    url_video: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoMetricRegister extends api.Tastypie.Model<OngProjetoMetricRegister> {
    static resource: api.Tastypie.Resource<OngProjetoMetricRegister>;
    ong_projeto_metric_config_id: number;
    total: string;
    type: string;
    dt_register: string;
    dt_updated: string;
    dt_created: string;
    private _evidencies;
    constructor(obj?: any);
    get evidencies(): api.Tastypie.Resource<OngProjetoMetricRegisterEvidence>;
}
export declare class OngProjetoMetricConfig extends api.Tastypie.Model<OngProjetoMetricConfig> {
    static resource: api.Tastypie.Resource<OngProjetoMetricConfig>;
    ong_projeto_metric_id: number;
    ong_projeto_endereco_id: number;
    medicao: string;
    medicao_meta: string;
    medicao_frequencia: number;
    medicao_mes: Array<number>;
    metric_unit: MetricUnit;
    base_value: string;
    base_date: string;
    meta_value: string;
    meta_date: string;
    ong_projeto_endereco: OngProjetoEndereco;
    dt_updated: string;
    dt_created: string;
    private _registers;
    constructor(obj?: any);
    get register(): api.Tastypie.Resource<OngProjetoMetricRegister>;
}
export declare class OngProjetoMetric extends api.Tastypie.Model<OngProjetoMetric> {
    static resource: api.Tastypie.Resource<OngProjetoMetric>;
    ong_projeto_id: number;
    metric_id: number;
    configured: boolean;
    dt_updated: string;
    dt_created: string;
    private _ong_projeto;
    private _metric;
    private _metric_config;
    constructor(obj?: any);
    get ong_projeto(): OngProjeto;
    get metric(): Metric;
    get metric_config(): api.Tastypie.Resource<OngProjetoMetricConfig>;
}
export declare class OngStatus {
    qtde_pontos: number;
    qtde_doadores: number;
    qtde_avaliacao_positiva: number;
    qtde_projetos: number;
    total_credito: number;
    total_saldo: number;
    total_debito_comprovado: number;
    constructor(obj?: any);
}
export declare class OngOrigemCredito extends api.Tastypie.Model<OngOrigemCredito> {
    static resource: api.Tastypie.Resource<OngOrigemCredito>;
    id: number;
    nome: string;
    token: string;
    grupo: string;
    source_id: number;
    ong_id: number;
    constructor(obj?: any);
}
export declare class OngRecurso extends api.Tastypie.Model<OngRecurso> {
    static resource: api.Tastypie.Resource<OngRecurso>;
    ong_id: number;
    ong_projeto_id: number;
    destino: string;
    ativo: boolean;
    total_doacao: number;
    dt_aplicacao: string;
    dt_updated: string;
    dt_created: string;
    private _doacao;
    private _comprovante;
    constructor(obj?: any);
    get doacao(): api.Tastypie.Resource<OngRecursoDoacao>;
    get comprovante(): api.Tastypie.Resource<OngRecursoComprovante>;
}
export declare class OngRecursoDoacao extends api.Tastypie.Model<OngRecursoDoacao> {
    static resource: api.Tastypie.Resource<OngRecursoDoacao>;
    ong_recurso_id: number;
    origem_credito_id: number;
    origem_credito: OngOrigemCredito;
    moeda: string;
    valor: number;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngRecursoComprovante extends api.Tastypie.Model<OngRecursoComprovante> {
    static resource: api.Tastypie.Resource<OngRecursoComprovante>;
    ong_recurso_id: number;
    titulo: string;
    descricao: string;
    comprovante: string;
    url_video: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngStatusCarteira extends api.Tastypie.Model<OngStatusCarteira> {
    static resource: api.Tastypie.Resource<OngStatusCarteira>;
    ong_id: number;
    origem_credito: OngOrigemCredito;
    total_credito: number;
    total_debito: number;
    total_debito_pendente: number;
    total_debito_comprovado: number;
    total_debito_nao_comprovado: number;
    saldo: number;
    saldo_pendente: number;
    constructor(obj?: any);
}
export declare class OngCarteiraTransferencia {
    banco_codigo: string;
    banco_nome: string;
    agencia: string;
    agencia_digito: string;
    conta_corrente: string;
    conta_corrente_digito: string;
    pessoa_fisica: boolean;
    titular: string;
    cpf_cnpj: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngCarteiraCreditoCustomComprovante extends api.Tastypie.Model<OngCarteiraCreditoCustomComprovante> {
    static resource: api.Tastypie.Resource<OngCarteiraCreditoCustomComprovante>;
    credito_custom_id: number;
    titulo: string;
    descricao: string;
    comprovante: string;
    url_video: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngCarteiraCreditoCustom {
    id: number;
    ong_carteira_id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    carteira_debito_id: string;
    dt_created: string;
    private _comprovante;
    constructor(obj?: any);
    get comprovante(): api.Tastypie.Resource<OngCarteiraCreditoCustomComprovante>;
}
export declare class OngCarteira extends api.Tastypie.Model<OngCarteira> {
    static resource: api.Tastypie.Resource<OngCarteira>;
    private static _creditar;
    private static _transferir;
    ong_id: number;
    origem_credito_id: number;
    origem_credito: OngOrigemCredito;
    credito: boolean;
    moeda: string;
    valor: number;
    status: string;
    transferencia: OngCarteiraTransferencia;
    credito_custom: OngCarteiraCreditoCustom;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
    static creditar(obj: {
        ong_id: number;
        origem_credito_id: number;
        valor: number;
        ong_banco_id: number;
    }): Promise<OngCarteira>;
    static transferir(obj: {
        ong_id: number;
        origem_credito_id: number;
        ong_banco_id: number;
        valor: number;
    }): Promise<OngCarteira>;
}
export declare class OngTimelineDoacao extends api.Tastypie.Model<OngTimelineDoacao> {
    static resource: api.Tastypie.Resource<OngTimelineDoacao>;
    ong_id: number;
    tipo: string;
    source_model_name: string;
    source_model_id: number;
    doacao_credito: OngCarteira;
    recurso: OngRecurso;
    projeto: OngProjeto;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoEntrega extends api.Tastypie.Model<OngProjetoEntrega> {
    static resource: api.Tastypie.Resource<OngProjetoEntrega>;
    ong_projeto_id: number;
    titulo: string;
    descricao: string;
    ativo: boolean;
    mt_pessoas: number;
    mt_animais: number;
    mt_arvores: number;
    mt_areas: number;
    mt_criancas: number;
    dt_entrega: string;
    dt_updated: string;
    dt_created: string;
    projeto: OngProjeto;
    private _endereco;
    private _comprovante;
    constructor(obj?: any);
    get endereco(): api.Tastypie.Resource<OngProjetoEntregaEndereco>;
    get comprovante(): api.Tastypie.Resource<OngProjetoEntregaComprovante>;
}
export declare class OngProjetoEntregaEndereco extends api.Tastypie.Model<OngProjetoEntregaEndereco> {
    static resource: api.Tastypie.Resource<OngProjetoEntregaEndereco>;
    projeto_entrega_id: number;
    projeto_endereco_id: number;
    endereco: OngProjetoEndereco;
    dt_created: string;
    constructor(obj?: any);
}
export declare class OngProjetoEntregaComprovante extends api.Tastypie.Model<OngProjetoEntregaComprovante> {
    static resource: api.Tastypie.Resource<OngProjetoEntregaComprovante>;
    projeto_entrega_id: number;
    titulo: string;
    descricao: string;
    comprovante: string;
    url_video: string;
    dt_updated: string;
    dt_created: string;
    constructor(obj?: any);
}

enum Category {
    business,
    entertainment,
    general,
    health,
    science,
    sports,
    technology,
}

enum Language {
    ar,
    de,
    en,
    es,
    fr,
    he,
    it,
    nl,
    no,
    pt,
    ru,
    sv,
    ud,
    zh,
}

enum Country {
    ae,
    ar,
    at,
    au,
    be,
    bg,
    br,
    ca,
    ch,
    cn,
    co,
    cu,
    cz,
    de,
    eg,
    fr,
    gb,
    gr,
    hk,
    hu,
    id,
    ie,
    il,
    in,
    it,
    jp,
    kr,
    lt,
    lv,
    ma,
    mx,
    my,
    ng,
    nl,
    no,
    nz,
    ph,
    pl,
    pt,
    ro,
    rs,
    ru,
    sa,
    se,
    sg,
    si,
    sk,
    th,
    tr,
    tw,
    ua,
    us,
    ve,
    za,
}

interface Options {
    apiKey: string;
    category?: Category;
    language?: Language;
    country?: Country;
}

interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: Category;
    language: Language;
    country: Country;
}

interface Response {
    status: string;
    sources: Source[];
}

interface NewsBlock {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}

interface Resp {
    endpoint: string;
    options?: object;
}

type Endpoint = 'sources' | 'everything';
type Method = 'GET' | 'POST';
type Callback = <Type>(arg?: Type) => void;

interface ErrorResp {
    ok: boolean;
    status: number;
    statusText: string;
    json(): void;
}

export { Options, Response, Resp, ErrorResp, Endpoint, Method, Callback, NewsBlock, Source };
export type Test = { Options: string };

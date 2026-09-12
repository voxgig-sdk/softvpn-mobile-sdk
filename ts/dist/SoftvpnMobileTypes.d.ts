export interface RequestInfo {
    city?: string;
    country?: string;
    ip?: string;
    region?: string;
}
export interface RequestInfoLoadMatch {
    city?: string;
    country?: string;
    ip?: string;
    region?: string;
}
export interface Server {
    city?: string;
    country?: string;
    countryCode?: string;
    host?: string;
    id?: string;
    load?: number;
    name?: string;
    online?: boolean;
    port?: number;
    premium?: boolean;
    protocol?: string;
}
export interface ServerListMatch {
    city?: string;
    country?: string;
    countryCode?: string;
    host?: string;
    id?: string;
    load?: number;
    name?: string;
    online?: boolean;
    port?: number;
    premium?: boolean;
    protocol?: string;
}

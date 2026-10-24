import { RequestInfoEntity } from './entity/RequestInfoEntity';
import { ServerEntity } from './entity/ServerEntity';
export type * from './SoftvpnMobileTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { SoftvpnMobileEntityBase } from './SoftvpnMobileEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class SoftvpnMobileSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    RequestInfo(entopts?: Record<string, any>): RequestInfoEntity;
    Server(entopts?: Record<string, any>): ServerEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): SoftvpnMobileSDK;
    tester(testopts?: any, sdkopts?: any): SoftvpnMobileSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof SoftvpnMobileSDK;
export { stdutil, config, BaseFeature, SoftvpnMobileEntityBase, SoftvpnMobileSDK, SDK, };
export type { DirectResult };

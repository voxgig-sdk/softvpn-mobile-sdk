import { SoftvpnMobileEntityBase } from '../SoftvpnMobileEntityBase';
import type { SoftvpnMobileSDK } from '../SoftvpnMobileSDK';
import type { Control } from '../types';
import type { RequestInfo, RequestInfoLoadMatch } from '../SoftvpnMobileTypes';
declare class RequestInfoEntity extends SoftvpnMobileEntityBase<RequestInfo> {
    constructor(client: SoftvpnMobileSDK, entopts: any);
    make(this: RequestInfoEntity): RequestInfoEntity;
    load(this: any, reqmatch?: RequestInfoLoadMatch, ctrl?: Control): Promise<RequestInfoEntity>;
}
export { RequestInfoEntity };

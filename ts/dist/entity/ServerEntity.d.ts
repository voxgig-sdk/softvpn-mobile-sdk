import { SoftvpnMobileEntityBase } from '../SoftvpnMobileEntityBase';
import type { SoftvpnMobileSDK } from '../SoftvpnMobileSDK';
import type { Control } from '../types';
import type { Server, ServerListMatch } from '../SoftvpnMobileTypes';
declare class ServerEntity extends SoftvpnMobileEntityBase<Server> {
    constructor(client: SoftvpnMobileSDK, entopts: any);
    make(this: ServerEntity): ServerEntity;
    list(this: any, reqmatch?: ServerListMatch, ctrl?: Control): Promise<ServerEntity[]>;
}
export { ServerEntity };

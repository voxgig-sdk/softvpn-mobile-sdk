"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftvpnMobileError = void 0;
class SoftvpnMobileError extends Error {
    isSoftvpnMobileError = true;
    sdk = 'SoftvpnMobile';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.SoftvpnMobileError = SoftvpnMobileError;
//# sourceMappingURL=SoftvpnMobileError.js.map
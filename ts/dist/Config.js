"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'SoftvpnMobile',
        slug: "softvpn-mobile",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "http://74.119.194.157/api/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            request_info: {},
            server: {},
        }
    };
    entity = {
        "request_info": {
            "fields": [
                {
                    "name": "city",
                    "short": "City",
                    "type": "`$STRING`"
                },
                {
                    "name": "country",
                    "short": "Country of the IP address",
                    "type": "`$STRING`"
                },
                {
                    "name": "ip",
                    "short": "The IP address of the requester",
                    "type": "`$STRING`"
                },
                {
                    "name": "region",
                    "short": "Region or state",
                    "type": "`$STRING`"
                }
            ],
            "name": "request_info",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/request-ip",
                            "segments": [
                                {
                                    "lit": "request-ip"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "request-ip"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "server": {
            "fields": [
                {
                    "name": "city",
                    "short": "City where the server is located",
                    "type": "`$STRING`"
                },
                {
                    "name": "country",
                    "short": "Country where the server is located",
                    "type": "`$STRING`"
                },
                {
                    "name": "countryCode",
                    "short": "ISO country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "host",
                    "short": "Server hostname or IP address",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the server",
                    "type": "`$STRING`"
                },
                {
                    "name": "load",
                    "short": "Server load percentage",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "name",
                    "short": "Display name of the server",
                    "type": "`$STRING`"
                },
                {
                    "name": "online",
                    "short": "Whether the server is currently online",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "port",
                    "short": "Server port number",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "premium",
                    "short": "Whether this is a premium server",
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "protocol",
                    "short": "VPN protocol used by the server",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "server",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/servers",
                            "segments": [
                                {
                                    "lit": "servers"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "servers"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map
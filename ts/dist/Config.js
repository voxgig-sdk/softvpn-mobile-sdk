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
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
                    "title": "City",
                    "type": "`$STRING`",
                    "short": "City"
                },
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "short": "Country of the IP address"
                },
                {
                    "name": "ip",
                    "title": "Ip",
                    "type": "`$STRING`",
                    "short": "The IP address of the requester"
                },
                {
                    "name": "region",
                    "title": "Region",
                    "type": "`$STRING`",
                    "short": "Region or state"
                }
            ],
            "name": "request_info",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/request-ip",
                            "segments": [
                                {
                                    "lit": "request-ip"
                                }
                            ],
                            "parts": [
                                "request-ip"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
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
                    "title": "City",
                    "type": "`$STRING`",
                    "short": "City where the server is located"
                },
                {
                    "name": "country",
                    "title": "Country",
                    "type": "`$STRING`",
                    "short": "Country where the server is located"
                },
                {
                    "name": "countryCode",
                    "title": "Country Code",
                    "type": "`$STRING`",
                    "short": "ISO country code"
                },
                {
                    "name": "host",
                    "title": "Host",
                    "type": "`$STRING`",
                    "short": "Server hostname or IP address"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for the server"
                },
                {
                    "name": "load",
                    "title": "Load",
                    "type": "`$INTEGER`",
                    "short": "Server load percentage"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Display name of the server"
                },
                {
                    "name": "online",
                    "title": "Online",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the server is currently online"
                },
                {
                    "name": "port",
                    "title": "Port",
                    "type": "`$INTEGER`",
                    "short": "Server port number"
                },
                {
                    "name": "premium",
                    "title": "Premium",
                    "type": "`$BOOLEAN`",
                    "short": "Whether this is a premium server"
                },
                {
                    "name": "protocol",
                    "title": "Protocol",
                    "type": "`$STRING`",
                    "short": "VPN protocol used by the server"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/servers",
                            "segments": [
                                {
                                    "lit": "servers"
                                }
                            ],
                            "parts": [
                                "servers"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
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
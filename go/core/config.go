package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "SoftvpnMobile",
			"slug": "softvpn-mobile",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "http://74.119.194.157/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"request_info": map[string]any{},
				"server": map[string]any{},
			},
		},
		"entity": map[string]any{
			"request_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"short": "City",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country of the IP address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ip",
						"short": "The IP address of the requester",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"short": "Region or state",
						"type": "`$STRING`",
					},
				},
				"name": "request_info",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/request-ip",
								"segments": []any{
									map[string]any{
										"lit": "request-ip",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"request-ip",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"server": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"short": "City where the server is located",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country where the server is located",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryCode",
						"short": "ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "host",
						"short": "Server hostname or IP address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the server",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "load",
						"short": "Server load percentage",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Display name of the server",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "online",
						"short": "Whether the server is currently online",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "port",
						"short": "Server port number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "premium",
						"short": "Whether this is a premium server",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "protocol",
						"short": "VPN protocol used by the server",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "server",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/servers",
								"segments": []any{
									map[string]any{
										"lit": "servers",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"servers",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

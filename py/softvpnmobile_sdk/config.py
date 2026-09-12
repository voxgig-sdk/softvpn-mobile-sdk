# SoftvpnMobile SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "SoftvpnMobile",
            "slug": "softvpn-mobile",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "http://74.119.194.157/api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "request_info": {},
                "server": {},
            },
        },
        "entity": {
      "request_info": {
        "fields": [
          {
            "name": "city",
            "short": "City",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "short": "Country of the IP address",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "short": "The IP address of the requester",
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "short": "Region or state",
            "type": "`$STRING`",
          },
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
                    "lit": "request-ip",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "request-ip",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "server": {
        "fields": [
          {
            "name": "city",
            "short": "City where the server is located",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "short": "Country where the server is located",
            "type": "`$STRING`",
          },
          {
            "name": "countryCode",
            "short": "ISO country code",
            "type": "`$STRING`",
          },
          {
            "name": "host",
            "short": "Server hostname or IP address",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the server",
            "type": "`$STRING`",
          },
          {
            "name": "load",
            "short": "Server load percentage",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Display name of the server",
            "type": "`$STRING`",
          },
          {
            "name": "online",
            "short": "Whether the server is currently online",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "port",
            "short": "Server port number",
            "type": "`$INTEGER`",
          },
          {
            "name": "premium",
            "short": "Whether this is a premium server",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "protocol",
            "short": "VPN protocol used by the server",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "servers",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "servers",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

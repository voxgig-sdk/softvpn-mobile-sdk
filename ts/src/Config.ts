
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'SoftvpnMobile',
        slug: "softvpn-mobile",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "http://74.119.194.157/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      request_info: {
      },

      server: {
      },

    }
  }


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
              "parts": [
                "request-ip"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "servers"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}


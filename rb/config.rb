# SoftvpnMobile SDK configuration

module SoftvpnMobileConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "SoftvpnMobile",
        "slug" => "softvpn-mobile",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "http://74.119.194.157/api/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "request_info" => {},
          "server" => {},
        },
      },
      "entity" => {
        "request_info" => {
          "fields" => [
            {
              "name" => "city",
              "short" => "City",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "short" => "Country of the IP address",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "short" => "The IP address of the requester",
              "type" => "`$STRING`",
            },
            {
              "name" => "region",
              "short" => "Region or state",
              "type" => "`$STRING`",
            },
          ],
          "name" => "request_info",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/request-ip",
                  "parts" => [
                    "request-ip",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "server" => {
          "fields" => [
            {
              "name" => "city",
              "short" => "City where the server is located",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "short" => "Country where the server is located",
              "type" => "`$STRING`",
            },
            {
              "name" => "countryCode",
              "short" => "ISO country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "host",
              "short" => "Server hostname or IP address",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the server",
              "type" => "`$STRING`",
            },
            {
              "name" => "load",
              "short" => "Server load percentage",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Display name of the server",
              "type" => "`$STRING`",
            },
            {
              "name" => "online",
              "short" => "Whether the server is currently online",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "port",
              "short" => "Server port number",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "premium",
              "short" => "Whether this is a premium server",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "protocol",
              "short" => "VPN protocol used by the server",
              "type" => "`$STRING`",
            },
          ],
          "name" => "server",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/servers",
                  "parts" => [
                    "servers",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    SoftvpnMobileFeatures.make_feature(name)
  end
end

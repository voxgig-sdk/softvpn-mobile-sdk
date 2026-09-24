<?php
declare(strict_types=1);

// SoftvpnMobile SDK configuration

class SoftvpnMobileConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "SoftvpnMobile",
                "slug" => "softvpn-mobile",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "http://74.119.194.157/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "request_info" => [],
                    "server" => [],
                ],
            ],
            "entity" => [
        'request_info' => [
          'fields' => [
            [
              'name' => 'city',
              'title' => 'City',
              'type' => '`$STRING`',
              'short' => 'City',
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
              'short' => 'Country of the IP address',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'short' => 'The IP address of the requester',
            ],
            [
              'name' => 'region',
              'title' => 'Region',
              'type' => '`$STRING`',
              'short' => 'Region or state',
            ],
          ],
          'name' => 'request_info',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/request-ip',
                  'segments' => [
                    [
                      'lit' => 'request-ip',
                    ],
                  ],
                  'parts' => [
                    'request-ip',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'server' => [
          'fields' => [
            [
              'name' => 'city',
              'title' => 'City',
              'type' => '`$STRING`',
              'short' => 'City where the server is located',
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
              'short' => 'Country where the server is located',
            ],
            [
              'name' => 'countryCode',
              'title' => 'Country Code',
              'type' => '`$STRING`',
              'short' => 'ISO country code',
            ],
            [
              'name' => 'host',
              'title' => 'Host',
              'type' => '`$STRING`',
              'short' => 'Server hostname or IP address',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
              'short' => 'Unique identifier for the server',
            ],
            [
              'name' => 'load',
              'title' => 'Load',
              'type' => '`$INTEGER`',
              'short' => 'Server load percentage',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'Display name of the server',
            ],
            [
              'name' => 'online',
              'title' => 'Online',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the server is currently online',
            ],
            [
              'name' => 'port',
              'title' => 'Port',
              'type' => '`$INTEGER`',
              'short' => 'Server port number',
            ],
            [
              'name' => 'premium',
              'title' => 'Premium',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether this is a premium server',
            ],
            [
              'name' => 'protocol',
              'title' => 'Protocol',
              'type' => '`$STRING`',
              'short' => 'VPN protocol used by the server',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'server',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/servers',
                  'segments' => [
                    [
                      'lit' => 'servers',
                    ],
                  ],
                  'parts' => [
                    'servers',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return SoftvpnMobileFeatures::make_feature($name);
    }
}

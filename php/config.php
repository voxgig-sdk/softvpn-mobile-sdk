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
              'short' => 'City',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'short' => 'Country of the IP address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'ip',
              'short' => 'The IP address of the requester',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'region',
              'short' => 'Region or state',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'request_info',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/request-ip',
                  'segments' => [
                    [
                      'lit' => 'request-ip',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'request-ip',
                  ],
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
              'short' => 'City where the server is located',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'short' => 'Country where the server is located',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'countryCode',
              'short' => 'ISO country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'host',
              'short' => 'Server hostname or IP address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the server',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'load',
              'short' => 'Server load percentage',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'short' => 'Display name of the server',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'online',
              'short' => 'Whether the server is currently online',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'port',
              'short' => 'Server port number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'premium',
              'short' => 'Whether this is a premium server',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'protocol',
              'short' => 'VPN protocol used by the server',
              'type' => '`$STRING`',
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/servers',
                  'segments' => [
                    [
                      'lit' => 'servers',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'servers',
                  ],
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

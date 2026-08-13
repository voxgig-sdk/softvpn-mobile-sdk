<?php
declare(strict_types=1);

// Typed models for the SoftvpnMobile SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** RequestInfo entity data model. */
class RequestInfo
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $ip = null;
    public ?string $region = null;
}

/** Request payload for RequestInfo#load. */
class RequestInfoLoadMatch
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $ip = null;
    public ?string $region = null;
}

/** Server entity data model. */
class Server
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $countryCode = null;
    public ?string $host = null;
    public ?string $id = null;
    public ?int $load = null;
    public ?string $name = null;
    public ?bool $online = null;
    public ?int $port = null;
    public ?bool $premium = null;
    public ?string $protocol = null;
}

/** Request payload for Server#list. */
class ServerListMatch
{
    public ?string $city = null;
    public ?string $country = null;
    public ?string $countryCode = null;
    public ?string $host = null;
    public ?string $id = null;
    public ?int $load = null;
    public ?string $name = null;
    public ?bool $online = null;
    public ?int $port = null;
    public ?bool $premium = null;
    public ?string $protocol = null;
}


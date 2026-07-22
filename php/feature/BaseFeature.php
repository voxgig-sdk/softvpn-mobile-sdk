<?php
declare(strict_types=1);

// SoftvpnMobile SDK base feature

class SoftvpnMobileBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(SoftvpnMobileContext $ctx, array $options): void {}
    public function PostConstruct(SoftvpnMobileContext $ctx): void {}
    public function PostConstructEntity(SoftvpnMobileContext $ctx): void {}
    public function SetData(SoftvpnMobileContext $ctx): void {}
    public function GetData(SoftvpnMobileContext $ctx): void {}
    public function GetMatch(SoftvpnMobileContext $ctx): void {}
    public function SetMatch(SoftvpnMobileContext $ctx): void {}
    public function PrePoint(SoftvpnMobileContext $ctx): void {}
    public function PreSpec(SoftvpnMobileContext $ctx): void {}
    public function PreRequest(SoftvpnMobileContext $ctx): void {}
    public function PreResponse(SoftvpnMobileContext $ctx): void {}
    public function PreResult(SoftvpnMobileContext $ctx): void {}
    public function PreDone(SoftvpnMobileContext $ctx): void {}
    public function PreUnexpected(SoftvpnMobileContext $ctx): void {}
}

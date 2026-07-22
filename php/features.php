<?php
declare(strict_types=1);

// SoftvpnMobile SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class SoftvpnMobileFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new SoftvpnMobileBaseFeature();
            case "test":
                return new SoftvpnMobileTestFeature();
            default:
                return new SoftvpnMobileBaseFeature();
        }
    }
}

<?php
declare(strict_types=1);

// SoftvpnMobile SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class SoftvpnMobileMakeContext
{
    public static function call(array $ctxmap, ?SoftvpnMobileContext $basectx): SoftvpnMobileContext
    {
        return new SoftvpnMobileContext($ctxmap, $basectx);
    }
}

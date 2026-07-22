<?php
declare(strict_types=1);

// SoftvpnMobile SDK utility: feature_hook

class SoftvpnMobileFeatureHook
{
    public static function call(SoftvpnMobileContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}

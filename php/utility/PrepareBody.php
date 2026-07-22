<?php
declare(strict_types=1);

// SoftvpnMobile SDK utility: prepare_body

class SoftvpnMobilePrepareBody
{
    public static function call(SoftvpnMobileContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

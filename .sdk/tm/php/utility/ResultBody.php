<?php
declare(strict_types=1);

// SoftvpnMobile SDK utility: result_body

class SoftvpnMobileResultBody
{
    public static function call(SoftvpnMobileContext $ctx): ?SoftvpnMobileResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

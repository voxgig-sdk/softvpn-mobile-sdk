<?php
declare(strict_types=1);

// SoftvpnMobile SDK utility: result_headers

class SoftvpnMobileResultHeaders
{
    public static function call(SoftvpnMobileContext $ctx): ?SoftvpnMobileResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

<?php
declare(strict_types=1);

// SoftvpnMobile SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

SoftvpnMobileUtility::setRegistrar(function (SoftvpnMobileUtility $u): void {
    $u->clean = [SoftvpnMobileClean::class, 'call'];
    $u->done = [SoftvpnMobileDone::class, 'call'];
    $u->make_error = [SoftvpnMobileMakeError::class, 'call'];
    $u->feature_add = [SoftvpnMobileFeatureAdd::class, 'call'];
    $u->feature_hook = [SoftvpnMobileFeatureHook::class, 'call'];
    $u->feature_init = [SoftvpnMobileFeatureInit::class, 'call'];
    $u->fetcher = [SoftvpnMobileFetcher::class, 'call'];
    $u->make_fetch_def = [SoftvpnMobileMakeFetchDef::class, 'call'];
    $u->make_context = [SoftvpnMobileMakeContext::class, 'call'];
    $u->make_options = [SoftvpnMobileMakeOptions::class, 'call'];
    $u->make_request = [SoftvpnMobileMakeRequest::class, 'call'];
    $u->make_response = [SoftvpnMobileMakeResponse::class, 'call'];
    $u->make_result = [SoftvpnMobileMakeResult::class, 'call'];
    $u->make_point = [SoftvpnMobileMakePoint::class, 'call'];
    $u->make_spec = [SoftvpnMobileMakeSpec::class, 'call'];
    $u->make_url = [SoftvpnMobileMakeUrl::class, 'call'];
    $u->param = [SoftvpnMobileParam::class, 'call'];
    $u->prepare_auth = [SoftvpnMobilePrepareAuth::class, 'call'];
    $u->prepare_body = [SoftvpnMobilePrepareBody::class, 'call'];
    $u->prepare_headers = [SoftvpnMobilePrepareHeaders::class, 'call'];
    $u->prepare_method = [SoftvpnMobilePrepareMethod::class, 'call'];
    $u->prepare_params = [SoftvpnMobilePrepareParams::class, 'call'];
    $u->prepare_path = [SoftvpnMobilePreparePath::class, 'call'];
    $u->prepare_query = [SoftvpnMobilePrepareQuery::class, 'call'];
    $u->result_basic = [SoftvpnMobileResultBasic::class, 'call'];
    $u->result_body = [SoftvpnMobileResultBody::class, 'call'];
    $u->result_headers = [SoftvpnMobileResultHeaders::class, 'call'];
    $u->transform_request = [SoftvpnMobileTransformRequest::class, 'call'];
    $u->transform_response = [SoftvpnMobileTransformResponse::class, 'call'];
});

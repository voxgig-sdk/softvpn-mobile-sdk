# SoftvpnMobile SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

SoftvpnMobileUtility.registrar = ->(u) {
  u.clean = SoftvpnMobileUtilities::Clean
  u.done = SoftvpnMobileUtilities::Done
  u.make_error = SoftvpnMobileUtilities::MakeError
  u.feature_add = SoftvpnMobileUtilities::FeatureAdd
  u.feature_hook = SoftvpnMobileUtilities::FeatureHook
  u.feature_init = SoftvpnMobileUtilities::FeatureInit
  u.fetcher = SoftvpnMobileUtilities::Fetcher
  u.make_fetch_def = SoftvpnMobileUtilities::MakeFetchDef
  u.make_context = SoftvpnMobileUtilities::MakeContext
  u.make_options = SoftvpnMobileUtilities::MakeOptions
  u.make_request = SoftvpnMobileUtilities::MakeRequest
  u.make_response = SoftvpnMobileUtilities::MakeResponse
  u.make_result = SoftvpnMobileUtilities::MakeResult
  u.make_point = SoftvpnMobileUtilities::MakePoint
  u.make_spec = SoftvpnMobileUtilities::MakeSpec
  u.make_url = SoftvpnMobileUtilities::MakeUrl
  u.param = SoftvpnMobileUtilities::Param
  u.prepare_auth = SoftvpnMobileUtilities::PrepareAuth
  u.prepare_body = SoftvpnMobileUtilities::PrepareBody
  u.prepare_headers = SoftvpnMobileUtilities::PrepareHeaders
  u.prepare_method = SoftvpnMobileUtilities::PrepareMethod
  u.prepare_params = SoftvpnMobileUtilities::PrepareParams
  u.prepare_path = SoftvpnMobileUtilities::PreparePath
  u.prepare_query = SoftvpnMobileUtilities::PrepareQuery
  u.graphql_body = SoftvpnMobileUtilities::GraphqlBody
  u.graphql_errors = SoftvpnMobileUtilities::GraphqlErrors
  u.result_basic = SoftvpnMobileUtilities::ResultBasic
  u.result_body = SoftvpnMobileUtilities::ResultBody
  u.result_headers = SoftvpnMobileUtilities::ResultHeaders
  u.transform_request = SoftvpnMobileUtilities::TransformRequest
  u.transform_response = SoftvpnMobileUtilities::TransformResponse
}

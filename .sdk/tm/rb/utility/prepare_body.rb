# SoftvpnMobile SDK utility: prepare_body
require_relative 'media'
module SoftvpnMobileUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return SoftvpnMobileUtilities.raw_body(ctx.reqdata) if SoftvpnMobileUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end

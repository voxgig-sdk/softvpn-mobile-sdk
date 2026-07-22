# SoftvpnMobile SDK utility: make_context
require_relative '../core/context'
module SoftvpnMobileUtilities
  MakeContext = ->(ctxmap, basectx) {
    SoftvpnMobileContext.new(ctxmap, basectx)
  }
end

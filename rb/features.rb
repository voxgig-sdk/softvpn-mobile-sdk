# SoftvpnMobile SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module SoftvpnMobileFeatures
  def self.make_feature(name)
    case name
    when "base"
      SoftvpnMobileBaseFeature.new
    when "ratelimit"
      SoftvpnMobileRatelimitFeature.new
    when "retry"
      SoftvpnMobileRetryFeature.new
    when "test"
      SoftvpnMobileTestFeature.new
    when "timeout"
      SoftvpnMobileTimeoutFeature.new
    else
      SoftvpnMobileBaseFeature.new
    end
  end
end

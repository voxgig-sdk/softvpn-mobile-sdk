# SoftvpnMobile SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module SoftvpnMobileFeatures
  def self.make_feature(name)
    case name
    when "base"
      SoftvpnMobileBaseFeature.new
    when "test"
      SoftvpnMobileTestFeature.new
    else
      SoftvpnMobileBaseFeature.new
    end
  end
end

# SoftvpnMobile SDK exists test

require "minitest/autorun"
require_relative "../SoftvpnMobile_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = SoftvpnMobileSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end

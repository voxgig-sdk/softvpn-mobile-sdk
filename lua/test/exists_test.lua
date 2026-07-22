-- SoftvpnMobile SDK exists test

local sdk = require("softvpn-mobile_sdk")

describe("SoftvpnMobileSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)

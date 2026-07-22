-- SoftvpnMobile SDK error

local SoftvpnMobileError = {}
SoftvpnMobileError.__index = SoftvpnMobileError


function SoftvpnMobileError.new(code, msg, ctx)
  local self = setmetatable({}, SoftvpnMobileError)
  self.is_sdk_error = true
  self.sdk = "SoftvpnMobile"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function SoftvpnMobileError:error()
  return self.msg
end


function SoftvpnMobileError:__tostring()
  return self.msg
end


return SoftvpnMobileError

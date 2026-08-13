-- Typed models for the SoftvpnMobile SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class RequestInfo
---@field city? string
---@field country? string
---@field ip? string
---@field region? string

---@class RequestInfoLoadMatch
---@field city? string
---@field country? string
---@field ip? string
---@field region? string

---@class Server
---@field city? string
---@field country? string
---@field countryCode? string
---@field host? string
---@field id? string
---@field load? number
---@field name? string
---@field online? boolean
---@field port? number
---@field premium? boolean
---@field protocol? string

---@class ServerListMatch
---@field city? string
---@field country? string
---@field countryCode? string
---@field host? string
---@field id? string
---@field load? number
---@field name? string
---@field online? boolean
---@field port? number
---@field premium? boolean
---@field protocol? string

local M = {}

return M

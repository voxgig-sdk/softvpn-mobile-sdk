# frozen_string_literal: true

# Typed models for the SoftvpnMobile SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# RequestInfo entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
RequestInfo = Struct.new(
  :city,
  :country,
  :ip,
  :region,
  keyword_init: true
)

# Request payload for RequestInfo#load.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
RequestInfoLoadMatch = Struct.new(
  :city,
  :country,
  :ip,
  :region,
  keyword_init: true
)

# Server entity data model.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] host
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] load
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] online
#   @return [Boolean, nil]
#
# @!attribute [rw] port
#   @return [Integer, nil]
#
# @!attribute [rw] premium
#   @return [Boolean, nil]
#
# @!attribute [rw] protocol
#   @return [String, nil]
Server = Struct.new(
  :city,
  :country,
  :country_code,
  :host,
  :id,
  :load,
  :name,
  :online,
  :port,
  :premium,
  :protocol,
  keyword_init: true
)

# Request payload for Server#list.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] host
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] load
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] online
#   @return [Boolean, nil]
#
# @!attribute [rw] port
#   @return [Integer, nil]
#
# @!attribute [rw] premium
#   @return [Boolean, nil]
#
# @!attribute [rw] protocol
#   @return [String, nil]
ServerListMatch = Struct.new(
  :city,
  :country,
  :country_code,
  :host,
  :id,
  :load,
  :name,
  :online,
  :port,
  :premium,
  :protocol,
  keyword_init: true
)


// Typed models for the SoftvpnMobile SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface RequestInfo {
  city?: string
  country?: string
  ip?: string
  region?: string
}

export interface RequestInfoLoadMatch {
  city?: string
  country?: string
  ip?: string
  region?: string
}

export interface Server {
  city?: string
  country?: string
  country_code?: string
  host?: string
  id?: string
  load?: number
  name?: string
  online?: boolean
  port?: number
  premium?: boolean
  protocol?: string
}

export interface ServerListMatch {
  city?: string
  country?: string
  country_code?: string
  host?: string
  id?: string
  load?: number
  name?: string
  online?: boolean
  port?: number
  premium?: boolean
  protocol?: string
}


package voxgigsoftvpnmobilesdk

import (
	"github.com/voxgig-sdk/softvpn-mobile-sdk/go/core"
	"github.com/voxgig-sdk/softvpn-mobile-sdk/go/entity"
	"github.com/voxgig-sdk/softvpn-mobile-sdk/go/feature"
	_ "github.com/voxgig-sdk/softvpn-mobile-sdk/go/utility"
)

// Type aliases preserve external API.
type SoftvpnMobileSDK = core.SoftvpnMobileSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type SoftvpnMobileEntity = core.SoftvpnMobileEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type SoftvpnMobileError = core.SoftvpnMobileError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewRequestInfoEntityFunc = func(client *core.SoftvpnMobileSDK, entopts map[string]any) core.SoftvpnMobileEntity {
		return entity.NewRequestInfoEntity(client, entopts)
	}
	core.NewServerEntityFunc = func(client *core.SoftvpnMobileSDK, entopts map[string]any) core.SoftvpnMobileEntity {
		return entity.NewServerEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewSoftvpnMobileSDK = core.NewSoftvpnMobileSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewSoftvpnMobileSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *SoftvpnMobileSDK  { return NewSoftvpnMobileSDK(nil) }
func Test() *SoftvpnMobileSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature

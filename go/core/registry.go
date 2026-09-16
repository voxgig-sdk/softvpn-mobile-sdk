package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewRequestInfoEntityFunc func(client *SoftvpnMobileSDK, entopts map[string]any) SoftvpnMobileEntity

var NewServerEntityFunc func(client *SoftvpnMobileSDK, entopts map[string]any) SoftvpnMobileEntity


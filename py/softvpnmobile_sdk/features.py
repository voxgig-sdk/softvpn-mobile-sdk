# SoftvpnMobile SDK feature factory

from softvpnmobile_sdk.feature.base_feature import SoftvpnMobileBaseFeature
from softvpnmobile_sdk.feature.ratelimit_feature import SoftvpnMobileRatelimitFeature
from softvpnmobile_sdk.feature.retry_feature import SoftvpnMobileRetryFeature
from softvpnmobile_sdk.feature.test_feature import SoftvpnMobileTestFeature
from softvpnmobile_sdk.feature.timeout_feature import SoftvpnMobileTimeoutFeature


_FEATURES = {
    "base": lambda: SoftvpnMobileBaseFeature(),
    "ratelimit": lambda: SoftvpnMobileRatelimitFeature(),
    "retry": lambda: SoftvpnMobileRetryFeature(),
    "test": lambda: SoftvpnMobileTestFeature(),
    "timeout": lambda: SoftvpnMobileTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES

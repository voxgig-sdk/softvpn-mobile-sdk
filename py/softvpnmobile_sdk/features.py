# SoftvpnMobile SDK feature factory

from softvpnmobile_sdk.feature.base_feature import SoftvpnMobileBaseFeature
from softvpnmobile_sdk.feature.test_feature import SoftvpnMobileTestFeature


def _make_feature(name):
    features = {
        "base": lambda: SoftvpnMobileBaseFeature(),
        "test": lambda: SoftvpnMobileTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()

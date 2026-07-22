# SoftvpnMobile SDK feature factory

from feature.base_feature import SoftvpnMobileBaseFeature
from feature.test_feature import SoftvpnMobileTestFeature


def _make_feature(name):
    features = {
        "base": lambda: SoftvpnMobileBaseFeature(),
        "test": lambda: SoftvpnMobileTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()

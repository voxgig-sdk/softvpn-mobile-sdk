# ProjectName SDK exists test

import pytest
from softvpnmobile_sdk import SoftvpnMobileSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = SoftvpnMobileSDK.test(None, None)
        assert testsdk is not None

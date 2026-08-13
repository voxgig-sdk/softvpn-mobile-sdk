# SoftvpnMobile SDK utility: make_context

from projectname_sdk.core.context import SoftvpnMobileContext


def make_context_util(ctxmap, basectx):
    return SoftvpnMobileContext(ctxmap, basectx)

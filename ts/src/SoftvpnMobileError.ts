
import { Context } from './Context'


class SoftvpnMobileError extends Error {

  isSoftvpnMobileError = true

  sdk = 'SoftvpnMobile'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  SoftvpnMobileError
}


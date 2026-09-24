
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SoftvpnMobileSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SoftvpnMobileSDK.test()
    equal(testsdk instanceof SoftvpnMobileSDK, true,
      'SoftvpnMobileSDK.test() must return a client synchronously')
  })

})

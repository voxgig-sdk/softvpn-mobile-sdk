
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SoftvpnMobileSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await SoftvpnMobileSDK.test()
    equal(null !== testsdk, true)
  })

})

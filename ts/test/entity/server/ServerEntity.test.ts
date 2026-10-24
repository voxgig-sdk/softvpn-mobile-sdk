

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SoftvpnMobileSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ServerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SOFTVPN_MOBILE_TEST_LIVE=TRUE.
  afterEach(liveDelay('SOFTVPN_MOBILE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SoftvpnMobileSDK.test()
    const ent = testsdk.Server()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('server hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of SoftvpnMobileSDK.test(offline).Server().stream('list')) { }
    }, /offline/)

    for await (const _item of SoftvpnMobileSDK.test(offline).Server()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = SoftvpnMobileSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Server().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of SoftvpnMobileSDK.test().Server().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new SoftvpnMobileSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Server().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Server().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = SoftvpnMobileSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Server().list({"city":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SOFTVPN_MOBILE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'server.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"city":{"a":true,"h":"City","n":"city","r":false,"sh":"City where the server is located","t":"`$STRING`","key$":"city","index$":0},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country where the server is located","t":"`$STRING`","key$":"country","index$":1},"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"sh":"ISO country code","t":"`$STRING`","key$":"countryCode","index$":2},"host":{"a":true,"h":"Host","n":"host","r":false,"sh":"Server hostname or IP address","t":"`$STRING`","key$":"host","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the server","t":"`$STRING`","key$":"id","index$":4},"load":{"a":true,"h":"Load","n":"load","r":false,"sh":"Server load percentage","t":"`$INTEGER`","key$":"load","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Display name of the server","t":"`$STRING`","key$":"name","index$":6},"online":{"a":true,"h":"Online","n":"online","r":false,"sh":"Whether the server is currently online","t":"`$BOOLEAN`","key$":"online","index$":7},"port":{"a":true,"h":"Port","n":"port","r":false,"sh":"Server port number","t":"`$INTEGER`","key$":"port","index$":8},"premium":{"a":true,"h":"Premium","n":"premium","r":false,"sh":"Whether this is a premium server","t":"`$BOOLEAN`","key$":"premium","index$":9},"protocol":{"a":true,"h":"Protocol","n":"protocol","r":false,"sh":"VPN protocol used by the server","t":"`$STRING`","key$":"protocol","index$":10}},"id":{"field":"id","name":"id"},"name":"server","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /servers","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/servers","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"servers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"server","name__orig":"server","Name":"Server","name_":"server","name-":"server","NAME":"SERVER","index$":1}, {"active":true,"entity":"server","key$":"BasicServerFlow","kind":"basic","name":"BasicServerFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"server_ref01"}}],"index$":0}]}, 'Server', {"GET /servers":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let server_ref01_data = Object.values(setup.data.existing.server)[0] as any

    // LIST
    const server_ref01_ent = client.Server()
    const server_ref01_match: any = {}

    const server_ref01_list = (await server_ref01_ent.list(server_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/server/ServerTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SoftvpnMobileSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['server01','server02','server03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SOFTVPN_MOBILE_TEST_SERVER_ENTID': idmap,
    'SOFTVPN_MOBILE_TEST_LIVE': 'FALSE',
    'SOFTVPN_MOBILE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SOFTVPN_MOBILE_TEST_SERVER_ENTID']

  const live = 'TRUE' === env.SOFTVPN_MOBILE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SOFTVPN_MOBILE_TEST_SERVER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SoftvpnMobileSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.SOFTVPN_MOBILE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  

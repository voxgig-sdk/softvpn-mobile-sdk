

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


describe('RequestInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SOFTVPN_MOBILE_TEST_LIVE=TRUE.
  afterEach(liveDelay('SOFTVPN_MOBILE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SoftvpnMobileSDK.test()
    const ent = testsdk.RequestInfo()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = SoftvpnMobileSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.RequestInfo().load({"city":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SOFTVPN_MOBILE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'request_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"city":{"a":true,"h":"City","n":"city","r":false,"sh":"City","t":"`$STRING`","key$":"city","index$":0},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country of the IP address","t":"`$STRING`","key$":"country","index$":1},"ip":{"a":true,"h":"Ip","n":"ip","r":false,"sh":"The IP address of the requester","t":"`$STRING`","key$":"ip","index$":2},"region":{"a":true,"h":"Region","n":"region","r":false,"sh":"Region or state","t":"`$STRING`","key$":"region","index$":3}},"name":"request_info","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /request-ip","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/request-ip","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"request-ip"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"request_info","name__orig":"request_info","Name":"RequestInfo","name_":"request_info","name-":"request-info","NAME":"REQUEST_INFO","index$":0}, {"active":true,"entity":"request_info","key$":"BasicRequestInfoFlow","kind":"basic","name":"BasicRequestInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"request_info_ref01","srcdatavar":"request_info_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-request_info_ref01"}}],"index$":0}]}, 'RequestInfo', {"GET /request-ip":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let request_info_ref01_data = Object.values(setup.data.existing.request_info)[0] as any

    // LOAD
    const request_info_ref01_ent = client.RequestInfo()
    const request_info_ref01_match_dt0: any = {}
    const request_info_ref01_data_dt0 = (await request_info_ref01_ent.load(request_info_ref01_match_dt0)).data()
    assert(null != request_info_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/request_info/RequestInfoTestData.json')

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
    ['request_info01','request_info02','request_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SOFTVPN_MOBILE_TEST_REQUEST_INFO_ENTID': idmap,
    'SOFTVPN_MOBILE_TEST_LIVE': 'FALSE',
    'SOFTVPN_MOBILE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SOFTVPN_MOBILE_TEST_REQUEST_INFO_ENTID']

  const live = 'TRUE' === env.SOFTVPN_MOBILE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SOFTVPN_MOBILE_TEST_REQUEST_INFO_ENTID']
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
  

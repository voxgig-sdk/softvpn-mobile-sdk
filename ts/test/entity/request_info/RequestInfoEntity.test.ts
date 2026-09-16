

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SoftvpnMobileSDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SOFTVPN_MOBILE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'request_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"city","req":false,"short":"City","type":"`$STRING`","index$":0},{"active":true,"name":"country","req":false,"short":"Country of the IP address","type":"`$STRING`","index$":1},{"active":true,"name":"ip","req":false,"short":"The IP address of the requester","type":"`$STRING`","index$":2},{"active":true,"name":"region","req":false,"short":"Region or state","type":"`$STRING`","index$":3}],"name":"request_info","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /request-ip","json":"{\"operationId\":\"getRequestIp\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"city\":{\"description\":\"City\",\"example\":\"San Francisco\",\"type\":\"string\"},\"country\":{\"description\":\"Country of the IP address\",\"example\":\"United States\",\"type\":\"string\"},\"ip\":{\"description\":\"The IP address of the requester\",\"example\":\"192.168.1.1\",\"type\":\"string\"},\"region\":{\"description\":\"Region or state\",\"example\":\"California\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP request information\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"type\":\"string\"}},\"required\":[\"error\"],\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/request-ip","segments":[{"lit":"request-ip"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"request_info","name__orig":"request_info","Name":"RequestInfo","name_":"request_info","name-":"request-info","NAME":"REQUEST_INFO","index$":0}, {"active":true,"entity":"request_info","key$":"BasicRequestInfoFlow","kind":"basic","name":"BasicRequestInfoFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"request_info_ref01","srcdatavar":"request_info_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-request_info_ref01"}}],"index$":0}]}, 'RequestInfo')
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
  

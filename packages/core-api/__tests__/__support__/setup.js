'use strict'

const path = require('path')
const container = require('@arkecosystem/core-container')

const generateRound = require('./utils/generate-round')
const activeDelegates = require('../__fixtures__/delegates.json')

jest.setTimeout(60000)

beforeAll(async (done) => {
  process.env.ARK_SKIP_BLOCKCHAIN_STARTED_CHECK = true

  await container.start({
    data: '~/.ark',
    config: path.resolve(__dirname, './config')
  }, {
    exit: '@arkecosystem/core-api'
  })

  // seed
  const connection = container.resolvePlugin('database')
  await connection.buildWallets(1)
  await connection.saveWallets(true)
  await connection.saveRound(generateRound(activeDelegates, 1))

  done()
})

afterAll(async (done) => {
  await container.tearDown()

  done()
})
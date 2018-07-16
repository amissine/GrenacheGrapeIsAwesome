'use strict'

const debug = require('debug')('ggia:example1')
const { addGrape } = require('./../util')

class Example {
  constructor () {
    addGrape(run)
  }
}
module.exports = Example

function run (grapes, grape, stop) {
  const duration = 10000

  debug('grape started on port %d, stopping in %d ms', grape.conf.dht_port, duration)
  setTimeout(() => stop(() => {
    debug('grape stopped')
    process.exit(0)
  }), duration)

  grape.on('ready', () => {
    grapes[0].announce('public:trade:bitfinex', 1337, () => {})
    grapes[1].announce('public:trade:bitstamp', 1338, () => {})
  })
  grape.on('announce', () => {
    grape.lookup('public:trade:bitfinex', (e, r) => {
      if (e) throw e
      debug(r)
    })
    grape.lookup('public:trade:bitstamp', (e, r) => {
      if (e) throw e
      debug(r)
    })
  })
}

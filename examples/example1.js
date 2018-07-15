'use strict'

const debug = require('debug')('ggia:example1')
const { addGrape } = require('./../util')

class Example {
  constructor () {
    addGrape(run)
  }
}
module.exports = Example

function run (grape, stop) {
  const duration = 10000

  debug('grape started on port %d, stopping in %d ms', grape.conf.dht_port, duration)
  setTimeout(() => stop(() => {
    debug('grape stopped')
    process.exit(0)
  }), duration)
}


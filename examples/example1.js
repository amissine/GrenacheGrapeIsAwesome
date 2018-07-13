'use strict'

const debug = require('debug')('ggia:example1')
const { addGrape } = require('./../util')
var me

class Example {
  constructor () {
    this.grape = addGrape(stop => {
      debug('grape started')
      me.stop = stop
    })
    me = this
  }
  run () {
    const duration = 20000

    debug('node lookup, duration %d ms', duration)
    setTimeout(() => this.stop(() => {
      debug('grape stopped')
      process.exit(0)
    }), duration)
  }
}
module.exports = Example

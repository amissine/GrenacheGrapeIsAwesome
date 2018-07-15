'use strict'

const debug = require('debug')('ggia:util')
const { Grape } = require('grenache-grape')
const portbase = 20000
var count = 0

exports.addGrape = (onstart = (grape, stop) => {}) => {
  if (count == 0) return init(2, onstart)
  newGrape(onstart)
}

function init (size, onstart) {
  if (size) return newGrape(init, size, onstart)
  newGrape(onstart)
}
function newGrape (init, size = 0, onstart = (grape, stop) => {}) {
  var grape

  // debug('newGrape: size=%d', size)
  count++
  grape = new Grape({
    host: '127.0.0.1',
    dht_port: portbase + count,
    dht_bootstrap: count == 1 ? [] : [ '127.0.0.1:' + (portbase + count - 1) ],
    api_port: portbase + 10000 + count
  })
  grape.on('node', node => debug({ port: node.port, distance: node.distance }))
  grape.start(size ? () => init(--size, onstart) : () => init(grape, stop))
  
  function stop (done) {
    grape.stop(done)
  }
}

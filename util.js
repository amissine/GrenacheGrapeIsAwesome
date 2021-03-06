'use strict'

const debug = require('debug')('ggia:util')
const { Grape } = require('grenache-grape')
const portbase = 20000, knownPort = portbase + 1
var count = 0, grapes = []

exports.addGrape = (onstart = (grapes, grape, stop) => {}) => {
  if (count == 0) return init(2, onstart)
  newGrape(onstart)
}

function init (size, onstart) {
  if (size) return newGrape(init, size, onstart)
  newGrape(onstart)
}
function newGrape (cb, size = 0, onstart = (grapes, grape, stop) => {}) {
  var grape

  count++
  grape = new Grape({
    host: '127.0.0.1',
    dht_port: portbase + count,
    dht_bootstrap: count == 1 ? [] : [ '127.0.0.1:' + knownPort ],
    api_port: portbase + 10000 + count
  })
  grapes.push(grape)
  grape.on('node', node => debug({ port: node.port, distance: node.distance }))
  grape.start(size ? () => cb(--size, onstart) : () => cb(grapes, grape, stop))
}
function stop (done) {
  var grape = grapes.pop()

  grape.stop(grapes.length ? () => stop(done) : done)
}

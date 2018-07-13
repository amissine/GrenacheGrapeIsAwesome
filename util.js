'use strict'

const { Grape } = require('grenache-grape')

exports.addGrape = (onstart = (stop) => {}) => {
  const grape = new Grape({
    dht_port: 20004,
    dht_bootstrap: [ '10.0.0.18:20002', '10.0.0.10:20003', '127.0.0.1:20001' ],
    api_port: 30004
  })

  grape.start(() => onstart(stop))

  return grape

  function stop (done) {
    grape.stop(done)
  }
}

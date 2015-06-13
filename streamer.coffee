util       = require 'util'
rStream    = require('stream').Transform

Streamer = (opts = {}) ->
  rStream.call this, {highWaterMark:2, readableObjectMode:true, writableObjectMode:true}

  @n    = 0
  @bufs = []
  @opts = opts
  @opts.setup.call this if opts.setup

  this
util.inherits Streamer, rStream
Streamer::lastConvert = ()                    -> @push null
Streamer::_flush      = ()                    -> @lastConvert()
Streamer::_transform  = (chunk, encoding, cb) -> @convert chunk, cb

module.exports = Streamer

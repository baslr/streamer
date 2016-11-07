'use strict';

const tStream = require('stream').Transform;


class Streamer extends tStream {
    constructor(opts = {}) {
        super({highWaterMark:2, readableObjectMode:true, writableObjectMode:true});

        this.n    = 0;
        this.bufs = [];
        this.opts = opts;

        if (this.opts.setup) {
            this.opts.setup.call(this);
        } // if

        return this;
    } // constructor()

    lastConvert(cb) {
        this.push(null);
        cb();
    } // lastConvert()

    _flush(cb) {
        this.lastConvert(cb);
    } // _flush()

    _transform(chunk, encoding, cb) {
        this.convert(chunk, cb);
    }
}

module.exports = Streamer;

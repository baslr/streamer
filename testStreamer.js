'use strict';

const assert = require('assert');

const Streamer = require('./streamer');


const transform = new Streamer();

transform.convert = function(chunk, cb) {
    this.push( chunk.slice(0,1) );
    cb();
}

transform.lastConvert = function(cb) {
    this.push( Buffer.from('z'));
    cb();
}
const bufs = [];

transform.on('data', d => bufs.push(d) );

transform.on('end', () => {
    assert.strictEqual(Buffer.concat(bufs).toString('hex'), Buffer.from('fbz').toString('hex'));
});


transform.write(Buffer.from('foo'));
transform.write(Buffer.from('bar'));
transform.end();

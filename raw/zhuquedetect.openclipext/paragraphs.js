// Per-paragraph detection: each paragraph gets its own label (is_merge: false).
var zhuque = require('./lib/zhuque.js');

async function action(selection) {
  return zhuque.detect(selection, { merge: false });
}

module.exports = action;
module.exports.action = action;

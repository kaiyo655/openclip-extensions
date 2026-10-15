// Whole-text detection: the selection is scored as one piece (is_merge: true).
var zhuque = require('./lib/zhuque.js');

async function action(selection) {
  return zhuque.detect(selection, { merge: true });
}

module.exports = action;
module.exports.action = action;

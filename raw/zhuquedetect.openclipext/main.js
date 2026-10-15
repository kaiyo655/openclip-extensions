// Detect AI-generated text with Zhuque. The "perParagraph" option switches
// the API between whole-text scoring (is_merge: true) and one label per paragraph.
var zhuque = require('./lib/zhuque.js');

function perParagraph() {
  var value = openclip.options && openclip.options.perParagraph;
  if (value === undefined && openclip.option) value = openclip.option('perParagraph');
  return value === true || String(value).toLowerCase() === 'true';
}

async function action(selection) {
  return zhuque.detect(selection, { merge: !perParagraph() });
}

module.exports = action;
module.exports.action = action;

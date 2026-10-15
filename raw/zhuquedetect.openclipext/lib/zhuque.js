// Shared client for the Zhuque (朱雀) AIGC text detector served by
// Tencent EdgeOne Makers Models.
// API: https://cloud.tencent.com/document/product/1552/137539

var ENDPOINT = 'https://ai-gateway.edgeone.link/v1/providers/zhuque-text/classify';

var messages = {
  title: {
    en: 'Zhuque AI Detection',
    'zh-Hans': '朱雀 AI 检测',
    'zh-Hant': '朱雀 AI 檢測',
    fr: 'Détection IA Zhuque',
    ja: '朱雀 AI 検出'
  },
  ai: { en: 'AI-generated', 'zh-Hans': 'AI 生成', 'zh-Hant': 'AI 生成', fr: 'Généré par IA', ja: 'AI 生成' },
  suspect: { en: 'Possibly AI', 'zh-Hans': '疑似 AI', 'zh-Hant': '疑似 AI', fr: 'Possiblement IA', ja: 'AI の疑い' },
  human: { en: 'Human-written', 'zh-Hans': '人工撰写', 'zh-Hant': '人工撰寫', fr: 'Écrit par un humain', ja: '人間が執筆' },
  verdictAI: {
    en: 'Verdict: most likely AI-generated',
    'zh-Hans': '结论：大概率为 AI 生成',
    'zh-Hant': '結論：大機率為 AI 生成',
    fr: 'Verdict : très probablement généré par IA',
    ja: '判定：AI 生成の可能性が高い'
  },
  verdictMixed: {
    en: 'Verdict: parts look AI-generated',
    'zh-Hans': '结论：部分内容疑似 AI 生成',
    'zh-Hant': '結論：部分內容疑似 AI 生成',
    fr: 'Verdict : certaines parties semblent générées par IA',
    ja: '判定：一部に AI 生成の疑い'
  },
  verdictHuman: {
    en: 'Verdict: most likely human-written',
    'zh-Hans': '结论：大概率为人工撰写',
    'zh-Hant': '結論：大機率為人工撰寫',
    fr: 'Verdict : très probablement écrit par un humain',
    ja: '判定：人間が書いた可能性が高い'
  },
  paragraphs: { en: 'Paragraphs', 'zh-Hans': '分段结果', 'zh-Hant': '分段結果', fr: 'Paragraphes', ja: '段落ごとの結果' },
  confidence: { en: 'confidence', 'zh-Hans': '置信度', 'zh-Hant': '信賴度', fr: 'confiance', ja: '信頼度' },
  usage: {
    en: 'Used {n} tokens of the Makers free quota (500K tokens/month)',
    'zh-Hans': '本次扣减 Makers 免费额度 {n} token（每月 50 万）',
    'zh-Hant': '本次扣減 Makers 免費額度 {n} token（每月 50 萬）',
    fr: '{n} jetons utilisés sur le quota gratuit Makers (500 000/mois)',
    ja: 'Makers 無料枠から {n} トークンを消費（毎月 50 万）'
  },
  setup: {
    en: 'Add your EdgeOne Makers API Key in the extension settings.',
    'zh-Hans': '请在扩展设置中填写 EdgeOne Makers API Key。',
    'zh-Hant': '請在擴充功能設定中填寫 EdgeOne Makers API Key。',
    fr: 'Ajoutez votre clé API EdgeOne Makers dans les réglages de l\'extension.',
    ja: '拡張機能の設定に EdgeOne Makers API キーを入力してください。'
  },
  unauthorized: {
    en: 'The API Key was rejected. Check it in the settings; a newly created key can take 1–2 minutes to activate.',
    'zh-Hans': 'API Key 无效或已删除。请在设置中检查；新建的 Key 可能需要 1–2 分钟生效。',
    'zh-Hant': 'API Key 無效或已刪除。請在設定中檢查；新建立的 Key 可能需要 1–2 分鐘生效。',
    fr: 'La clé API a été refusée. Vérifiez-la dans les réglages ; une nouvelle clé peut mettre 1 à 2 minutes à s\'activer.',
    ja: 'API キーが拒否されました。設定を確認してください。新しいキーは有効になるまで 1〜2 分かかる場合があります。'
  },
  rateLimited: {
    en: 'Request limit or free quota reached. Check usage in the EdgeOne Makers console.',
    'zh-Hans': '请求过于频繁或免费额度已用完。请到 EdgeOne Makers 控制台查看用量。',
    'zh-Hant': '請求過於頻繁或免費額度已用完。請到 EdgeOne Makers 控制台查看用量。',
    fr: 'Limite de requêtes ou quota gratuit atteint. Consultez la console EdgeOne Makers.',
    ja: 'リクエスト上限または無料枠に達しました。EdgeOne Makers コンソールで使用量を確認してください。'
  },
  http: {
    en: 'Zhuque returned HTTP {status}{detail}',
    'zh-Hans': '朱雀接口返回 HTTP {status}{detail}',
    'zh-Hant': '朱雀介面傳回 HTTP {status}{detail}',
    fr: 'Zhuque a renvoyé HTTP {status}{detail}',
    ja: '朱雀が HTTP {status} を返しました{detail}'
  },
  failed: {
    en: 'Detection failed: {detail}',
    'zh-Hans': '检测失败：{detail}',
    'zh-Hant': '檢測失敗：{detail}',
    fr: 'Échec de la détection : {detail}',
    ja: '検出に失敗しました：{detail}'
  },
  network: {
    en: 'Could not reach the EdgeOne gateway. Check your internet connection and try again.',
    'zh-Hans': '无法连接 EdgeOne 网关。请检查网络连接后重试。',
    'zh-Hant': '無法連線至 EdgeOne 閘道。請檢查網路連線後重試。',
    fr: 'Impossible de joindre la passerelle EdgeOne. Vérifiez votre connexion et réessayez.',
    ja: 'EdgeOne ゲートウェイに接続できません。インターネット接続を確認して再試行してください。'
  },
  invalid: {
    en: 'Zhuque returned a response that could not be read.',
    'zh-Hans': '无法解析朱雀接口的返回结果。',
    'zh-Hant': '無法解析朱雀介面的回傳結果。',
    fr: 'La réponse de Zhuque n\'a pas pu être lue.',
    ja: '朱雀の応答を読み取れませんでした。'
  }
};

function t(key, vars) {
  var dict = messages[key];
  // openclip.i18n exists from OpenClip 1.1.0 (the manifest's minimum); English is the safety net.
  var text = openclip.i18n ? openclip.i18n(dict) : dict.en;
  Object.keys(vars || {}).forEach(function (name) {
    text = text.split('{' + name + '}').join(String(vars[name]));
  });
  return text;
}

function option(name) {
  if (openclip.options && openclip.options[name] !== undefined) return openclip.options[name];
  return openclip.option ? openclip.option(name) : undefined;
}

// Clamp to [0, 1] so a malformed field never breaks the bar rendering.
function ratio(value) {
  var n = Number(value);
  if (!isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function percent(value) {
  return Math.round(ratio(value) * 100) + '%';
}

// A 10-cell text bar, e.g. 0.72 → "███████░░░".
function bar(value) {
  var filled = Math.round(ratio(value) * 10);
  return new Array(filled + 1).join('█') + new Array(10 - filled + 1).join('░');
}

function labelName(label) {
  if (String(label) === '1') return t('ai');
  if (String(label) === '2') return t('suspect');
  return t('human');
}

// The API returns proportions, not a verdict. These cut-offs are this
// extension's own reading of them, not thresholds published by Tencent.
function verdict(aiShare, suspectShare) {
  if (aiShare >= 0.5) return t('verdictAI');
  if (aiShare + suspectShare >= 0.2) return t('verdictMixed');
  return t('verdictHuman');
}

function snippet(text) {
  var oneLine = String(text || '').replace(/\s+/g, ' ').trim();
  return oneLine.length > 40 ? oneLine.slice(0, 40) + '…' : oneLine;
}

function format(data, merge) {
  var shares = data.labels_ratio || {};
  var ai = ratio(shares['1']);
  var suspect = ratio(shares['2']);
  var human = ratio(shares['0']);

  var lines = [
    t('title'),
    '',
    bar(ai) + '  ' + percent(ai) + '  ' + t('ai'),
    bar(suspect) + '  ' + percent(suspect) + '  ' + t('suspect'),
    bar(human) + '  ' + percent(human) + '  ' + t('human'),
    '',
    verdict(ai, suspect)
  ];

  var segments = Array.isArray(data.segment_labels) ? data.segment_labels.slice() : [];
  if (!merge && segments.length > 0) {
    segments.sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    lines.push('', t('paragraphs'));
    segments.forEach(function (segment, index) {
      lines.push(
        (index + 1) + '. [' + labelName(segment.label) + ' · ' + t('confidence') + ' ' +
        percent(segment.conf) + '] ' + snippet(segment.text)
      );
    });
  }

  var used = data.makers_models_usage && data.makers_models_usage.total_tokens;
  if (used !== undefined && used !== null) {
    lines.push('', t('usage', { n: used }));
  }
  return lines.join('\n');
}

function httpError(status, data) {
  if (status === 401 || status === 403) return t('unauthorized');
  if (status === 429) return t('rateLimited');
  var detail = data && (data.msg || (data.error && (data.error.message || data.error)));
  return t('http', { status: status, detail: detail ? ': ' + detail : '' });
}

async function detect(selection, settings) {
  var apiKey = String(option('apiKey') || '').trim();
  if (!apiKey) {
    // requiredOptions normally catches this first; this covers a key cleared mid-session.
    openclip.requireConfiguration({ reason: t('setup'), missing: ['apiKey'] });
    return;
  }

  var text = typeof selection === 'string' ? selection : openclip.input.text;

  var response;
  try {
    response = await openclip.fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ text: text, is_merge: settings.merge })
    });
  } catch (_) {
    throw new Error(t('network'));
  }

  // Parse defensively: gateway errors may come back as HTML or plain text.
  var body = '';
  var data = null;
  try { body = response.text(); } catch (_) { body = ''; }
  try { data = body ? JSON.parse(body) : null; } catch (_) { data = null; }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(httpError(response.status, data));
  }
  if (!data) throw new Error(t('invalid'));
  if (data.status !== 'success') {
    throw new Error(t('failed', { detail: data.msg || data.status || 'unknown' }));
  }

  return format(data, settings.merge);
}

module.exports = { detect: detect };

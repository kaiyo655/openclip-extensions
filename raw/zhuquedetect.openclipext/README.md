# Zhuque AI Detection · 朱雀 AI 检测

Check whether the selected text was written by AI, using Tencent's Zhuque (朱雀) AIGC detection model through EdgeOne Makers Models.

## Features

- Scores the selection and shows the share of AI-generated, possibly-AI and human-written content as bars with percentages, plus a one-line verdict.
- Optional per-paragraph mode labels each paragraph separately (AI / possibly AI / human, with confidence).
- Each result shows how many tokens of your free quota the request used.

## Usage Examples

Select an essay, a reply or an article, and choose **Zhuque AI Detection**. The result card looks like this:

```
Zhuque AI Detection

███████░░░  72%  AI-generated
█░░░░░░░░░  10%  Possibly AI
██░░░░░░░░  18%  Human-written

Verdict: most likely AI-generated
Used 30 tokens of the Makers free quota (500K tokens/month)
```

Right-click (or ⇧-click) the action to copy the result instead of previewing it.

The verdict line is a summary of the percentages (AI share of 50% or more means "most likely AI"; AI plus possibly-AI share of 20% or more means "parts look AI-generated"). These cut-offs are this extension's choice, not thresholds published by Tencent. Treat the result as a signal, not proof.

## Configuration

1. Sign in to the [EdgeOne Makers console](https://console.cloud.tencent.com/edgeone/makers?tab=models&subTab=models) and open **Makers → Models → API Key**.
2. Click **Create API Key**, give it a name and copy the key.
3. Open the extension's settings in OpenClip and paste it into **EdgeOne Makers API Key**.

A newly created key can take 1–2 minutes to start working.

- **EdgeOne Makers API Key** (required): stored by OpenClip as a secret in a local file readable only by your user account. It is sent only to the EdgeOne gateway, in the request's `Authorization` header.
- **Detect each paragraph separately** (off by default): when on, the result also lists every paragraph with its own label and confidence.

## Requirements

- A Tencent Cloud account with EdgeOne Makers enabled. The built-in Zhuque model includes 500,000 free tokens per month; check usage on the Makers overview page.
- Text detection only; image detection is not available through this API.
- OpenClip 1.1.0 or later.

The selected text is sent to Tencent's EdgeOne gateway (`ai-gateway.edgeone.link`) for analysis.

Links: [API documentation](https://cloud.tencent.com/document/product/1552/137539) · [Zhuque AI detection website](https://matrix.tencent.com/ai-detect/)

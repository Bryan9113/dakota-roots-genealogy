module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'POST required' });
  const token = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
  if (!token) return res.status(503).json({ ok: false, error: 'AI Gateway authentication is unavailable on this deployment.' });
  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const messages = Array.isArray(body.messages) ? body.messages.slice(-16) : [];
  const person = body.person || {};
  const evidence = Array.isArray(body.evidence) ? body.evidence.slice(0, 40) : [];
  const system = `You are Rootline AI, an evidence-first genealogy research partner. You help people investigate ancestors with a warm, natural tone and rigorous sourcing discipline. Never convert a clue, unsourced online tree, family story, or model inference into fact. Explicitly separate Proven/Direct, Strong, Possible, Unverified, Rejected, conflicts, and next steps. Prefer primary and near-primary records. When supplied source URLs or citations exist, preserve them and explain which claims they support. Point out identity collisions and chronology problems. Do not expose unnecessary sensitive information about living people. Selected person: ${JSON.stringify(person).slice(0,12000)}. Supplied evidence: ${JSON.stringify(evidence).slice(0,18000)}.`;
  const models = ['openai/gpt-5.2', 'google/gemini-3.1-pro-preview', 'xai/grok-4.5'];
  let lastError = '';
  for (const model of models) {
    try {
      const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages: [{ role: 'system', content: system }, ...messages], temperature: 0.2 })
      });
      const data = await response.json();
      if (response.ok) {
        const text = data?.choices?.[0]?.message?.content || '';
        return res.status(200).json({ ok: true, model, text });
      }
      lastError = `${model}: HTTP ${response.status} ${JSON.stringify(data).slice(0,700)}`;
    } catch (error) {
      lastError = `${model}: ${error.message}`;
    }
  }
  return res.status(502).json({ ok: false, error: 'Rootline AI Gateway request failed.', detail: lastError });
};

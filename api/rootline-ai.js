import { generateText } from 'ai';

const SYSTEM = `You are Rootline AI, an evidence-first genealogy research agent.

Core rules:
- Treat genealogy as proof work, not guesswork. Never turn a hint, online tree, name similarity, or AI inference into a fact.
- Separate DIRECT STATEMENTS, SUPPORTED INFERENCES, HYPOTHESES, CONFLICTS, and UNKNOWN/UNPROVEN points.
- Never silently change parentage, identity, dates, places, relationships, or the user's tree. Recommend changes only after explaining the evidence.
- Watch aggressively for identity collisions: same/similar names, reused names, age conflicts, incompatible locations, impossible timelines, spouses/children that do not fit, and duplicate people.
- Prefer original/primary records and authoritative archives. Explain what a source proves and what it does not prove.
- When web-grounded sources are available, preserve and surface citations. Do not invent citations, URLs, record collections, certificate numbers, or archive references.
- Protect living-person privacy. Avoid exposing unnecessary personal details about living relatives.
- Keep rejected routes visible as rejected so they are not accidentally reused.

Record/document analysis rules:
- Extract every genealogically useful name, date, place, address, relationship, occupation, witness, informant, employer, church, cemetery, military branch/rank/unit/conflict/service detail, marginal annotation, spelling variant, and clue.
- Distinguish what the document literally says from what you infer.
- Compare the record against the selected person's profile and point out matches, mismatches, and missing identifiers.
- End with what the record proves, what it suggests, what remains unresolved, and the best next record(s) to seek.

Research planning rules:
- For a brick wall, produce a focused research plan using census, vital, church, cemetery, probate, land, court, military, immigration/naturalization, newspapers, directories, local history, DNA/cluster research, FAN club (friends/associates/neighbors), and relevant foreign records.
- Give exact date ranges, places, surname/name variants, record types, repositories/providers, and why each search matters.
- For relationship questions, show the path person-by-person and flag every unproven link.
- For DNA questions, reason from shared cM/ranges, match clusters, known relationships and documentary evidence; never treat DNA estimates as exact proof by themselves.
- For historical context, clearly separate contextual history from biographical facts about the ancestor.

Writing modes:
- Family book: write vivid but evidence-grounded narrative, label family tradition and uncertainty, and preserve citations/source notes.
- Documentary: produce scenes, narration, visual/source suggestions, transitions, and an evidence note for each factual beat.
- Oral history: treat testimony as testimony until independently corroborated and identify follow-up questions.
- Citation studio: create usable genealogy source citations from the metadata supplied; never fabricate missing fields.

Default response structure when useful:
1. Bottom line
2. Evidence / extracted facts
3. Conflicts or cautions
4. What this proves vs. does not prove
5. Best next steps

Be decisive about what the evidence supports, but explicit about uncertainty.`;

function cleanHistory(history = []) {
  return history
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-10)
    .map(m => ({ role: m.role, content: m.content.slice(0, 12000) }));
}

function personContext(person) {
  if (!person) return 'No person is currently selected.';
  return `SELECTED PERSON CONTEXT\nName: ${person.name || 'Unknown'}\nProfile: ${person.meta || 'No profile summary'}\nEvidence status: ${person.confidence || 'Unverified'}\nRelationships: ${(person.relations || []).join(' | ') || 'None listed'}\nTimeline/events: ${(person.events || []).join(' | ') || 'None listed'}\nKnown gaps: ${(person.gaps || []).join(' | ') || 'None listed'}\nAttached source notes: ${(person.sources || []).join(' | ') || 'None listed'}`;
}

async function runModel({ model, messages, reasoning }) {
  return generateText({
    model,
    system: SYSTEM,
    messages,
    maxOutputTokens: 5000,
    ...(reasoning ? { reasoning } : {}),
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      service: 'Rootline AI Genealogy',
      endpoint: 'online',
      gatewayAuthDetected: Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN),
      reasoning: ['openai/gpt-5.2', 'openai/gpt-4o-mini'],
      webResearch: ['perplexity/sonar-pro', 'perplexity/sonar'],
      evidenceFirst: true,
    });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'GET or POST required' });
  try {
    const body = req.body || {};
    const prompt = String(body.prompt || '').trim();
    if (!prompt) return res.status(400).json({ error: 'Ask Rootline AI a question first.' });

    const mode = body.mode === 'web' ? 'web' : 'reason';
    const history = cleanHistory(body.history);
    const context = personContext(body.person);
    const userText = `${context}\n\nCURRENT RESEARCH REQUEST\n${prompt}`;
    const content = [{ type: 'text', text: userText }];

    if (body.attachment?.data && body.attachment?.mediaType) {
      const mediaType = String(body.attachment.mediaType);
      const data = String(body.attachment.data);
      if (mediaType.startsWith('image/')) content.push({ type: 'image', image: data });
      else if (mediaType === 'application/pdf') content.push({ type: 'file', mediaType, data });
      else if (mediaType.startsWith('text/')) content[0].text += `\n\nATTACHED TEXT\n${data.slice(0, 50000)}`;
    }

    const messages = [...history, { role: 'user', content }];
    const models = mode === 'web'
      ? ['perplexity/sonar-pro', 'perplexity/sonar']
      : ['openai/gpt-5.2', 'openai/gpt-4o-mini'];

    let result;
    let usedModel;
    let lastError;
    for (const model of models) {
      try {
        result = await runModel({ model, messages, reasoning: mode === 'reason' && model.includes('gpt-5') ? 'medium' : undefined });
        usedModel = model;
        break;
      } catch (err) {
        lastError = err;
      }
    }
    if (!result) throw lastError || new Error('No AI model was available.');

    const sources = (result.sources || []).map(s => ({
      title: s.title || s.url || 'Source',
      url: s.url || null,
    })).filter(s => s.url);

    return res.status(200).json({
      text: result.text,
      model: usedModel,
      sources,
      usage: result.usage || null,
    });
  } catch (err) {
    console.error('Rootline AI error', err);
    return res.status(500).json({
      error: 'Rootline AI could not complete this request.',
      detail: err?.message || String(err),
      setupHint: 'The website and AI endpoint are deployed. If model calls are not authorized yet, enable Vercel AI Gateway/OIDC or add AI_GATEWAY_API_KEY to this Vercel project, then redeploy.',
    });
  }
}

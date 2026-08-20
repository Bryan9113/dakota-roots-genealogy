# Rootline Overnight Restoration Status — 20 Aug 2026

## Current production deployment
A fresh production bundle was created from the connected Vercel deployer during the latest restoration run.

Production alias:

`https://rootline-ai-genealogy-bryanolson1113-5546s-projects.vercel.app`

Latest unique direct-deploy proof URL:

`https://rootline-ai-genealogy-live-g58aide4e.vercel.app`

The deployer accepted the production bundle. The connected deployment lookup/fetch endpoint is currently inconsistent and returns not-found/unable-to-share for deployments it has just created, so independent browser verification is still required before calling this alias fully verified.

## Canonical design direction
The approved Rootline AI Genealogy mockup is the visual target:
- black / deep-charcoal premium shell
- gold Rootline AI Genealogy branding
- sophisticated purple AI glow
- warm cream evidence/dashboard cards
- hero: **Your Family. Our Mission. AI-Powered.**
- AI is the primary product identity, not a buried assistant
- desktop navigation: Home, Tree, Discover, AI Research, Records, DNA, Military, More
- iPhone-first responsive behavior without losing the desktop visual identity

## Data foundation
The source archive contains the validated Bryan Olson master GEDCOM:
- **2,284 individuals**
- **1,161 families**
- GEDCOM 5.5.1
- UTF-8

The production loader uses the compressed master GEDCOM in `rootline-app/payload/master-tree.ged.gz.b64` and the preserved V5 application payload in `rootline-app/payload/v5/00.txt` through `07.txt`.

The loader parses the full GEDCOM person/family graph in the browser, builds parent/spouse/child links, then overlays curated V5 research evidence onto matching master profiles rather than replacing the master tree with demo people.

## Preserved / integrated Rootline V5 capabilities
- Owner authentication UI and private-family access concepts
- Family tree, person profiles and relationship links
- Search / Discover with person context
- Records/evidence library
- Rootline AI conversation workspace
- Evidence audit and evidence matrix
- Identity-collision research
- DNA workspace
- Military service workspace
- Family health history
- Migration / timeline research
- Famous-connections research with rejected-route preservation
- Relationship finder
- Explainable hints
- Cluster/FAN research
- Historical context research
- Research watchlist
- Citations
- Oral-history recording/transcription workflow
- Documentary mode
- Collaboration/privacy workflow
- GEDCOM and backup/export tools

## Real model-backed AI backend work
Two server endpoints are now committed at the repository root:

- `api/rootline-health.js`
- `api/rootline-chat.js`

`rootline-chat` is an evidence-first genealogy reasoning endpoint. It sends selected-person context and supplied evidence to Vercel AI Gateway, instructs the model to separate Proven/Direct, Strong, Possible, Unverified and Rejected conclusions, surface conflicts and identity collisions, preserve citations, prefer original records and protect living-person privacy.

Authentication is designed to use `AI_GATEWAY_API_KEY` when explicitly configured or Vercel's `VERCEL_OIDC_TOKEN` automatically when available. This avoids hard-coding a provider secret in the client.

After the backend commit, all three Git-connected Vercel status checks returned **success**, confirming the new functions build successfully in the connected Vercel projects. Runtime confirmation that the deployed project actually receives a usable OIDC token is still required before the model-backed endpoint is described as live.

## Latest local masterpiece build
A full local V5-derived build was generated with the master GEDCOM embedded as 2,284 people / 1,161 families and with the approved 2030 visual information architecture. JavaScript syntax validation passed for every script block. The artifact is approximately 1.0 MB uncompressed and compresses to about 123 KB; it is preserved as a recovery/build source while the smaller hosted loader remains the deployment-efficient version.

## Important truth boundary
Do **not** claim autonomous deep-web research is live merely because a model endpoint exists. A true deep-web workflow also needs a real search/archive retrieval layer, permitted source access, PDF/image/document retrieval, and citation-preserving ingestion. Paywalled or account-restricted genealogy services require authorized access rather than scraping around their controls.

The immediate goal is therefore:
1. verify the model-backed endpoint at runtime;
2. connect the approved Rootline AI interface to it;
3. add real search/retrieval providers and research logging behind the same evidence model;
4. keep every proposed tree change reviewable by the owner.

## Final verification checklist
1. Verify production URL is externally reachable.
2. Verify the V5 payload starts without JavaScript/runtime errors.
3. Verify the master GEDCOM decodes to exactly 2,284 people and family relationships are navigable.
4. Verify owner login flow.
5. Verify Home / Tree / Discover / AI Research / Records navigation.
6. Verify DNA, Military, Health, Migration, Famous, Evidence Matrix and Oral History tools open.
7. Verify iPhone viewport layout and safe-area behavior.
8. Verify GEDCOM/backup export flows.
9. Verify `api/rootline-health` runtime AI Gateway authentication.
10. Verify a real `api/rootline-chat` model response before describing Rootline AI as live.
11. Keep external web/archive searching labeled as architecture/next layer until a genuine retrieval path is verified.

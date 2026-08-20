# Rootline Overnight Restoration Status — 20 Aug 2026

## Current production deployment
A fresh production bundle was created from the connected Vercel deployer during the latest restoration run.

Production alias:

`https://rootline-ai-genealogy-bryanolson1113-5546s-projects.vercel.app`

Unique deployment URL:

`https://rootline-ai-genealogy-fjop0ppop-bryanolson1113-5546s-projects.vercel.app`

Deployment creation returned `READY`. The deployment API's later lookup endpoint is not resolving this deployment from the connected team, so independent browser verification is still required before calling the URL fully verified.

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

## Latest local masterpiece build
A full local V5-derived build was also generated with the master GEDCOM embedded as 2,284 people / 1,161 families and with the approved 2030 visual information architecture. JavaScript syntax validation passed for all script blocks. This artifact is being preserved separately as a recovery/build source even though the smaller hosted loader is preferred for deployment efficiency.

## Important truth boundary
The static proof build must **not** claim that autonomous deep-web AI research, live OCR/vision extraction, server-grade multi-device authentication, or private cloud collaboration are already production-live. Those require a secure backend plus AI/search/provider credentials and storage/auth infrastructure.

The current V5 AI UI is web-search-aware and contains evidence-first prompts/workflows, but a genuine autonomous research backend remains the main production-service blocker.

## Final verification checklist
1. Verify production URL is externally reachable.
2. Verify the V5 payload starts without JavaScript/runtime errors.
3. Verify the master GEDCOM decodes to exactly 2,284 people and family relationships are navigable.
4. Verify owner login flow.
5. Verify Home / Tree / Discover / AI Research / Records navigation.
6. Verify DNA, Military, Health, Migration, Famous, Evidence Matrix and Oral History tools open.
7. Verify iPhone viewport layout and safe-area behavior.
8. Verify GEDCOM/backup export flows.
9. Verify at least one real backend AI/web research path before describing autonomous AI research as live.

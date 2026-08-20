# Rootline AI Genealogy — 2030 Product Specification

## Canonical visual direction
Rootline is an AI-first genealogy research operating system, not a generic family-tree website. The approved visual target is the generated Rootline mockup selected on 20 Aug 2026.

- Deep black / charcoal premium shell
- Elegant gold Rootline AI Genealogy tree branding
- Sophisticated purple AI glow accents
- Warm cream evidence / document / research cards
- Cinematic heritage imagery and natural human tone
- Desktop navigation: Home, Tree, Discover, AI Research, Records, DNA, Military, More
- Hero: “Your Family. Our Mission. AI-Powered.”
- Primary CTA: Deep Research an Ancestor
- Visible Rootline AI assistant, not buried in settings
- Interactive tree + selected-person research context
- Feature areas: AI Deep Research, Military Records, DNA Connections, Document Analyzer, Migration Maps, Health History, Famous Connections, Oral History
- AI Document Analyzer with source image/document + extracted evidence
- Deep Research Results with Evidence / Conflicts / Next Steps
- Evidence confidence and provenance always visible
- Premium iPhone experience preserving the same identity, hierarchy, gold/purple accents and AI-first feel

## Master family data
Canonical master GEDCOM: `Bryan_Olson_MASTER_ALL_USABLE_FAMILY_2026.ged`.

Validated project totals:
- 2,284 individuals
- 1,161 families
- GEDCOM 5.5.1
- UTF-8
- No unresolved individual/family references in the validated master export

The tree combines the reconstructed 1952 Cooprider/Cooperrider/Cooperider genealogy with modern/direct research additions. This is a research tree: compiled/OCR-derived relationships must not be silently promoted to proven facts.

## Evidence-first AI behavior
Rootline AI must:

1. Search around a selected person, not return generic genealogy advice.
2. Preserve every source URL/archive, access date, record type, extracted claim and linked person.
3. Distinguish primary / near-primary / secondary / compiled evidence.
4. Surface contradictions instead of hiding them.
5. Preserve rejected hypotheses and duplicate/same-name collision decisions.
6. Never automatically promote an external web claim into the family tree without owner review.
7. Explain why a hint matters and what record would strengthen or disprove it.
8. Keep living-person details private by default.

Evidence states: Proven/Direct, Strong, Possible, Unverified, Rejected.

## Research OS modules
- Rootline AI / Deep Research This Person
- Evidence Matrix
- Explainable Hints
- Military Service
- DNA Workspace and clustering
- Family Health History
- Migration Map
- Famous Connections (including rejected routes)
- Identity Collisions / duplicate detection
- Cluster research (siblings, witnesses, neighbors, associates)
- Timeline and evidence-gap detection
- Source/citation studio
- Research tasks and research log
- Document analyzer
- Oral-history capture + transcript claims
- Documentary mode / family story production
- Family-book generation
- Collaboration / owner approval
- GEDCOM import/export and backups
- Living-person privacy controls

## External research architecture
A complete production implementation should support person-centered server-side research that can:

- search public web and archival sources;
- follow source links;
- inspect PDFs/images/documents where access permits;
- extract names, dates, places, occupations, relationships and record metadata;
- compare evidence across records;
- produce cited proposed conclusions and alternative hypotheses;
- maintain a research log with exactly what was searched;
- return owner-reviewable proposed tree edits.

Relevant record classes include census, vital, church, cemetery, obituary, newspapers, military/service/pension, immigration/naturalization, probate, land/deeds, city directories, yearbooks, historical maps, family books and uploaded family documents.

A static client must never pretend to have completed autonomous research. Live crawling/model analysis requires a secure server-side AI/search backend and authorized provider/API access where applicable.

## Separation from Dakota Roots
Rootline is a separate product/project. Do not overwrite or merge it into the Dakota Roots Genealogy business website.

## Current production target
Rootline production alias created during the 20 Aug 2026 restoration:
`https://rootline-ai-genealogy-bryanolson1113-5546s-projects.vercel.app`

This URL must be independently browser-verified before being presented as fully production-ready.

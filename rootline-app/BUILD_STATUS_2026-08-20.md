# Rootline Overnight Restoration Status — 20 Aug 2026

## Deployment created
Production alias created through the connected Vercel deployment API:

`https://rootline-ai-genealogy-bryanolson1113-5546s-projects.vercel.app`

Unique production deployment URL returned by the deployment API:

`https://rootline-ai-genealogy-80b7bbqrl-bryanolson1113-5546s-projects.vercel.app`

The deployment API reported the production build as READY when created. Independent browser/API verification is still required before this URL should be described as fully production-ready.

## Data foundation
The current build uses the validated Bryan Olson master GEDCOM as its data source target:
- 2,284 individuals
- 1,161 families
- GEDCOM 5.5.1
- UTF-8

The master tree was compressed for client loading so a single-file static proof build can load the full person/relationship graph rather than demo people.

## Current production proof-build features
- Approved black/gold/purple/cream Rootline AI visual direction
- Hero: “Your Family. Our Mission. AI-Powered.”
- Desktop navigation + iPhone bottom navigation
- Searchable master-tree interface
- Selected-person context and relationships
- Person-centered research planner
- Discover links prefilled for selected ancestor to public web, FamilySearch, Find a Grave, NARA, Library of Congress and Google Books
- Military, DNA, Migration, Health, Famous Connections, Oral History, Document Analyzer and Research OS entry points
- Evidence-state model and provenance-oriented Records screen
- First-run owner-password gate stored locally in the browser
- Clear disclosure where secure server-side functionality is still required

## Never fake these functions
The static proof build does **not** claim that autonomous AI web research, OCR/vision extraction, server-grade multi-device authentication, or private cloud collaboration are live. Those require a secure backend plus appropriate AI/search/provider credentials and storage/auth infrastructure.

## Highest-priority verification items
1. Confirm the deployed page is externally reachable and its JavaScript loads without errors.
2. Confirm the embedded master tree decodes to exactly 2,284 people on Safari/iPhone.
3. Confirm owner first-run password flow.
4. Confirm Tree search, selected-person relationships, Discover, and AI Research navigation.
5. Verify responsive layout against the approved visual mockup.
6. Continue restoring richer V5 local modules rather than leaving them as visual entry points.
7. Add a secure server backend for genuine autonomous AI/web research and production-grade accounts.

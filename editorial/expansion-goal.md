# Textbook expansion acceptance record

Created September 6, 2026. Completed September 7, 2026. Status: implemented and accepted within the scope and review limitations below.

## Scope

- Close the audited Proposition 13/8, foreclosure-clock, tenancy-notice, TDS/fair-housing exemption, and business-sale gaps with current primary sources and worked application.
- Audit every existing chapter for further vague, missing, or repeated teaching. Replace repetition with a clear rule, conditions, exception, and changed-fact example.
- Review and improve every item in the 426-question baseline practice bank. Add concept labels, precise section links, source verification, and revision-safe sessions. Distractors must represent plausible misunderstandings rather than unrelated terms or stylistic giveaways.
- Author two independent held-out 150-question forms with correct DRE domain allocation and reviewed rationales. Do not fill them with practice questions or superficial rewrites. Keep them out of ordinary practice and search.
- Increase 75 distinct teaching visuals to at least 375. Count each instructional artifact once, regardless of responsive/theme versions. Include document specimens, legal calendars, parcels, financial reasoning, and changed-fact comparisons, distributed across all 33 chapters.
- Maintain rule-to-source-to-example-to-question evidence, and a separate AI reviewer pass. Qualified human subject-matter review has not been obtained and must not be implied.
- Preserve continuous reading, fixed left navigation, responsive right navigation, hidden scrollbars, single divider ownership, and no progress/bookmark/history logic. Keep the site public-safe and local.

## Completion Gates

1. `pnpm check:content`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass.
2. `pnpm audit:textbook -- --release` has no mechanical release blockers. A low longest-answer score is only a warning metric, not a substitute for item review.
3. `CONTENT_RELEASE_CHECK=1 pnpm exec playwright test` passes, including the actual held-out exam timer, resume, expiry, and grading workflows. During authorship, empty forms are unavailable and their timed browser tests explicitly preconditioned; this is not completion.
4. Every registered visual renders at its chapter anchor, in desktop/mobile/light/dark/print layouts, with readable labels, no unintended overflow, text alternatives, and valid arithmetic. Review screenshots, not just element counts.
5. Every audit finding links to implemented teaching, examples, questions, current primary sources, and a separately documented review outcome. No unresolved material issue may be hidden behind an inventory count.

## Implemented Edition

- 33 chapters and 33 guides, with rule/condition/exception/example teaching and no minimum word-count quota.
- Proposition 13/8, base-year values, reassessment, tax levies, and prorations: `transfer-taxes-and-prorations`.
- Foreclosure triggering events, notice periods, date calculations, and qualifications: `financing-notes-security`.
- Tenancy notices, day counting, rent limits, deposit accounting, and current refund rules: `practice-property-management`.
- TDS decision tests and actual-knowledge duties: `practice-disclosures-inspections`; federal and California fair-housing exemption tests: `practice-fair-housing`.
- Business opportunities, creditor notices, bulk sales, tax clearance, and transaction sequencing: `practice-commercial-specialties`.
- All 426 baseline practice items reviewed and revised, with 117 targeted additions: 543 current practice items. Every choice has an explanation; distractors identify misconceptions; items have durable IDs, revisions, specific source links, and separate exact-content review records.
- Two independently authored, reviewed 150-question forms, not reused by ordinary practice or search. Each has 23 ownership, 26 agency, 21 valuation, 13 financing, 12 transfer, 37 practice, and 18 contracts questions. All 300 prompts are distinct from one another and the practice bank; reviewers also checked substantive overlap.
- 375 distinct instructional visuals: 75 baseline plus 300 additions. All 33 chapters receive additions. Formats include original fictional document excerpts, legal calendars, reconciled ledgers, parcel maps, numeric charts, decision paths, and changed-fact comparisons. Responsive/theme variants are not additional artifacts.
- 396 rule-to-source-to-example-to-question records and 32 independent AI review records. All 65 mapped DRE outline topics have linked evidence; no unresolved review finding, stale fingerprint, unlinked practice item, or missing current artifact review remains in the release audit.
- Continuous reading, fixed left navigation, responsive right navigation, hidden native scrollbars, and single-divider ownership retained. No bookmarks, reading progress, study profiles, or historical results. Only the current assessment session and theme persist locally.

## Review Limits

The source-based author and independent reviewer passes are AI work, not qualified human legal or instructional review. The DRE outline is not exhaustive. These bounded checks do not establish coverage of every possible exam question, psychometric validity, or any score guarantee. Current legal sources and stated assumptions control over simplified examples; educational specimens are not execution-ready documents. Static public exam assets are inspectable even though ordinary teaching and search do not expose the held-out bank.

Automatic review fingerprints cover rule records, question objects, and the 300 added figure specifications. Chapter prose snapshots are recorded in reviewer scope, not automatically enforced; future prose edits require a renewed source review. The nine legacy renderer branches are checked by browser tests, not by editorial fingerprints. Unique payloads and objectives do not mechanically prove semantic originality.

## Acceptance Results

- `pnpm audit:textbook -- --release`: passed September 7, 2026 with no mechanical release blockers.
- `pnpm check:content`: passed for 33 chapters, 543 practice questions, both held-out forms, 366 typed figures, 33 guides, and 33 historic audit findings. Nine legacy visuals are checked separately by browser tests.
- `pnpm typecheck`: passed.
- `pnpm test`: 73 passed; none skipped.
- `pnpm build`: passed; 44 static pages generated and 1,105 searchable sections indexed. Held-out items remain excluded from ordinary search and practice.
- `CONTENT_RELEASE_CHECK=1 PLAYWRIGHT_BASE_URL=http://localhost:3001 pnpm exec playwright test --workers=3`: 86 passed; none skipped. Includes both form lifecycles, timer expiry, answer shuffling, revision invalidation, search, chapter quizzes, keyboard focus, both navigation sidebars, hidden scrollbars, and divider geometry.
- All 33 chapters and their registered figures checked in desktop light/dark, 320px mobile light/dark, and print media. The edition layout pass produced 165 figure screenshots; additional family-specific tests verify diagrams, charts, parcels, document fields, and calculations. Representative screenshots across all seven domains and full-page navigation were visually inspected.
- Actual A4 PDFs for trust funds and legal descriptions rendered and visually inspected. Fixed an orphaned guide heading, then regenerated the PDFs and checked the affected pages. These are sampled pagination checks, not an inspection of every printed page in the textbook.
- Fixed mobile question-navigation focus and long concept-selector overflow; regression tests verify stable control height, readable labels, and keyboard operation.
- Focused public-safety scan found no embedded secrets or personal contact records. No accounts or backend storage were added. Existing user changes, including the public preview image, were preserved.
- Local application remains at `http://localhost:3000`. Temporary production QA server used port 3001. No commit, push, or deployment performed for this goal.

Use `pnpm audit:textbook` for current counts and `pnpm audit:textbook -- --inventory` for the artifact inventory. Rerun acceptance checks and renew the affected source reviews after future content or application changes.

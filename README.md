# California Real Estate

An original, exam-focused California real estate salesperson textbook and study website. Built with Next.js, shadcn/ui, Radix, and MDX, adapting the Rubix Documents reading layout.

## Run locally

Requires Node.js 24 and pnpm 11 (the version is pinned in package.json).

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. For a different port, run `pnpm dev --port 3001`.

To inspect the production static build:

```sh
pnpm build
pnpm start
```

The production server uses port 3000, so stop the development server first. The build emits `out/` and needs no application API keys or server database.

## Content and study tools

- 33 chapters across all seven DRE examination domains.
- 543 original practice questions with explanations for every answer choice and targeted concept filters.
- Continuous chapter reading, with visible subsections and a concise takeaway for every H2 section.
- 33 chapter guides with core distinctions, pitfalls, related concepts, and original contrast, decision, sequence, or calculation labs.
- Chapter quizzes and topic practice.
- Two distinct held-out 150-question, three-hour mock forms with DRE-weighted allocation, shuffled answer order, flags, navigation, revision-safe saved answers, expiry enforcement, and domain-level results.
- Flashcards generated from the textbook glossary, with topic filters, shuffle, and answer reveal.
- Browser-local current practice sessions, with no reading or flashcard tracking.
- 375 original teaching visuals: 75 baseline plus 300 additions across all chapters. Includes annotated fictional documents, calendars, parcels, numeric charts, financial ledgers, decision paths, and changed-fact comparisons.
- Section-level search across chapters, figures, and guides, with direct links to the matching passage.
- Responsive and print layouts.
- All 65 published DRE subtopics mapped in `contents/coverage.json`.
- Seven domain audits documenting 33 specific gaps and the teaching or source updates used to address them.
- 396 rule-to-source-to-example-to-question records and 32 separate AI source-review records with exact artifact fingerprints.

This is independent exam preparation, not a DRE-approved licensing course. The text and questions were authored with AI assistance and checked against cited primary sources. They are not actual DRE exam questions. Source reviews are dated September 6-7, 2026; later legal changes require editorial updates. Qualified human subject-matter review has not been obtained. Coverage and practice scores do not guarantee readiness or an exam result. See [the acceptance record](editorial/expansion-goal.md) for scope and limitations.

## Verification

```sh
pnpm check:content
pnpm typecheck
pnpm test
pnpm build
pnpm audit:textbook -- --release
pnpm exec playwright install chromium
CONTENT_RELEASE_CHECK=1 pnpm test:browser
```

Browser tests use an existing server at port 3000, or start the production server after a build. Set `PLAYWRIGHT_BASE_URL` to test another local URL. They use isolated browser contexts and do not change a reader's saved study data.

Content validation checks metadata, source-link structure, coverage, question uniqueness and references, and sufficient question pools. It verifies figure anchors and numeric reconciliation, every guide's H2 coverage and related links, audit references, and calculation expressions against their declared results. The release audit additionally checks linked review evidence, current fingerprints, conflicting reviews, held-out forms, and the fivefold visual expansion. Structural validation does not prove factual accuracy; primary-source review remains an editorial task.

Unit and browser tests exercise study calculations, exam behavior, search and anchors, reading layouts, figures, persistence, and accessibility-related interactions. Run the commands above against the current edition rather than treating an earlier test result as a guarantee.

## Structure

- `contents/textbook/<domain>/*.mdx`: original lessons and source metadata.
- `contents/questions/<domain>.json`: original question banks.
- `contents/exams/exam-{a,b}.json`: separate held-out assessment forms, excluded from ordinary practice and search.
- `contents/guides/<domain>.json`: one structured reading guide and case lab per chapter.
- `contents/audits/<domain>.json`: targeted coverage findings, completed actions, sources, and limitations.
- `contents/coverage.json`: published DRE topic-to-chapter mapping.
- `editorial/rules/` and `editorial/reviews/`: source-linked teaching evidence and separate review records.
- `lib/curriculum.ts`: shared lesson, domain, and question contracts.
- `lib/learning-figures/`: typed, domain-organized teaching figures and validation.
- `lib/study-guides/`: guide and audit contracts, validation, and search integration.
- `components/book/`: reading layout, search, and custom diagrams.
- `components/study/`: quizzes, exams, and flashcards.
- `scripts/`: content validation and automatic search-index generation.

Read [AUTHORING.md](AUTHORING.md) before editing educational content. Legal revisions should update the relevant text, questions, glossary, sources, and review date together. Search is rebuilt at development startup and with each production build; run `pnpm build:search` after content edits during an existing development session.

## Privacy and hosting

There are no application credentials, analytics integrations, accounts, or personal-data fields. The current practice session uses the `ca-re:study:v1` browser storage key and never goes to an application backend. Earlier records are migrated without completion, bookmark, known-term, or history fields. Hosting services may process ordinary request data.

The project can be hosted as a static Next.js export. The current working run is local. No production deployment is required to use the textbook. Held-out exam assets are public and inspectable; separation from normal learning workflows is not a secrecy guarantee.

## Attribution

The original [Rubix Documents](https://github.com/rubixvi/rubix-documents) MIT license is preserved in [LICENSE](LICENSE). UI primitives originate from shadcn/ui and Radix. See [visual asset notes](public/images/README.md) for the original illustration's generation record. Chapter-level citations appear on the website and in each MDX file.

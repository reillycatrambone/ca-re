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

- 33 chapters across all seven DRE examination domains, approximately 67,000 chapter-body words.
- 426 original questions with explanations for every answer choice.
- Focused and full-chapter reading modes, with a concise takeaway for every H2 section.
- 33 chapter guides with core distinctions, pitfalls, related concepts, and original contrast, decision, sequence, or calculation labs.
- Chapter quizzes and topic practice.
- A 150-question, three-hour mock exam with approximate DRE domain weighting, flags, navigation, saved answers, expiry enforcement, and domain-level results.
- Flashcards generated from the textbook glossary, with known/to-review states.
- Browser-local bookmarks, completed chapters, study history, and current sessions.
- 42 teaching visuals: 33 in-text figures plus nine earlier chapter visuals, including an interactive capitalization-rate example.
- Section-level search across chapters, figures, and guides; matching anchors remain accessible when focused reading has collapsed a section.
- Responsive and print layouts.
- All 65 published DRE subtopics mapped in `contents/coverage.json`.
- Seven domain audits documenting 33 specific gaps and the teaching or source updates used to address them.

This is independent exam preparation, not a DRE-approved licensing course. The text and questions were authored with AI assistance and checked against cited primary sources. They are not actual DRE exam questions. The source review is dated September 6, 2026; later legal changes require editorial updates. Coverage and practice scores do not guarantee readiness or an exam result.

## Verification

```sh
pnpm check:content
pnpm typecheck
pnpm test
pnpm build
pnpm exec playwright install chromium
pnpm test:browser
```

Browser tests use an existing server at port 3000, or start the production server after a build. Set `PLAYWRIGHT_BASE_URL` to test another local URL. They use isolated browser contexts and do not change a reader's saved study data.

Content validation checks metadata, source-link structure, chapter depth and coverage, question uniqueness and references, and sufficient question pools. It verifies figure anchors and numeric reconciliation, every guide's H2 coverage and related links, audit references, and calculation expressions against their declared results. Structural validation does not prove factual accuracy; primary-source review remains an editorial task.

Unit and browser tests exercise study calculations, exam behavior, search and anchors, reading layouts, figures, persistence, and accessibility-related interactions. Run the commands above against the current edition rather than treating an earlier test result as a guarantee.

## Structure

- `contents/textbook/<domain>/*.mdx`: original lessons and source metadata.
- `contents/questions/<domain>.json`: original question banks.
- `contents/guides/<domain>.json`: one structured reading guide and case lab per chapter.
- `contents/audits/<domain>.json`: targeted coverage findings, completed actions, sources, and limitations.
- `contents/coverage.json`: published DRE topic-to-chapter mapping.
- `lib/curriculum.ts`: shared lesson, domain, and question contracts.
- `lib/learning-figures/`: typed, domain-organized teaching figures and validation.
- `lib/study-guides/`: guide and audit contracts, validation, and search integration.
- `components/book/`: reading layout, search, and custom diagrams.
- `components/study/`: quizzes, exams, flashcards, and progress.
- `scripts/`: content validation and automatic search-index generation.

Read [AUTHORING.md](AUTHORING.md) before editing educational content. Legal revisions should update the relevant text, questions, glossary, sources, and review date together. Search is rebuilt at development startup and with each production build; run `pnpm build:search` after content edits during an existing development session.

## Privacy and hosting

There are no application credentials, analytics integrations, accounts, or personal-data fields. Study data uses the `ca-re:study:v1` browser storage key and never goes to an application backend. Hosting services may process ordinary request data. The Progress page provides a reset control.

The project can be hosted as a static Next.js export. Optional Sites project metadata is retained in `.openai/hosting.json`; it contains no credentials. The current working run is local. No production deployment is required to use the textbook.

## Attribution

The original [Rubix Documents](https://github.com/rubixvi/rubix-documents) MIT license is preserved in [LICENSE](LICENSE). UI primitives originate from shadcn/ui and Radix. See [visual asset notes](public/images/README.md) for the original illustration's generation record. Chapter-level citations appear on the website and in each MDX file.

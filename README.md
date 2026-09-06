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

- 33 expanded chapters across all seven DRE examination domains, approximately 66,000 chapter-body words.
- 360 original questions with explanations for every answer choice.
- Chapter quizzes and topic practice.
- A 150-question, three-hour mock exam with approximate DRE domain weighting, flags, navigation, saved answers, expiry enforcement, and domain-level results.
- Flashcards generated from the textbook glossary, with known/to-review states.
- Browser-local bookmarks, completed chapters, study history, and current sessions.
- 33 original in-text teaching figures, in addition to the nine existing chapter visuals, including an interactive capitalization-rate example.
- Section-level full-text search that also indexes figure labels and captions, plus responsive and print layouts.
- All 65 published DRE subtopics mapped in `contents/coverage.json`.

This is independent exam preparation, not a DRE-approved licensing course. The text and questions were authored with AI assistance and checked against cited primary sources. They are not actual DRE exam questions. The initial source review is dated September 6, 2026; later legal changes require editorial updates.

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

The content validator checks metadata, source links' structure, chapter coverage and minimum depth, question uniqueness and references, and sufficient question pools. It also checks every figure's chapter and section anchor, unique ID, and numeric reconciliation. It does not prove factual accuracy; source review remains an editorial task. Unit tests cover exam allocation, grading, mathematical calculations, search, heading IDs, and MDX figure placement. Browser tests cover all 33 figure routes, responsive layouts, rendered assets, keyboard-driven examples, print and dark-mode behavior, persistence, deadlines, and reset controls.

## Structure

- `contents/textbook/<domain>/*.mdx`: original lessons and source metadata.
- `contents/questions/<domain>.json`: original question banks.
- `contents/coverage.json`: published DRE topic-to-chapter mapping.
- `lib/curriculum.ts`: shared lesson, domain, and question contracts.
- `lib/learning-figures/`: typed, domain-organized teaching figures and validation.
- `components/book/`: reading layout, search, and custom diagrams.
- `components/study/`: quizzes, exams, flashcards, and progress.
- `scripts/`: content validation and automatic search-index generation.

Read [AUTHORING.md](AUTHORING.md) before editing educational content. Legal revisions should update the relevant text, questions, glossary, sources, and review date together. Search is rebuilt at development startup and with each production build; run `pnpm build:search` after content edits during an existing development session.

## Privacy and hosting

There are no application credentials, analytics integrations, accounts, or personal-data fields. Study data uses the `ca-re:study:v1` browser storage key and never goes to an application backend. Hosting services may process ordinary request data. The Progress page provides a reset control.

The project can be hosted as a static Next.js export. Optional Sites project metadata is retained in `.openai/hosting.json`; it contains no credentials. The current working run is local. No production deployment is required to use the textbook.

## Attribution

The original [Rubix Documents](https://github.com/rubixvi/rubix-documents) MIT license is preserved in [LICENSE](LICENSE). UI primitives originate from shadcn/ui and Radix. See [visual asset notes](public/images/README.md) for the original illustration's generation record. Chapter-level citations appear on the website and in each MDX file.

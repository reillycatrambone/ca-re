# Editorial contract

This is an original, public California real estate salesperson exam textbook. No personal data, secrets, copied commercial preparation content, or recalled exam questions.

Lessons live at `contents/textbook/<domain>/<slug>.mdx`. YAML frontmatter follows `LessonMeta` in `lib/curriculum.ts`. The `slug` is globally unique and includes the domain prefix, for example `ownership-property-rights`. `domain` must match one of the seven IDs. `order` is the unit-local reading order starting at 1. Use quoted ISO `reviewed` dates. `sources` is a list of `{label,url}`; `glossary` is a list of `{term,definition}`. Write normal Markdown with h2/h3 sections, original worked examples, comparisons, and exam distinctions. No h1, imports, JSX, images, or custom components are needed; the application supplies visuals and quizzes. Avoid unescaped angle brackets or braces because content compiles as MDX.

The expansion baseline was 33 chapters, 426 practice questions, 33 guides, and 75 distinct teaching visuals. The September 7 edition contains 543 practice questions, two separate 150-question held-out examinations, and 375 distinct visuals across those 33 chapters. See `editorial/expansion-goal.md` for acceptance checks and review limitations. There is no chapter word-count quota. Judge depth by the rules, conditions, exceptions, examples, and misconceptions actually taught. Prefer compact paragraphs under 90 words, comparisons, and worked reasoning; remove repetition instead of padding definitions.

Cover the assigned DRE subtopics and distinguish California from federal rules. Verify mutable law against official primary sources, including exceptions and effective dates. Each chapter needs at least two relevant authoritative sources, learning objectives, 5-10 substantive glossary entries, a worked scenario, and an exam review. Use fictional people and explicit illustrative assumptions. No claims of DRE approval, guaranteed mastery, or a guaranteed exam result.

## Questions and durable IDs

Practice banks at `contents/questions/<domain>.json` and held-out banks at `contents/exams/exam-a.json` and `exam-b.json` are arrays matching `Question` in `lib/curriculum.ts`. Each question has four distinct options with individual rationales, one zero-based canonical `answer`, a valid chapter reference, and a unique ID. New and revised items require `revision`, `pool`, `conceptIds`, specific primary `sources`, and `review` metadata. Use `review.status: pending` until the sources and all alternatives have actually been checked. `source-checked` records require a review date and `method: ai-primary-source`; this is not qualified human review. Legacy items are normalized as pending, not silently certified. An optional `sectionId` links to the precise taught rule.

Use plausible neighboring concepts and one defensible best answer. Do not make the correct choice conspicuously longer or more qualified. State shared assumptions in the stem. Held-out forms must be independently authored and source checked, each with 150 questions and the required domain allocation. They must not appear in chapter quizzes, topic practice, or search. A static public website cannot promise secrecy against someone inspecting its assets; held-out means separated from normal teaching workflows.

Preserve chapter slugs, existing heading anchors, figure IDs, and question IDs for the same assessed concept. Increment a question's `revision` whenever its stem, options, answer, or interpretation changes. Use a new ID for a different concept. Saved sessions must reject changed revisions rather than reinterpret recorded answers. Display-order randomization must retain the canonical answer indexes and persist each session's permutation.

## Reading guides

`contents/guides/<domain>.json` contains a `StudyGuide[]`, one entry per chapter, following `lib/study-guides/types.ts`. Each guide requires:

- Exactly three short `overview` points with `label` and `detail`.
- One `sections` entry for every existing H2, using its exact `getHeadings` ID and an original 15-35-word takeaway. Do not invent a second slugging algorithm.
- One substantial `lab` with a title, setup, takeaway, and a discriminated kind: `contrast`, `decision`, `sequence`, or `calculation`. Vary formats by topic and expose the fact that changes the answer.
- Exactly three `pitfalls`, each with a trap, correction, and reason.
- Exactly two distinct, real related chapter links with reasons for the connection.

Keep each lab field digestible, normally under 90 words. Contrast cases explain changed facts and reasoning; decision labs have exactly one best choice; sequences identify actions, evidence, and warnings. Calculation steps provide a label, machine-evaluable expression, numeric value, result format, and explanation. Use numeric literals without thousands separators and `+ - * / ^`, parentheses, or `round`, `min`, and `max`. For example, `min(300000, 50000)` returns `50000`; a percentage result uses percentage units, such as `0.8 * 0.75 * 100` returning `60`.

Guide claims must be supported by the chapter's source metadata. The application supplies continuous chapter reading, H2 takeaways, and interactive lab presentation. There is no focused mode or reading-progress tracking. Search indexes guide text and must open the matching anchor. Preserve section anchors and keep each expansion under the heading it actually develops.

## Coverage audits

`contents/audits/<domain>.json` contains one `CoverageAudit` object with its domain, ISO review date, concrete findings, and limitations. Each finding records `topic`, `gap`, completed `action`, affected `lessonSlugs`, and primary `sourceUrls`. Record 3-6 specific gaps per review rather than blanket claims that every topic is complete. The current seven audits document 33 findings.

Close gaps with meaningful guide teaching and only necessary chapter clarifications; add relevant sources to the chapter metadata. A mapped outline is not proof that every possible exam question is covered. State what the audit does not establish and review changing law independently of structural validation.

Primary curriculum: https://www.dre.ca.gov/Examinees/SalesExamContent.html
Exam format: https://www.dre.ca.gov/Examinees/TakingExam.html
Current law baseline: https://www.dre.ca.gov/Publications/RealEstateLaw.html
The DRE outline is not exhaustive and the annual law book is not a substitute for checking subsequent changes.

## Teaching visuals

Original in-text figures live in `lib/learning-figures/`. Each figure has a stable ID, chapter slug, existing H2 or H3 `afterSection` anchor, title, and explanatory caption. New figures also require a distinct learning `objective` and precise `sourceUrls`. Keep a figure close to the concept it teaches; the MDX pipeline inserts it at the end of that section or subsection. Do not rename an anchored heading without updating its figure. The build validates every reference and verifies numeric allocations and calculation totals.

Count distinct teaching artifacts, not alternate themes, responsive renderings, or repeated data in a different skin. Annotated specimens must be original fictional educational excerpts, visibly marked as not for execution. Do not reproduce proprietary forms or imply that an excerpt is a complete legally sufficient instrument. Their fields and annotations should teach how to read evidence, compare clauses, or trace funds. A diagram should answer a concrete learning question, not merely decorate prose.

Use process diagrams for sequences, branching diagrams for distinct cases, comparisons for confused concepts, and reconciled calculations for math. Keep teaching labels in HTML rather than raster images. Support narrow screens, keyboard access, dark mode, printing, and search. Figure claims require chapter citations and explicit assumptions.

Use `parcel` for source-grounded spatial distinctions, with keyed regions, a stated scale or schematic qualifier, and a complete text legend. All geometry and marker locations must fit the declared extent. Use `chart` only for meaningful numeric relationships: explicit axis labels and formats, 1-4 distinctly labeled series, and 2-8 finite points per series with strictly increasing x coordinates. Percent coordinates use percentage points (`6` means 6%). State the assumptions behind connecting sampled points. Graphs display their actual axis ranges, preserve a keyboard-accessible exact-value table, and print the data. Verify the plotted relationships separately from rendering checks.

Run `pnpm check:content`, `pnpm typecheck`, and the relevant tests after edits. Validation checks guide/audit schemas, complete H2 mappings, references, and allowed calculation expressions against numeric results. Rebuild search with `pnpm build:search`; compile the production build for MDX and rendering checks. These checks supplement, not replace, factual review.
# Editorial Evidence

`editorial/rules/*.json` contains authored rule records, not keyword matches. Each record names the rule, its conditions and exceptions, the precise primary-source locator and what it supports, an actual chapter/example anchor, visual IDs, and ordinary-practice question IDs. Use the exact DRE topic labels from `contents/coverage.json`. A chapter mapping is not sufficient evidence of substantive teaching.

Each reviewed distractor also needs a `misconceptionId` from `lib/question-concepts.ts`; the correct option must not have one. Source-checked questions require a registered concept, a valid chapter section, and source URLs already listed on that chapter.

`editorial/reviews/*.json` records a genuinely separate AI primary-source pass. It names the reviewer, sources consulted, findings and resolutions, limitations, and a SHA-256 digest of each reviewed rule/question/visual. Compute digests with `evidenceDigest` from `lib/editorial-evidence.ts` after the reviewer confirms the final artifact. Never manufacture a pass because the schema requires one. Edits invalidate the old artifact digest and require a new review. Historical review records must be archived outside this active directory when superseded.

The evidence audit reports missing topics, unlinked questions, absent independent reviews, and stale reviews as release blockers. It does not claim qualified human review, legal certification, or guaranteed exam readiness.

The longest-option diagnostic estimates choosing among all longest choices with uniform tie-breaking, matching shuffled display order. It also reports uniquely longest choices separately. It is an editorial clue, not a difficulty score; never pad a distractor or introduce ambiguity to meet a numerical target.

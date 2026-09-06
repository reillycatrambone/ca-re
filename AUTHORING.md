# Editorial contract

This is an original, public California real estate salesperson exam textbook. No personal data, secrets, copied commercial preparation content, or recalled exam questions.

Lessons live at `contents/textbook/<domain>/<slug>.mdx`. YAML frontmatter follows `LessonMeta` in `lib/curriculum.ts`. The `slug` is globally unique and includes the domain prefix, for example `ownership-property-rights`. `domain` must match one of the seven IDs. `order` is the unit-local reading order starting at 1. Use quoted ISO `reviewed` dates. `sources` is a list of `{label,url}`; `glossary` is a list of `{term,definition}`. Write normal Markdown with h2/h3 sections, original worked examples, comparisons, and exam distinctions. No h1, imports, JSX, images, or custom components are needed; the application supplies visuals and quizzes. Avoid unescaped angle brackets or braces because content compiles as MDX.

The current edition has 33 chapters, approximately 67,000 chapter-body words, 426 questions, 33 guides, and 42 teaching visuals. Each substantive chapter is approximately 1,700-2,600 words. Explain concepts rather than padding definitions; prefer compact paragraphs under 90 words, comparisons, and worked reasoning. Use the structured guide for additional case teaching instead of repeatedly lengthening the chapter.

Cover the assigned DRE subtopics and distinguish California from federal rules. Verify mutable law against official primary sources, including exceptions and effective dates. Each chapter needs at least two relevant authoritative sources, learning objectives, 5-10 substantive glossary entries, a worked scenario, and an exam review. Use fictional people and explicit illustrative assumptions. No claims of DRE approval, guaranteed mastery, or a guaranteed exam result.

## Questions and durable IDs

Question banks at `contents/questions/<domain>.json` are arrays matching `Question` in `lib/curriculum.ts`. Each question has four distinct options with individual rationales, one zero-based `answer`, a valid chapter reference, and a unique domain-prefixed ID. Use plausible near-miss distractors and one defensible best answer. Vary correct positions across new questions. Every chapter needs at least nine questions for practice and the weighted 150-question mock exam.

Preserve existing chapter slugs, H2 anchors, figure IDs, and question IDs. Expansions must also preserve existing question objects and option order so saved sessions remain meaningful. Add new IDs rather than silently repurposing old ones. Necessary factual corrections require an explicit editorial review of the affected content and saved-state implications; stable IDs are not a reason to retain an error.

## Reading guides

`contents/guides/<domain>.json` contains a `StudyGuide[]`, one entry per chapter, following `lib/study-guides/types.ts`. Each guide requires:

- Exactly three short `overview` points with `label` and `detail`.
- One `sections` entry for every existing H2, using its exact `getHeadings` ID and an original 15-35-word takeaway. Do not invent a second slugging algorithm.
- One substantial `lab` with a title, setup, takeaway, and a discriminated kind: `contrast`, `decision`, `sequence`, or `calculation`. Vary formats by topic and expose the fact that changes the answer.
- Exactly three `pitfalls`, each with a trap, correction, and reason.
- Exactly two distinct, real related chapter links with reasons for the connection.

Keep each lab field digestible, normally under 90 words. Contrast cases explain changed facts and reasoning; decision labs have exactly one best choice; sequences identify actions, evidence, and warnings. Calculation steps provide a label, machine-evaluable expression, numeric value, result format, and explanation. Use numeric literals without thousands separators and `+ - * / ^`, parentheses, or `round`, `min`, and `max`. For example, `min(300000, 50000)` returns `50000`; a percentage result uses percentage units, such as `0.8 * 0.75 * 100` returning `60`.

Guide claims must be supported by the chapter's source metadata. The application supplies focused/full reading, H2 takeaways, and interactive lab presentation. Search indexes guide text and must open the matching anchor even when its chapter section is collapsed. Preserve section anchors and keep each expansion under the H2 it actually develops.

## Coverage audits

`contents/audits/<domain>.json` contains one `CoverageAudit` object with its domain, ISO review date, concrete findings, and limitations. Each finding records `topic`, `gap`, completed `action`, affected `lessonSlugs`, and primary `sourceUrls`. Record 3-6 specific gaps per review rather than blanket claims that every topic is complete. The current seven audits document 33 findings.

Close gaps with meaningful guide teaching and only necessary chapter clarifications; add relevant sources to the chapter metadata. A mapped outline is not proof that every possible exam question is covered. State what the audit does not establish and review changing law independently of structural validation.

Primary curriculum: https://www.dre.ca.gov/Examinees/SalesExamContent.html
Exam format: https://www.dre.ca.gov/Examinees/TakingExam.html
Current law baseline: https://www.dre.ca.gov/Publications/RealEstateLaw.html
The DRE outline is not exhaustive and the annual law book is not a substitute for checking subsequent changes.

## Teaching visuals

Original in-text figures live in `lib/learning-figures/<domain>.ts`. Each figure has a stable ID, chapter slug, existing H2 `afterSection` anchor, title, and explanatory caption. Keep a figure close to the concept it teaches; the MDX pipeline inserts it at the end of that section. Do not rename an anchored heading without updating its figure. The build validates every reference and verifies numeric allocations and calculation totals.

Use process diagrams for sequences, branching diagrams for distinct cases, comparisons for confused concepts, and reconciled calculations for math. Keep teaching labels in HTML rather than raster images. Support narrow screens, keyboard access, dark mode, printing, and search. Figure claims require chapter citations and explicit assumptions.

Run `pnpm check:content`, `pnpm typecheck`, and the relevant tests after edits. Validation checks guide/audit schemas, complete H2 mappings, references, and allowed calculation expressions against numeric results. Rebuild search with `pnpm build:search`; compile the production build for MDX and rendering checks. These checks supplement, not replace, factual review.

# Editorial contract

This is an original, public California real estate salesperson exam textbook. No personal data, secrets, copied commercial preparation content, or recalled exam questions.

Lessons live at `contents/textbook/<domain>/<slug>.mdx`. YAML frontmatter follows `LessonMeta` in `lib/curriculum.ts`. The `slug` is globally unique and includes the domain prefix, for example `ownership-property-rights`. `domain` must match one of the seven IDs. `order` is the unit-local reading order starting at 1. Use quoted ISO `reviewed` dates. `sources` is a list of `{label,url}`; `glossary` is a list of `{term,definition}`. Write normal Markdown with h2/h3 sections, original worked examples, comparisons, and exam distinctions. No h1, imports, JSX, images, or custom components are needed; the application supplies visuals and quizzes. Avoid unescaped angle brackets or braces because content compiles as MDX.

Each substantive chapter should be approximately 1,700-2,600 words, explaining concepts rather than listing definitions. Cover all assigned DRE outline subtopics, identifying California versus federal rules. Verify mutable law against official primary sources. Be precise about exceptions, effective dates, and rules applying to salespersons versus supervising brokers. Every chapter needs at least two relevant authoritative source links, learning objectives, 5-10 substantive glossary entries, an original worked scenario, and a short exam review section. Use fictional people and round illustrative figures. No unsupported promises, fabricated questions claimed as real, or claims of DRE approval.

Question banks live at `contents/questions/<domain>.json` as an array matching `Question` in `lib/curriculum.ts`. Every question has exactly four distinct options, a zero-based `answer`, its domain, a valid `lessonSlug`, and a unique domain-prefixed ID. Explain each option, including why distractors fail. Distribute the correct answer positions. Questions must test understanding or realistic application, with one defensible best answer. Use authored questions, never reformatted copies of official examples. Ensure each lesson has at least seven questions. These questions are used for chapter practice and a blueprint-weighted 150-question exam.

Primary curriculum: https://www.dre.ca.gov/Examinees/SalesExamContent.html
Exam format: https://www.dre.ca.gov/Examinees/TakingExam.html
Current law baseline: https://www.dre.ca.gov/Publications/RealEstateLaw.html
The DRE outline is not exhaustive and the annual law book is not a substitute for checking subsequent changes.

## Teaching visuals

Original in-text figures live in `lib/learning-figures/<domain>.ts`. Each figure has a stable ID, chapter slug, existing H2 `afterSection` anchor, title, and explanatory caption. Keep a figure close to the concept it teaches; the MDX pipeline inserts it at the end of that section. Do not rename an anchored heading without updating its figure. The build validates every reference and verifies numeric allocations and calculation totals.

Use process diagrams for sequences, branching diagrams for distinct cases, side-by-side comparisons for commonly confused concepts, and reconciled calculations for worked math. Keep precise teaching labels in HTML rather than baked into raster images. Support narrow screens, keyboard access for interactive examples, dark mode, printing, and text search. Figure claims must be supported by the chapter's cited sources, and illustrative assumptions must be explicit. Preserve existing question IDs and chapter slugs when expanding content so readers' saved study sessions keep working.

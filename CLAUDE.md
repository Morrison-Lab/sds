# Claude Code Instructions

Project guidance for Claude Code (CLI, IDE, and the GitHub Action). The same conventions apply to GitHub Copilot --- see [`.github/copilot-instructions.md`](.github/copilot-instructions.md), which is the source of truth for style.

## Project context

`sds` holds the statistics prerequisites for the Morrison-Lab data science courses, as [Quarto](https://quarto.org/) fragments. It renders on its own as a website, and course sites can link to its pages by URL, so a page's path and its `#id` anchors are an interface: renaming either breaks those links. The scaffolding came from the UCD-SERG `qwt` template.

Authoritative style guide: [UCD-SERG Lab Manual](https://ucd-serg.github.io/lab-manual/) (source: <https://github.com/UCD-SERG/lab-manual>).

## Repository layout

- `index.qmd`, `chapters/`, `appendix-*.qmd` --- Quarto source pages
- `references.qmd` --- standalone reference page; excluded from the default website
  render (`!references.qmd` in `_quarto-website.yml`), so it isn't part of the
  normal site build
- `_quarto.yml`, `_quarto-website.yml` --- Quarto project + website config
- `sds` --- a self-referential symlink (`sds -> .`), so include paths written
  as `sds/...` (matching how a host site addresses this repo as a submodule)
  also resolve when this repo renders standalone. This creates an unbounded
  `sds/sds/sds/...` path loop; `_quarto-website.yml`'s `!sds/` render
  exclusion keeps Quarto's own render-list glob from walking into it, but the
  symlink is not otherwise sandboxed --- avoid recursive/symlink-following
  operations (`find -L`, `rsync -a --copy-links`, unscoped `grep -r`) rooted
  at the repo root; scope such commands to real subdirectories instead.
  **lintr cannot be pointed away from it via `.lintr.R`'s `exclusions` field**:
  `lintr::normalize_exclusions()` always resolves exclusion paths with
  `normalize_path()`, which follows symlinks, so any exclusion naming `sds`
  (the directory, or a file under it) collapses onto the exact same absolute
  path as the real file it aliases and silently excludes that real file too.
  `lint-project.yaml` and `lint-changed-files.yaml` instead `rm -f sds` right
  after checkout, before invoking lintr, so its directory walk never sees the
  symlink at all.
- `_extensions/` --- vendored Quarto extensions
- `latex-macros/` --- git submodule for shortcode/macro definitions (see `.gitmodules`)
- `_subfiles/_macros-sds.qmd` --- repo-level semantic notation macros (for example `\coef{x}`, `\intcoef`) not yet in `latex-macros/`; included by `_subfiles/shared-config.qmd`
- `R/`, `man/`, `DESCRIPTION`, `NAMESPACE` --- the project is also a small R package
- `references.bib` --- BibTeX bibliography
- `offwhite.scss`, `theme-picker.html` --- the website's Light / Off-white / Parchment / Dark theme dropdown (saved under `mln-theme`, shared with the slides and the other sites on this origin)
- `styles.css` --- website styling; `styles-reveal.scss`, `qwt-reveal-toggle.html` (the same dropdown for slides), and the `revealjs-*.lua` filters drive the reveal.js slide output
- `assets/`, `images/` --- static image and asset files (site pages, docs, CI/PR screenshots)
- `.github/workflows/` --- CI workflow definitions
- `.github/scripts/` --- helper scripts used by workflows
- `.github/instructions/` --- path-scoped Copilot rules that attach by file glob (see `.github/copilot-instructions.md`)
- `CONTRIBUTING.md` --- contributor guide
- `_site/`, `_freeze/`, `.quarto/` --- build artifacts (do not edit by hand)

## Style conventions

Mirrors [`.github/copilot-instructions.md`](.github/copilot-instructions.md). Key points:

- **Lists of 3+ items**: use bullet lists rather than comma-separated prose. Always leave a blank line before a markdown bullet list (especially in `.qmd` files).
- **Code chunks**: HTML output folds code by default: `_quarto-website.yml` sets `code-fold: true` (with `code-tools: true`, so readers can show all code at once), as rme does. Keep the default when the *output* (plot, table) is the point and the code is incidental. Set `#| code-fold: false` on tutorial code, short examples, code that is the main focus, and chunks where the console output is the main content.
- **R style**: respect `.lintr.R`. Run `lintr::lint_dir()` before declaring R changes done.
- **Math notation**: use semantic macros (`\coef{x}`, `\intcoef`, ...), index coefficients by their variable ($\beta_x$, not $\beta_1$), and derive a chain rule's inner derivative in its own aligned block. See "Math Notation" in `.github/copilot-instructions.md`.
- **Quarto chunks**: prefer chunk options as YAML-style `#|` directives, not as inline `r, opt = val` arguments.

## Working in this repo

- **Don't edit generated files**: `README.md` is built from `README.Rmd`; `_site/` and `_freeze/` are build outputs.
- **Local preview**: `quarto preview` (live reload). Full build: `quarto render`. When verifying a single edited page, render just that page (`quarto render <file>.qmd --to html`) rather than the whole site --- the `/render` command is for the full build.
- **Submodules**: `latex-macros/` is the only git submodule (see `.gitmodules`). Run `git submodule update --init --recursive` after cloning.
- **Spell check**: words go in `inst/WORDLIST` (see `.github/workflows/check-spelling.yaml`). Update the wordlist instead of disabling the check.
- **Link check**: tuned in `lychee.toml`; prefer fixing broken links over adding exceptions.
- **Other CI checks**: workflows also verify bibliography DOIs (`check-bibliography-dois.yml`) and flag non-standard characters (`check-non-standard-chars.yaml`). Fix the flagged source rather than relaxing the check.
- **Dependencies**: Dependabot auto-updates the `latex-macros` submodule and GitHub Actions (see `.github/dependabot.yml`); don't bump those by hand unless a PR needs it.

## Pull request expectations

- Keep PRs scoped --- bug fixes shouldn't smuggle in refactors.
- Write commit messages and PR descriptions explaining the *why*, not just the *what*.
- Don't bypass CI failures (spell check, link check, lint, bibliography DOIs, non-standard chars) --- fix the underlying issue.
- Don't commit `_site/` or `_freeze/` changes unless that is genuinely the intent of the PR.

## Shared lab rules

The lab's cross-repository rules live in [`Morrison-Lab/ai-config`](https://github.com/Morrison-Lab/ai-config),
which `.claude/settings.json` enables as the `ai-config@Morrison-Lab` plugin.
Enabling is not installing: a local session needs `claude plugin install ai-config@Morrison-Lab` once.
When the plugin is not loaded (for example, in a session rooted above this checkout),
read the rules from a clone of ai-config before content work, in particular:

- `shared/writing/` --- definitions, derivation steps, fact-checking, cross-references, plain prose
- `shared/coding/` --- R style, ASCII punctuation in source
- `skills/quarto-authoring/references/divs-and-spans.md` --- no theorem-type div nested inside another

## Relationship to rme

This repository is the canonical home for the statistics prerequisites
that [`Morrison-Lab/rme`](https://github.com/Morrison-Lab/rme) carries as appendices
(`estimation.qmd`, `inference.qmd`, `intro-MLEs.qmd`, `bayesian-inference.qmd`, `basic-statistical-methods.qmd`, `exploratory-descriptive.qmd` and `nonparametric-models.qmd`).
rme will drop those appendices and point readers here
([rme#1204](https://github.com/Morrison-Lab/rme/issues/1204)).

- rme is a good first place to look for content, not an authority on content or style:
  much of it predates the lab's style rules.
  Check what you port, fix what is wrong, and bring it up to the current rules.
- Keep rme's `#id`s, so rme's links can be repointed by changing only the path.

## Things to avoid

- Reformatting unrelated files.
- Inventing URLs or citations --- only use sources actually present in `references.bib` or explicitly provided.

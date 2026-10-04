# GitHub Copilot Instructions

This file provides custom instructions for GitHub Copilot when working in this repository.

## General Guidelines

Follow the guidance in the [UCD-SERG Lab Manual](https://ucd-serg.github.io/lab-manual/).

The source files for the lab manual are available at <https://github.com/UCD-SERG/lab-manual> if easier to read.

For workflow fixes, do not restrict the publish workflow render target to HTML only.
Keep publish rendering all configured formats and fix underlying failures instead.

## Path-Scoped Rules

Path-scoped rules live in [`.github/instructions/`](instructions/) and attach
automatically (via each file's `applyTo:` glob) when you edit matching files:

- [`quarto-content.instructions.md`](instructions/quarto-content.instructions.md) --- `.qmd` / `.Rmd` content
- [`r-and-config.instructions.md`](instructions/r-and-config.instructions.md) --- `.R`, `.yml`, `.yaml`

## Style Guidelines

### Lists

When describing lists of three or more items, use a bullet list instead of a comma-separated list. Use your stylistic judgment to determine when this rule applies.

**Examples:**

❌ **Don't** use comma-separated lists for three or more items:
```
The template includes GitHub Actions workflows for publishing, link checking, and spell checking.
```

✅ **Do** use bullet lists instead:
```
The template includes GitHub Actions workflows for:

- Publishing
- Link checking
- Spell checking
```

Always put a blank line before the start of a bullet-point list in markdown (`.md`) files and variants (especially Quarto `.qmd` files).

**When to use your judgment:**

- Short, simple items in a sentence may remain comma-separated if it maintains readability
- Complex items or items with descriptions should always use bullet lists
- Use bullet lists when the items are important and deserve emphasis
- Technical lists (commands, file names, features) typically benefit from bullet format

## Math Notation

- **Use semantic macros, not hard-coded symbols.**
  Write notation through a macro that names its meaning,
  so a convention can change in one place.
  Defaults come from the [`latex-macros`](https://github.com/d-morrison/macros) submodule;
  repo-level conventions it does not cover yet live in
  [`_subfiles/_macros-sds.qmd`](../_subfiles/_macros-sds.qmd),
  defined with `\providecommand` so the macros repo's definitions win once it adds the same names.
- **Regression coefficients**:
  `\coef{x}` ($\beta_x$), `\intcoef` ($\beta_0$), `\hcoef{x}` and `\hintcoef` (estimates),
  `\vcoef` and `\hvcoef` (vectors).
  Index a coefficient by the symbol of its variable ($\beta_x$, not $\beta_1$).
  Use `\intcoef` for the intercept rather than writing $\beta_0$,
  since the intercept symbol may change.
  Where a coefficient as a random variable or unknown must be distinguished from a specific value,
  use `\Coef{x}` / `\Intcoef` (capital Greek) for the former and `\coef{x}` / `\intcoef` for the latter.
- **Fitted values and errors**:
  `\fitted` ($\hat y$) for a fitted value or prediction,
  `\resid` ($r = y - \hat y$, from the macros repo) for a residual,
  and `\prederr` ($e = \hat y - y$) for a prediction error.
- **Inner products**: write the inner product of two vectors as a dot product,
  `\dprod{\vxi}{\vcoef}` ($\tilde x_i \cdot \tilde\beta$),
  rather than as a transpose product `\tprod{\vxi}{\vcoef}` ($\tilde x_i^\top \tilde\beta$).
  Keep the transpose where it is needed:
  outer products (`\soprod{\vxi}`), quadratic forms with a matrix, and derivatives with respect to a row vector.
- **Chain rule steps**:
  after applying the chain rule, derive the inner function's derivative
  in its own set of aligned equations,
  then return to the outer expression and substitute the result.

## Derivations: exercise, solution, theorem, proof

Present a derivation as one or more exercises (`#exr-` divs),
each followed in the same file by its `::::{.solution}` block,
then the theorem (or corollary) that records the result,
with a short `::: proof` that cites the exercises it rests on.
Split a long derivation into one exercise per step
(for example: each partial derivative, solving the resulting equations, the second-derivative check),
so no single solution packs several steps together.
Define any notation the exercises use (such as $S_{xx}$) in its own definition before them,
not inside the theorem that follows them.

## Code Chunks

### Code Folding

HTML output folds code by default: `_quarto-website.yml` sets `code-fold: true` (with `code-tools: true`, so readers can show all code at once), as rme does. This allows readers to focus on the narrative and results while still having the option to view the code if they want to. Set `#| code-fold: false` on a chunk when readers should see its code without clicking.

**When to keep the default (folded):**

- Visualization code where the plot/figure is the main point
- Data preparation or cleaning code that produces a summary table
- Long or complex code that would distract from the narrative
- Code that generates output (plots, tables, results) that readers need to see

**When to set `#| code-fold: false`:**

- Tutorial code where readers need to learn the syntax
- Short, simple examples that are part of the explanation
- Code that is the main focus of the section
- When the console output is part of the main content (unformatted tables, model summaries, etc.)

**Example:**

````markdown
```{{r}}
#| code-fold: false

x <- c(1, 2, 3)
mean(x)
```
````

## Quality Assurance

### Testing Renders

Before requesting review or marking work as complete:

- **Test your changes locally** by running `quarto render` (or rendering only the touched page with `quarto render <file>.qmd --to html` while iterating).
- **Check the rendered output** in `_site/` to verify:
  - All content displays correctly
  - No broken links or missing images
  - Formatting is as expected
- **Review the PR preview** at the preview URL to confirm everything works in the deployed version.
- **Fix any rendering issues** before requesting review.

This ensures reviewers see working, polished output rather than discovering basic rendering problems.

### Check for Late-Arriving Comments

Before declaring an agent session complete, re-read the issue/PR thread for
comments that were posted *after* the request you started on. A follow-up or
correction can land while you're working, and ending the session without it
means the next reviewer has to re-ask.

- Re-check the timeline (and, on a PR, the inline review-thread comments) for
  newer messages directed at you.
- Address any in chronological order, then look again, until none remain.
- If comments keep arriving, stop after roughly five passes (mirroring the
  cap in `claude.yml`), say so in your closing reply, and don't loop
  indefinitely.

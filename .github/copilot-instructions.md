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
each followed in the same file by its solution (a `#sol-` div whose name matches the exercise, e.g. `#exr-foo` and `#sol-foo`),
then the theorem (or corollary) that records the result,
with a short `::: proof` that cites the exercises it rests on.
Split a long derivation into one exercise per step
(for example: each partial derivative, solving the resulting equations, the second-derivative check),
so no single solution packs several steps together.
Define any notation the exercises use (such as $S_{xx}$) in its own definition before them,
not inside the theorem that follows them.
Inside each solution, give every displayed line exactly one operation
(split a sum, sum a constant, factor out a constant, substitute one result, ...)
and its own `&& \text{(reason)}` justification;
never combine, say, the derivative-of-a-sum rule with the chain rule,
or distributing a sum with substituting $\sum_i y_i = n \bar{y}$, in one line.
Never write "cancel" as one step.
Canceling a term hides several operations, each of which gets its own line:
removing parentheses,
reordering the terms,
grouping the two that cancel,
$a - a = 0$,
and $a + 0 = a$.
Canceling a factor likewise hides
rewriting a division as multiplication by a reciprocal,
removing the parentheses that creates,
reordering the factors,
grouping the two that cancel,
$a \cdot \frac{1}{a} = 1$,
and $b \cdot 1 = b$.
Prove any fact a step relies on (such as deviations from the mean summing to zero)
in its own exercise before citing it.

When a derivation would insert a term and its negative into one expression to reach the other side
(as in $Y_i = Y_i - \mean(x_i) + \mean(x_i)$),
start from the other side instead
(expand $\mean_i + \cdev_i$ with the definitions, then simplify one operation per line),
or solve a definition for the term you want.
Adding the same term to both sides of an equation is an ordinary step, not this pattern.
Each line then follows from a definition or a simplification,
with no term pulled from nowhere.

Give each theorem, corollary or lemma div one result.
Two results joined by a semicolon,
or set side by side with `\qquad` in one display,
usually belong in two divs,
each with its own exercise and proof.

## Definitions and results: prose plus a display equation, compact and general, then examples

Keep each definition div to its defining statement, stated in the most general form the page needs
(for example, define the residual sum of squares as $\sum_i r_i^2$ for any fitted model, not only for a line).
State every technical definition and every result (theorem, corollary, lemma) in both prose and math: one sentence saying what it means,
and the formula as a display equation inside the same div, built from terms already defined
(for example, $R^2 \eqdef 1 - \text{RSS} / \text{TSS}$, not the two sums written out,
and the OLS estimate as $\est{\vth} \eqdef \argmin_{\vth} \text{RSS}(\vth)$, not only in words).
Define a regression model by the distribution of the outcome conditional on the covariates,
centered on a named mean function built from semantic macros
(for example, $Y_i \mid X_i = x_i \simind \ndist{\mean_i, \sigma^2}$ with $\mean_i \eqdef \mean(x_i)$ and $\mean(x) \eqdef \intcoef + \coef{x} x$),
not as $Y_i = \mean_i + \cdev_i$ with a distribution on $\cdev_i$.
Define the deviation $\cdev_i \eqdef Y_i - \mean(x_i)$ separately,
and state $Y_i = \mean_i + \cdev_i$ as a result that follows from the definitions.
Put special cases in example divs right after it, from the most general to the most specific
(the simple linear regression case, then a numerical example),
each linking back to the definition.
Put commentary (scope, orientation, relations to other quantities) in a remark div after the definition, never inside it.
Never nest one theorem-type div inside another.

## Attributions are reader-visible

Credit every source a reader would want to know about where readers can see it:
the book or paper an item follows,
and the lab site (rme, lds, pds, ...) or person it was adapted from.
An HTML comment is not an attribution,
because no reader of the website, slides or handout ever sees it.
Put the credit in an `attribution` div at the end of the item's own div,
so it travels with the fragment when a host site includes it.
It is a typed block like any other, so it gets its own div type,
styled once in `styles.css` and `styles-reveal.scss`,
not presentational classes on a plain paragraph:

```markdown
::: {.attribution}
Source: adapted from the rme notes'
[definition of overfitting](https://morrison-lab.github.io/rme/chapters/predictor-selection.html#def-overfitting);
see also @james2021islr2e [sec. 5.1].
:::
```

Cite books and papers through `references.bib` (`@key [locator]`),
and link a lab site's rendered page at the item's anchor.
When the source credits its own upstream (a person's lecture notes, say),
carry that credit too.
Comments are still the place for maintainer-only notes
that are not attributions,
such as what was checked in a PDF or a wording edit made while porting.

## Code Chunks

### Every visible chunk shows a result

A code chunk that readers can see should produce a visible result:
a figure, a table, or console output.
A chunk that only assigns (for example `hers <- rmb::hers |> haven::as_factor()`)
shows code with nothing to connect it to.
End it with an expression that displays what it made
(`hers |> head()`, the estimate it computed, a call to the function it defined),
or merge it into the chunk that displays the result.
Chunks hidden with `#| include: false` are exempt.


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

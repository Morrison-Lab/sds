
<!-- README.md is generated from README.Rmd. Please edit that file -->

# sds (Statistics for Data Science)

<!-- badges: start -->
<!-- badges: end -->

`sds` collects the statistics that data science courses assume, as
[Quarto](https://quarto.org/) fragments:

- empirical distributions and descriptive statistics;
- estimation and statistical inference;
- maximum likelihood and Bayesian inference;
- basic statistical methods, such as t-tests, chi-square tests, and the
  bootstrap.

It renders on its own as a website, and course sites link to its pages
by URL.

## Using these notes in another site

Link to the pages by URL. A host site that keeps a copy of this
repository at its root, named `sds`, can also include fragments with
paths that start with `sds/`.

Quarto resolves `@id` cross-references only within one rendered page, so
a host site that links to a result here uses an explicit link to the
page and anchor.

## Building the site

This repository uses the `latex-macros` submodule for its LaTeX macros,
so clone it with submodules:

``` sh
git clone --recurse-submodules https://github.com/Morrison-Lab/sds.git
quarto preview
```

The pages run R code. Install the R packages listed in `DESCRIPTION`
(for example, `pak::local_install_deps()`), and the
[JAGS](https://mcmc-jags.sourceforge.io/) library, which the page of
models fitted with JAGS uses.

## Provenance

The notes began as the statistics appendices of [*Regression Models for
Epidemiology*](https://github.com/Morrison-Lab/rme), and keep the file
names of those chapters, and most of their `#id` anchors; the home page
lists the results that moved.

The site scaffolding comes from the
[qwt](https://github.com/UCD-SERG/qwt) Quarto website template.

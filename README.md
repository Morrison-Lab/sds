
<!-- README.md is generated from README.Rmd. Please edit that file -->

# sds (Statistics for Data Science)

<!-- badges: start -->

<!-- badges: end -->

`sds` collects the statistics that data science courses assume, as
[Quarto](https://quarto.org/) fragments. It renders on its own as a
website, and course sites include it as a git submodule.

## Using these notes in another site

Add this repository as a git submodule named `sds` at the host site’s
root, and include fragments with paths that start with `sds/`:

``` sh
git submodule add https://github.com/Morrison-Lab/sds.git sds
```

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

## Provenance

The site scaffolding comes from the
[qwt](https://github.com/UCD-SERG/qwt) Quarto website template.

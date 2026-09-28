# Statistics for Data Science

Code

Published

Last modified: 2026-09-28 01:21:55 (PDT)

# Welcome

These notes collect the statistics that data science courses assume, organized by topic:

- [Nonparametric models](nonparametric-models.llms.md): the empirical CDF, order statistics, and sample quantiles;
- [Exploratory and descriptive methods](exploratory-descriptive.llms.md): sample statistics, graphs, correlation, and contingency tables, illustrated with the WCGS data;
- [Estimation](estimation.llms.md): estimands, estimators, bias, mean squared error, and standard error;
- [Statistical inference](inference.llms.md): hypothesis tests, p-values, confidence intervals, and how to interpret negative findings;
- [Maximum likelihood inference](intro-MLEs.llms.md): likelihood, score, information, the asymptotic distribution of MLEs, likelihood ratio tests, and Newton-Raphson, with worked examples;
- [Bayesian inference](bayesian-inference.llms.md): priors and posteriors, MCMC, and Bayesian versions of common models;
- [Basic statistical methods](basic-statistical-methods.llms.md): t-tests, ANOVA, chi-square and Fisher’s exact tests, correlation, simple linear regression, and the bootstrap, illustrated with the HERS data.

These notes began as the statistics appendices of [*Regression Models for Epidemiology*](https://morrison-lab.github.io/rme/), and keep those chapters’ file names. Most results keep their rme `#id` anchors on the same page; the exceptions are:

- the maximum likelihood practice exercises (`exr-prac-*`), which moved from the estimation page to the maximum likelihood page;
- the null and alternative hypothesis definitions, which moved from basic statistical methods to statistical inference;
- the sample statistics (mean, median, variance, standard deviation, interquartile range, proportion, correlation) and the contingency table, which rme defined on two pages; they are now defined once, on the exploratory and descriptive methods page, under the ids rme used on its basic statistical methods page (such as `def-sample-mean`), so the exploratory-descriptive ids from rme `def-mean`, `def-median`, `def-eda-variance`, `def-eda-sd`, `def-quantile`, `def-iqr`, and `def-correlation` are retired. Where they rely on probability or calculus, they link to that book’s [probability](https://morrison-lab.github.io/rme/chapters/probability.html) and [mathematics](https://morrison-lab.github.io/rme/chapters/math-prereqs.html) chapters.

## 0.1 Using these notes in another site

Course sites include these notes as a git submodule named `sds` at the site’s root, and include fragments with paths that start with `sds/`, for example `{{< include sds/_subfiles/intro-MLEs/_def_mle.qmd >}}`. This site includes its own fragments the same way, through an `sds` symlink that points at the repository root.

Quarto resolves `@id` cross-references only within one rendered page, so a host site that links to a result here uses an explicit link, such as `[text](estimation.qmd#def-bias)`.

Back to top

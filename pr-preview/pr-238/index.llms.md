# Statistics for Data Science

Code

Published

Last modified: 2026-10-16 00:44:36 (PDT)

These notes collect the statistics that data science courses assume.

## 1 Topics

The notes are organized in four groups of pages.

Describing data:

- [Types of variables](data.llms.md): numerical and categorical variables, scales of measurement, the taxonomy of data types, and binary and count random variables;
- [Nonparametric models](nonparametric-models.llms.md): the empirical CDF, order statistics, and sample quantiles;
- [Exploratory data analysis](exploratory-descriptive.llms.md): sample statistics, graphs, correlation, and contingency tables, illustrated with the WCGS data.

Inference:

- [Estimation](estimation.llms.md): estimands, estimators, bias, mean squared error, and standard error;
- [Statistical inference](inference.llms.md): hypothesis tests, p-values, the \\t\\, chi-square, and \\F\\ distributions, confidence intervals, and how to interpret negative findings;
- [Maximum likelihood inference](intro-MLEs.llms.md): likelihood, score, information, the asymptotic distribution of MLEs, Wald and likelihood ratio tests, and Newton-Raphson, with worked examples;
- [Properties of estimators](estimator-properties.llms.md): consistency, relative efficiency, and the Cramér–Rao lower bound.
- [Sufficiency and the Rao–Blackwell theorem](sufficiency.llms.md): sufficient statistics, the factorization theorem, and improving an unbiased estimator.

Methods:

- [Comparing means](basic-statistical-methods.llms.md): t-tests and one-way ANOVA;
- [Comparing proportions](categorical-tests.llms.md): the chi-square test and Fisher’s exact test;
- [Correlation and simple linear regression](correlation-regression.llms.md);
- [The bootstrap](bootstrap.llms.md);
- [Permutation tests](permutation-tests.llms.md): exchangeability, the permutation distribution, and exact and Monte Carlo permutation p-values;
- [Multiple testing](multiple-testing.llms.md): the family-wise error rate, the false discovery rate, the Bonferroni, Holm, and Benjamini–Hochberg procedures, and adjusted p-values;
- [Validating predictions](model-validation.llms.md): overfitting, generalization error, training/validation/test splits, \\k\\-fold and leave-one-out cross-validation, and choosing a model by cross-validation;
- [Classification and diagnostic tests](classification.llms.md): sensitivity, specificity, prevalence, and positive and negative predictive values.

Bayesian:

- [Bayesian inference](bayesian-inference.llms.md): the Bayesian paradigm, priors, posteriors, and hierarchical models;
- [Markov chain Monte Carlo](mcmc.llms.md): Monte Carlo integration, the Metropolis–Hastings and Gibbs samplers, convergence diagnostics, and the deviance information criterion;
- [Fitting models by Bayesian inference with JAGS](bayesian-examples.llms.md): a proportion, logistic regression, survival, random effects, and Bayesian model averaging.

## Comparable courses

Stanford’s statistics department posts the materials of several courses that cover the same inference topics at a more mathematical level:

- **STATS 200**, [*Introduction to Statistical Inference*](https://web.stanford.edu/class/archive/stats/stats200/stats200.1172/lectures.html) (Zhou Fan, Autumn 2016): 29 lecture PDFs on testing, maximum likelihood, the bootstrap, Bayesian analysis and regression, following Rice’s *Mathematical Statistics and Data Analysis*.
- **STATS 300A**, [*Theory of Statistics*](https://web.stanford.edu/class/stats300a/) (Andrea Montanari, Autumn 2018; see also [Lester Mackey’s 2015 scribed notes](https://web.stanford.edu/~lmackey/stats300a/)): finite-sample optimality, exponential families, and testing theory.
- **STATS 300B**, [*Theory of Statistics II*](https://web.stanford.edu/class/stats300b/lectures.html) (John Duchi, Winter 2021): slides on asymptotic statistics and concentration.
- **STATS 305B**, [*Methods for Applied Statistics*](https://web.stanford.edu/class/stats305b/) (Jonathan Taylor): contingency tables, logistic regression and generalized linear models.

## 2 Origin

These notes began as the statistics appendices of [*Regression Models for Epidemiology*](https://morrison-lab.github.io/rme/), and keep those chapters’ file names, except that two long chapters are now split into several pages. Most results keep their rme `#id` anchors on the same page; the exceptions are:

- the maximum likelihood practice exercises (`exr-prac-*`), which moved from the estimation page to the maximum likelihood page;
- the null and alternative hypothesis definitions, which moved from basic statistical methods to statistical inference;
- the sample statistics (mean, median, variance, standard deviation, interquartile range, proportion, correlation) and the contingency table, which rme defined on two pages; they are now defined once, on the exploratory data analysis page, under the ids rme used on its basic statistical methods page (such as `def-sample-mean`), so the exploratory-descriptive ids from rme `def-mean`, `def-median`, `def-eda-variance`, `def-eda-sd`, `def-quantile`, `def-iqr`, and `def-correlation` are retired;
- the basic statistical methods sections on categorical outcomes, correlation and simple linear regression, and the bootstrap (such as `sec-two-group-categorical`, `sec-correlation`, `sec-simple-linear-regression`, and `sec-bootstrap-ci`), which moved to their own pages, with their ids;
- the Bayesian inference sections on computation (`sec-foundations` through `sec-dic`) and the worked examples (`sec-bayes-examples` and the sections after it), which moved to the MCMC and JAGS pages, with their ids.

Where these notes rely on probability or calculus, they link to the lab’s notes on [probability](https://morrison-lab.github.io/pds/) and [mathematics](https://morrison-lab.github.io/mds/) for data science, which are the canonical home for the probability and mathematics appendices of rme.

## 3 Using these notes in another site

Course sites link to these pages by URL; they do not include this repository as a git submodule. A host site that keeps a copy of this repository at its root, named `sds`, can still include fragments with paths that start with `sds/`, for example `{{< include sds/_subfiles/intro-MLEs/_def_mle.qmd >}}`. This site includes its own fragments the same way, through an `sds` symlink that points at the repository root.

Quarto resolves `@id` cross-references only within one rendered page, so a host site that links to a result here uses an explicit link, such as `[text](estimation.qmd#def-bias)`.

Back to top

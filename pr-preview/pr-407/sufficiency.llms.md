# Sufficiency and the Rao–Blackwell Theorem

Code

- [Show All Code](javascript:void(0))

- [Hide All Code](javascript:void(0))

- 

  ------------------------------------------------------------------------

- [View Source](javascript:void(0))

Published

Last modified: 2026-10-20 10:42:11 (PDT)

A [statistic](#def-statistic) summarizes a sample, and some summaries lose nothing that matters for a parameter. This page defines such summaries, called sufficient statistics, and shows how to use one to improve an estimator without making it more biased.

## 1 Sufficient statistics

> **NOTE:**
>
> **Definition 1 (Statistic)** A **statistic** is a function of the sample, \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\, that does not depend on any unknown parameter. Its value at the observed data, \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}}\\, is a number or vector we can compute.
>
> Source: Wikipedia contributors [\[1\]](#ref-wikipedia_statistic).

> **NOTE:**
>
> *Remark 1* (Estimators are statistics). Every [estimator](estimation.llms.md#def-estimator) is a statistic, one chosen to land close to an [estimand](estimation.llms.md#def-estimand). This page asks which statistics lose no information about the parameter, and how to use one to improve an estimator.

> **NOTE:**
>
> **Definition 2 (Sufficient statistic)** Let \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\\ be a discrete sample whose distribution depends on a parameter \\\theta\\. A [statistic](#def-statistic) \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\ is **sufficient** for \\\theta\\ if, for every sample \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\\ and every value \\t\\, the conditional probability of the sample given the statistic is the same for every value of \\\theta\\ at which the statistic takes the value \\t\\ with positive probability:
>
> \\ \Pr\_{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} \text{ does not depend on } \theta \quad \text{wherever } \Pr\_{\theta}\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} \> 0 \tag{1}\\
>
> Source: Wikipedia contributors [\[2\]](#ref-wikipedia_sufficient_statistic).

> **NOTE:**
>
> *Remark 2* (Source: Sufficient statistic). Fisher [\[3\]](#ref-fisher1922mathematical) introduced sufficiency; Casella and Berger [\[4\]](#ref-CaseBerg01), Def. 6.2.1, p. 272.

> **NOTE:**
>
> *Remark 3* (What sufficiency says). Once we know \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\, the remaining randomness in the sample has the same distribution whatever the parameter is, so the sample carries no further information about \\\theta\\ beyond \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\. A statistic can therefore stand in for the whole sample when we estimate \\\theta\\.
>
> The sample itself, taking \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\\, is always sufficient but does not reduce the data; a useful sufficient statistic is a much shorter summary, such as a sum or a mean.
>
> Sufficiency by itself does not give a best estimator: it says which summaries lose nothing, not which function of them to use. The Rao–Blackwell theorem below shows how to improve a given unbiased estimator.
>
> For a continuous sample, the definition, the factorization theorem and the conditional expectations below use densities and integrals instead of probability mass functions and sums.

> **NOTE:**
>
> **Theorem 1 (Factorization theorem)** Let \\\operatorname{f}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}; \theta\right)\mathclose{}\\ be the joint probability mass function of a discrete sample \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\\. A statistic \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\ is [sufficient](#def-sufficient) for \\\theta\\ if and only if there are nonnegative functions \\g\\ and \\h\\ such that, for every sample \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\\ and every \\\theta\\,
>
> \\ \operatorname{f}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}; \theta\right)\mathclose{} = {g\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}} ; \theta\right)\mathclose{}} \\ {h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}} \tag{2}\\
>
> where \\{h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}}\\ does not depend on \\\theta\\.
>
> Source: Wikipedia contributors [\[2\]](#ref-wikipedia_sufficient_statistic).

> **NOTE:**
>
> *Proof*. Let \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\\ be a value of the [sample](exploratory-descriptive.llms.md#def-sample) \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\\ and write \\t \stackrel{\text{def}}{=}{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}}\\. The event \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\\ lies inside the event \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\\.
>
> **Sufficient implies a factorization.** Define \\{g\mathopen{}\left(t ; \theta\right)\mathclose{}} \stackrel{\text{def}}{=}\Pr\_{\theta}\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{}\\ and let \\{h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}}\\ be the conditional probability \\\Pr\_{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{}\\ at any \\\theta\\ with \\\Pr\_{\theta}\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} \> 0\\. By [sufficiency](#eq-sufficient), \\{h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}}\\ does not depend on which such \\\theta\\ we use. (If \\\Pr\_{\theta}\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} = 0\\ for every \\\theta\\, set \\{h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}} \stackrel{\text{def}}{=}0\\.) Both functions are nonnegative, and at a \\\theta\\ with \\\Pr\_{\theta}\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} = 0\\ both sides of [Equation 2](#eq-factorization) are zero, because the event \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\\ lies inside the event \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\\. At every other \\\theta\\,
>
> \\ \begin{aligned} \operatorname{f}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}; \theta\right)\mathclose{} &= \Pr\_{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{} && \text{(definition of the joint mass function)}\\ &= \Pr\_{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}},\\ {T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} && \text{(the first event is inside the second)}\\ &= \Pr\_{\theta}\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} \\ \Pr\_{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} && \text{(conditional probability)}\\ &= {g\mathopen{}\left(t ; \theta\right)\mathclose{}} \\ {h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}} && \text{(definitions of \$g\$ and \$h\$)} \end{aligned} \\
>
> **A factorization implies sufficient.** Suppose [Equation 2](#eq-factorization) holds, and let \\t\\ be a value with \\\Pr\_{\theta}\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} \> 0\\. The event \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\\ is the union of the disjoint events \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\\ over the samples \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\\ with \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} = t\\, so
>
> \\ \begin{aligned} \Pr\_{\theta}\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} &= \sum\_{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}:\\ {T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} = t} \operatorname{f}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}; \theta\right)\mathclose{} && \text{(disjoint events add)}\\ &= \sum\_{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}:\\ {T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} = t} {g\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} ; \theta\right)\mathclose{}} \\ {h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} && \text{(factorization)}\\ &= \sum\_{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}:\\ {T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} = t} {g\mathopen{}\left(t ; \theta\right)\mathclose{}} \\ {h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} && \text{(each term has \${T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} = t\$)}\\ &= {g\mathopen{}\left(t ; \theta\right)\mathclose{}} \sum\_{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}:\\ {T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} = t} {h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} && \text{(factor out the common term)} \end{aligned} \\
>
> This is positive, so \\{g\mathopen{}\left(t ; \theta\right)\mathclose{}} \> 0\\. For a sample \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\\ with \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}} = t\\,
>
> \\ \begin{aligned} \Pr\_{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} &= \frac{\operatorname{f}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}; \theta\right)\mathclose{}}{\Pr\_{\theta}\mathopen{}\left({T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{}} && \text{(conditional probability)}\\ &= \frac{{g\mathopen{}\left(t ; \theta\right)\mathclose{}} \\ {h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}}} {{g\mathopen{}\left(t ; \theta\right)\mathclose{}} \sum\_{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}:\\ {T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} = t} {h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}}} && \text{(factorization, and the display above)}\\ &= \frac{{h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}}}{\sum\_{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}:\\ {T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}} = t} {h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\right)\mathclose{}}} && \text{(divide by \${g\mathopen{}\left(t ; \theta\right)\mathclose{}} \> 0\$)} \end{aligned} \\
>
> which does not depend on \\\theta\\. For a sample \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\\ with \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}} \neq t\\ the conditional probability is zero, which does not depend on \\\theta\\ either. So \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\ is sufficient.

> **NOTE:**
>
> *Remark 4* (Source: Factorization theorem). Halmos and Savage [\[5\]](#ref-halmos1949application), whom Casella and Berger [\[4\]](#ref-CaseBerg01), Thm. 6.2.6, p. 276, and its footnote credit with the general form, and Neyman (1935) with an earlier one.

> **NOTE:**
>
> **Example 1 (The sum is sufficient for a Poisson rate)** Let \\X_1, \ldots, X_n \\ \sim\_{\operatorname{iid}}\\ \operatorname{Pois}({\lambda})\\ and \\S \stackrel{\text{def}}{=}\sum\_{i=1}^nX_i\\. The joint mass function of the sample is
>
> \\ \begin{aligned} \operatorname{f}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}; {\lambda}\right)\mathclose{} &= \prod\_{i=1}^n \frac{e^{-{\lambda}} {\lambda}^{x_i}}{x_i!} && \text{(independent Poisson mass functions)}\\ &= e^{-n{\lambda}} {\lambda}^{\sum\_{i=1}^nx_i} \prod\_{i=1}^n \frac{1}{x_i!} && \text{(collect the factors)} \end{aligned} \\
>
> This has the form of [Equation 2](#eq-factorization) with \\{g\mathopen{}\left(t ; {\lambda}\right)\mathclose{}} = e^{-n{\lambda}} {\lambda}^{t}\\ and \\{h\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}} = \prod\_{i=1}^n 1 / x_i!\\, where \\t = \sum\_{i=1}^nx_i\\. So the sum \\S\\ is [sufficient](#def-sufficient) for \\{\lambda}\\ by [Theorem 1](#thm-factorization).

## 2 The Rao–Blackwell theorem

> **NOTE:**
>
> **Definition 3 (Rao–Blackwellized estimator)** Let \\\hat{\theta}\\ be an [estimator](estimation.llms.md#def-estimator) of \\\theta\\, and let \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\ be a [sufficient](#def-sufficient) statistic for \\\theta\\. The **Rao–Blackwellized estimator** is the conditional expectation of \\\hat{\theta}\\ given the statistic:
>
> \\ \hat{\theta}\_{\mathrm{RB}} \stackrel{\text{def}}{=}{{\operatorname{E}\mathopen{}\left\[\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\right\]\mathclose{}}} \tag{3}\\

> **NOTE:**
>
> **Lemma 1 (The Rao–Blackwellized estimator is a statistic)** Let \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\ be a [sufficient](#def-sufficient) statistic for \\\theta\\ and \\\hat{\theta}\\ an estimator of \\\theta\\ with finite expectation. Then \\{{\operatorname{E}\mathopen{}\left\[\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\right\]\mathclose{}}}\\ does not depend on \\\theta\\, so it is a [statistic](#def-statistic) and an estimator.

> **NOTE:**
>
> *Proof*. Take a [discrete](data.llms.md#def-discrete-var) [sample](exploratory-descriptive.llms.md#def-sample), and choose a value \\t\\ that the [statistic](#def-statistic) \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\ takes with positive [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability). Write \\\hat{\theta}= \hat{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}\\.
>
> \\ \begin{aligned} {{\operatorname{E}\mathopen{}\left\[\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right\]\mathclose{}}} &= \sum\_{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}} \hat{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{} \\ \Pr\_{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}} = t\right)\mathclose{} && \text{(conditional expectation)} \end{aligned} \\
>
> Each term involves \\\hat{\theta}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\right)\mathclose{}\\, which does not depend on \\\theta\\, and the conditional probability, which does not depend on \\\theta\\ by [Equation 1](#eq-sufficient). So the sum does not depend on \\\theta\\.

> **NOTE:**
>
> **Theorem 2 (Rao–Blackwellizing preserves unbiasedness)** If \\\hat{\theta}\\ is an [unbiased](estimation.llms.md#def-unbiased) estimator of \\\theta\\ and \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\ is a [sufficient](#def-sufficient) statistic for \\\theta\\, then \\{{\operatorname{E}\mathopen{}\left\[\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\right\]\mathclose{}}}\\ is also unbiased for \\\theta\\.

> **NOTE:**
>
> *Proof*. We use the [law of iterated expectations](https://morrison-lab.github.io/pds/expectation.html#thm-lie):
>
> \\ \begin{aligned} {\operatorname{E}\mathopen{}\left\[{{\operatorname{E}\mathopen{}\left\[\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\right\]\mathclose{}}}\right\]\mathclose{}} &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}} && \text{(law of iterated expectations)}\\ &= \theta && \text{(\$\hat{\theta}\$ is unbiased)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 3 (Rao–Blackwell theorem)** Let \\\hat{\theta}\\ be an [unbiased](estimation.llms.md#def-unbiased) estimator of \\\theta\\ with finite variance, and let \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\ be a [sufficient](#def-sufficient) statistic for \\\theta\\. Then the [Rao–Blackwellized estimator](#def-rao-blackwellized) is unbiased and has variance no larger than that of \\\hat{\theta}\\, for every \\\theta\\:
>
> \\ {\operatorname{Var}\mathopen{}\left({{\operatorname{E}\mathopen{}\left\[\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\right\]\mathclose{}}}\right)\mathclose{}} \le {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \tag{4}\\
>
> Source: [\[6\]](#ref-rao1945information), [\[7\]](#ref-blackwell1947conditional), [\[4\]](#ref-CaseBerg01), Thm. 7.3.17, p. 342, [\[8\]](#ref-wikipedia_rao_blackwell_theorem).

> **NOTE:**
>
> *Proof*. Unbiasedness is [Theorem 2](#thm-rb-unbiased). For the variance, we use the [law of total variance](https://morrison-lab.github.io/pds/variance-covariance.html#thm-total-variance):
>
> \\ \begin{aligned} {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} &= {\operatorname{Var}\mathopen{}\left({{\operatorname{E}\mathopen{}\left\[\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\right\]\mathclose{}}}\right)\mathclose{}} + {\operatorname{E}\mathopen{}\left\[{{\operatorname{Var}\mathopen{}\left(\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\right)\mathclose{}}}\right\]\mathclose{}} && \text{(law of total variance)}\\ &\ge {\operatorname{Var}\mathopen{}\left({{\operatorname{E}\mathopen{}\left\[\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\right\]\mathclose{}}}\right)\mathclose{}} && \text{(a variance is nonnegative)} \end{aligned} \\

> **NOTE:**
>
> **Exercise 1 (Conditional probability of a zero given the Poisson sum)** Let \\X_1, \ldots, X_n \\ \sim\_{\operatorname{iid}}\\ \operatorname{Pois}({\lambda})\\ and \\S \stackrel{\text{def}}{=}\sum\_{i=1}^nX_i\\. Find \\{\Pr\mathopen{}\left(X_1 = 0 \mid S = t\right)\mathclose{}}\\ for each \\t = 0, 1, 2, \ldots\\. You may use that \\S \sim \operatorname{Pois}(n{\lambda})\\, by [the sum of independent Poisson variables](https://morrison-lab.github.io/pds/distributions.html#thm-sum-pois) and induction on \\n\\.

> **NOTE:**
>
> *Solution 1*. The event \\X_1 = 0\\ and \\S = t\\ happens exactly when \\X_1 = 0\\ and \\X_2 + \cdots + X_n = t\\, and \\X_2 + \cdots + X_n \sim \operatorname{Pois}\mathopen{}\left((n-1){\lambda}\right)\mathclose{}\\ is independent of \\X_1\\.
>
> \\ \begin{aligned} {\Pr\mathopen{}\left(X_1 = 0 \mid S = t\right)\mathclose{}} &= \frac{{\Pr\mathopen{}\left(X_1 = 0,\\ S = t\right)\mathclose{}}}{{\Pr\mathopen{}\left(S = t\right)\mathclose{}}} && \text{(conditional probability)}\\ &= \frac{{\Pr\mathopen{}\left(X_1 = 0,\\ X_2 + \cdots + X_n = t\right)\mathclose{}}}{{\Pr\mathopen{}\left(S = t\right)\mathclose{}}} && \text{(on \$X_1 = 0\$, \$S\$ is that sum)}\\ &= \frac{{\Pr\mathopen{}\left(X_1 = 0\right)\mathclose{}} {\Pr\mathopen{}\left(X_2 + \cdots + X_n = t\right)\mathclose{}}}{{\Pr\mathopen{}\left(S = t\right)\mathclose{}}} && \text{(independence)}\\ &= \frac{e^{-{\lambda}} \cdot e^{-(n-1){\lambda}} \mathopen{}\left((n-1){\lambda}\right)\mathclose{}^t / t!}{e^{-n{\lambda}} \mathopen{}\left(n{\lambda}\right)\mathclose{}^t / t!} && \text{(Poisson mass functions)}\\ &= \frac{e^{-n{\lambda}} \mathopen{}\left((n-1){\lambda}\right)\mathclose{}^t / t!}{e^{-n{\lambda}} \mathopen{}\left(n{\lambda}\right)\mathclose{}^t / t!} && \text{(\$e^{-{\lambda}} e^{-(n-1){\lambda}} = e^{-n{\lambda}}\$)}\\ &= \frac{\mathopen{}\left((n-1){\lambda}\right)\mathclose{}^t}{\mathopen{}\left(n{\lambda}\right)\mathclose{}^t} && \text{(cancel \$e^{-n{\lambda}} / t!\$)}\\ &= \mathopen{}\left(\frac{n-1}{n}\right)\mathclose{}^t && \text{(cancel \${\lambda}^t\$, combine powers)} \end{aligned} \\

> **NOTE:**
>
> **Lemma 2 (Conditional probability of a zero given the Poisson sum)** For \\X_1, \ldots, X_n \\ \sim\_{\operatorname{iid}}\\ \operatorname{Pois}({\lambda})\\ and \\S \stackrel{\text{def}}{=}\sum\_{i=1}^nX_i\\,
>
> \\ {\Pr\mathopen{}\left(X_1 = 0 \mid S = t\right)\mathclose{}} = \mathopen{}\left(\frac{n-1}{n}\right)\mathclose{}^t \tag{5}\\
>
> for every \\t = 0, 1, 2, \ldots\\.

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 1](#exr-poisson-zero-conditional).

> **NOTE:**
>
> **Example 2 (Rao–Blackwellizing an estimate of the chance of a zero count)** The `birthwt` data record the number of previous premature labors (`ptl`) for 189 women in a study at Baystate Medical Center in Springfield, Massachusetts [\[9\]](#ref-hosmer1989applied); the data ship with the R package [`MASS`](https://cran.r-project.org/package=MASS) ([`MASS::birthwt`](https://rdrr.io/pkg/MASS/man/birthwt.html)), and this site has a copy at [`data/birthwt.csv`](data/birthwt.csv). Treat counts like these as a Poisson sample, \\X_1, \ldots, X_n \\ \sim\_{\operatorname{iid}}\\ \operatorname{Pois}({\lambda})\\, with \\{\lambda}\\ equal to the sample mean of `ptl`, 0.196.
>
> The estimand is the probability of a zero count, \\\pi= \Pr(X_i= 0) = e^{-{\lambda}}\\. Index the model by \\\pi\\ instead of \\{\lambda}\\ (the map \\{\lambda}\mapsto e^{-{\lambda}}\\ is one-to-one); then the sum \\S = \sum\_{i=1}^nX_i\\ is still [sufficient](#def-sufficient), by [Example 1](#exm-poisson-sufficient).
>
> The crude estimator is the indicator that the first observation is zero, \\\hat{\pi}\_1 = {\mathbb{1}\mathopen{}\left\\X_1 = 0\right\\\mathclose{}}\\, which uses one observation and is unbiased for \\\pi\\. Its Rao–Blackwellization is
>
> \\ \begin{aligned} \hat{\pi}\_2 &= {{\operatorname{E}\mathopen{}\left\[\hat{\pi}\_1 \mid S\right\]\mathclose{}}} && \text{(definition of the Rao--Blackwellized estimator)}\\ &= {\Pr\mathopen{}\left(X_1 = 0 \mid S\right)\mathclose{}} && \text{(the mean of an indicator is a probability)}\\ &= \mathopen{}\left(\frac{n-1}{n}\right)\mathclose{}^S && \text{(conditional probability of a zero)} \end{aligned} \\
>
> By [Lemma 2](#lem-poisson-zero-rb), the conditional probability in the last line is the one in [Equation 5](#eq-poisson-zero-conditional). For \\n = 20\\ we draw 10,000 samples, compute both estimators on each, and report each one’s sample mean (with a 95% confidence interval) and variance (with a 95% confidence interval from the normal approximation to the sampling distribution of a sample variance).
>
> Show R code
>
> ``` downlit
> birthwt <- read.csv("data/birthwt.csv")
>
> # The Poisson rate: the observed mean number of previous premature labors.
> lambda <- mean(birthwt$ptl)
> # The estimand: the probability of a zero count.
> pi_true <- exp(-lambda)
>
> n <- 20
> n_reps <- 10000
>
> set.seed(1945)
> # One row per sample of n counts.
> samples <- matrix(rpois(n * n_reps, lambda), nrow = n_reps)
> s_sum <- rowSums(samples)
>
> # The crude estimator and its Rao-Blackwellization.
> est <- data.frame(
>   crude = as.numeric(samples[, 1] == 0),
>   rao_blackwell = ((n - 1) / n)^s_sum
> )
>
> # Mean with a t interval; variance with a normal-approximation interval,
> # using the standard error sqrt((m4 - s^4) / N) of a sample variance.
> summarize_estimator <- function(x) {
>   tt <- t.test(x)
>   v <- var(x)
>   m4 <- mean((x - mean(x))^4)
>   se_v <- sqrt((m4 - v^2) / length(x))
>   data.frame(
>     mean = mean(x),
>     mean_lower = tt$conf.int[1],
>     mean_upper = tt$conf.int[2],
>     variance = v,
>     var_lower = v - 1.96 * se_v,
>     var_upper = v + 1.96 * se_v
>   )
> }
> rb_summary <- do.call(rbind, lapply(est, summarize_estimator))
> round(rb_summary, 4)
> ```
>
> The estimand is \\\pi=\\ 0.822. Both estimators have simulated sample means near it, as [Theorem 2](#thm-rb-unbiased) says they must. The variance of the Rao–Blackwellized estimator is about 22.7 times smaller than that of the crude estimator, as [Theorem 3](#thm-rao-blackwell) requires.
>
> > **NOTE:**
> >
> > Show R code
> >
> > ``` downlit
> > est_long <- data.frame(
> >   estimate = c(est$crude, est$rao_blackwell),
> >   estimator = rep(
> >     c("crude (first observation is zero)", "Rao-Blackwellized"),
> >     each = n_reps
> >   )
> > )
> > p <- ggplot(est_long, aes(x = estimate)) +
> >   geom_histogram(bins = 30) +
> >   geom_vline(xintercept = pi_true, linetype = "dashed") +
> >   facet_wrap(~estimator, ncol = 1, scales = "free_y") +
> >   labs(x = "estimate of the probability of a zero count", y = "count")
> > if (knitr::is_html_output()) plotly::ggplotly(p) else p
> > ```
> >
> > Figure 1: The sampling distribution of the crude and Rao–Blackwellized estimators (\\n = 20\\, 10,000 samples); the dashed line marks the estimand

> **NOTE:**
>
> *Remark 5* (Sufficiency is needed). If \\{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\\ is not sufficient, then \\{{\operatorname{E}\mathopen{}\left\[\hat{\theta} \mid{T\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{X}}\vphantom{X}}\right)\mathclose{}}\right\]\mathclose{}}}\\ may depend on \\\theta\\, in which case it is not an estimator at all (Casella and Berger [\[4\]](#ref-CaseBerg01), Example 7.3.18).

## 3 Further reading

- The [Fall 2024 course site for UC Berkeley’s Stat 210A, *Theoretical Statistics*](https://stat210a.berkeley.edu/fall-2024/) (Will Fithian) has a course reader on exponential families, sufficiency, completeness and unbiased estimation.

## References

\[1\]

Wikipedia contributors, “Statistic — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Statistic>

\[2\]

Wikipedia contributors, “Sufficient statistic — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Sufficient_statistic>

\[3\]

R. A. Fisher, “On the mathematical foundations of theoretical statistics,” *Philosophical Transactions of the Royal Society of London. Series A*, vol. 222, no. 594–604, pp. 309–368, 1922, doi: [10.1098/rsta.1922.0009](https://doi.org/10.1098/rsta.1922.0009).

\[4\]

G. Casella and R. Berger, *Statistical inference*, 2nd ed. Cengage Learning, 2002. Available: <https://www.cengage.com/c/statistical-inference-2e-casella-berger/9780534243128/>

\[5\]

P. R. Halmos and L. J. Savage, “Application of the Radon–Nikodym theorem to the theory of sufficient statistics,” *The Annals of Mathematical Statistics*, vol. 20, no. 2, pp. 225–241, 1949, doi: [10.1214/aoms/1177730032](https://doi.org/10.1214/aoms/1177730032).

\[6\]

C. R. Rao, “Information and the accuracy attainable in the estimation of statistical parameters,” *Bulletin of the Calcutta Mathematical Society*, vol. 37, pp. 81–91, 1945.

\[7\]

D. Blackwell, “Conditional expectation and unbiased sequential estimation,” *The Annals of Mathematical Statistics*, vol. 18, no. 1, pp. 105–110, 1947, doi: [10.1214/aoms/1177730497](https://doi.org/10.1214/aoms/1177730497).

\[8\]

Wikipedia contributors, “Rao–blackwell theorem — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Rao%E2%80%93Blackwell_theorem>

\[9\]

D. W. Hosmer and S. Lemeshow, *Applied logistic regression*. New York: Wiley, 1989.

Back to top

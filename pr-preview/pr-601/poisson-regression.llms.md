# Poisson Regression

Code

Published

Last modified: 2026-11-11 23:36:39 (PST)

# 1 The model

A count [outcome](model-validation.llms.md#def-outcome-vector), such as the number of bike rentals in an hour, is not well described by a [normal distribution](https://morrison-lab.github.io/pds/random-variables.html#def-normal) when the counts are small, since the normal distribution puts [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) below zero, and a count is never below zero. A [Poisson regression model](poisson-regression.llms.md#def-poisson-regression) takes the [event rate](https://morrison-lab.github.io/pds/distributions.html#def-event-rate) to be the [exponential function](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-exponential-function) of a [linear function](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-linear-function) of the [covariates](model-validation.llms.md#def-covariate).

> **NOTE:**
>
> **Definition 1 (Poisson regression model)** Let $Y$ be a count [outcome](model-validation.llms.md#def-outcome-vector), $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{X}}\vphantom{X}}$ a [covariate vector](correlation-regression.llms.md#def-slr-covariate-vector), and $T$ the [exposure magnitude](https://morrison-lab.github.io/pds/distributions.html#def-exposure) over which the [events](https://morrison-lab.github.io/pds/probability-basics.html#def-event) in $Y$ are counted. A **Poisson regression model** assumes that, given $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{X}}\vphantom{X}}= \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ and $T = t$, $Y$ has a [Poisson distribution](https://morrison-lab.github.io/pds/distributions.html#def-poisson) with [mean](https://morrison-lab.github.io/pds/expectation.html#def-expectation) $\mu(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}, t) = \lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}) \cdot t$, where the [event rate](https://morrison-lab.github.io/pds/distributions.html#def-event-rate) $\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})$ has a [log](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-natural-log) that is a [linear function](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-linear-function) of the [covariates](model-validation.llms.md#def-covariate):
>
> $${\ln\mathopen{}\left(\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})\right)\mathclose{}} = \beta_0 + \beta_1 x_1 + \ldots+ \beta_p x_p.$$

# 2 Rate ratios

> **NOTE:**
>
> **Definition 2 (Rate ratio)** In a [Poisson regression model](poisson-regression.llms.md#def-poisson-regression), the **rate ratio** comparing [covariate pattern](logistic-inference.llms.md#def-covariate-pattern) $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ to covariate pattern $\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}}$ is the [ratio](https://morrison-lab.github.io/mds/algebra-sums.html#def-ratio) of their [event rates](https://morrison-lab.github.io/pds/distributions.html#def-event-rate):
>
> $$\text{ϙ}_{{\lambda}}(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}: \mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}}) \stackrel{\text{def}}{=}\frac{\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})}{\lambda(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})}.$$

> **NOTE:**
>
> **Theorem 1 (Rate ratios in Poisson regression)** In a [Poisson regression model](poisson-regression.llms.md#def-poisson-regression), suppose [covariate](model-validation.llms.md#def-covariate) $x_j$ enters the [linear function](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-linear-function) ${\ln\mathopen{}\left(\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})\right)\mathclose{}}$ only through the single [term](https://morrison-lab.github.io/mds/algebra-sums.html#def-term) $\beta_j x_j$ (no interactions or transformations involving $x_j$). Let $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ and $\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}}$ be two [covariate patterns](logistic-inference.llms.md#def-covariate-pattern) that are identical except that $x_j = a$ and $x^*_j = b$. Then
>
> $$\text{ϙ}_{{\lambda}}(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}: \mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}}) = {\operatorname{exp}\mathopen{}\left\{\beta_j (a - b)\right\}\mathclose{}} \tag{1}$$
>
> and for any common [exposure magnitude](https://morrison-lab.github.io/pds/distributions.html#def-exposure) $t > 0$, the [ratio](https://morrison-lab.github.io/mds/algebra-sums.html#def-ratio) of the [means](https://morrison-lab.github.io/pds/expectation.html#def-expectation) is the same [rate ratio](poisson-regression.llms.md#def-rate-ratio):
>
> $$\frac{\mu(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}, t)}{\mu(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}}, t)} = \text{ϙ}_{{\lambda}}(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}: \mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})$$

> **NOTE:**
>
> *Proof*. Because $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ and $\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}}$ agree on every [covariate](model-validation.llms.md#def-covariate) except $x_j$, every [term](https://morrison-lab.github.io/mds/algebra-sums.html#def-term) of ${\ln\mathopen{}\left(\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})\right)\mathclose{}}$ except $\beta_j x_j$ is shared with ${\ln\mathopen{}\left(\lambda(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})\right)\mathclose{}}$:
>
> $$\begin{aligned}
> {\ln\mathopen{}\left(\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})\right)\mathclose{}} - {\ln\mathopen{}\left(\lambda(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})\right)\mathclose{}}
> &= \mathopen{}\left(\beta_0 + \beta_1 x_1 + \ldots+ {\color{red}{\beta_j a}} + \ldots+ \beta_p x_p\right)\mathclose{} \\
> &\phantom{={}} - \mathopen{}\left(\beta_0 + \beta_1 x_1 + \ldots+ {\color{red}{\beta_j b}} + \ldots+ \beta_p x_p\right)\mathclose{}
> && \text{(substitute the linear function)} \\
> &= {\color{red}{\beta_j a}} - {\color{red}{\beta_j b}}
> && \text{(cancel the shared terms)} \\
> &= {\color{red}{\beta_j (a - b)}}
> && \text{(factor out } \beta_j \text{)}
> \end{aligned}$$
>
> Then the [rate ratio](poisson-regression.llms.md#def-rate-ratio) is:
>
> $$\begin{aligned}
> \text{ϙ}_{{\lambda}}(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}: \mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})
> &= \frac{\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})}{\lambda(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})}
> && \text{(definition of rate ratio)} \\
> &= \frac{{\operatorname{exp}\mathopen{}\left\{{\ln\mathopen{}\left(\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})\right)\mathclose{}}\right\}\mathclose{}}}{{\operatorname{exp}\mathopen{}\left\{{\ln\mathopen{}\left(\lambda(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})\right)\mathclose{}}\right\}\mathclose{}}}
> && \text{(exponential undoes the log)} \\
> &= {\operatorname{exp}\mathopen{}\left\{{\ln\mathopen{}\left(\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})\right)\mathclose{}} - {\ln\mathopen{}\left(\lambda(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})\right)\mathclose{}}\right\}\mathclose{}}
> && \text{(quotient rule for exponentials)} \\
> &= {\operatorname{exp}\mathopen{}\left\{\beta_j (a - b)\right\}\mathclose{}}
> && \text{(substitute the difference of linear functions)}
> \end{aligned}$$
>
> For the [means](https://morrison-lab.github.io/pds/expectation.html#def-expectation) at a common exposure $t > 0$:
>
> $$\begin{aligned}
> \frac{\mu(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}, t)}{\mu(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}}, t)}
> &= \frac{\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}) \cdot t}{\lambda(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}}) \cdot t}
> && \text{(Poisson regression mean function)} \\
> &= \frac{\lambda(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}})}{\lambda(\mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})}
> && \text{(cancel } t > 0 \text{)} \\
> &= \text{ϙ}_{{\lambda}}(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}: \mathord{{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^*}})
> && \text{(definition of rate ratio)}
> \end{aligned}$$

> **NOTE:**
>
> **Example 1 (Rate ratio for a ten-year age difference)**  
>
> Suppose a [Poisson regression model](poisson-regression.llms.md#def-poisson-regression) for emergency-room visits includes age in years, $x_1$, with coefficient $\beta_1 = 0.03$ and no interactions involving age. By [Theorem 1](#thm-poisson-rate-ratio) with $a = 60$ and $b = 50$, the [rate ratio](poisson-regression.llms.md#def-rate-ratio) comparing a 60-year-old to a 50-year-old with the same values of every other [covariate](model-validation.llms.md#def-covariate) is:
>
> $$\begin{aligned}
> \text{ϙ}_{{\lambda}}(x_1 = 60 : x_1 = 50)
> &= {\operatorname{exp}\mathopen{}\left\{\beta_1 (60 - 50)\right\}\mathclose{}}
> && \text{(rate ratio theorem)} \\
> &= {\operatorname{exp}\mathopen{}\left\{0.03 \cdot 10\right\}\mathclose{}}
> && \text{(substitute } \beta_1 \text{ and subtract)} \\
> &= {\operatorname{exp}\mathopen{}\left\{0.3\right\}\mathclose{}}
> && \text{(multiply)} \\
> &\approx 1.350
> && \text{(evaluate)}
> \end{aligned}$$
>
> A one-year age difference instead gives ${\operatorname{exp}\mathopen{}\left\{0.03\right\}\mathclose{}} \approx 1.030$, a 3% higher [event rate](https://morrison-lab.github.io/pds/distributions.html#def-event-rate) per year of age. The ten-year rate ratio is the one-year rate ratio multiplied by itself ten times, ${\operatorname{exp}\mathopen{}\left\{0.3\right\}\mathclose{}} = \mathopen{}\left({\operatorname{exp}\mathopen{}\left\{0.03\right\}\mathclose{}}\right)\mathclose{}^{10}$, because rate ratios multiply across successive one-year steps.

# Definitions on this page

- [Definition 1 (Poisson regression model)](#def-poisson-regression)
- [Definition 2 (Rate ratio)](#def-rate-ratio)

Back to top

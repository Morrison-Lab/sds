# Maximum Likelihood for a Bernoulli Model

Code

Published

Last modified: 2026-10-22 02:34:23 (PDT)

## 1 Maximum likelihood for a Bernoulli model without covariates

### 1.1 The likelihood

> **NOTE:**
>
> **Exercise 1 (Likelihood of binary outcomes with one event probability)** A binary outcome \\Y\\ with event probability \\\pi\\ has
>
> \\ \begin{aligned} \Pr(Y = 1) &= \pi && \text{(definition of the event probability)}\\ \Pr(Y = 0) &= 1 - \pi && \text{(complement rule)}\\ \Pr(Y = y) &= \pi^y (1 - \pi)^{1 - y}, \quad y \in \mathopen{}\left\\0, 1\right\\\mathclose{} && \text{(combine the two cases)} \end{aligned} \\
>
> Let \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\stackrel{\text{def}}{=}(y_1, \ldots, y_n)\\ be a dataset of mutually independent binary outcomes, all with the same event probability \\\pi\\: \\Y_i\\ \sim\_{\perp\\\\\\\perp}\\ \operatorname{Ber}(\pi)\\. Derive the [likelihood](intro-MLEs.llms.md#def-lik) of \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\\.

> **NOTE:**
>
> *Solution 1*. \\ \begin{aligned} \mathcal{L}(\pi; \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}) &= \prod\_{i=1}^n\mathcal{L}\_i(\pi) && \text{(product of likelihood components)}\\ &= \prod\_{i=1}^n\Pr(Y_i= y_i) && \text{(definition of likelihood components)}\\ &= \prod\_{i=1}^n\pi^{y_i} (1 - \pi)^{1 - y_i} && \text{(Bernoulli PMF)}\\ &= \mathopen{}\left(\prod\_{i=1}^n\pi^{y_i}\right)\mathclose{} \mathopen{}\left(\prod\_{i=1}^n(1 - \pi)^{1 - y_i}\right)\mathclose{} && \text{(regroup the factors of the product)}\\ &= \pi^{\sum\_{i=1}^ny_i} (1 - \pi)^{\sum\_{i=1}^n(1 - y_i)} && \text{(product of powers of a common base)}\\ &= \pi^{\sum\_{i=1}^ny_i} (1 - \pi)^{\sum\_{i=1}^n1 - \sum\_{i=1}^ny_i} && \text{(split the sum in the exponent)}\\ &= \pi^{\sum\_{i=1}^ny_i} (1 - \pi)^{n - \sum\_{i=1}^ny_i} && \text{(\$\textstyle\sum\_{i=1}^n1 = n\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 1 (Likelihood of binary outcomes with one event probability)** Let \\Y_1, \dots, Y_n\\ be mutually independent binary random variables, each with the same event probability \\\pi\\: \\Y_i\\ \sim\_{\perp\\\\\\\perp}\\ \operatorname{Ber}(\pi)\\. For observed outcomes \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\stackrel{\text{def}}{=}(y_1, \ldots, y_n)\\, with each \\y_i\in \mathopen{}\left\\0, 1\right\\\mathclose{}\\, the likelihood \\\mathcal{L}(\pi; \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}})\\ of \\\pi\\ depends on the data only through the number of events \\\sum\_{i=1}^ny_i\\:
>
> \\\mathcal{L}(\pi; \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}) = \pi^{\sum\_{i=1}^ny_i} (1 - \pi)^{n - \sum\_{i=1}^ny_i}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 1](#exr-bernoulli-likelihood-one-group), worked in [Solution 1](#sol-bernoulli-likelihood-one-group).

### 1.2 Log-likelihood contributions

> **NOTE:**
>
> **Exercise 2 (Log-likelihood contribution of one binary outcome)** Let:
>
> - \\Y_i\\ \sim\_{\perp\\\\\\\perp}\\ \operatorname{Ber}(\pi)\\ for \\i= 1, \dots, n\\, with no [covariates](model-validation.llms.md#def-covariate);
> - \\y_i\in \mathopen{}\left\\0, 1\right\\\mathclose{}\\ be the observed value of \\Y_i\\.
>
> Derive the [log-likelihood](intro-MLEs.llms.md#def-loglik) contribution \\\ell_i(\pi)\\ of observation \\i\\, the [log](intro-MLEs.llms.md#def-loglik) of its [likelihood component](intro-MLEs.llms.md#def-lik-factor).

> **NOTE:**
>
> *Solution 2*. \\ \begin{aligned} \ell_i(\pi) &= {\operatorname{log}\mathopen{}\left\\\Pr(Y_i= y_i)\right\\\mathclose{}} && \text{(log of the likelihood component)}\\ &= {\operatorname{log}\mathopen{}\left\\\pi^{y_i} (1 - \pi)^{1 - y_i}\right\\\mathclose{}} && \text{(Bernoulli PMF)}\\ &= {\operatorname{log}\mathopen{}\left\\\pi^{y_i}\right\\\mathclose{}} + {\operatorname{log}\mathopen{}\left\\(1 - \pi)^{1 - y_i}\right\\\mathclose{}} && \text{(log of a product)}\\ &= y_i{\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}} + (1 - y_i) {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} && \text{(log of a power)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 2 (Log-likelihood contribution of one binary outcome)** If \\Y_i\sim \operatorname{Ber}(\pi)\\ has observed value \\y_i\in \mathopen{}\left\\0, 1\right\\\mathclose{}\\, its [log-likelihood](intro-MLEs.llms.md#def-loglik) contribution is:
>
> \\\ell_i(\pi) = y_i{\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}} + (1 - y_i) {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 2](#exr-bernoulli-loglik-contribution), worked in [Solution 2](#sol-bernoulli-loglik-contribution). Rewriting it with the [log-odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) \\\eta\stackrel{\text{def}}{=}\operatorname{logit}(\pi)\\ and summing over \\i\\ gives [Theorem 3](#thm-bernoulli-loglik-one-group).

### 1.3 The log-likelihood of the sample

> **NOTE:**
>
> **Exercise 3 (Log-likelihood of binary outcomes with one event probability)** Derive the [log-likelihood](intro-MLEs.llms.md#def-loglik) of \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\\ from [Exercise 1](#exr-bernoulli-likelihood-one-group).

> **NOTE:**
>
> *Solution 3*. Starting from the likelihood in [Theorem 1](#thm-bernoulli-likelihood-one-group):
>
> \\ \begin{aligned} \ell(\pi; \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}) &= {\operatorname{log}\mathopen{}\left\\\pi^{\sum\_{i=1}^ny_i} (1 - \pi)^{n - \sum\_{i=1}^ny_i}\right\\\mathclose{}} && \text{(log of the likelihood)}\\ &= {\operatorname{log}\mathopen{}\left\\\pi^{\sum\_{i=1}^ny_i}\right\\\mathclose{}} + {\operatorname{log}\mathopen{}\left\\(1 - \pi)^{n - \sum\_{i=1}^ny_i}\right\\\mathclose{}} && \text{(log of a product)}\\ &= \mathopen{}\left(\sum\_{i=1}^ny_i\right)\mathclose{} {\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}} + \mathopen{}\left(n - \sum\_{i=1}^ny_i\right)\mathclose{} {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} && \text{(log of a power)}\\ &= \mathopen{}\left(\sum\_{i=1}^ny_i\right)\mathclose{} {\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}} + n {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} - \mathopen{}\left(\sum\_{i=1}^ny_i\right)\mathclose{} {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} && \text{(distribute \${\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}}\$)}\\ &= \mathopen{}\left(\sum\_{i=1}^ny_i\right)\mathclose{} {\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}} - \mathopen{}\left(\sum\_{i=1}^ny_i\right)\mathclose{} {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} + n {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} && \text{(reorder the terms)}\\ &= \mathopen{}\left(\sum\_{i=1}^ny_i\right)\mathclose{} \mathopen{}\left({\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}} - {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}}\right)\mathclose{} + n {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} && \text{(collect the terms in \$\textstyle\sum\_{i=1}^ny_i\$)}\\ &= \mathopen{}\left(\sum\_{i=1}^ny_i\right)\mathclose{} {\operatorname{log}\mathopen{}\left\\\frac{\pi}{1 - \pi}\right\\\mathclose{}} + n {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} && \text{(log of a quotient)}\\ &= \mathopen{}\left(\sum\_{i=1}^ny_i\right)\mathclose{} \eta+ n {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} && \text{(definition of \$\eta\stackrel{\text{def}}{=}\operatorname{logit}(\pi)\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 3 (Log-likelihood of binary outcomes with one event probability)** Let \\Y_i\\ \sim\_{\perp\\\\\\\perp}\\ \operatorname{Ber}(\pi)\\ for \\i = 1, \dots, n\\, with observed outcomes \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}\stackrel{\text{def}}{=}(y_1, \ldots, y_n)\\, each \\y_i\in \mathopen{}\left\\0, 1\right\\\mathclose{}\\. The log-likelihood \\\ell(\pi; \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}})\\ of the event probability \\\pi\\, written with the [log-odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) \\\eta\stackrel{\text{def}}{=}\operatorname{logit}(\pi)\\, is:
>
> \\\ell(\pi; \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}) = \mathopen{}\left(\sum\_{i=1}^ny_i\right)\mathclose{} \eta+ n {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 3](#exr-bernoulli-loglik-one-group), worked in [Solution 3](#sol-bernoulli-loglik-one-group). It builds on [Theorem 1](#thm-bernoulli-likelihood-one-group).

### 1.4 The score of one observation

> **NOTE:**
>
> **Exercise 4 (Score function of a Bernoulli variable)** Let \\\delta\stackrel{\text{def}}{=}x - {\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}\\ be the [deviation](https://morrison-lab.github.io/pds/variance-covariance.html#def-deviation-pop-mean) of the observed value \\x\\ from the mean of \\X\\.
>
> Derive the score function for a single Bernoulli random variable \\X\\. In other words, differentiate the log-likelihood of a single Bernoulli random variable \\X\\ with respect to the event probability parameter \\\pi\\. Simplify as much as possible.

> **NOTE:**
>
> *Solution 4*. With \\n = 1\\, [Theorem 3](#thm-bernoulli-loglik-one-group) gives \\\ell= x {\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}} + (1 - x) {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}}\\, so:
>
> \\ \begin{aligned} \ell' &\stackrel{\text{def}}{=}\frac{\partial}{\partial \pi} \ell && \text{(definition of the score)}\\ &= \frac{\partial}{\partial \pi} \mathopen{}\left(x {\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}} + (1 - x) {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}}\right)\mathclose{} && \text{(Bernoulli log-likelihood)}\\ &= \frac{\partial}{\partial \pi} \mathopen{}\left(x {\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}}\right)\mathclose{} + \frac{\partial}{\partial \pi} \mathopen{}\left((1 - x) {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}}\right)\mathclose{} && \text{(linearity of differentiation)}\\ &= x \frac{\partial}{\partial \pi} {\operatorname{log}\mathopen{}\left\\\pi\right\\\mathclose{}} + (1 - x) \frac{\partial}{\partial \pi} {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} && \text{(constant multiple rule)}\\ &= x \frac{1}{\pi} + (1 - x) \frac{\partial}{\partial \pi} {\operatorname{log}\mathopen{}\left\\1 - \pi\right\\\mathclose{}} && \text{(derivative of \$\log\$)}\\ &= x \frac{1}{\pi} + (1 - x) \frac{1}{1 - \pi} \frac{\partial}{\partial \pi}(1 - \pi) && \text{(chain rule)} \end{aligned} \\
>
> The inner derivative is:
>
> \\ \begin{aligned} \frac{\partial}{\partial \pi}(1 - \pi) &= \frac{\partial}{\partial \pi} 1 - \frac{\partial}{\partial \pi} \pi && \text{(linearity of differentiation)}\\ &= 0 - \frac{\partial}{\partial \pi} \pi && \text{(derivative of a constant)}\\ &= 0 - 1 && \text{(derivative of \$\pi\$ with respect to itself)}\\ &= -1 && \text{(subtract)} \end{aligned} \\
>
> Substituting the inner derivative back in:
>
> \\ \begin{aligned} \ell' &= x \frac{1}{\pi} + (1 - x) \frac{1}{1 - \pi} (-1) && \text{(inner derivative is \$-1\$)}\\ &= x \frac{1}{\pi} - (1 - x) \frac{1}{1 - \pi} && \text{(multiply by \$-1\$)}\\ &= \frac{x}{\pi} - \frac{1 - x}{1 - \pi} && \text{(multiply)}\\ &= \frac{x(1 - \pi)}{\pi(1 - \pi)} - \frac{(1 - x)\pi}{\pi(1 - \pi)} && \text{(write both terms over the common denominator)}\\ &= \frac{x(1 - \pi) - (1 - x)\pi}{\pi(1 - \pi)} && \text{(combine the fractions)}\\ &= \frac{x - x\pi- \pi+ x\pi}{\pi(1 - \pi)} && \text{(expand the numerator)}\\ &= \frac{x - \pi}{\pi(1 - \pi)} && \text{(cancel \$x\pi\$)}\\ &= \frac{x - {\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}}{\pi(1 - \pi)} && \text{(\${\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}} = \pi\$)}\\ &= \frac{\delta}{\pi(1 - \pi)} && \text{(definition of \$\delta\$)}\\ &= \frac{\delta}{{\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}} && \text{(\${\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}} = \pi(1 - \pi)\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 4 (Score function of a Bernoulli variable)** Let \\X \sim \operatorname{Ber}(\pi)\\, with event probability \\\pi\\ and observed value \\x \in \mathopen{}\left\\0, 1\right\\\mathclose{}\\. The [score](intro-MLEs.llms.md#def-score) \\\ell'\\ of the single observation \\x\\ is the derivative of its log-likelihood \\\ell\\ with respect to \\\pi\\. It equals the [deviation](https://morrison-lab.github.io/pds/variance-covariance.html#def-deviation-pop-mean) \\\delta\stackrel{\text{def}}{=}x - {\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}\\ of \\x\\ from the mean \\{\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}\\, divided by the variance \\{\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}\\:
>
> \\\ell'= \frac{\delta}{{\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}} = \frac{\delta}{\pi(1 - \pi)}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 4](#exr-derive-bernoulli-score), worked in [Solution 4](#sol-derive-bernoulli-score). It builds on [Theorem 3](#thm-bernoulli-loglik-one-group), with \\n = 1\\.

### 1.5 Score contributions

> **NOTE:**
>
> **Exercise 5 (Score contribution of one binary outcome)** In the setting of [Exercise 2](#exr-bernoulli-loglik-contribution), let:
>
> - \\\delta_i\stackrel{\text{def}}{=}y_i- \pi\\ be the [deviation](https://morrison-lab.github.io/pds/variance-covariance.html#def-deviation-pop-mean) of \\y_i\\ from its mean \\\pi\\;
> - \\\tau\stackrel{\text{def}}{=}1 / {\operatorname{Var}\mathopen{}\left(Y_i\right)\mathclose{}}\\ be the [precision](intro-MLEs.llms.md#def-precision-rv) of \\Y_i\\.
>
> Derive the [score](intro-MLEs.llms.md#def-score) contribution \\\ell'\_i(\pi) \stackrel{\text{def}}{=}\frac{\partial}{\partial \pi} \ell_i(\pi)\\ of observation \\i\\, and write it using \\\delta_i\\ and \\\tau\\.

> **NOTE:**
>
> *Solution 5*. \\ \begin{aligned} \ell'\_i(\pi) &= \frac{\partial}{\partial \pi} \ell_i(\pi) && \text{(definition of the score contribution)}\\ &= \frac{y_i- \pi}{\pi(1 - \pi)} && \text{(score of a Bernoulli variable, with \$x = y_i\$)}\\ &= \frac{\delta_i}{\pi(1 - \pi)} && \text{(definition of \$\delta_i\$)}\\ &= \frac{\delta_i}{{\operatorname{Var}\mathopen{}\left(Y_i\right)\mathclose{}}} && \text{(\${\operatorname{Var}\mathopen{}\left(Y_i\right)\mathclose{}} = \pi(1 - \pi)\$)}\\ &= \frac{1}{{\operatorname{Var}\mathopen{}\left(Y_i\right)\mathclose{}}} \delta_i && \text{(a fraction is its numerator times the reciprocal of its denominator)}\\ &= \tau\delta_i && \text{(definition of \$\tau\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 5 (Score contribution of one binary outcome)** If \\Y_i\sim \operatorname{Ber}(\pi)\\ has observed value \\y_i\in \mathopen{}\left\\0, 1\right\\\mathclose{}\\ and [precision](intro-MLEs.llms.md#def-precision-rv) \\\tau= 1 / {\operatorname{Var}\mathopen{}\left(Y_i\right)\mathclose{}} = 1 / \mathopen{}\left(\pi(1 - \pi)\right)\mathclose{}\\, its [score](intro-MLEs.llms.md#def-score) contribution is the precision times the [deviation](https://morrison-lab.github.io/pds/variance-covariance.html#def-deviation-pop-mean) \\\delta_i\stackrel{\text{def}}{=}y_i- \pi\\ of \\y_i\\ from its mean \\\pi\\:
>
> \\\ell'\_i(\pi) = \tau\delta_i\\
>
> The precision \\\tau\\ is the same for every \\i\\, because all \\Y_i\\ share the [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) \\\pi\\.

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 5](#exr-bernoulli-score-contribution), worked in [Solution 5](#sol-bernoulli-score-contribution).

### 1.6 The score function of the sample

> **NOTE:**
>
> **Exercise 6 (Score function of a binary sample)** In the setting of [Exercise 5](#exr-bernoulli-score-contribution), let \\\bar{y}\stackrel{\text{def}}{=}\frac{1}{n}\sum\_{i=1}^ny_i\\ be the [sample mean](exploratory-descriptive.llms.md#def-sample-mean) of the observed outcomes. Assemble the [score function](intro-MLEs.llms.md#def-score) \\\ell'(\pi)\\ of the whole [sample](exploratory-descriptive.llms.md#def-sample) from the [score](intro-MLEs.llms.md#def-score) contributions.

> **NOTE:**
>
> *Solution 6*. \\ \begin{aligned} \ell'(\pi) &= \sum\_{i=1}^n\ell'\_i(\pi) && \text{(score of an independent sample is the sum of the score contributions)}\\ &= \sum\_{i=1}^n\tau\delta_i && \text{(score contribution of a binary outcome)}\\ &= \tau\sum\_{i=1}^n\delta_i && \text{(\$\tau\$ is the same for every \$i\$)}\\ &= \tau\sum\_{i=1}^n(y_i- \pi) && \text{(definition of \$\delta_i\$)}\\ &= \tau\mathopen{}\left(\sum\_{i=1}^ny_i- \sum\_{i=1}^n\pi\right)\mathclose{} && \text{(split the sum)}\\ &= \tau\mathopen{}\left(\sum\_{i=1}^ny_i- n \pi\right)\mathclose{} && \text{(\$\textstyle\sum\_{i=1}^n\pi= n \pi\$)}\\ &= \tau\mathopen{}\left(n \bar{y}- n \pi\right)\mathclose{} && \text{(\$\textstyle\sum\_{i=1}^ny_i= n \bar{y}\$)}\\ &= n \tau(\bar{y}- \pi) && \text{(factor out \$n\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 6 (Score function of a binary sample)** If \\Y_i\\ \sim\_{\perp\\\\\\\perp}\\ \operatorname{Ber}(\pi)\\ for \\i= 1, \dots, n\\, with observed [sample mean](exploratory-descriptive.llms.md#def-sample-mean) \\\bar{y}\\ and [precision](intro-MLEs.llms.md#def-precision-rv) \\\tau= 1 / \mathopen{}\left(\pi(1 - \pi)\right)\mathclose{}\\, the [score function](intro-MLEs.llms.md#def-score) is:
>
> \\\ell'(\pi) = n \tau(\bar{y}- \pi)\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 6](#exr-bernoulli-score-sum), worked in [Solution 6](#sol-bernoulli-score-sum).

### 1.7 Solving the score equation

> **NOTE:**
>
> **Exercise 7 (Solving the score equation of a binary sample)** In the setting of [Exercise 6](#exr-bernoulli-score-sum), assume \\0 \< \bar{y}\< 1\\: the [sample](exploratory-descriptive.llms.md#def-sample) has at least one [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) and at least one non-event. Solve the [score equation](intro-MLEs.llms.md#def-score-equation) \\\ell'(\pi) = 0\\ for \\\pi\in (0, 1)\\.

> **NOTE:**
>
> *Solution 7*. For \\\pi\in (0, 1)\\, \\\tau= 1 / \mathopen{}\left(\pi(1 - \pi)\right)\mathclose{}\\ is finite and positive, and \\n \> 0\\, so \\n \tau\neq 0\\.
>
> \\ \begin{aligned} 0 &= \ell'(\pi) && \text{(score equation)}\\ 0 &= n \tau(\bar{y}- \pi) && \text{(score function of a binary sample)}\\ 0 &= \bar{y}- \pi && \text{(divide both sides by \$n \tau\neq 0\$)}\\ \pi&= \bar{y} && \text{(add \$\pi\$ to both sides)} \end{aligned} \\
>
> Since \\0 \< \bar{y}\< 1\\, this solution lies in \\(0, 1)\\.

> **NOTE:**
>
> **Theorem 7 (Solution of the score equation of a binary sample)** If \\Y_i\\ \sim\_{\perp\\\\\\\perp}\\ \operatorname{Ber}(\pi)\\ for \\i= 1, \dots, n\\ and the observed [sample mean](exploratory-descriptive.llms.md#def-sample-mean) satisfies \\0 \< \bar{y}\< 1\\, then the [score equation](intro-MLEs.llms.md#def-score-equation) \\\ell'(\pi) = 0\\ has exactly one solution in \\(0, 1)\\: the sample mean \\\pi= \bar{y}\\.

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 7](#exr-bernoulli-score-equation), worked in [Solution 7](#sol-bernoulli-score-equation).

### 1.8 Hessian contributions

> **NOTE:**
>
> **Exercise 8 (Hessian contribution of one binary outcome)** In the setting of [Exercise 5](#exr-bernoulli-score-contribution), derive the [Hessian](intro-MLEs.llms.md#def-hessian) contribution \\\ell''\_i(\pi) \stackrel{\text{def}}{=}\frac{\partial}{\partial \pi} \ell'\_i(\pi)\\ of observation \\i\\. Start from the [score](intro-MLEs.llms.md#def-score) contribution written as a difference of two fractions, \\\ell'\_i(\pi) = y_i/ \pi- (1 - y_i) / (1 - \pi)\\, the form in [Solution 4](#sol-derive-bernoulli-score) before its fractions are combined.

> **NOTE:**
>
> *Solution 8*. \\ \begin{aligned} \ell''\_i(\pi) &= \frac{\partial}{\partial \pi} \ell'\_i(\pi) && \text{(definition of the Hessian contribution)}\\ &= \frac{\partial}{\partial \pi} \mathopen{}\left(\frac{y_i}{\pi} - \frac{1 - y_i}{1 - \pi}\right)\mathclose{} && \text{(score contribution as a difference of fractions)}\\ &= \frac{\partial}{\partial \pi} \mathopen{}\left(y_i\pi^{-1} - (1 - y_i) (1 - \pi)^{-1}\right)\mathclose{} && \text{(write each fraction as a negative power)}\\ &= y_i\frac{\partial}{\partial \pi} \pi^{-1} - (1 - y_i) \frac{\partial}{\partial \pi} (1 - \pi)^{-1} && \text{(linearity and constant multiple rule)} \end{aligned} \\
>
> The first derivative is:
>
> \\ \frac{\partial}{\partial \pi} \pi^{-1} = -\pi^{-2} \qquad \text{(power rule)} \\
>
> The second derivative needs the chain rule:
>
> \\ \begin{aligned} \frac{\partial}{\partial \pi} (1 - \pi)^{-1} &= -(1 - \pi)^{-2} \frac{\partial}{\partial \pi} (1 - \pi) && \text{(chain rule and power rule)}\\ &= -(1 - \pi)^{-2} (-1) && \text{(\$\frac{\partial}{\partial \pi} (1 - \pi) = -1\$, as in the score exercise)}\\ &= (1 - \pi)^{-2} && \text{(multiply)} \end{aligned} \\
>
> Substituting both derivatives back in:
>
> \\ \begin{aligned} \ell''\_i(\pi) &= y_i\mathopen{}\left(-\pi^{-2}\right)\mathclose{} - (1 - y_i) (1 - \pi)^{-2} && \text{(substitute the two derivatives)}\\ &= -\frac{y_i}{{\mathopen{}\left(\pi\right)\mathclose{}}^{2}} - \frac{1 - y_i}{{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}} && \text{(write the negative powers as fractions)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 8 (Hessian contribution of one binary outcome)** If \\Y_i\sim \operatorname{Ber}(\pi)\\ has observed value \\y_i\in \mathopen{}\left\\0, 1\right\\\mathclose{}\\, its [Hessian](intro-MLEs.llms.md#def-hessian) contribution is:
>
> \\\ell''\_i(\pi) = -\frac{y_i}{{\mathopen{}\left(\pi\right)\mathclose{}}^{2}} - \frac{1 - y_i}{{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 8](#exr-bernoulli-hessian-contribution), worked in [Solution 8](#sol-bernoulli-hessian-contribution).

### 1.9 The Hessian of the sample

> **NOTE:**
>
> **Exercise 9 (Hessian of a binary sample)** In the setting of [Exercise 6](#exr-bernoulli-score-sum), assemble the [Hessian](intro-MLEs.llms.md#def-hessian) \\\ell''(\pi)\\ of the whole [sample](exploratory-descriptive.llms.md#def-sample) from the Hessian contributions.

> **NOTE:**
>
> *Solution 9*. \\ \begin{aligned} \ell''(\pi) &= \sum\_{i=1}^n\ell''\_i(\pi) && \text{(the derivative of a sum is the sum of the derivatives)}\\ &= \sum\_{i=1}^n\mathopen{}\left(-\frac{y_i}{{\mathopen{}\left(\pi\right)\mathclose{}}^{2}} - \frac{1 - y_i}{{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}}\right)\mathclose{} && \text{(Hessian contribution of a binary outcome)}\\ &= -\frac{1}{{\mathopen{}\left(\pi\right)\mathclose{}}^{2}} \sum\_{i=1}^ny_i- \frac{1}{{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}} \sum\_{i=1}^n(1 - y_i) && \text{(split the sum; the denominators do not depend on \$i\$)}\\ &= -\frac{n \bar{y}}{{\mathopen{}\left(\pi\right)\mathclose{}}^{2}} - \frac{1}{{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}} \mathopen{}\left(n - n \bar{y}\right)\mathclose{} && \text{(\$\textstyle\sum\_{i=1}^ny_i= n \bar{y}\$ and \$\textstyle\sum\_{i=1}^n1 = n\$)}\\ &= -\frac{n \bar{y}}{{\mathopen{}\left(\pi\right)\mathclose{}}^{2}} - \frac{n (1 - \bar{y})}{{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}} && \text{(factor out \$n\$)}\\ &= -n \mathopen{}\left(\frac{\bar{y}}{{\mathopen{}\left(\pi\right)\mathclose{}}^{2}} + \frac{1 - \bar{y}}{{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}}\right)\mathclose{} && \text{(factor out \$-n\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 9 (Hessian of a binary sample)** If \\Y_i\\ \sim\_{\perp\\\\\\\perp}\\ \operatorname{Ber}(\pi)\\ for \\i= 1, \dots, n\\, with observed [sample mean](exploratory-descriptive.llms.md#def-sample-mean) \\\bar{y}\\, the [Hessian](intro-MLEs.llms.md#def-hessian) of the [log-likelihood](intro-MLEs.llms.md#def-loglik) is the \\1 \times 1\\ matrix whose only entry is:
>
> \\\ell''(\pi) = -n \mathopen{}\left(\frac{\bar{y}}{{\mathopen{}\left(\pi\right)\mathclose{}}^{2}} + \frac{1 - \bar{y}}{{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}}\right)\mathclose{}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 9](#exr-bernoulli-hessian-sum), worked in [Solution 9](#sol-bernoulli-hessian-sum).

### 1.10 Checking that the Hessian is negative definite

> **NOTE:**
>
> **Exercise 10 (Negative definiteness of the Hessian of a binary sample)** In the setting of [Exercise 9](#exr-bernoulli-hessian-sum), show that the [Hessian](intro-MLEs.llms.md#def-hessian) \\\ell''(\pi)\\ is negative definite for every \\\pi\in (0, 1)\\.

> **NOTE:**
>
> *Solution 10*. A \\1 \times 1\\ matrix is negative definite exactly when its only entry is negative, so it is enough to show \\\ell''(\pi) \< 0\\.
>
> Fix \\\pi\in (0, 1)\\. Then:
>
> - \\{\mathopen{}\left(\pi\right)\mathclose{}}^{2} \> 0\\ and \\{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2} \> 0\\;
> - \\\bar{y}\ge 0\\ and \\1 - \bar{y}\ge 0\\, because \\y_i\in \mathopen{}\left\\0, 1\right\\\mathclose{}\\;
> - \\\bar{y}\\ and \\1 - \bar{y}\\ are not both zero, because they sum to \\1\\.
>
> So \\\bar{y}/ {\mathopen{}\left(\pi\right)\mathclose{}}^{2} + (1 - \bar{y}) / {\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}\\ is a sum of two nonnegative terms, at least one of them positive. It is therefore positive, and with \\n \> 0\\:
>
> \\ \ell''(\pi) = -n \mathopen{}\left(\frac{\bar{y}}{{\mathopen{}\left(\pi\right)\mathclose{}}^{2}} + \frac{1 - \bar{y}}{{\mathopen{}\left(1 - \pi\right)\mathclose{}}^{2}}\right)\mathclose{} \< 0 \\
>
> This holds for every \\\pi\in (0, 1)\\.

> **NOTE:**
>
> **Theorem 10 (Negative definiteness of the Hessian of a binary sample)** If \\Y_i\\ \sim\_{\perp\\\\\\\perp}\\ \operatorname{Ber}(\pi)\\ for \\i= 1, \dots, n\\, the [Hessian](intro-MLEs.llms.md#def-hessian) \\\ell''(\pi)\\ of the [log-likelihood](intro-MLEs.llms.md#def-loglik) is negative definite for every \\\pi\in (0, 1)\\, whatever the observed outcomes. Hence the log-likelihood is strictly concave on \\(0, 1)\\.

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 10](#exr-bernoulli-hessian-nd), worked in [Solution 10](#sol-bernoulli-hessian-nd). It builds on [Theorem 9](#thm-bernoulli-hessian-sum).

### 1.11 The maximum likelihood estimate

> **NOTE:**
>
> **Exercise 11 (Maximum likelihood estimate of a binary sample)** In the setting of [Exercise 7](#exr-bernoulli-score-equation), use [Theorem 10](#thm-bernoulli-hessian-nd) to find the [maximum likelihood estimate](intro-MLEs.llms.md#def-mle) \\\hat{\pi}\_{\text{ML}}\\ of \\\pi\\.

> **NOTE:**
>
> *Solution 11*. By [Theorem 10](#thm-bernoulli-hessian-nd), \\\ell\\ is strictly concave on \\(0, 1)\\. A strictly concave [function](https://morrison-lab.github.io/mds/functions.html#def-function) that has a [critical point](intro-MLEs.llms.md#def-critical-point) is maximized there, and nowhere else. With \\0 \< \bar{y}\< 1\\, [Theorem 7](#thm-bernoulli-score-equation) says the only critical point of \\\ell\\ in \\(0, 1)\\ is \\\bar{y}\\. So \\\ell\\ is maximized at \\\pi= \bar{y}\\.

> **NOTE:**
>
> **Theorem 11 (Maximum likelihood estimate of a binary sample)** If \\Y_i\\ \sim\_{\perp\\\\\\\perp}\\ \operatorname{Ber}(\pi)\\ for \\i= 1, \dots, n\\ and the observed [sample mean](exploratory-descriptive.llms.md#def-sample-mean) satisfies \\0 \< \bar{y}\< 1\\, the [maximum likelihood estimate](intro-MLEs.llms.md#def-mle) of \\\pi\\ is the sample mean:
>
> \\\hat{\pi}\_{\text{ML}} = \bar{y}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 11](#exr-bernoulli-mle), worked in [Solution 11](#sol-bernoulli-mle). It builds on [Theorem 7](#thm-bernoulli-score-equation) and [Theorem 10](#thm-bernoulli-hessian-nd).

Back to top

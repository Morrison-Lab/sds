# Maximum Likelihood for More Distributions

Code

Published

Last modified: 2026-10-22 02:35:59 (PDT)

## 1 Maximum likelihood for Poisson and exponential models

### 1.1 The score of a Poisson variable

> **NOTE:**
>
> **Exercise 1 (Score function of a Poisson variable)** Derive the score function for a single Poisson random variable \\X\\, with respect to its mean parameter \\{\lambda}\\.

> **NOTE:**
>
> *Solution 1*. The log-likelihood of one Poisson observation is \\\ell= x {\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}} - {\lambda}- {\operatorname{log}\mathopen{}\left\\x!\right\\\mathclose{}}\\, so:
>
> \\ \begin{aligned} \ell' &\stackrel{\text{def}}{=}\frac{\partial}{\partial {\lambda}}\ell && \text{(definition of the score)}\\ &= \frac{\partial}{\partial {\lambda}}\mathopen{}\left(x{\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}} - {\lambda}- {\operatorname{log}\mathopen{}\left\\x!\right\\\mathclose{}}\right)\mathclose{} && \text{(Poisson log-likelihood)}\\ &= \frac{\partial}{\partial {\lambda}}\mathopen{}\left(x{\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}}\right)\mathclose{} - \frac{\partial}{\partial {\lambda}}{\lambda}- \frac{\partial}{\partial {\lambda}}{\operatorname{log}\mathopen{}\left\\x!\right\\\mathclose{}} && \text{(linearity of differentiation)}\\ &= \frac{\partial}{\partial {\lambda}}\mathopen{}\left(x{\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}}\right)\mathclose{} - \frac{\partial}{\partial {\lambda}}{\lambda}- 0 && \text{(derivative of a constant)}\\ &= \frac{\partial}{\partial {\lambda}}\mathopen{}\left(x{\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}}\right)\mathclose{} - \frac{\partial}{\partial {\lambda}}{\lambda} && \text{(drop the zero term)}\\ &= x\frac{\partial}{\partial {\lambda}}{\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}} - \frac{\partial}{\partial {\lambda}}{\lambda} && \text{(constant multiple rule)}\\ &= x{\lambda}^{-1} - \frac{\partial}{\partial {\lambda}}{\lambda} && \text{(derivative of \$\log {\lambda}\$)}\\ &= x{\lambda}^{-1} - 1 && \text{(derivative of \${\lambda}\$ with respect to itself)}\\ &= \frac{x}{{\lambda}} - 1 && \text{(write the negative power as a fraction)}\\ &= \frac{x}{{\lambda}} - \frac{{\lambda}}{{\lambda}} && \text{(write both terms over the common denominator)}\\ &= \frac{x - {\lambda}}{{\lambda}} && \text{(combine the fractions)}\\ &= \frac{x - {\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}}{{\lambda}} && \text{(\${\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}} = {\lambda}\$)}\\ &= \frac{x - {\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}}{{\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}} && \text{(\${\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}} = {\lambda}\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 1 (Score function of a Poisson variable)** Let \\X \sim \operatorname{Pois}({\lambda})\\, with mean \\{\lambda}\\ and observed count \\x\\. The [score](intro-MLEs.llms.md#def-score) \\\ell'\\ of the single observation \\x\\ is the derivative of its log-likelihood \\\ell\\ with respect to \\{\lambda}\\. It equals the deviation of \\x\\ from the mean \\{\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}\\, divided by the variance \\{\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}\\:
>
> \\\ell'= \frac{x - {\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}}{{\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}} = \frac{x - {\lambda}}{{\lambda}}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 1](#exr-pois-score-fn), worked in [Solution 1](#sol-pois-score-fn).

### 1.2 The score of an exponential variable

> **NOTE:**
>
> **Exercise 2 (Score function of an exponential variable)** Derive the score function for a single exponential random variable \\X\\, with respect to the mean parameter \\\mu\\.

> **NOTE:**
>
> *Solution 2*. The exponential density with mean \\\mu\\ is
>
> \\ \operatorname{p}(X = x) = \mu^{-1} e^{-x/\mu} \\
>
> for \\x \> 0\\, so \\\ell= -{\operatorname{log}\mathopen{}\left\\\mu\right\\\mathclose{}} - \frac{x}{\mu}\\, and:
>
> \\ \begin{aligned} \ell' &\stackrel{\text{def}}{=}\frac{\partial}{\partial \mu}\ell && \text{(definition of the score)}\\ &= \frac{\partial}{\partial \mu}\mathopen{}\left(-{\operatorname{log}\mathopen{}\left\\\mu\right\\\mathclose{}} - \frac{x}{\mu}\right)\mathclose{} && \text{(exponential log-likelihood)}\\ &= \frac{\partial}{\partial \mu}\mathopen{}\left(-{\operatorname{log}\mathopen{}\left\\\mu\right\\\mathclose{}} - x \mu^{-1}\right)\mathclose{} && \text{(write \$\frac{x}{\mu}\$ as \$x \mu^{-1}\$)}\\ &= \frac{\partial}{\partial \mu}\mathopen{}\left(-{\operatorname{log}\mathopen{}\left\\\mu\right\\\mathclose{}}\right)\mathclose{} - \frac{\partial}{\partial \mu}\mathopen{}\left(x \mu^{-1}\right)\mathclose{} && \text{(linearity of differentiation)}\\ &= -\frac{\partial}{\partial \mu}{\operatorname{log}\mathopen{}\left\\\mu\right\\\mathclose{}} - x \frac{\partial}{\partial \mu} \mu^{-1} && \text{(constant multiple rule)}\\ &= -\mu^{-1} - x \frac{\partial}{\partial \mu} \mu^{-1} && \text{(derivative of \$\log \mu\$)}\\ &= -\mu^{-1} - x \mathopen{}\left(-\mu^{-2}\right)\mathclose{} && \text{(power rule)}\\ &= -\mu^{-1} + x \mu^{-2} && \text{(multiply)}\\ &= -\frac{1}{\mu} + \frac{x}{\mu^2} && \text{(write the negative powers as fractions)}\\ &= -\frac{\mu}{\mu^2} + \frac{x}{\mu^2} && \text{(write both terms over the common denominator)}\\ &= \frac{-\mu+ x}{\mu^2} && \text{(combine the fractions)}\\ &= \frac{x - \mu}{\mu^2} && \text{(reorder the numerator)}\\ &= \frac{x - {\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}}{\mu^2} && \text{(\${\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}} = \mu\$)}\\ &= \frac{x - {\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}}{{\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}} && \text{(\${\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}} = \mu^2\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 2 (Score function of an exponential variable)** Let \\X\\ be an exponential random variable with mean \\\mu\\ and observed value \\x \> 0\\. The [score](intro-MLEs.llms.md#def-score) \\\ell'\\ of the single observation \\x\\ is the derivative of its log-likelihood \\\ell\\ with respect to \\\mu\\. It equals the deviation of \\x\\ from the mean \\{\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}\\, divided by the variance \\{\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}\\:
>
> \\\ell'= \frac{x - {\operatorname{E}\mathopen{}\left\[X\right\]\mathclose{}}}{{\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}} = \frac{x - \mu}{\mu^2}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 2](#exr-exp-score-fn), worked in [Solution 2](#sol-exp-score-fn).

Back to top

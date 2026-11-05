# Simulation Studies

Code

Published

Last modified: 2026-11-04 17:53:38 (PST)

Theory often cannot give the [bias](estimation.llms.md#def-bias), [variance](https://morrison-lab.github.io/pds/variance-covariance.html#def-variance) or coverage of an [estimator](estimation.llms.md#def-estimator) when the estimator or the data distribution is complicated. A [simulation study](#def-simulation-study) measures the same properties for any estimator a computer can run. It generates many [data sets](model-validation.llms.md#def-data-set) from a distribution whose parameters are known, applies the estimator to each, and summarizes the results.

This page defines the parts of a [simulation study](#def-simulation-study).

# 1 The data-generating process

> **NOTE:**
>
> **Definition 1 (Data-generating process)** The **data-generating process (DGP)** of a simulation is the joint [probability distribution](https://morrison-lab.github.io/pds/random-variables.html#def-random-variable) $F_{\theta_0}$ from which it draws its data $X_1, \ldots, X_n$, with the number of [observations](exploratory-descriptive.llms.md#def-observation) $n$ and the parameter value $\theta_0$ fixed and known:
>
> $$X_1, \ldots, X_n \sim F_{\theta_0}.$$

> **NOTE:**
>
> **Example 1 (A normal data-generating process)**  
>
> Let $X_1, \ldots, X_n$ be [IID](https://morrison-lab.github.io/pds/independence.html#def-iid) [normal](https://morrison-lab.github.io/pds/random-variables.html#def-normal) random variables with [expectation](https://morrison-lab.github.io/pds/expectation.html#def-expectation) $\mu= 0$ and [variance](https://morrison-lab.github.io/pds/variance-covariance.html#def-variance) $\sigma^2= 4$, with $n = 10$. The distribution of these variables is a [data-generating process](#def-data-generating-process), and the [estimand](estimation.llms.md#def-estimand) $\sigma^2= 4$ is known exactly, so the error of any [estimator](estimation.llms.md#def-estimator) of $\sigma^2$ can be computed.

# 2 Replications and simulation studies

> **NOTE:**
>
> **Definition 2 (Replication)** A **replication** of a simulation is one run of its steps: draw a [data set](model-validation.llms.md#def-data-set) $X_1, \ldots, X_n^{(m)}$ from the [data-generating process](#def-data-generating-process), then compute the [estimate](estimation.llms.md#def-estimate) $T_m \stackrel{\text{def}}{=}\hat{\theta}\mathopen{}\left(X_1, \ldots, X_n^{(m)}\right)\mathclose{}$, where $\hat{\theta}$ is an [estimator](estimation.llms.md#def-estimator), for $m = 1, \ldots, M$. Different replications draw their [data sets](model-validation.llms.md#def-data-set) independently.

> **NOTE:**
>
> **Example 2 (A replication of the normal data-generating process)**  
>
> For the [normal data-generating process](#exm-data-generating-process), one [replication](#def-replication) draws $n = 10$ values from the [normal distribution](https://morrison-lab.github.io/pds/random-variables.html#def-normal) with [expectation](https://morrison-lab.github.io/pds/expectation.html#def-expectation) $0$ and [variance](https://morrison-lab.github.io/pds/variance-covariance.html#def-variance) $4$. It then computes the [estimate](estimation.llms.md#def-estimate) $T_m$ of the variance $\sigma^2$ from those 10 values. A second replication draws 10 new values, independently of the first, and computes $T_{m + 1}$.

> **NOTE:**
>
> **Definition 3 (Simulation study)** A **simulation study** runs $M$ [replications](#def-replication) of one [data-generating process](#def-data-generating-process) and one [estimator](estimation.llms.md#def-estimator), then summarizes the [estimates](estimation.llms.md#def-estimate) $T_1, \ldots, T_M$ to learn the estimator’s [sampling distribution](estimation.llms.md#def-sampling-distribution).

> **NOTE:**
>
> **Example 3 (A simulation study of a variance estimator)**  
>
> For the [normal data-generating process](#exm-data-generating-process), a [simulation study](#def-simulation-study) of one [estimator](estimation.llms.md#def-estimator) of the [variance](https://morrison-lab.github.io/pds/variance-covariance.html#def-variance) $\sigma^2$ runs $M$ [replications](#exm-replication) of that process and that estimator. The $M$ [estimates](estimation.llms.md#def-estimate) $T_1, \ldots, T_M$ then show how the estimator behaves across repeated [data sets](model-validation.llms.md#def-data-set).

# 3 Simulation estimates

> **NOTE:**
>
> **Definition 4 (Simulation estimate)** A **simulation estimate** of the [expectation](https://morrison-lab.github.io/pds/expectation.html#def-expectation) ${\mathbb{E}\mathopen{}\left[T\right]\mathclose{}}$ of an [estimate](estimation.llms.md#def-estimate) $T$ is the average of the [replications](#def-replication)’ [estimates](estimation.llms.md#def-estimate) $T_1, \ldots, T_M$:
>
> $${{\bar{T}}_{M}} \stackrel{\text{def}}{=}\frac{1}{M}\sum_{m=1}^{M} T_m.$$

> **NOTE:**
>
> **Example 4 (A simulation estimate from three replications)**  
>
> Suppose $M = 3$ [replications](#def-replication) give the [estimates](estimation.llms.md#def-estimate) $T_1 = 3$, $T_2 = 5$ and $T_3 = 4$. Then the [simulation estimate](#def-simulation-estimate) of ${\mathbb{E}\mathopen{}\left[T\right]\mathclose{}}$ is
>
> $${{\bar{T}}_{3}} = \frac{3 + 5 + 4}{3} = 4.$$

> **NOTE:**
>
> **Definition 5 (Simulation estimate of the bias)** Let $\theta$ be an [estimand](estimation.llms.md#def-estimand), let $\hat{\theta}$ be an [estimator](estimation.llms.md#def-estimator), and let $T_1, \ldots, T_M$ be its [estimates](estimation.llms.md#def-estimate) from $M$ [replications](#def-replication). The **simulation estimate of the [bias](estimation.llms.md#def-bias)** of $\hat{\theta}$ is the [simulation estimate](#def-simulation-estimate) ${{\bar{T}}_{M}}$ of ${\mathbb{E}\mathopen{}\left[\hat{\theta}\right]\mathclose{}}$, minus $\theta$:
>
> $${{\bar{T}}_{M}} - \theta.$$

> **NOTE:**
>
> **Example 5 (A simulation estimate of the bias from three replications)**  
>
> Continue the [three replications](#exm-simulation-estimate), and let the [estimand](estimation.llms.md#def-estimand) be $\theta= 5$. Then the [simulation estimate of the bias](#def-simulation-bias-estimate) is
>
> $${{\bar{T}}_{3}} - \theta= 4 - 5 = -1.$$

> **NOTE:**
>
> **Definition 6 (Simulation estimate of the mean squared error)** Let $\theta$ be an [estimand](estimation.llms.md#def-estimand), let $\hat{\theta}$ be an [estimator](estimation.llms.md#def-estimator), and let $T_1, \ldots, T_M$ be its [estimates](estimation.llms.md#def-estimate) from $M$ [replications](#def-replication). The **[simulation estimate](#def-simulation-estimate) of the [mean squared error](estimation.llms.md#def-mse)** of $\hat{\theta}$ is the average of the squared differences $\mathopen{}\left(T_m - \theta\right)\mathclose{}^2$:
>
> $$\frac{1}{M}\sum_{m=1}^{M} \mathopen{}\left(T_m - \theta\right)\mathclose{}^2.$$

> **NOTE:**
>
> **Example 6 (A simulation estimate of the mean squared error from three replications)**  
>
> Continue the [three replications](#exm-simulation-estimate) with $\theta= 5$. The squared differences are $\mathopen{}\left(3 - 5\right)\mathclose{}^2= 4$, $\mathopen{}\left(5 - 5\right)\mathclose{}^2= 0$ and $\mathopen{}\left(4 - 5\right)\mathclose{}^2= 1$, so the [simulation estimate of the mean squared error](#def-simulation-mse-estimate) is
>
> $$\frac{4 + 0 + 1}{3} = \frac{5}{3}.$$

> **NOTE:**
>
> *Remark 1* (Simulation estimates in Bayesian inference). The [Monte Carlo estimate](bayesian-inference.llms.md#def-monte-carlo-estimate) of a [posterior](bayesian-inference.llms.md#def-posterior) [expectation](https://morrison-lab.github.io/pds/expectation.html#def-expectation) is the same average, taken over draws from a [posterior distribution](bayesian-inference.llms.md#def-posterior) instead of over [replications](#def-replication) of a [data-generating process](#def-data-generating-process).

# Definitions on this page

- [Definition 1 (Data-generating process)](#def-data-generating-process)
- [Definition 2 (Replication)](#def-replication)
- [Definition 3 (Simulation study)](#def-simulation-study)
- [Definition 4 (Simulation estimate)](#def-simulation-estimate)
- [Definition 5 (Simulation estimate of the bias)](#def-simulation-bias-estimate)
- [Definition 6 (Simulation estimate of the mean squared error)](#def-simulation-mse-estimate)

# References

Back to top

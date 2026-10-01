# Estimation

Code

Published

Last modified: 2026-10-01 16:43:20 (PDT)

## 1 Scientific models

> **NOTE:**
>
> **Definition 1 (Scientific models)** **Scientific models** are attempts to describe *physical conditions or changes* that occur in the world and universe around us.

> **NOTE:**
>
> **Example 1 (Scientific models in epidemiology)** Epidemiologists typically study *biological conditions and changes*, such as the spread of infectious diseases through populations, or the effects of environmental factors on individuals.

### 1.1 Models as approximations

> …Essentially, all models are wrong, but some are useful. **However, the approximate nature of the model must always be borne in mind.**

\[Box and Draper ([1987](#ref-box_draper_1987)), p. 424; emphasis added\]

See also ([Dunn and Smyth 2018, sec. 1.8](#ref-dunn2018generalized)).

### 1.2 Statistical analysis of scientific models

When we perform statistical analyses, we use data to help us choose between models; specifically, to determine which models best explain those data.

Physical processes do not produce data on their own. Data are only produced when scientists implement an *observation process* (that is, a *scientific study*), which is distinct from the underlying *physical process*. In some cases, the observation process and the physical process interact with each other; this interaction is called the [“observer effect”](https://en.wikipedia.org/wiki/Observer_effect).

To learn about the physical processes we are ultimately interested in, we often need to account for the observation process that produced the data we are analyzing. In particular, if some of the planned observations in the study design were not completed, we will likely need to account for the incompleteness of the resulting data set in our analysis. If we are not sure why some observations are incomplete, we may need to model the observation process in addition to the physical process we were originally interested in. For example, if some participants in a study dropped out part-way through, we may need to investigate why those participants dropped out, as opposed to other participants who completed the study.

These kinds of *missing data* issues are outside the scope of these notes; see Van Buuren ([2018](#ref-van2018flexible)) for more details.

## 2 Estimands, estimates, and estimators

### 2.1 Estimands

> **NOTE:**
>
> **Definition 2 (Estimand)** An **estimand** is an unknown quantity whose value we want to know ([Pohl et al. 2021](#ref-pohl2021estimands); [Lawrance et al. 2020](#ref-lawrance2020estimand)).

> **NOTE:**
>
> **Example 2 (Mean height of students)** If we are trying to determine the mean height of students at our school, then the *population mean* is our [estimand](#def-estimand).

In statistical contexts, most estimands are parameters of probabilistic models, or functions of model parameters.

> **NOTE:**
>
> Model parameters and other estimands are often symbolized using lower-case Greek letters: \\\alpha, \beta, \gamma, \delta\\, etc.

### 2.2 Estimates

> **NOTE:**
>
> **Definition 3 (Estimate/estimated value)** In statistics, an **estimate** or **estimated value** is an informed guess of an [estimand](#def-estimand)’s value, based on observed data.

> **NOTE:**
>
> **Example 3 (Mean height of students)** Suppose we measure the heights of 50 randomly sampled students from our school, and their [sample mean](exploratory-descriptive.llms.md#def-sample-mean) is 175 cm. We might use 175 cm as an [*estimate*](#def-estimate) of the population mean.

### 2.3 Estimators

> **NOTE:**
>
> **Definition 4 (Estimator)** An **estimator** is a function \\\hat\theta(x_1, \ldots, x_n)\\ that transforms data \\x_1, \ldots, x_n\\ into an [estimate](#def-estimate).

> **NOTE:**
>
> When an estimator is applied to random variables \\X_1, \ldots, X_n\\ rather than to their observed values, the result \\\hat\theta(X_1, \ldots, X_n)\\ is also a random variable.

> **NOTE:**
>
> Estimators are often symbolized by placing a ^ (“hat”) symbol on top of the corresponding estimand; for example, \\\hat\theta\\.
>
> Usually, their dependence on the data is implicit:
>
> \\\hat\theta\stackrel{\text{def}}{=}\hat\theta(x_1, \ldots, x_n)\\

> **NOTE:**
>
> **Example 4 (Mean height of students)** Suppose we want to estimate the mean height of students at our school, which we will represent as \\\mu\\, and we measure the heights of \\n = 50\\ randomly sampled students as random variables \\X_1, \ldots, X_n\\. Then we could use the function
>
> \\\hat\mu(X_1, \ldots, X_n) \stackrel{\text{def}}{=}\frac{1}{n} \sum\_{i=1}^n X_i \stackrel{\text{def}}{=}\bar X\\
>
> as an [*estimator*](#def-estimator) to produce an *estimate* \\\hat\mu = \bar x\\ of \\\mu\\.
>
> Another estimator would be just the height of the first student sampled:
>
> \\\hat\mu^{(2)}(X_1, \ldots, X_n) \stackrel{\text{def}}{=}X_1\\
>
> A third possible estimator would be the mean of all sampled students’ heights, except for the two most extreme. Using the [order statistics](nonparametric-models.llms.md#def-order-statistics) \\X\_{(1)} \le X\_{(2)} \le \cdots \le X\_{(n)}\\ (the observations sorted in increasing order), this estimator drops \\X\_{(1)}\\ and \\X\_{(n)}\\ and averages the remaining \\n - 2\\ observations:
>
> \\\hat\mu^{(3)}(X_1, \ldots, X_n) \stackrel{\text{def}}{=}\frac{1}{n-2}\sum\_{i=2}^{n-1} X\_{(i)}\\
>
> Which of these estimators is best? The answer depends on how we evaluate them (see [Section 3](#sec-est-accuracy)).

### 2.4 Contrasting estimands, estimates, and estimators

It’s helpful to keep in mind the mathematical type of each estimation concept:

- [estimands](#def-estimand) are numbers (or vectors of numbers);
- [estimates](#def-estimate) are also numbers (or vectors);
- [estimators](#def-estimator) are functions; an estimator applied to random data, \\\hat\theta(X_1, \ldots, X_n)\\, is a random variable.

## 3 Accuracy of estimators

### 3.1 Accuracy

To determine which estimator is best, we need to define *best*. Accuracy is usually most important, and ease of computation is usually secondary.

### 3.2 Estimation error

> **NOTE:**
>
> **Definition 5 (Estimation error)** The **estimation error** of an estimate \\\hat\theta\\ of a true value \\\theta\\ is the difference between the estimate and the estimand \\\theta\\:
>
> \\\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{} \stackrel{\text{def}}{=}\hat\theta- \theta\\

> **NOTE:**
>
> **Example 5 (Estimation error of a mean height)** Continuing [Example 3](#exm-estimate), suppose the population mean height of students at our school were actually \\\mu = 172\\ cm. Then the estimate \\\hat\mu = 175\\ cm would have estimation error:
>
> \\ \begin{aligned} \varepsilon\mathopen{}\left(\hat\mu\right)\mathclose{} &= \hat\mu - \mu && \text{(definition of estimation error)}\\ &= 175 - 172 && \text{(substitute the estimate and the estimand)}\\ &= 3 \text{ cm} \end{aligned} \\
>
> In practice we never observe an estimation error, because we do not know the estimand’s value; if we did, we would not need to estimate it.

The accuracy of an estimator has no single, agreed formal definition. The usual measures of accuracy, including the bias, mean squared error, and mean absolute error defined in this section, are all functions of the distribution of the estimator’s [estimation error](#def-estimation-error).

### 3.3 Residuals

See [Linear-model residual definitions and terminology](https://morrison-lab.github.io/rme/chapters/Linear-models-overview.html#sec-lm-residuals) for residual definitions and for the relationship between residuals, model deviations, and estimation error.

### 3.4 Bias

> **NOTE:**
>
> **Definition 6 (Bias)** The **bias** of an estimator \\\hat\theta\\ for an estimand \\\theta\\ is the expected value of the [estimation error](#def-estimation-error):
>
> \\\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{} \stackrel{\text{def}}{=}\operatorname{E}\mathopen{}\left\[\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{}\right\]\mathclose{} \tag{1}\\

> **NOTE:**
>
> **Theorem 1 (Bias equals expectation minus truth)** \\\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{} = \operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{} - \theta\\

> **NOTE:**
>
> *Proof*. \\ \begin{aligned} \operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{} &\stackrel{\text{def}}{=}\operatorname{E}\mathopen{}\left\[\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{}\right\]\mathclose{} && \text{(definition of bias)}\\ &= \operatorname{E}\mathopen{}\left\[\hat\theta- \theta\right\]\mathclose{} && \text{(definition of estimation error)}\\ &= \operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{} - \operatorname{E}\mathopen{}\left\[\theta\right\]\mathclose{} && \text{(linearity of expectation)}\\ &= \operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{} - \theta && \text{(\$\theta\$ is a constant)} \end{aligned} \\

> **NOTE:**
>
> **Example 6 (Bias of two estimators of a mean)** Let \\X_1, \ldots, X_n\\ each have expectation \\\operatorname{E}\mathopen{}\left\[X_i\right\]\mathclose{} = \mu\\, as in [Example 4](#exm-estimator). By [Theorem 1](#thm-bias-exprs), the bias of the sample mean \\\bar X\\ is:
>
> \\ \begin{aligned} \operatorname{Bias}\mathopen{}\left(\bar X\right)\mathclose{} &= \operatorname{E}\mathopen{}\left\[\bar X\right\]\mathclose{} - \mu && \text{(bias equals expectation minus truth)}\\ &= \operatorname{E}\mathopen{}\left\[\frac{1}{n}\sum\_{i=1}^n X_i\right\]\mathclose{} - \mu && \text{(definition of \$\bar X\$)}\\ &= \frac{1}{n}\sum\_{i=1}^n \operatorname{E}\mathopen{}\left\[X_i\right\]\mathclose{} - \mu && \text{(linearity of expectation)}\\ &= \frac{1}{n} \cdot n\mu - \mu && \text{(\$\operatorname{E}\mathopen{}\left\[X_i\right\]\mathclose{} = \mu\$ for every \$i\$)}\\ &= 0 \end{aligned} \\
>
> and the bias of the single-observation estimator \\\hat\mu^{(2)} = X_1\\ is:
>
> \\ \begin{aligned} \operatorname{Bias}\mathopen{}\left(X_1\right)\mathclose{} &= \operatorname{E}\mathopen{}\left\[X_1\right\]\mathclose{} - \mu && \text{(bias equals expectation minus truth)}\\ &= \mu - \mu && \text{(\$\operatorname{E}\mathopen{}\left\[X_1\right\]\mathclose{} = \mu\$)}\\ &= 0 \end{aligned} \\
>
> So both estimators have zero bias, even though \\\bar X\\ uses all \\n\\ observations and \\X_1\\ uses only one.

### 3.5 Mean squared error

> **NOTE:**
>
> **Definition 7 (Mean squared error)** The **mean squared error** of an estimator \\\hat\theta\\, denoted \\\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{}\\, is the expectation of the square of the [estimation error](#def-estimation-error):
>
> \\\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} \stackrel{\text{def}}{=}\operatorname{E}\mathopen{}\left\[\mathopen{}\left(\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{}\right\]\mathclose{}\\

> **NOTE:**
>
> **Theorem 2 (Mean squared error equals bias squared plus variance)** For any one-dimensional estimator \\\hat\theta\\:
>
> \\\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} = \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} + \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} \tag{2}\\

> **NOTE:**
>
> *Proof*. Let’s start by expanding each term of the right-hand side. By [Theorem 1](#thm-bias-exprs), the squared bias is:
>
> \\ \begin{aligned} \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} &= \mathopen{}\left(\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{} - \theta\right)^2\mathclose{} && \text{(bias equals expectation minus truth)}\\ &= \mathopen{}\left(\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\right)^2\mathclose{} - 2\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\theta+ \theta^2 && \text{(expand the binomial square)} \end{aligned} \\
>
> The variance is ([simplified expression for variance](https://morrison-lab.github.io/pds/variance-covariance.html#thm-variance)):
>
> \\\operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} = \operatorname{E}\mathopen{}\left\[\hat\theta^2\right\]\mathclose{} - \mathopen{}\left(\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\right)^2\mathclose{}\\
>
> Now, add them together and simplify:
>
> \\ \begin{aligned} \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} + \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} &= \mathopen{}\left(\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\right)^2\mathclose{} - 2\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\theta+ \theta^2 + \operatorname{E}\mathopen{}\left\[\hat\theta^2\right\]\mathclose{} - \mathopen{}\left(\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\right)^2\mathclose{} && \text{(substitute both expansions)}\\ &= \operatorname{E}\mathopen{}\left\[\hat\theta^2\right\]\mathclose{} - 2\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\theta+ \theta^2 && \text{(cancel \$\mathopen{}\left(\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\right)^2\mathclose{}\$)} \end{aligned} \\
>
> Now let’s expand the left-hand side to reach the same expression:
>
> \\ \begin{aligned} \operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} &\stackrel{\text{def}}{=}\operatorname{E}\mathopen{}\left\[\mathopen{}\left(\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{}\right\]\mathclose{} && \text{(definition of MSE)}\\ &= \operatorname{E}\mathopen{}\left\[(\hat\theta- \theta)^2\right\]\mathclose{} && \text{(definition of estimation error)}\\ &= \operatorname{E}\mathopen{}\left\[\hat\theta^2 - 2\hat\theta\theta+ \theta^2\right\]\mathclose{} && \text{(expand the binomial square)}\\ &= \operatorname{E}\mathopen{}\left\[\hat\theta^2\right\]\mathclose{} - \operatorname{E}\mathopen{}\left\[2\hat\theta\theta\right\]\mathclose{} + \operatorname{E}\mathopen{}\left\[\theta^2\right\]\mathclose{} && \text{(linearity of expectation)}\\ &= \operatorname{E}\mathopen{}\left\[\hat\theta^2\right\]\mathclose{} - 2\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\theta+ \theta^2 && \text{(\$\theta\$ is a constant)} \end{aligned} \\
>
> \\\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{}\\ and \\\mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} + \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{}\\ both equal \\\operatorname{E}\mathopen{}\left\[\hat\theta^2\right\]\mathclose{} - 2\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{}\theta+ \theta^2\\. Equality is transitive, so \\\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{}\\ and \\\mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} + \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{}\\ are equal to each other:
>
> \\\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} = \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} + \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{}\\

> **NOTE:**
>
> **Example 7 (Mean squared error of two estimators of a mean)** Continuing [Example 6](#exm-bias-sample-mean), suppose also that \\X_1, \ldots, X_n\\ are mutually independent, each with variance \\\operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{} = \sigma^2\\. Both \\\bar X\\ and \\X_1\\ have zero bias, so by [Theorem 2](#thm-mse-bias-variance) each estimator’s mean squared error equals its variance.
>
> For \\X_1\\, \\\operatorname{MSE}\mathopen{}\left(X_1\right)\mathclose{} = 0^2 + \operatorname{Var}\mathopen{}\left(X_1\right)\mathclose{} = \sigma^2\\.
>
> For \\\bar X\\:
>
> \\ \begin{aligned} \operatorname{MSE}\mathopen{}\left(\bar X\right)\mathclose{} &= \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\bar X\right)\mathclose{}\right)^2\mathclose{} + \operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{} && \text{(MSE equals bias squared plus variance)}\\ &= 0 + \operatorname{Var}\mathopen{}\left(\frac{1}{n}\sum\_{i=1}^n X_i\right)\mathclose{} && \text{(zero bias; definition of \$\bar X\$)}\\ &= \frac{1}{n^2}\sum\_{i=1}^n \operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{} && \text{(variance of a linear combination of independent variables)}\\ &= \frac{1}{n^2} \cdot n\sigma^2 && \text{(\$\operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{} = \sigma^2\$ for every \$i\$)}\\ &= \frac{\sigma^2}{n} \end{aligned} \\
>
> The third line uses the [variance of a linear combination](https://morrison-lab.github.io/pds/variance-covariance.html#thm-var-lincom), whose covariance terms are all zero for independent variables.
>
> So for any sample size \\n \> 1\\, \\\operatorname{MSE}\mathopen{}\left(\bar X\right)\mathclose{} = \sigma^2/n \< \sigma^2 = \operatorname{MSE}\mathopen{}\left(X_1\right)\mathclose{}\\: by mean squared error, the sample mean is the more accurate estimator. With \\n = 50\\ students, as in [Example 4](#exm-estimator), the sample mean’s mean squared error is \\1/50\\ of \\X_1\\’s.

> **NOTE:**
>
> **Definition 8 (Root mean squared error)** The **root mean squared error** of an estimator \\\hat\theta\\ is the square root of its [mean squared error](#def-mse):
>
> \\\operatorname{RMSE}\mathopen{}\left(\hat\theta\right)\mathclose{} \stackrel{\text{def}}{=}\sqrt{\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{}}\\
>
> It has the same units as the estimand. In [Example 7](#exm-mse-sample-mean), the root mean squared error of \\\bar X\\ is \\\sigma/\sqrt{n}\\.

### 3.6 Unbiased estimators

> **NOTE:**
>
> **Definition 9 (Unbiased estimator)** An estimator \\\hat\theta\\ is **unbiased** if its [bias](#def-bias) is zero: \\\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{} = 0\\. An estimator whose bias is not zero is **biased**.

> **NOTE:**
>
> **Example 8 (The sample mean is unbiased)** By [Example 6](#exm-bias-sample-mean), \\\operatorname{Bias}\mathopen{}\left(\bar X\right)\mathclose{} = 0\\ and \\\operatorname{Bias}\mathopen{}\left(X_1\right)\mathclose{} = 0\\, so both the sample mean \\\bar X\\ and the single-observation estimator \\X_1\\ are [unbiased](#def-unbiased) estimators of \\\mu\\.

> **NOTE:**
>
> **Example 9 (A biased estimator of the variance)** Let \\X_1, \ldots, X_n\\ be mutually independent, each with expectation \\\mu\\ and variance \\\sigma^2\\, and let \\n \ge 2\\. Consider two estimators of \\\sigma^2\\:
>
> - the [sample variance](exploratory-descriptive.llms.md#def-sample-variance) \\S^2 \stackrel{\text{def}}{=}\frac{1}{n-1} \sum\_{i=1}^n (X_i - \bar X)^2\\;
> - the divide-by-\\n\\ estimator \\\hat\sigma^2 \stackrel{\text{def}}{=}\frac{1}{n} \sum\_{i=1}^n (X_i - \bar X)^2\\.
>
> Both estimators are built from the sum of squared deviations \\\sum\_{i=1}^n (X_i - \bar X)^2\\, so we first find its expectation. Using \\\operatorname{E}\mathopen{}\left\[X_i^2\right\]\mathclose{} = \operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{} + \mathopen{}\left(\operatorname{E}\mathopen{}\left\[X_i\right\]\mathclose{}\right)^2\mathclose{} = \sigma^2 + \mu^2\\ and \\\operatorname{E}\mathopen{}\left\[\bar X^2\right\]\mathclose{} = \operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{} + \mathopen{}\left(\operatorname{E}\mathopen{}\left\[\bar X\right\]\mathclose{}\right)^2\mathclose{} = \sigma^2/n + \mu^2\\ (by [Example 7](#exm-mse-sample-mean) and [Example 6](#exm-bias-sample-mean)):
>
> \\ \begin{aligned} \operatorname{E}\mathopen{}\left\[\sum\_{i=1}^n (X_i - \bar X)^2\right\]\mathclose{} &= \operatorname{E}\mathopen{}\left\[\sum\_{i=1}^n X_i^2 - 2\bar X \sum\_{i=1}^n X_i + n \bar X^2\right\]\mathclose{} && \text{(expand each square and sum)}\\ &= \operatorname{E}\mathopen{}\left\[\sum\_{i=1}^n X_i^2 - 2\bar X \cdot n \bar X + n \bar X^2\right\]\mathclose{} && \text{(\$\textstyle\sum\_{i=1}^n X_i = n \bar X\$)}\\ &= \operatorname{E}\mathopen{}\left\[\sum\_{i=1}^n X_i^2 - n \bar X^2\right\]\mathclose{} && \text{(collect the \$\bar X^2\$ terms)}\\ &= \sum\_{i=1}^n \operatorname{E}\mathopen{}\left\[X_i^2\right\]\mathclose{} - n \operatorname{E}\mathopen{}\left\[\bar X^2\right\]\mathclose{} && \text{(linearity of expectation)}\\ &= n(\sigma^2 + \mu^2) - n\mathopen{}\left(\frac{\sigma^2}{n} + \mu^2\right)\mathclose{} && \text{(substitute both second moments)}\\ &= (n - 1)\sigma^2 && \text{(cancel \$n\mu^2\$ and simplify)} \end{aligned} \\
>
> So \\\operatorname{E}\mathopen{}\left\[S^2\right\]\mathclose{} = \frac{1}{n-1}(n-1)\sigma^2 = \sigma^2\\, and by [Theorem 1](#thm-bias-exprs), \\\operatorname{Bias}\mathopen{}\left(S^2\right)\mathclose{} = 0\\: the sample variance is [unbiased](#def-unbiased).
>
> For the divide-by-\\n\\ estimator, \\\operatorname{E}\mathopen{}\left\[\hat\sigma^2\right\]\mathclose{} = \frac{1}{n}(n-1)\sigma^2\\, so:
>
> \\ \begin{aligned} \operatorname{Bias}\mathopen{}\left(\hat\sigma^2\right)\mathclose{} &= \operatorname{E}\mathopen{}\left\[\hat\sigma^2\right\]\mathclose{} - \sigma^2 && \text{(bias equals expectation minus truth)}\\ &= \frac{n-1}{n}\sigma^2 - \sigma^2 && \text{(substitute \$\operatorname{E}\mathopen{}\left\[\hat\sigma^2\right\]\mathclose{}\$)}\\ &= -\frac{\sigma^2}{n} && \text{(common denominator)} \end{aligned} \\
>
> This estimator is biased: on average it underestimates \\\sigma^2\\, by an amount that shrinks to zero as \\n\\ grows.

> **NOTE:**
>
> **Theorem 3 (Properties of unbiased estimators)** If \\\hat\theta\\ is an [unbiased](#def-unbiased) estimator of \\\theta\\, then:
>
> \\\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{} = \theta \tag{3}\\
>
> \\\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} = \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} \tag{4}\\

> **NOTE:**
>
> *Proof*. For [Equation 3](#eq-unbiased-exp), apply [Theorem 1](#thm-bias-exprs):
>
> \\ \begin{aligned} 0 &= \operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{} && \text{(definition of unbiased)}\\ &= \operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{} - \theta && \text{(bias equals expectation minus truth)} \end{aligned} \\
>
> Adding \\\theta\\ to both sides gives \\\operatorname{E}\mathopen{}\left\[\hat\theta\right\]\mathclose{} = \theta\\.
>
> For [Equation 4](#eq-unbiased-mse), apply [Theorem 2](#thm-mse-bias-variance):
>
> \\ \begin{aligned} \operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} &= \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} + \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} && \text{(MSE equals bias squared plus variance)}\\ &= 0^2 + \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} && \text{(definition of unbiased)}\\ &= \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} && \text{(\$0^2 = 0\$)} \end{aligned} \\

### 3.7 Mean absolute error

> **NOTE:**
>
> **Definition 10 (Mean absolute error)** The **mean absolute error** of an estimator is the expectation of the absolute value of the [estimation error](#def-estimation-error):
>
> \\ \operatorname{MAE}\mathopen{}\left(\hat\theta\right)\mathclose{} \stackrel{\text{def}}{=}\operatorname{E}\mathopen{}\left\[\mathopen{}\left\|\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{}\right\|\mathclose{}\right\]\mathclose{} \\

> **NOTE:**
>
> **Example 10 (Mean absolute error of a Gaussian estimator)** Suppose an estimator \\\hat\theta\\ has a Gaussian distribution with mean \\\theta\\ and standard deviation \\\tau\\, so that its estimation error \\\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{} = \hat\theta- \theta\\ has the same distribution as \\\tau Z\\, where \\Z\\ has a standard Gaussian distribution with density \\\phi(z) = (2\pi)^{-1/2} e^{-z^2/2}\\. Then:
>
> \\ \begin{aligned} \operatorname{MAE}\mathopen{}\left(\hat\theta\right)\mathclose{} &= \operatorname{E}\mathopen{}\left\[\mathopen{}\left\|\tau Z\right\|\mathclose{}\right\]\mathclose{} && \text{(definition of MAE)}\\ &= \tau \operatorname{E}\mathopen{}\left\[\mathopen{}\left\|Z\right\|\mathclose{}\right\]\mathclose{} && \text{(\$\tau \> 0\$ and linearity of expectation)}\\ &= \tau \int\_{-\infty}^{\infty} \mathopen{}\left\|z\right\|\mathclose{} \phi(z) \\ dz && \text{(expectation of a function of \$Z\$)}\\ &= 2\tau \int\_{0}^{\infty} z \phi(z) \\ dz && \text{(\$\mathopen{}\left\|z\right\|\mathclose{}\phi(z)\$ is symmetric about 0)}\\ &= 2\tau \mathopen{}\left\[-\phi(z)\right\]\mathclose{}\_{0}^{\infty} && \text{(\$\phi'(z) = -z\phi(z)\$)}\\ &= 2\tau \phi(0) && \text{(\$\phi(z) \to 0\$ as \$z \to \infty\$)}\\ &= \tau \sqrt{2/\pi} && \text{(\$\phi(0) = (2\pi)^{-1/2}\$)} \end{aligned} \\
>
> So for an [unbiased](#def-unbiased) Gaussian estimator, the mean absolute error is about \\0.80\\ times the standard deviation \\\tau\\, while the [root mean squared error](#def-rmse) is \\\tau\\ itself ([Theorem 3](#thm-unbiased-props)).

### 3.8 Standard error

> **NOTE:**
>
> **Definition 11 (Standard error)** The **standard error** of an estimator \\\hat\theta\\ is the [standard deviation](https://morrison-lab.github.io/pds/variance-covariance.html#def-sd) of \\\hat\theta\\:
>
> \\\operatorname{SE}\mathopen{}\left(\hat\theta\right)\mathclose{} \stackrel{\text{def}}{=}\operatorname{SD}\mathopen{}\left(\hat\theta\right)\mathclose{}\\

> **NOTE:**
>
> **Example 11 (Standard error of the sample mean)** In [Example 7](#exm-mse-sample-mean), \\\operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{} = \sigma^2 / n\\, so \\\operatorname{SE}\mathopen{}\left(\bar X\right)\mathclose{} = \sqrt{\sigma^2 / n} = \sigma / \sqrt{n}\\. With \\n = 50\\ students, the standard error of the sample mean height is \\\sigma / \sqrt{50} \approx 0.14\sigma\\.

> **NOTE:**
>
> **Theorem 4 (Standard error is the spread of the estimation error)** \\\operatorname{SE}\mathopen{}\left(\hat\theta\right)\mathclose{} = \operatorname{SD}\mathopen{}\left(\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{}\right)\mathclose{}\\

> **NOTE:**
>
> *Proof*. \\ \begin{aligned} \operatorname{Var}\mathopen{}\left(\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{}\right)\mathclose{} &= \operatorname{Var}\mathopen{}\left(\hat\theta- \theta\right)\mathclose{} && \text{(definition of estimation error)}\\ &= \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} && \text{(subtracting a constant does not change a variance)} \end{aligned} \\
>
> Taking square roots of both sides, \\\operatorname{SD}\mathopen{}\left(\varepsilon\mathopen{}\left(\hat\theta\right)\mathclose{}\right)\mathclose{} = \operatorname{SD}\mathopen{}\left(\hat\theta\right)\mathclose{} = \operatorname{SE}\mathopen{}\left(\hat\theta\right)\mathclose{}\\.

“Standard error” is a confusing name in two ways. It is defined through the estimator’s own spread, not through the [estimation error](#def-estimation-error) (although [Theorem 4](#thm-se-error-sd) shows that the two spreads are equal). It is also a synonym for the standard deviation of an estimator, so it can look redundant. The name persists because standard errors are the building blocks of p-values and confidence intervals, so they come up often enough to deserve their own name.

> **NOTE:**
>
> **Corollary 1 (Standard error squared equals MSE minus squared bias)** The squared standard error is what remains of the mean squared error after the squared bias is removed:
>
> \\\mathopen{}\left(\operatorname{SE}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} = \operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} - \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{}\\

> **NOTE:**
>
> *Proof*. Start from [Theorem 2](#thm-mse-bias-variance):
>
> \\ \begin{aligned} \operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} &= \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} + \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} && \text{(MSE equals bias squared plus variance)}\\ \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} &= \operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} - \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} && \text{(subtract \$\mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{}\$ from both sides)}\\ \mathopen{}\left(\operatorname{SE}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} &= \operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} - \mathopen{}\left(\operatorname{Bias}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} && \text{(\$\operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{} = \mathopen{}\left(\operatorname{SD}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{} = \mathopen{}\left(\operatorname{SE}\mathopen{}\left(\hat\theta\right)\mathclose{}\right)^2\mathclose{}\$)} \end{aligned} \\

> **NOTE:**
>
> **Corollary 2 (For unbiased estimators, SE equals root MSE)** If \\\hat\theta\\ is [unbiased](#def-unbiased), then its standard error equals its [root mean squared error](#def-rmse):
>
> \\\operatorname{SE}\mathopen{}\left(\hat\theta\right)\mathclose{} = \sqrt{\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{}}\\

> **NOTE:**
>
> *Proof*. By [Equation 4](#eq-unbiased-mse), \\\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{} = \operatorname{Var}\mathopen{}\left(\hat\theta\right)\mathclose{}\\. Taking square roots of both sides, \\\sqrt{\operatorname{MSE}\mathopen{}\left(\hat\theta\right)\mathclose{}} = \operatorname{SD}\mathopen{}\left(\hat\theta\right)\mathclose{} = \operatorname{SE}\mathopen{}\left(\hat\theta\right)\mathclose{}\\.

## References

Box, George E. P., and Norman Richard. Draper. 1987. *Empirical Model-Building and Response Surfaces*. Wiley Series in Probability and Mathematical Statistics. Applied Probability and Statistics. Wiley.

Dunn, Peter K, and Gordon K Smyth. 2018. *Generalized Linear Models with Examples in R*. Vol. 53. Springer. <https://doi.org/10.1007/978-1-4419-0118-7>.

Lawrance, Rachael, Evgeny Degtyarev, Philip Griffiths, et al. 2020. “What Is an Estimand, and How Does It Relate to Quantifying the Effect of Treatment on Patient-Reported Quality of Life Outcomes in Clinical Trials?” *Journal of Patient-Reported Outcomes* 4 (1): 1–8. <https://doi.org/10.1186/s41687-020-00218-5>.

Pohl, Moritz, Lukas Baumann, Rouven Behnisch, Marietta Kirchner, Johannes Krisam, and Anja Sander. 2021. “Estimands—A Basic Element for Clinical Trials.” *Deutsches Ärzteblatt International* 118 (51-52): 883–88. <https://doi.org/10.3238/arztebl.m2021.0373>.

Van Buuren, Stef. 2018. *Flexible Imputation of Missing Data*. CRC press. <https://stefvanbuuren.name/fimd/>.

Back to top

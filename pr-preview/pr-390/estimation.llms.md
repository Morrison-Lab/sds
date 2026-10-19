# Estimation

Code

Published

Last modified: 2026-10-19 10:33:35 (PDT)

## 1 Scientific models

> **NOTE:**
>
> **Definition 1 (Scientific models)** **Scientific models** are attempts to describe *physical conditions or changes* that occur in the world and universe around us.

> **NOTE:**
>
> **Example 1 (Scientific models in epidemiology)** Epidemiologists typically study *biological conditions and changes*, such as the spread of infectious diseases through populations, or the effects of environmental factors on individuals.

### 1.1 Models as approximations

> …Essentially, all models are wrong, but some are useful. **However, the approximate nature of the model must always be borne in mind.**

\[Box and Draper [\[1\]](#ref-box_draper_1987), p. 424; emphasis added\]

See also [\[2, Sec. 1.8\]](#ref-dunn2018generalized).

### 1.2 Statistical analysis of scientific models

When we perform statistical analyses, we use data to help us choose between models; specifically, to determine which models best explain those data.

Physical processes do not produce data on their own. Data are only produced when scientists implement an *observation process* (that is, a *scientific study*), which is distinct from the underlying *physical process*. In some cases, the observation process and the physical process interact with each other; this interaction is called the [“observer effect”](https://en.wikipedia.org/wiki/Observer_effect).

To learn about the physical processes we are ultimately interested in, we often need to account for the observation process that produced the data we are analyzing. In particular, if some of the planned observations in the study design were not completed, we will likely need to account for the incompleteness of the resulting data set in our analysis. If we are not sure why some observations are incomplete, we may need to model the observation process in addition to the physical process we were originally interested in. For example, if some participants in a study dropped out part-way through, we may need to investigate why those participants dropped out, as opposed to other participants who completed the study.

These kinds of *missing data* issues are outside the scope of these notes; see Van Buuren [\[3\]](#ref-van2018flexible) for more details.

## 2 Estimands, estimates, and estimators

### 2.1 Estimands

> **NOTE:**
>
> **Definition 2 (Estimand)** An **estimand** is an unknown quantity \\\theta\\ whose value we want to know [\[4\]](#ref-pohl2021estimands), [\[5\]](#ref-lawrance2020estimand).
>
> Source: Wikipedia contributors [\[6\]](#ref-wikipedia_estimand).

> **NOTE:**
>
> **Example 2 (Mean height of students)** If we are trying to determine the population mean height of students at our school, then the *population mean* is our [estimand](#def-estimand).

In statistical contexts, most estimands are parameters of probabilistic models, or functions of model parameters.

> **NOTE:**
>
> Model parameters and other estimands are often symbolized using lower-case Greek letters. The [notation choices page](https://morrison-lab.github.io/macros/notation-choices.html#sec-estimand-estimator-symbols) gives our convention and the alternatives.

### 2.2 Estimates

> **NOTE:**
>
> **Definition 3 (Estimate/estimated value)** In statistics, an **estimate** or **estimated value** \\\hat{\theta}\\ is an informed guess of an [estimand](#def-estimand) \\\theta\\’s value, computed from the observed data \\x_1, \ldots, x_n\\:
>
> \\ \hat{\theta}= \hat{\theta}(x_1, \ldots, x_n). \\

> **NOTE:**
>
> **Example 3 (Mean height of students)** Suppose we measure the heights of 50 randomly sampled students from our school, and their [sample mean](exploratory-descriptive.llms.md#def-sample-mean) is 175 cm. We might use 175 cm as an [*estimate*](#def-estimate) of the population mean.

### 2.3 Estimators

> **NOTE:**
>
> **Definition 4 (Estimator)** An **estimator** is the function \\\hat{\theta}(\cdot)\\ that transforms data into an [estimate](#def-estimate); applied to a random sample \\X_1, \ldots, X_n\\, it is a random variable:
>
> \\ \hat{\theta}(X_1, \ldots, X_n). \\
>
> Source: Wikipedia contributors [\[7\]](#ref-wikipedia_estimator).

> **NOTE:**
>
> When an estimator is applied to random variables \\X_1, \ldots, X_n\\ rather than to their observed values, the result \\\hat{\theta}(X_1, \ldots, X_n)\\ is also a random variable.

> **NOTE:**
>
> Estimators are often symbolized by placing a hat over the symbol of the corresponding estimand; for example, \\\hat{\theta}\\. The [notation choices page](https://morrison-lab.github.io/macros/notation-choices.html#sec-estimand-estimator-symbols) gives our convention and the alternatives.
>
> Usually, their dependence on the data is implicit:
>
> \\\hat{\theta}\stackrel{\text{def}}{=}\hat{\theta}(x_1, \ldots, x_n)\\

> **NOTE:**
>
> **Example 4 (Mean height of students)** Suppose we want to estimate the population mean height of students at our school, which we will represent as \\\mu\\, and we measure the heights of \\n = 50\\ randomly sampled students as random variables \\X_1, \ldots, X_n\\. Then we could use the function
>
> \\\hat{\mu}(X_1, \ldots, X_n) \stackrel{\text{def}}{=}\frac{1}{n}\sum\_{i=1}^nX_i\stackrel{\text{def}}{=}\bar X\\
>
> as an [*estimator*](#def-estimator) to produce an *estimate* \\\hat{\mu}= \bar x\\ of \\\mu\\.
>
> Another estimator would be just the height of the first student sampled:
>
> \\\hat{\mu}^{(2)}(X_1, \ldots, X_n) \stackrel{\text{def}}{=}X_1\\
>
> A third possible estimator would be the sample mean of all sampled students’ heights, except for the two most extreme. Using the [order statistics](nonparametric-models.llms.md#def-order-statistics) \\X\_{(1)} \le X\_{(2)} \le \cdots \le X\_{(n)}\\ (the observations sorted in increasing order), this estimator drops \\X\_{(1)}\\ and \\X\_{(n)}\\ and averages the remaining \\n - 2\\ observations:
>
> \\\hat{\mu}^{(3)}(X_1, \ldots, X_n) \stackrel{\text{def}}{=}\frac{1}{n-2}\sum\_{i=2}^{n-1} X\_{(i)}\\
>
> Which of these estimators is best? The answer depends on how we evaluate them (see [Section 3](#sec-est-accuracy)).

> **NOTE:**
>
> **Definition 5 (Sampling distribution)** The **sampling distribution** of an [estimator](#def-estimator) \\\hat{\theta}\\ is the probability distribution of \\\hat{\theta}(X_1, \ldots, X_n)\\ over repeated random samples \\X_1, \ldots, X_n\\ from the same population: the distribution of the values the estimator would take across all the [samples](exploratory-descriptive.llms.md#def-sample) we might have drawn.
>
> Source: Wikipedia contributors [\[8\]](#ref-wikipedia_sampling_distribution).

> **NOTE:**
>
> **Example 5 (Sampling distribution of a sample mean)** Suppose student heights are \\X_i\\ \sim\_{\operatorname{iid}}\\ {\operatorname{N}\mathopen{}\left(\mu, \sigma^2\right)\mathclose{}}\\ with standard deviation \\\sigma= 10\\ cm, and we sample \\n = 25\\ students. The sample mean \\\bar X\\ is a linear combination of independent Gaussian variables, so it is also Gaussian, with mean \\{\operatorname{E}\mathopen{}\left\[\bar X\right\]\mathclose{}} = \mu\\ and variance \\{\operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{}} = \sigma^2/ n\\. Its sampling distribution is therefore
>
> \\\bar X \sim {\operatorname{N}\mathopen{}\left(\mu, \sigma^2/ 25\right)\mathclose{}},\\
>
> which has standard deviation \\\sigma/ \sqrt{25} = 10 / 5 = 2\\ cm. Across repeated samples of 25 students, about 95% of the sample means land within \\2 \times 2 = 4\\ cm of the true mean \\\mu\\.

### 2.4 Contrasting estimands, estimates, and estimators

It’s helpful to keep in mind the mathematical type of each estimation concept:

- [estimands](#def-estimand) are numbers (or vectors of numbers);
- [estimates](#def-estimate) are also numbers (or vectors);
- [estimators](#def-estimator) are functions; an estimator applied to random data, \\\hat{\theta}(X_1, \ldots, X_n)\\, is a random variable.

> **NOTE:**
>
> - Hogg et al. [\[9, Sec. 6.4\]](#ref-hoggtanis2015), pp. 264–276 covers maximum likelihood and method of moments estimation.
> - Casella and Berger [\[10, Sec. 7.2\]](#ref-CaseBerg01), pp. 312–329 covers methods of finding estimators.
> - Rice [\[11, Secs. 8.3–8.4\]](#ref-rice2007mathematical), pp. 257–266 covers parameter estimation and the method of moments.

## 3 Accuracy of estimators

### 3.1 Accuracy

To determine which estimator is best, we need to define *best*. Accuracy is usually most important, and ease of computation is usually secondary.

### 3.2 Estimation error

> **NOTE:**
>
> **Definition 6 (Estimation error)** The **estimation error** of an estimate \\\hat{\theta}\\ of a true value \\\theta\\ is the difference between the estimate and the estimand \\\theta\\:
>
> \\{\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \stackrel{\text{def}}{=}\hat{\theta}- \theta\\

> **NOTE:**
>
> **Example 6 (Estimation error of a mean height)** Continuing [Example 3](#exm-estimate), suppose the population mean height of students at our school were actually \\\mu= 172\\ cm. Then the estimate \\\hat{\mu}= 175\\ cm would have estimation error:
>
> \\ \begin{aligned} {\varepsilon\mathopen{}\left(\hat{\mu}\right)\mathclose{}} &= \hat{\mu}- \mu && \text{(definition of estimation error)}\\ &= 175 - 172 && \text{(substitute the estimate and the estimand)}\\ &= 3 \text{ cm} && \text{(subtract)} \end{aligned} \\
>
> In practice we never observe an estimation error, because we do not know the estimand’s value; if we did, we would not need to estimate it.

The accuracy of an estimator has no single, agreed formal definition. The usual measures of accuracy, including the bias, population mean squared error, and population mean absolute error defined in this section, are all functions of the distribution of the estimator’s [estimation error](#def-estimation-error).

### 3.3 Predictions and residuals

Predictions, fitted values, residuals, prediction errors and the sample mean squared error of predictions have their own page, [Prediction](prediction.llms.md). That page also contrasts them with the estimation quantities defined here: [estimation error](#def-estimation-error) and the [population mean squared error of an estimator](#mean-squared-error).

### 3.4 Bias

> **NOTE:**
>
> **Definition 7 (Bias)** The **bias** of an estimator \\\hat{\theta}\\ for an estimand \\\theta\\ is the expected value of the [estimation error](#def-estimation-error):
>
> \\{\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \stackrel{\text{def}}{=}{\operatorname{E}\mathopen{}\left\[{\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right\]\mathclose{}} \tag{1}\\
>
> Source: Wikipedia contributors [\[12\]](#ref-wikipedia_bias_of_an_estimator).

> **NOTE:**
>
> **Exercise 1 (Bias in terms of the expectation)** Derive an expression for the [bias](#def-bias) \\{\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\ of an [estimator](#def-estimator) \\\hat{\theta}\\ in terms of its expected value \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\\ and the estimand \\\theta\\.

> **NOTE:**
>
> *Solution 1*. \\ \begin{aligned} {\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} &\stackrel{\text{def}}{=}{\operatorname{E}\mathopen{}\left\[{\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right\]\mathclose{}} && \text{(definition of bias)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}- \theta\right\]\mathclose{}} && \text{(definition of estimation error)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}} - {\operatorname{E}\mathopen{}\left\[\theta\right\]\mathclose{}} && \text{(linearity of expectation)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}} - \theta && \text{(\$\theta\$ is a constant)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 1 (Bias equals expectation minus truth)** \\{\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}} - \theta\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 1](#exr-bias-exprs).

> **NOTE:**
>
> **Example 7 (Bias of two estimators of a population mean)** Let \\X_1, \ldots, X_n\\ each have expectation \\{\operatorname{E}\mathopen{}\left\[X_i\right\]\mathclose{}} = \mu\\, as in [Example 4](#exm-estimator). By [Theorem 1](#thm-bias-exprs), the bias of the sample mean \\\bar X\\ is:
>
> \\ \begin{aligned} {\operatorname{Bias}\mathopen{}\left(\bar X\right)\mathclose{}} &= {\operatorname{E}\mathopen{}\left\[\bar X\right\]\mathclose{}} - \mu && \text{(bias equals expectation minus truth)}\\ &= {\operatorname{E}\mathopen{}\left\[\frac{1}{n}\sum\_{i=1}^nX_i\right\]\mathclose{}} - \mu && \text{(definition of \$\bar X\$)}\\ &= \frac{1}{n}{\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^nX_i\right\]\mathclose{}} - \mu && \text{(factor the constant \$\tfrac{1}{n}\$ out of the expectation)}\\ &= \frac{1}{n}\sum\_{i=1}^n{\operatorname{E}\mathopen{}\left\[X_i\right\]\mathclose{}} - \mu && \text{(linearity of expectation)}\\ &= \frac{1}{n}\sum\_{i=1}^n\mu- \mu && \text{(\${\operatorname{E}\mathopen{}\left\[X_i\right\]\mathclose{}} = \mu\$ for every \$i\$)}\\ &= \frac{1}{n} \cdot n\mu- \mu && \text{(sum of \$n\$ copies of \$\mu\$)}\\ &= \mu- \mu && \text{(cancel \$n\$)}\\ &= 0 && \text{(subtract)} \end{aligned} \\
>
> and the bias of the single-observation estimator \\\hat{\mu}^{(2)} = X_1\\ is:
>
> \\ \begin{aligned} {\operatorname{Bias}\mathopen{}\left(X_1\right)\mathclose{}} &= {\operatorname{E}\mathopen{}\left\[X_1\right\]\mathclose{}} - \mu && \text{(bias equals expectation minus truth)}\\ &= \mu- \mu && \text{(\${\operatorname{E}\mathopen{}\left\[X_1\right\]\mathclose{}} = \mu\$)}\\ &= 0 && \text{(subtract)} \end{aligned} \\
>
> So both estimators have zero bias, even though \\\bar X\\ uses all \\n\\ observations and \\X_1\\ uses only one.

### 3.5 Population mean squared error of an estimator

> **NOTE:**
>
> **Definition 8 (Mean squared error)** The **population mean squared error (pMSE)** of an estimator \\\hat{\theta}\\, also called its **mean squared error** or its **expected squared estimation error (ESEE)**, denoted \\{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\ or \\{\operatorname{ESEE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\, is the expectation of the square of the [estimation error](#def-estimation-error):
>
> \\{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \stackrel{\text{def}}{=}{\operatorname{E}\mathopen{}\left\[{\mathopen{}\left({\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2}\right\]\mathclose{}}\\
>
> Source: Wikipedia contributors [\[13\]](#ref-wikipedia_mean_squared_error).

> **NOTE:**
>
> **Exercise 2 (Expanding the squared bias)** Using [Theorem 1](#thm-bias-exprs), expand the squared [bias](#def-bias) \\{\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2}\\ in terms of \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\\ and the estimand \\\theta\\.

> **NOTE:**
>
> *Solution 2*. \\ \begin{aligned} {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} &= {\mathopen{}\left({\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}} - \theta\right)\mathclose{}}^{2} && \text{(bias equals expectation minus truth)}\\ &= {\mathopen{}\left({\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\right)\mathclose{}}^{2} - 2{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\theta+ \theta^2 && \text{(expand the binomial square)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 2 (Expanded squared bias)** For any one-dimensional estimator \\\hat{\theta}\\ of an estimand \\\theta\\, the squared [bias](#def-bias) is:
>
> \\{\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} = {\mathopen{}\left({\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\right)\mathclose{}}^{2} - 2{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\theta+ \theta^2\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 2](#exr-sq-bias-expand), worked in [Solution 2](#sol-sq-bias-expand).

> **NOTE:**
>
> **Exercise 3 (Squared bias plus variance)** Using [Exercise 2](#exr-sq-bias-expand), write \\{\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} + {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\ in terms of \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}}\\, \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\\, and the estimand \\\theta\\.

> **NOTE:**
>
> *Solution 3*. The variance is ([simplified expression for variance](https://morrison-lab.github.io/pds/variance-covariance.html#thm-variance)):
>
> \\{\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - {\mathopen{}\left({\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\right)\mathclose{}}^{2} \tag{2}\\
>
> Let the [population mean](https://morrison-lab.github.io/pds/expectation.html#def-expectation) of the [estimator](#def-estimator) \\\hat{\theta}\\ be \\\mu\_{\hat{\theta}} = {\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\\. Then the variance of \\\hat{\theta}\\ is \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - {\mathopen{}\left(\mu\_{\hat{\theta}}\right)\mathclose{}}^{2}\\, and the squared [bias](#def-bias) of \\\hat{\theta}\\ for the [estimand](#def-estimand) \\\theta\\ from [Exercise 2](#exr-sq-bias-expand) is \\{\mathopen{}\left(\mu\_{\hat{\theta}}\right)\mathclose{}}^{2} - 2\mu\_{\hat{\theta}}\theta+ \theta^2\\. Add them and simplify:
>
> \\ \begin{aligned} {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} + {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} &= {\mathopen{}\left(\mu\_{\hat{\theta}}\right)\mathclose{}}^{2} - 2\mu\_{\hat{\theta}}\theta+ \theta^2 + {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} && \text{(substitute the squared bias)}\\ &= {\mathopen{}\left(\mu\_{\hat{\theta}}\right)\mathclose{}}^{2} - 2\mu\_{\hat{\theta}}\theta+ \theta^2 + {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - {\mathopen{}\left(\mu\_{\hat{\theta}}\right)\mathclose{}}^{2} && \text{(substitute the variance)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - 2\mu\_{\hat{\theta}}\theta+ \theta^2 + {\mathopen{}\left(\mu\_{\hat{\theta}}\right)\mathclose{}}^{2} - {\mathopen{}\left(\mu\_{\hat{\theta}}\right)\mathclose{}}^{2} && \text{(reorder the terms)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - 2\mu\_{\hat{\theta}}\theta+ \theta^2 + \mathopen{}\left({\mathopen{}\left(\mu\_{\hat{\theta}}\right)\mathclose{}}^{2} - {\mathopen{}\left(\mu\_{\hat{\theta}}\right)\mathclose{}}^{2}\right)\mathclose{} && \text{(group the last two terms)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - 2\mu\_{\hat{\theta}}\theta+ \theta^2 + 0 && \text{(\$a - a = 0\$)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - 2\mu\_{\hat{\theta}}\theta+ \theta^2 && \text{(\$a + 0 = a\$)} \end{aligned} \tag{3}\\

> **NOTE:**
>
> **Theorem 3 (Expanded squared bias plus variance)** For any one-dimensional estimator \\\hat{\theta}\\ of an estimand \\\theta\\, the squared bias plus the variance is:
>
> \\{\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} + {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - 2{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\theta+ \theta^2\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 3](#exr-bias-sq-plus-var), worked in [Solution 3](#sol-bias-sq-plus-var). It adds the variance to the squared bias of [Theorem 2](#thm-sq-bias-expand).

> **NOTE:**
>
> **Exercise 4 (Expanding the population mean squared error)** Derive an expression for the [pMSE](#def-mse) \\{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\ in terms of \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}}\\, \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\\, and the estimand \\\theta\\.

> **NOTE:**
>
> *Solution 4*. \\ \begin{aligned} {\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} &\stackrel{\text{def}}{=}{\operatorname{E}\mathopen{}\left\[{\mathopen{}\left({\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2}\right\]\mathclose{}} && \text{(definition of MSE)}\\ &= {\operatorname{E}\mathopen{}\left\[(\hat{\theta}- \theta)^2\right\]\mathclose{}} && \text{(definition of estimation error)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2 - 2\hat{\theta}\theta+ \theta^2\right\]\mathclose{}} && \text{(expand the binomial square)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - {\operatorname{E}\mathopen{}\left\[2\hat{\theta}\theta\right\]\mathclose{}} + {\operatorname{E}\mathopen{}\left\[\theta^2\right\]\mathclose{}} && \text{(linearity of expectation)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - 2{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\theta+ {\operatorname{E}\mathopen{}\left\[\theta^2\right\]\mathclose{}} && \text{(factor the constant \$2\theta\$ out of the middle expectation)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - 2{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\theta+ \theta^2 && \text{(the expectation of a constant is that constant)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 4 (Expanded population mean squared error)** For any one-dimensional estimator \\\hat{\theta}\\ of an estimand \\\theta\\, the [pMSE](#def-mse) is:
>
> \\{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - 2{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\theta+ \theta^2\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 4](#exr-mse-expand), worked in [Solution 4](#sol-mse-expand).

> **NOTE:**
>
> **Theorem 5 (Population mean squared error equals bias squared plus variance)** For any one-dimensional estimator \\\hat{\theta}\\:
>
> \\{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} + {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \tag{4}\\

> **NOTE:**
>
> *Proof*. By [Theorem 4](#thm-mse-expand) and [Theorem 3](#thm-bias-sq-plus-var), \\{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\ and \\{\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} + {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\ both equal \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}^2\right\]\mathclose{}} - 2{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\theta+ \theta^2\\, so they are equal to each other.

> **NOTE:**
>
> *Remark 1* (Estimation versus prediction). The squared-error split has two forms, and they differ in what the estimate is compared with.
>
> - **Estimation.** [Theorem 5](#thm-mse-bias-variance) compares an estimator \\\hat{\theta}\\ with a fixed parameter \\\theta\\. The target is a constant, so the expected squared error is squared bias plus variance, with no other term.
> - **Prediction.** The target is a new outcome, which is itself random. The model validation notes prove that [expected squared prediction error](model-validation.llms.md#thm-epe-decomposition) equals squared bias plus variance plus the noise variance, the [irreducible error](model-validation.llms.md#def-irreducible-error) of that outcome. No choice of prediction can remove the extra term.

> **NOTE:**
>
> **Example 8 (Population mean squared error of two estimators of a population mean)** Continuing [Example 7](#exm-bias-sample-mean), suppose also that \\X_1, \ldots, X_n\\ are mutually independent, each with variance \\{\operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{}} = \sigma^2\\. Both \\\bar X\\ and \\X_1\\ have zero bias, so by [Theorem 5](#thm-mse-bias-variance) each estimator’s pMSE equals its variance.
>
> For \\X_1\\,
>
> \\ \begin{aligned} {\operatorname{pMSE}\mathopen{}\left(X_1\right)\mathclose{}} &= 0^2 + {\operatorname{Var}\mathopen{}\left(X_1\right)\mathclose{}} \\ &= \sigma^2. \end{aligned} \\
>
> For \\\bar X\\:
>
> \\ \begin{aligned} {\operatorname{pMSE}\mathopen{}\left(\bar X\right)\mathclose{}} &= {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\bar X\right)\mathclose{}}\right)\mathclose{}}^{2} + {\operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{}} && \text{(pMSE equals bias squared plus variance)}\\ &= 0^2 + {\operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{}} && \text{(zero bias)}\\ &= {\operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{}} && \text{(\$0^2 = 0\$)}\\ &= {\operatorname{Var}\mathopen{}\left(\frac{1}{n}\sum\_{i=1}^nX_i\right)\mathclose{}} && \text{(definition of \$\bar X\$)}\\ &= \frac{1}{n^2}\sum\_{i=1}^n{\operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{}} && \text{(variance of a linear combination of independent variables)}\\ &= \frac{1}{n^2}\sum\_{i=1}^n\sigma^2 && \text{(\${\operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{}} = \sigma^2\$ for every \$i\$)}\\ &= \frac{1}{n^2} \cdot n\sigma^2 && \text{(sum of \$n\$ copies of \$\sigma^2\$)}\\ &= \frac{\sigma^2}{n} && \text{(cancel one factor of \$n\$)} \end{aligned} \\
>
> The step to \\\frac{1}{n^2}\sum\_{i=1}^n{\operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{}}\\ uses the [variance of a linear combination](https://morrison-lab.github.io/pds/variance-covariance.html#thm-var-lincom), whose covariance terms are all zero for independent variables.
>
> So for any sample size \\n \> 1\\,
>
> \\ \begin{aligned} {\operatorname{pMSE}\mathopen{}\left(\bar X\right)\mathclose{}} &= \sigma^2/n \\ &\< \sigma^2\\ &= {\operatorname{pMSE}\mathopen{}\left(X_1\right)\mathclose{}}: \end{aligned} \\
>
> by mean squared error, the sample mean is the more accurate estimator. With \\n = 50\\ students, as in [Example 4](#exm-estimator), the sample mean’s mean squared error is \\1/50\\ of \\X_1\\’s.

> **NOTE:**
>
> **Definition 9 (Root mean squared error)** The **population root mean squared error (pRMSE)** of an estimator \\\hat{\theta}\\, also called its **root mean squared error**, is the square root of its [pMSE](#def-mse):
>
> \\{\operatorname{pRMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \stackrel{\text{def}}{=}\sqrt{{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}}\\
>
> Source: Wikipedia contributors [\[14\]](#ref-wikipedia_root_mean_square_deviation).

> **NOTE:**
>
> **Example 9 (Population root mean squared error of the sample mean)** In [Example 8](#exm-mse-sample-mean), the pRMSE of \\\bar X\\ is \\\sigma/\sqrt{n}\\.

> **NOTE:**
>
> *Remark 2* (Units of the population root mean squared error). The pRMSE has the same units as the estimand.

> **NOTE:**
>
> Casella and Berger [\[10, Sec. 7.3.1\]](#ref-CaseBerg01), pp. 330–333 covers mean squared error.

### 3.6 Unbiased estimators

> **NOTE:**
>
> **Definition 10 (Unbiased estimator)** An estimator \\\hat{\theta}\\ is **unbiased** if its [bias](#def-bias) is zero:
>
> \\ {\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = 0 \\

> **NOTE:**
>
> **Definition 11 (Biased estimator)** An estimator \\\hat{\theta}\\ is **biased** if its [bias](#def-bias) is not zero:
>
> \\ {\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \neq 0 \\

> **NOTE:**
>
> **Example 10 (The sample mean is unbiased)** By [Example 7](#exm-bias-sample-mean), \\{\operatorname{Bias}\mathopen{}\left(\bar X\right)\mathclose{}} = 0\\ and \\{\operatorname{Bias}\mathopen{}\left(X_1\right)\mathclose{}} = 0\\, so both the sample mean \\\bar X\\ and the single-observation estimator \\X_1\\ are [unbiased](#def-unbiased) estimators of \\\mu\\.

> **NOTE:**
>
> **Example 11 (A biased estimator of the variance)** Let \\X_1, \ldots, X_n\\ be mutually independent, each with expectation \\\mu\\ and variance \\\sigma^2\\, and let \\n \ge 2\\. Consider two estimators of \\\sigma^2\\:
>
> - the [sample variance](exploratory-descriptive.llms.md#def-sample-variance) \\S^2 \stackrel{\text{def}}{=}\frac{1}{n-1} \sum\_{i=1}^n(X_i- \bar X)^2\\;
> - the divide-by-\\n\\ estimator \\\hat{\sigma}^2\stackrel{\text{def}}{=}\frac{1}{n}\sum\_{i=1}^n(X_i- \bar X)^2\\.
>
> Both estimators are built from the sum of squared deviations \\\sum\_{i=1}^n(X_i- \bar X)^2\\, so we first find its expectation. Using
>
> \\ \begin{aligned} {\operatorname{E}\mathopen{}\left\[X_i^2\right\]\mathclose{}} &= {\operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{}} + {\mathopen{}\left({\operatorname{E}\mathopen{}\left\[X_i\right\]\mathclose{}}\right)\mathclose{}}^{2} \\ &= \sigma^2+ \mu^2 \end{aligned} \\
>
> and
>
> \\ \begin{aligned} {\operatorname{E}\mathopen{}\left\[\bar X^2\right\]\mathclose{}} &= {\operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{}} + {\mathopen{}\left({\operatorname{E}\mathopen{}\left\[\bar X\right\]\mathclose{}}\right)\mathclose{}}^{2} \\ &= \sigma^2/n + \mu^2 \end{aligned} \\
>
> (by [Example 8](#exm-mse-sample-mean) and [Example 7](#exm-bias-sample-mean)):
>
> \\ \begin{aligned} {\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^n(X_i- \bar X)^2\right\]\mathclose{}} &= {\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^n\mathopen{}\left(X_i^2 - 2 X_i\bar X + \bar X^2\right)\mathclose{}\right\]\mathclose{}} && \text{(expand each square)}\\ &= {\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^nX_i^2 - \sum\_{i=1}^n2 X_i\bar X + \sum\_{i=1}^n\bar X^2\right\]\mathclose{}} && \text{(split the sum)}\\ &= {\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^nX_i^2 - 2\bar X \sum\_{i=1}^nX_i+ \sum\_{i=1}^n\bar X^2\right\]\mathclose{}} && \text{(factor \$2\bar X\$ out of the middle sum)}\\ &= {\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^nX_i^2 - 2\bar X \sum\_{i=1}^nX_i+ n \bar X^2\right\]\mathclose{}} && \text{(sum of \$n\$ copies of \$\bar X^2\$)}\\ &= {\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^nX_i^2 - 2\bar X \cdot n \bar X + n \bar X^2\right\]\mathclose{}} && \text{(\$\textstyle\sum\_{i=1}^nX_i= n \bar X\$)}\\ &= {\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^nX_i^2 - 2n \bar X^2 + n \bar X^2\right\]\mathclose{}} && \text{(multiply \$2\bar X \cdot n \bar X\$)}\\ &= {\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^nX_i^2 - n \bar X^2\right\]\mathclose{}} && \text{(collect the \$\bar X^2\$ terms)}\\ &= {\operatorname{E}\mathopen{}\left\[\sum\_{i=1}^nX_i^2\right\]\mathclose{}} - {\operatorname{E}\mathopen{}\left\[n \bar X^2\right\]\mathclose{}} && \text{(linearity of expectation)}\\ &= \sum\_{i=1}^n{\operatorname{E}\mathopen{}\left\[X_i^2\right\]\mathclose{}} - {\operatorname{E}\mathopen{}\left\[n \bar X^2\right\]\mathclose{}} && \text{(linearity of expectation)}\\ &= \sum\_{i=1}^n{\operatorname{E}\mathopen{}\left\[X_i^2\right\]\mathclose{}} - n {\operatorname{E}\mathopen{}\left\[\bar X^2\right\]\mathclose{}} && \text{(factor the constant \$n\$ out of the expectation)}\\ &= \sum\_{i=1}^n(\sigma^2+ \mu^2) - n {\operatorname{E}\mathopen{}\left\[\bar X^2\right\]\mathclose{}} && \text{(substitute \${\operatorname{E}\mathopen{}\left\[X_i^2\right\]\mathclose{}}\$)}\\ &= n(\sigma^2+ \mu^2) - n {\operatorname{E}\mathopen{}\left\[\bar X^2\right\]\mathclose{}} && \text{(sum of \$n\$ copies of \$\sigma^2+ \mu^2\$)}\\ &= n(\sigma^2+ \mu^2) - n\mathopen{}\left(\frac{\sigma^2}{n} + \mu^2\right)\mathclose{} && \text{(substitute \${\operatorname{E}\mathopen{}\left\[\bar X^2\right\]\mathclose{}}\$)}\\ &= n\sigma^2+ n\mu^2 - n\mathopen{}\left(\frac{\sigma^2}{n} + \mu^2\right)\mathclose{} && \text{(distribute \$n\$ over \$\sigma^2+ \mu^2\$)}\\ &= n\sigma^2+ n\mu^2 - \mathopen{}\left(n \cdot \frac{\sigma^2}{n} + n\mu^2\right)\mathclose{} && \text{(distribute \$n\$ over \$\frac{\sigma^2}{n} + \mu^2\$)}\\ &= n\sigma^2+ n\mu^2 - \mathopen{}\left(\sigma^2+ n\mu^2\right)\mathclose{} && \text{(cancel \$n\$ in \$n \cdot \frac{\sigma^2}{n}\$)}\\ &= n\sigma^2+ n\mu^2 - \sigma^2- n\mu^2 && \text{(distribute the minus sign)}\\ &= n\sigma^2- \sigma^2 && \text{(cancel \$n\mu^2\$)}\\ &= (n - 1)\sigma^2 && \text{(factor out \$\sigma^2\$)} \end{aligned} \\
>
> So
>
> \\ \begin{aligned} {\operatorname{E}\mathopen{}\left\[S^2\right\]\mathclose{}} &= \frac{1}{n-1}(n-1)\sigma^2\\ &= \sigma^2, \end{aligned} \\
>
> and by [Theorem 1](#thm-bias-exprs), \\{\operatorname{Bias}\mathopen{}\left(S^2\right)\mathclose{}} = 0\\: the sample variance is [unbiased](#def-unbiased).
>
> For the divide-by-\\n\\ estimator, \\{\operatorname{E}\mathopen{}\left\[\hat{\sigma}^2\right\]\mathclose{}} = \frac{1}{n}(n-1)\sigma^2\\, so:
>
> \\ \begin{aligned} {\operatorname{Bias}\mathopen{}\left(\hat{\sigma}^2\right)\mathclose{}} &= {\operatorname{E}\mathopen{}\left\[\hat{\sigma}^2\right\]\mathclose{}} - \sigma^2 && \text{(bias equals expectation minus truth)}\\ &= \frac{n-1}{n}\sigma^2- \sigma^2 && \text{(substitute \${\operatorname{E}\mathopen{}\left\[\hat{\sigma}^2\right\]\mathclose{}}\$)}\\ &= \frac{n-1}{n}\sigma^2- \frac{n}{n}\sigma^2 && \text{(write \$\sigma^2\$ over the common denominator \$n\$)}\\ &= \frac{n - 1 - n}{n}\sigma^2 && \text{(combine the fractions)}\\ &= \frac{-1}{n}\sigma^2 && \text{(\$n - 1 - n = -1\$)}\\ &= -\frac{\sigma^2}{n} && \text{(multiply)} \end{aligned} \\
>
> This estimator is biased: on average it underestimates \\\sigma^2\\, by an amount that shrinks to zero as \\n\\ grows.

> **NOTE:**
>
> **Exercise 5 (Expected value of an unbiased estimator)** Using [Theorem 1](#thm-bias-exprs), find \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}}\\ for an [unbiased](#def-unbiased) estimator \\\hat{\theta}\\ of \\\theta\\.

> **NOTE:**
>
> *Solution 5*. \\ \begin{aligned} 0 &= {\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} && \text{(definition of unbiased)}\\ &= {\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}} - \theta && \text{(bias equals expectation minus truth)} \end{aligned} \\
>
> Adding \\\theta\\ to both sides gives \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}} = \theta\\.

> **NOTE:**
>
> **Exercise 6 (Population mean squared error of an unbiased estimator)** Using [Theorem 5](#thm-mse-bias-variance), write the [pMSE](#def-mse) of an [unbiased](#def-unbiased) estimator \\\hat{\theta}\\ in terms of its variance.

> **NOTE:**
>
> *Solution 6*. \\ \begin{aligned} {\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} &= {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} + {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} && \text{(MSE equals bias squared plus variance)}\\ &= 0^2 + {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} && \text{(definition of unbiased)}\\ &= {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} && \text{(\$0^2 = 0\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 6 (Properties of unbiased estimators)** If \\\hat{\theta}\\ is an [unbiased](#def-unbiased) estimator of \\\theta\\, then:
>
> \\{\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}} = \theta \tag{5}\\
>
> \\{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \tag{6}\\

> **NOTE:**
>
> *Proof*. [Equation 5](#eq-unbiased-exp) is the solution to [Exercise 5](#exr-unbiased-exp), and [Equation 6](#eq-unbiased-mse) is the solution to [Exercise 6](#exr-unbiased-mse).

> **NOTE:**
>
> 5MinuteAI covers the [properties of estimators](https://www.youtube.com/watch?v=sUFpzYNDn3Q), including bias, following the University of Washington’s CSE 312 [\[15\]](#ref-fiveminuteai_probstat).

### 3.7 Population mean absolute error

> **NOTE:**
>
> **Definition 12 (Mean absolute error)** The **population mean absolute error (pMAE)** of an estimator, also called its **mean absolute error**, is the expectation of the absolute value of the [estimation error](#def-estimation-error):
>
> \\ {\operatorname{MAE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \stackrel{\text{def}}{=}{\operatorname{E}\mathopen{}\left\[\mathopen{}\left\|{\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right\|\mathclose{}\right\]\mathclose{}} \\
>
> Source: Wikipedia contributors [\[16\]](#ref-wikipedia_mean_absolute_error).

> **NOTE:**
>
> **Example 12 (Population mean absolute error of a Gaussian estimator)** Suppose an estimator \\\hat{\theta}\\ has a Gaussian distribution with mean \\\theta\\ and standard deviation \\\tau\\, so that its estimation error \\{\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = \hat{\theta}- \theta\\ has the same distribution as \\\tau Z\\, where \\Z\\ has a standard Gaussian distribution with density \\\phi(z) = (2\pi)^{-1/2} e^{-z^2/2}\\. Then:
>
> \\ \begin{aligned} {\operatorname{MAE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} &= {\operatorname{E}\mathopen{}\left\[\mathopen{}\left\|\tau Z\right\|\mathclose{}\right\]\mathclose{}} && \text{(definition of MAE)}\\ &= {\operatorname{E}\mathopen{}\left\[\tau\mathopen{}\left\|Z\right\|\mathclose{}\right\]\mathclose{}} && \text{(\$\mathopen{}\left\|\tau Z\right\|\mathclose{} = \tau\mathopen{}\left\|Z\right\|\mathclose{}\$ because \$\tau\> 0\$)}\\ &= \tau{\operatorname{E}\mathopen{}\left\[\mathopen{}\left\|Z\right\|\mathclose{}\right\]\mathclose{}} && \text{(factor the constant \$\tau\$ out of the expectation)}\\ &= \tau\int\_{-\infty}^{\infty} \mathopen{}\left\|z\right\|\mathclose{} \phi(z) \\ dz && \text{(expectation of a function of \$Z\$)}\\ &= \tau\cdot 2 \int\_{0}^{\infty} \mathopen{}\left\|z\right\|\mathclose{} \phi(z) \\ dz && \text{(\$\mathopen{}\left\|z\right\|\mathclose{}\phi(z)\$ is symmetric about 0)}\\ &= \tau\cdot 2 \int\_{0}^{\infty} z \phi(z) \\ dz && \text{(\$\mathopen{}\left\|z\right\|\mathclose{} = z\$ for \$z \ge 0\$)}\\ &= \tau\cdot 2 \mathopen{}\left\[-\phi(z)\right\]\mathclose{}\_{0}^{\infty} && \text{(\$\phi'(z) = -z\phi(z)\$)}\\ &= \tau\cdot 2 \mathopen{}\left(\lim\_{z \to \infty} \mathopen{}\left\[-\phi(z)\right\]\mathclose{} - \mathopen{}\left(-\phi(0)\right)\mathclose{}\right)\mathclose{} && \text{(evaluate at the limits)}\\ &= \tau\cdot 2 \mathopen{}\left(\lim\_{z \to \infty} \mathopen{}\left\[-\phi(z)\right\]\mathclose{} + \phi(0)\right)\mathclose{} && \text{(subtracting a negative is adding)}\\ &= \tau\cdot 2 \mathopen{}\left(0 + \phi(0)\right)\mathclose{} && \text{(\$\phi(z) \to 0\$ as \$z \to \infty\$)}\\ &= \tau\cdot 2 \phi(0) && \text{(drop the zero term)}\\ &= \tau\cdot 2 (2\pi)^{-1/2} && \text{(\$\phi(0) = (2\pi)^{-1/2}\$)}\\ &= \tau\cdot 2 \cdot \frac{1}{\sqrt{2\pi}} && \text{(write \$(2\pi)^{-1/2}\$ as \$1/\sqrt{2\pi}\$)}\\ &= \tau\cdot \frac{2}{\sqrt{2\pi}} && \text{(multiply)}\\ &= \tau\cdot \frac{\sqrt{4}}{\sqrt{2\pi}} && \text{(write \$2\$ as \$\sqrt{4}\$)}\\ &= \tau\sqrt{4/(2\pi)} && \text{(quotient of square roots)}\\ &= \tau\sqrt{2/\pi} && \text{(cancel the common factor 2 in \$4/(2\pi)\$)} \end{aligned} \\
>
> So for an [unbiased](#def-unbiased) Gaussian estimator, the pMAE is about \\0.80\\ times the standard deviation \\\tau\\, while the [pRMSE](#def-rmse) is \\\tau\\ itself ([Theorem 6](#thm-unbiased-props)).

### 3.8 Standard error

> **NOTE:**
>
> **Definition 13 (Standard error)** The **standard error** of an estimator \\\hat{\theta}\\ is the [standard deviation](https://morrison-lab.github.io/pds/variance-covariance.html#def-sd) of \\\hat{\theta}\\:
>
> \\{\operatorname{SE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \stackrel{\text{def}}{=}{\operatorname{SD}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\
>
> Source: Wikipedia contributors [\[17\]](#ref-wikipedia_standard_error).

> **NOTE:**
>
> **Example 13 (Standard error of the sample mean)** In [Example 8](#exm-mse-sample-mean), \\{\operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{}} = \sigma^2/ n\\, so
>
> \\ \begin{aligned} {\operatorname{SE}\mathopen{}\left(\bar X\right)\mathclose{}} &= \sqrt{\sigma^2 / n} \\ &= \sigma/ \sqrt{n}. \end{aligned} \\
>
> With \\n = 50\\ students, the standard error of the sample mean height is \\\sigma/ \sqrt{50} \approx 0.14\sigma\\.

> **NOTE:**
>
> **Exercise 7 (Spread of the estimation error)** Find the [standard deviation](https://morrison-lab.github.io/pds/variance-covariance.html#def-sd) of the [estimation error](#def-estimation-error) \\{\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\ in terms of the [standard error](#def-SE) of \\\hat{\theta}\\.

> **NOTE:**
>
> *Solution 7*. \\ \begin{aligned} {\operatorname{Var}\mathopen{}\left({\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}} &= {\operatorname{Var}\mathopen{}\left(\hat{\theta}- \theta\right)\mathclose{}} && \text{(definition of estimation error)}\\ &= {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} && \text{(subtracting a constant does not change a variance)} \end{aligned} \\
>
> Taking square roots of both sides,
>
> \\ \begin{aligned} {\operatorname{SD}\mathopen{}\left({\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}} &= {\operatorname{SD}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \\ &= {\operatorname{SE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}. \end{aligned} \\

> **NOTE:**
>
> **Theorem 7 (Standard error is the spread of the estimation error)** \\{\operatorname{SE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\operatorname{SD}\mathopen{}\left({\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 7](#exr-se-error-sd).

> **NOTE:**
>
> *Remark 3* (The name “standard error”). “Standard error” is a confusing name in two ways. It is defined through the estimator’s own spread, not through the [estimation error](#def-estimation-error) (although [Theorem 7](#thm-se-error-sd) shows that the two spreads are equal). It is also a synonym for the standard deviation of an estimator, so it can look redundant. The name persists because standard errors are the building blocks of p-values and confidence intervals, so they come up often enough to deserve their own name.

> **NOTE:**
>
> **Exercise 8 (Squared standard error from pMSE and bias)** Using [Theorem 5](#thm-mse-bias-variance), write the squared [standard error](#def-SE) \\{\mathopen{}\left({\operatorname{SE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2}\\ in terms of the [pMSE](#def-mse) and the [bias](#def-bias) of \\\hat{\theta}\\.

> **NOTE:**
>
> *Solution 8*. \\ \begin{aligned} {\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} &= {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} + {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} && \text{(MSE equals bias squared plus variance)}\\ {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} &= {\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} - {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} && \text{(subtract \${\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2}\$ from both sides)}\\ {\mathopen{}\left({\operatorname{SD}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} &= {\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} - {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} && \text{(\${\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\mathopen{}\left({\operatorname{SD}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2}\$)}\\ {\mathopen{}\left({\operatorname{SE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} &= {\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} - {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} && \text{(definition of standard error: \${\operatorname{SE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\operatorname{SD}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\$)} \end{aligned} \\

> **NOTE:**
>
> **Corollary 1 (Standard error squared equals pMSE minus squared bias)** The squared standard error is what remains of the pMSE after the squared bias is removed:
>
> \\{\mathopen{}\left({\operatorname{SE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2} = {\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} - {\mathopen{}\left({\operatorname{Bias}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\right)\mathclose{}}^{2}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 8](#exr-var-mse-bias).

> **NOTE:**
>
> **Exercise 9 (Standard error of an unbiased estimator)** Using [Equation 6](#eq-unbiased-mse), write the [standard error](#def-SE) of an [unbiased](#def-unbiased) estimator \\\hat{\theta}\\ in terms of its [pMSE](#def-mse).

> **NOTE:**
>
> *Solution 9*. By [Equation 6](#eq-unbiased-mse), \\{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = {\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}\\. Taking square roots of both sides,
>
> \\ \begin{aligned} \sqrt{{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}} &= {\operatorname{SD}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} \\ &= {\operatorname{SE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}. \end{aligned} \\

> **NOTE:**
>
> **Corollary 2 (For unbiased estimators, SE equals pRMSE)** If \\\hat{\theta}\\ is [unbiased](#def-unbiased), then its standard error equals its [pRMSE](#def-rmse):
>
> \\{\operatorname{SE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}} = \sqrt{{\operatorname{pMSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 9](#exr-se-rmse-unbiased).

## References

\[1\]

G. E. P. Box and N. Richard. Draper, *Empirical model-building and response surfaces*. in Wiley series in probability and mathematical statistics. Applied probability and statistics. New York: Wiley, 1987.

\[2\]

P. K. Dunn and G. K. Smyth, *Generalized linear models with examples in R*, vol. 53. Springer, 2018. doi: [10.1007/978-1-4419-0118-7](https://doi.org/10.1007/978-1-4419-0118-7).

\[3\]

S. Van Buuren, *Flexible imputation of missing data*. CRC press, 2018. Available: <https://stefvanbuuren.name/fimd/>

\[4\]

M. Pohl, L. Baumann, R. Behnisch, M. Kirchner, J. Krisam, and A. Sander, “Estimands—A Basic Element for Clinical Trials,” *Deutsches Ärzteblatt International*, vol. 118, no. 51–52, pp. 883–888, 2021, doi: [10.3238/arztebl.m2021.0373](https://doi.org/10.3238/arztebl.m2021.0373).

\[5\]

R. Lawrance *et al.*, “What is an estimand, and how does it relate to quantifying the effect of treatment on patient-reported quality of life outcomes in clinical trials?” *Journal of Patient-Reported Outcomes*, vol. 4, no. 1, pp. 1–8, 2020, doi: [10.1186/s41687-020-00218-5](https://doi.org/10.1186/s41687-020-00218-5).

\[6\]

Wikipedia contributors, “Estimand — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Estimand>

\[7\]

Wikipedia contributors, “Estimator — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Estimator>

\[8\]

Wikipedia contributors, “Sampling distribution — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Sampling_distribution>

\[9\]

R. V. Hogg, E. A. Tanis, and D. L. Zimmerman, *Probability and statistical inference*, Tenth edition. Boston: Pearson, 2019.

\[10\]

G. Casella and R. Berger, *Statistical inference*, 2nd ed. Cengage Learning, 2002. Available: <https://www.cengage.com/c/statistical-inference-2e-casella-berger/9780534243128/>

\[11\]

J. A. Rice, *Mathematical statistics and data analysis*, 3rd ed. Belmont, CA: Cengage Learning, 2007.

\[12\]

Wikipedia contributors, “Bias of an estimator — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Bias_of_an_estimator>

\[13\]

Wikipedia contributors, “Mean squared error — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Mean_squared_error>

\[14\]

Wikipedia contributors, “Root mean square deviation — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Root_mean_square_deviation>

\[15\]

5MinuteAI, “Probability & statistics.” Video playlist on YouTube. Accessed: Oct. 12, 2026. \[Online\]. Available: <https://www.youtube.com/playlist?list=PLeB45KifGiuHesi4PALNZSYZFhViVGQJK>

\[16\]

Wikipedia contributors, “Mean absolute error — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Mean_absolute_error>

\[17\]

Wikipedia contributors, “Standard error — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Standard_error>

Back to top

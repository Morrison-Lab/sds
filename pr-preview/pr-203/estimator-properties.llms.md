# Properties of Estimators

Code

- [Show All Code](javascript:void(0))

- [Hide All Code](javascript:void(0))

- 

  ------------------------------------------------------------------------

- [View Source](javascript:void(0))

Published

Last modified: 2026-10-15 08:32:35 (PDT)

[Estimation](estimation.llms.md) defines the accuracy of an estimator at one sample size, through its bias, variance and mean squared error. This page asks two further questions: what happens to an estimator as the sample size grows, and how small can the variance of an unbiased estimator be?

## 1 Consistency

> **NOTE:**
>
> **Definition 1 (Consistent estimator)** Let \\\hat{\theta}\_n\\ be an estimator of \\\theta\\ computed from \\n\\ observations. The estimator is **consistent** if, for every distance \\\varepsilon \> 0\\, the probability that it lands at least \\\varepsilon\\ away from \\\theta\\ goes to zero as the sample size grows:
>
> \\ \lim\_{n \to \infty} \Pr\mathopen{}\left(\mathopen{}\left\|\hat{\theta}\_n - \theta\right\|\mathclose{} \ge \varepsilon\right)\mathclose{} = 0 \tag{1}\\
>
> In words, \\\hat{\theta}\_n\\ [converges in probability](https://morrison-lab.github.io/pds/limit-theorems.html#def-convergence-in-probability) to \\\theta\\, which we write \\\hat{\theta}\_n \overset{\scriptstyle p}{\longrightarrow}\theta\\.
>
> > **NOTE:**
> >
> > Casella and Berger ([2002](#ref-CaseBerg01), Def. 10.1.1).

> **NOTE:**
>
> *Remark 1* (Consistency describes a sequence of estimators). An estimator such as the [sample mean](exploratory-descriptive.llms.md#def-sample-mean) is a formula that applies to any sample size, so \\\hat{\theta}\_1, \hat{\theta}\_2, \ldots\\ is a sequence of estimators, one for each \\n\\. [Unbiasedness](estimation.llms.md#def-unbiased) and [mean squared error](estimation.llms.md#def-mse) describe an estimator at one fixed sample size; consistency describes what happens to the whole sequence as \\n\\ grows. An estimator can be consistent and biased at every \\n\\, or unbiased at every \\n\\ and not consistent (the single-observation estimator \\X_1\\ of a mean is the standard example).

> **NOTE:**
>
> **Exercise 1 (Bounding the chance of a large estimation error)** Let \\\hat{\theta}\\ be an estimator of \\\theta\\ with finite [mean squared error](estimation.llms.md#def-mse), and let \\\varepsilon \> 0\\. Use [Markov’s inequality](https://morrison-lab.github.io/pds/limit-theorems.html#thm-markov) to show that \\\Pr\mathopen{}\left(\mathopen{}\left\|\hat{\theta}- \theta\right\|\mathclose{} \ge \varepsilon\right)\mathclose{} \le \operatorname{MSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{} / \varepsilon^2\\.

> **NOTE:**
>
> *Solution 1*. Both sides of \\\mathopen{}\left\|\hat{\theta}- \theta\right\|\mathclose{} \ge \varepsilon\\ are nonnegative, so squaring them keeps the inequality. The random variable \\{\mathopen{}\left(\hat{\theta}- \theta\right)\mathclose{}}^2\\ is nonnegative, so Markov’s inequality applies to it with \\a = \varepsilon^2\\:
>
> \\ \begin{aligned} \Pr\mathopen{}\left(\mathopen{}\left\|\hat{\theta}- \theta\right\|\mathclose{} \ge \varepsilon\right)\mathclose{} &= \Pr\mathopen{}\left({\mathopen{}\left(\hat{\theta}- \theta\right)\mathclose{}}^2 \ge \varepsilon^2\right)\mathclose{} && \text{(square both nonnegative sides)}\\ &\le \frac{\operatorname{E}\mathopen{}\left\[{\mathopen{}\left(\hat{\theta}- \theta\right)\mathclose{}}^2\right\]\mathclose{}}{\varepsilon^2} && \text{(Markov's inequality, \$a = \varepsilon^2 \> 0\$)}\\ &= \frac{\operatorname{E}\mathopen{}\left\[{\mathopen{}\left(\varepsilon\mathopen{}\left(\hat{\theta}\right)\mathclose{}\right)\mathclose{}}^2\right\]\mathclose{}}{\varepsilon^2} && \text{(definition of the estimation error)}\\ &= \frac{\operatorname{MSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}{\varepsilon^2} && \text{(definition of the mean squared error)} \end{aligned} \\

> **NOTE:**
>
> **Lemma 1 (Chance of a large estimation error)** If \\\hat{\theta}\\ is an estimator of \\\theta\\ with finite mean squared error, then for every \\\varepsilon \> 0\\ the probability of an estimation error of at least \\\varepsilon\\ is at most the mean squared error divided by \\\varepsilon^2\\:
>
> \\ \Pr\mathopen{}\left(\mathopen{}\left\|\hat{\theta}- \theta\right\|\mathclose{} \ge \varepsilon\right)\mathclose{} \le \frac{\operatorname{MSE}\mathopen{}\left(\hat{\theta}\right)\mathclose{}}{\varepsilon^2} \tag{2}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 1](#exr-estimation-error-bound).

> **NOTE:**
>
> **Theorem 1 (Vanishing mean squared error implies consistency)** If the mean squared error of \\\hat{\theta}\_n\\ goes to zero as \\n\\ grows, then \\\hat{\theta}\_n\\ is a [consistent](#def-consistent) estimator of \\\theta\\:
>
> \\ \lim\_{n \to \infty} \operatorname{MSE}\mathopen{}\left(\hat{\theta}\_n\right)\mathclose{} = 0 \quad \Longrightarrow \quad \hat{\theta}\_n \overset{\scriptstyle p}{\longrightarrow}\theta \tag{3}\\

> **NOTE:**
>
> *Proof*. Fix \\\varepsilon \> 0\\. By [Lemma 1](#lem-estimation-error-bound), \\0 \le \Pr\mathopen{}\left(\mathopen{}\left\|\hat{\theta}\_n - \theta\right\|\mathclose{} \ge \varepsilon\right)\mathclose{} \le \operatorname{MSE}\mathopen{}\left(\hat{\theta}\_n\right)\mathclose{} / \varepsilon^2\\ for every \\n\\. The upper bound goes to zero as \\n \to \infty\\, because \\\varepsilon\\ is fixed and \\\operatorname{MSE}\mathopen{}\left(\hat{\theta}\_n\right)\mathclose{} \to 0\\, so the probability, squeezed between zero and the bound, goes to zero. This holds for every \\\varepsilon \> 0\\, which is [Equation 1](#eq-consistent).

> **NOTE:**
>
> **Corollary 1 (The sample mean is consistent)** Let \\X_1, \ldots, X_n\\ be independent with common mean \\\mu\\ and common finite variance \\\sigma^2\\. Then the sample mean is a [consistent](#def-consistent) estimator of \\\mu\\: \\\bar X_n \overset{\scriptstyle p}{\longrightarrow}\mu\\.

> **NOTE:**
>
> *Proof*. By [the example on two estimators of a mean](estimation.llms.md#exm-mse-sample-mean), \\\operatorname{MSE}\mathopen{}\left(\bar X_n\right)\mathclose{} = \sigma^2/ n\\, which goes to zero as \\n \to \infty\\. [Theorem 1](#thm-mse-consistent) then gives \\\bar X_n \overset{\scriptstyle p}{\longrightarrow}\mu\\. This is the [weak law of large numbers](https://morrison-lab.github.io/pds/limit-theorems.html#thm-wlln), proved in pds directly from Chebyshev’s inequality.

> **NOTE:**
>
> **Example 1 (Consistency of the sample mean for birth weights)** The `birthwt` data record the birth weight (grams) of 189 babies from a study at Baystate Medical Center in Springfield, Massachusetts ([Hosmer and Lemeshow 1989](#ref-hosmer1989applied)); the data ship with the R package [`MASS`](https://cran.r-project.org/package=MASS) ([`MASS::birthwt`](https://rdrr.io/pkg/MASS/man/birthwt.html)), and this site has a copy at [`data/birthwt.csv`](data/birthwt.csv).
>
> To see [Corollary 1](#cor-sample-mean-consistent) at work, treat these babies as a finite population and let the estimand \\\mu\\ be their mean birth weight. We draw \\n\\ babies at random with replacement, so the draws are independent with the population’s mean and variance, and we ask how often the sample mean misses \\\mu\\ by at least \\\varepsilon = 100\\ grams. For each \\n\\ we repeat the sampling 2000 times and report the fraction of repeats that miss, with a 95% confidence interval for that probability (the Wilson score interval with continuity correction, the default of [`prop.test()`](https://rdrr.io/r/stats/prop.test.html)), next to the bound \\\sigma^2/ (n \varepsilon^2)\\ that [Lemma 1](#lem-estimation-error-bound) gives, capped at 1 because a probability cannot exceed 1, using \\\operatorname{MSE}\mathopen{}\left(\bar X_n\right)\mathclose{} = \sigma^2/ n\\ from [the example on two estimators of a mean](estimation.llms.md#exm-mse-sample-mean).
>
> Show R code
>
> ``` downlit
> birthwt <- read.csv("data/birthwt.csv")
> bwt <- birthwt$bwt
>
> # The population: the 189 observed birth weights.
> mu <- mean(bwt)
> # Population variance (divisor N, not N - 1), because the draws below
> # come from exactly this finite population.
> sigma_sq <- mean((bwt - mu)^2)
> eps <- 100
> n_reps <- 2000
> sample_sizes <- c(5, 10, 20, 40, 80, 160, 320)
>
> set.seed(203)
> miss_counts <- vapply(
>   sample_sizes,
>   function(n) {
>     sum(replicate(
>       n_reps,
>       abs(mean(sample(bwt, n, replace = TRUE)) - mu) >= eps
>     ))
>   },
>   numeric(1)
> )
>
> miss_ci <- lapply(miss_counts, prop.test, n = n_reps)
>
> consistency_sim <- data.frame(
>   n = sample_sizes,
>   miss_prob = miss_counts / n_reps,
>   lower = vapply(miss_ci, function(ci) ci$conf.int[1], numeric(1)),
>   upper = vapply(miss_ci, function(ci) ci$conf.int[2], numeric(1)),
>   bound = pmin(1, sigma_sq / (sample_sizes * eps^2))
> )
> consistency_sim
> ```
>
> > **NOTE:**
> >
> > Show R code
> >
> > ``` downlit
> > p <- ggplot(consistency_sim, aes(x = n)) +
> >   geom_ribbon(aes(ymin = lower, ymax = upper), alpha = 0.25) +
> >   geom_line(aes(y = miss_prob, linetype = "simulated")) +
> >   geom_point(aes(y = miss_prob)) +
> >   geom_line(aes(y = bound, linetype = "bound")) +
> >   scale_x_log10(breaks = sample_sizes) +
> >   scale_linetype_manual(
> >     values = c(simulated = "solid", bound = "dashed"),
> >     name = NULL
> >   ) +
> >   labs(
> >     x = "sample size n",
> >     y = "probability of a miss"
> >   )
> > if (knitr::is_html_output()) plotly::ggplotly(p) else p
> > ```
> >
> > Figure 1: The chance that the sample mean of \\n\\ birth weights misses the mean by 100 g or more, by simulation (2000 repeats per \\n\\, with 95% confidence bands) and by the bound from [Lemma 1](#lem-estimation-error-bound)
>
> The simulated probability shrinks toward zero as \\n\\ grows, as consistency says it must, and it lies below the bound at every sample size here, which is loose for small \\n\\ but follows the same \\1/n\\ decay.

## 2 Efficiency

> **NOTE:**
>
> **Definition 2 (Relative efficiency)** Let \\\hat{\theta}\_a\\ and \\\hat{\theta}\_b\\ be two estimators of the same estimand \\\theta\\. The **relative efficiency** of \\\hat{\theta}\_a\\ with respect to \\\hat{\theta}\_b\\ is the ratio of their [mean squared errors](estimation.llms.md#def-mse), the reference estimator’s, that of \\\hat{\theta}\_b\\, in the numerator:
>
> \\\frac{\operatorname{MSE}\mathopen{}\left(\hat{\theta}\_b\right)\mathclose{}}{\operatorname{MSE}\mathopen{}\left(\hat{\theta}\_a\right)\mathclose{}}\\
>
> > **NOTE:**
> >
> > Casella and Berger ([2002](#ref-CaseBerg01)) define the asymptotic version, through variances, in Def. 10.1.16 (p. 476); this finite-sample form uses the mean squared error of their Def. 7.3.1 (p. 330).

> **NOTE:**
>
> *Remark 2* (Reading the relative efficiency). A relative efficiency above 1 means \\\hat{\theta}\_a\\ is more accurate than \\\hat{\theta}\_b\\, and below 1 means it is less accurate. For two [unbiased](estimation.llms.md#def-unbiased) estimators the mean squared errors are the variances ([mean squared error equals bias squared plus variance](estimation.llms.md#thm-mse-bias-variance), with zero bias), so the relative efficiency is the ratio of the variances.

> **NOTE:**
>
> **Example 2 (Relative efficiency of two estimators of a mean)** In [the example on two estimators of a mean](estimation.llms.md#exm-mse-sample-mean) the sample mean has \\\operatorname{MSE}\mathopen{}\left(\bar X\right)\mathclose{} = \sigma^2/ n\\ and the single-observation estimator has \\\operatorname{MSE}\mathopen{}\left(X_1\right)\mathclose{} = \sigma^2\\. The relative efficiency of the sample mean with respect to \\X_1\\ is
>
> \\ \begin{aligned} \frac{\operatorname{MSE}\mathopen{}\left(X_1\right)\mathclose{}}{\operatorname{MSE}\mathopen{}\left(\bar X\right)\mathclose{}} &= \frac{\sigma^2}{\sigma^2/ n} && \text{(substitute the two mean squared errors)}\\ &= \sigma^2\cdot \frac{n}{\sigma^2} && \text{(divide by a fraction: multiply by its reciprocal)}\\ &= n \cdot \frac{\sigma^2}{\sigma^2} && \text{(reorder the factors)}\\ &= n \cdot 1 && \text{(\$a / a = 1\$)}\\ &= n && \text{(\$b \cdot 1 = b\$)} \end{aligned} \\
>
> so with \\n = 50\\ students, as in [the student-height example](estimation.llms.md#exm-estimator), the sample mean is 50 times as efficient as \\X_1\\.

## 3 The Cramér–Rao lower bound

> **NOTE:**
>
> **Exercise 2 (Covariance of an unbiased estimator with the score)** Let \\\tilde{X}\\ have density \\\operatorname{p}(\tilde{x}\mid \theta)\\ for a scalar parameter \\\theta\\, under the assumptions of [the exercise on the mean of the score](intro-MLEs.llms.md#exr-score-mean-zero), and let \\\hat{\theta}= \hat{\theta}(\tilde{X})\\ be an [unbiased](estimation.llms.md#def-unbiased) estimator of \\\theta\\ with finite variance. Show that the covariance of \\\hat{\theta}\\ with the [score](intro-MLEs.llms.md#def-score) \\\ell'(\tilde{X}\mid \theta)\\ equals 1. Assume the derivative of \\\operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}\\ with respect to \\\theta\\ can be taken inside the integral.

> **NOTE:**
>
> *Solution 2*. The score has mean zero by [the exercise on the mean of the score](intro-MLEs.llms.md#exr-score-mean-zero). The step that rewrites the product of the score and the density uses [the exercise on the derivative of a density](intro-MLEs.llms.md#exr-deriv-log-density):
>
> \\ \begin{aligned} \operatorname{Cov}\mathopen{}\left(\hat{\theta}, \ell'\right)\mathclose{} &= \operatorname{E}\mathopen{}\left\[\hat{\theta}\ell'\right\]\mathclose{} - \operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{}\\\operatorname{E}\mathopen{}\left\[\ell'\right\]\mathclose{} && \text{(definition of covariance)}\\ &= \operatorname{E}\mathopen{}\left\[\hat{\theta}\ell'\right\]\mathclose{} - \operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{} \cdot 0 && \text{(the score has mean zero)}\\ &= \operatorname{E}\mathopen{}\left\[\hat{\theta}\ell'\right\]\mathclose{} - 0 && \text{(\$b \cdot 0 = 0\$)}\\ &= \operatorname{E}\mathopen{}\left\[\hat{\theta}\ell'\right\]\mathclose{} && \text{(\$a - 0 = a\$)}\\ &= \int \hat{\theta}(\tilde{x}) \\ \ell'(\tilde{x}\mid \theta) \\ \operatorname{p}(\tilde{x}\mid \theta) \\ d\tilde{x} && \text{(definition of expectation)}\\ &= \int \hat{\theta}(\tilde{x}) \mathopen{}\left(\frac{\partial}{\partial \theta} \log \operatorname{p}(\tilde{x}\mid \theta)\right)\mathclose{} \operatorname{p}(\tilde{x}\mid \theta) \\ d\tilde{x} && \text{(definition of the score)}\\ &= \int \hat{\theta}(\tilde{x}) \\ \frac{\partial}{\partial \theta} \operatorname{p}(\tilde{x}\mid \theta) \\ d\tilde{x} && \text{(derivative of a log density)}\\ &= \frac{\partial}{\partial \theta} \int \hat{\theta}(\tilde{x}) \\ \operatorname{p}(\tilde{x}\mid \theta) \\ d\tilde{x} && \text{(exchange derivative and integral)}\\ &= \frac{\partial}{\partial \theta} \operatorname{E}\mathopen{}\left\[\hat{\theta}\right\]\mathclose{} && \text{(definition of expectation)}\\ &= \frac{\partial}{\partial \theta} \theta && \text{(\$\hat{\theta}\$ is unbiased)}\\ &= 1 && \text{(derivative of \$\theta\$ with respect to \$\theta\$)} \end{aligned} \\

> **NOTE:**
>
> **Lemma 2 (Covariance of an unbiased estimator with the score)** Under the assumptions of [Exercise 2](#exr-cov-estimator-score), an unbiased estimator \\\hat{\theta}\\ of \\\theta\\ has covariance 1 with the score:
>
> \\ \operatorname{Cov}\mathopen{}\left(\hat{\theta}, \ell'(\tilde{X}\mid \theta)\right)\mathclose{} = 1 \tag{4}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 2](#exr-cov-estimator-score).

> **NOTE:**
>
> **Theorem 2 (Cramér–Rao lower bound)** Under the assumptions of [Exercise 2](#exr-cov-estimator-score), suppose the [expected information](intro-MLEs.llms.md#def-einf) satisfies \\0 \< \mathcal{I}(\theta) \< \infty\\. Then every unbiased estimator \\\hat{\theta}\\ of \\\theta\\ has variance at least the reciprocal of the expected information:
>
> \\ \operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{} \ge \frac{1}{\mathcal{I}(\theta)} \tag{5}\\
>
> > **NOTE:**
> >
> > Rao ([1945](#ref-rao1945information)); Cramér ([1946](#ref-cramer1946mathematical)); Casella and Berger ([2002](#ref-CaseBerg01), Thm. 7.3.9, p. 335).

> **NOTE:**
>
> *Proof*. The score has variance \\\mathcal{I}(\theta) \> 0\\ by [the theorem on the mean and variance of the score](intro-MLEs.llms.md#thm-information-equality), and \\\operatorname{Cov}\mathopen{}\left(\hat{\theta}, \ell'\right)\mathclose{} = 1\\ by [Lemma 2](#lem-cov-estimator-score). A constant has covariance zero with every random variable, so \\\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{} \> 0\\. The [correlation](https://morrison-lab.github.io/pds/variance-covariance.html#def-correlation) of \\\hat{\theta}\\ and the score is therefore defined, and by [its bounds](https://morrison-lab.github.io/pds/variance-covariance.html#thm-cor-bounds) its square is at most 1:
>
> \\ \begin{aligned} 1 &\ge {\mathopen{}\left(\operatorname{Cor}\mathopen{}\left(\hat{\theta}, \ell'\right)\mathclose{}\right)\mathclose{}}^2 && \text{(correlation lies in \$\[-1, 1\]\$)}\\ &= \frac{{\mathopen{}\left(\operatorname{Cov}\mathopen{}\left(\hat{\theta}, \ell'\right)\mathclose{}\right)\mathclose{}}^2}{\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}\\\operatorname{Var}\mathopen{}\left(\ell'\right)\mathclose{}} && \text{(definition of correlation, squared)}\\ &= \frac{1^2}{\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}\\\mathcal{I}(\theta)} && \text{(covariance is 1; the score has variance \$\mathcal{I}(\theta)\$)}\\ &= \frac{1}{\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}\\\mathcal{I}(\theta)} && \text{(\$1^2 = 1\$)} \end{aligned} \\
>
> Multiplying both sides by \\\operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{}\\ and dividing by \\\mathcal{I}(\theta)\\, both positive, gives [Equation 5](#eq-cramer-rao).

> **NOTE:**
>
> **Definition 3 (Efficient estimator)** An [unbiased](estimation.llms.md#def-unbiased) estimator \\\hat{\theta}\\ of \\\theta\\ is **efficient** if its variance equals the [Cramér–Rao lower bound](#thm-cramer-rao):
>
> \\ \operatorname{Var}\mathopen{}\left(\hat{\theta}\right)\mathclose{} = \frac{1}{\mathcal{I}(\theta)} \\
>
> > **NOTE:**
> >
> > Casella and Berger ([2002, sec. 7.3.2](#ref-CaseBerg01)).

> **NOTE:**
>
> *Remark 3* (An efficient estimator has the smallest variance). By the Cramér–Rao lower bound, no unbiased estimator that satisfies its assumptions has a smaller variance than an efficient one. Among such estimators, an efficient estimator therefore also has the smallest mean squared error ([mean squared error equals bias squared plus variance](estimation.llms.md#thm-mse-bias-variance), with zero bias).

> **NOTE:**
>
> **Example 3 (The sample mean is efficient for Poisson data)** For \\X_1, \ldots, X_n \\ \sim\_{\operatorname{iid}}\\ \operatorname{Pois}({\lambda})\\, the sample mean \\\bar X\\ is unbiased for \\{\lambda}\\ ([the bias example](estimation.llms.md#exm-bias-sample-mean)), and, because \\\operatorname{Var}\mathopen{}\left(X_i\right)\mathclose{} = {\lambda}\\ for a Poisson variable, \\\operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{} = {\lambda}/ n\\ ([the example on two estimators of a mean](estimation.llms.md#exm-mse-sample-mean)). The expected information is \\\mathcal{I}({\lambda}) = n / {\lambda}\\ ([the Poisson information example](intro-MLEs.llms.md#exm-information-poisson)), so
>
> \\ \begin{aligned} \frac{1}{\mathcal{I}({\lambda})} &= \frac{1}{n / {\lambda}} && \text{(substitute the expected information)}\\ &= \frac{{\lambda}}{n} && \text{(reciprocal of a fraction)}\\ &= \operatorname{Var}\mathopen{}\left(\bar X\right)\mathclose{} && \text{(variance of the sample mean)} \end{aligned} \\
>
> The sample mean attains the Cramér–Rao bound, so it is an [efficient](#def-efficient) estimator of \\{\lambda}\\. It is also the maximum likelihood estimator ([the Poisson MLE example](intro-MLEs.llms.md#exm-dist-mle-poisson)).

> **NOTE:**
>
> *Remark 4* (What the bound does and does not say). The bound holds only for unbiased estimators, and only when the regularity conditions of [the exercise on the mean of the score](intro-MLEs.llms.md#exr-score-mean-zero) hold. When the set of possible data values depends on the parameter, as for the uniform distribution on \\\[0, \theta\]\\, the conditions fail and the bound need not hold (compare [the uniform example](intro-MLEs.llms.md#exm-information-equality-fails)).
>
> A biased estimator can have a variance below the bound, because the bound relies on [the covariance of an estimator and the score](#exr-cov-estimator-score), which assumes the estimator is unbiased. Its [mean squared error](estimation.llms.md#thm-mse-bias-variance) adds the squared bias to the variance, so trading a little bias for a large drop in variance can also lower the mean squared error.
>
> The information from \\n\\ independent observations is \\n\\ times the information from one, so for a sample of size \\n\\ the bound shrinks like \\1/n\\. That is the rate at which the variance of an efficient estimator falls, and the [maximum likelihood estimator](intro-MLEs.llms.md#thm-dist-mle) attains it asymptotically.

## References

Casella, George, and Roger Berger. 2002. *Statistical Inference*. 2nd ed. Cengage Learning. <https://www.cengage.com/c/statistical-inference-2e-casella-berger/9780534243128/>.

Cramér, Harald. 1946. *Mathematical Methods of Statistics*. Princeton University Press. <https://doi.org/10.1515/9781400883868>.

Hosmer, David W., and Stanley Lemeshow. 1989. *Applied Logistic Regression*. Wiley.

Rao, C. Radhakrishna. 1945. “Information and the Accuracy Attainable in the Estimation of Statistical Parameters.” *Bulletin of the Calcutta Mathematical Society* 37: 81–91.

Back to top

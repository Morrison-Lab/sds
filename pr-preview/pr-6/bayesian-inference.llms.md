# Bayesian Inference

Code

Published

Last modified: 2026-09-28 01:41:08 (PDT)

This page introduces the **Bayesian** approach to statistical inference, from its foundations, through the simulation methods that put it into practice, to analyses of common regression models. It has three parts:

- **Foundations** ([Section 1](#sec-bayes-paradigms) through [Section 4](#sec-bayes-hierarchies)) contrasts the frequentist and Bayesian paradigms, states Bayes’ theorem as a rule for updating beliefs about parameters, discusses how to choose a prior, and outlines hierarchical models. This part follows ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e)).
- **Computation** ([Section 5](#sec-foundations) through [Section 8](#sec-dic)) explains why most posteriors must be simulated, introduces Monte Carlo integration and Markov chains, describes the Metropolis–Hastings and Gibbs samplers, shows how to check a sampler’s output, and presents a criterion for comparing models. This part follows ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e)).
- **Applications** ([Section 9](#sec-bayes-examples) onward) fits a proportion, a logistic regression, a survival model and a random-effects model with the **JAGS** sampler, and averages over linear regression models. This part follows ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e)).

## 1 Frequentist and Bayesian paradigms

The [estimation](estimation.llms.md) and [inference](inference.llms.md) pages treat an unknown parameter \\\theta\\ as a fixed but unknown constant, and quantify uncertainty using the sampling distribution of an estimator \\\hat\theta\\: the distribution of \\\hat\theta\\ over hypothetical repetitions of the data-generating process. This stance is the **frequentist** paradigm: probability describes long-run frequencies, and a parameter, being a constant, has no probability distribution.

The **Bayesian** paradigm instead treats the unknown parameter as a random variable, with its own probability distribution ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e), p. 271). Probability here measures degree of belief.

> **NOTE:**
>
> **Definition 1 (Prior distribution)** The **prior distribution** of a parameter \\\theta\\, with density or probability mass function \\\operatorname{p}(\theta)\\, is the probability distribution that describes what is believed about \\\theta\\ before the data are observed.

> **NOTE:**
>
> **Example 1 (A uniform prior for a probability)** Let \\\pi\\ be the probability that a randomly chosen adult in some population smokes. Before collecting any data, an analyst who considers every value of \\\pi\\ in \\(0, 1)\\ equally plausible could use the uniform prior
>
> \\\operatorname{p}(\pi) = 1, \quad 0 \< \pi \< 1.\\
>
> Under this prior, the prior probability that fewer than 10% of adults smoke is \\\Pr(\pi \< 0.1) = \int_0^{0.1} 1 \\ d\pi = 0.1\\.

The two paradigms answer different questions. A frequentist asks, “for which parameter values would these data be unsurprising?”; a Bayesian asks, “given these data, what should I now believe about the parameter?”. Neither question is wrong, and they call for different machinery.

## 2 Bayes’ theorem for parameters

> **NOTE:**
>
> **Definition 2 (Posterior distribution)** The **posterior distribution** of a parameter \\\theta\\, given observed data \\\tilde{Y}= \tilde{y}\\, is the [conditional distribution](https://morrison-lab.github.io/rme/chapters/probability.html#def-cond-pdf) of \\\theta\\ given \\\tilde{Y}= \tilde{y}\\. Its density or probability mass function is written \\\operatorname{p}(\theta \mid \tilde{y})\\.

> **NOTE:**
>
> **Example 2 (Posterior probability that a coin is biased)** A coin is either fair (\\\theta = 0.5\\) or biased toward heads (\\\theta = 0.8\\), where \\\theta\\ is its probability of heads, with prior probabilities \\\operatorname{p}(0.5) = 0.9\\ and \\\operatorname{p}(0.8) = 0.1\\. After three tosses that all land heads, the posterior distribution of \\\theta\\ is its conditional distribution given those tosses. Its probabilities are computed in [Example 3](#exm-marginal-likelihood).

> **NOTE:**
>
> **Definition 3 (Marginal likelihood)** Given a prior \\\operatorname{p}(\theta)\\ and a model \\\operatorname{p}(\tilde{y}\mid \theta)\\ for the data given \\\theta\\, the **marginal likelihood** (also called the **evidence**) of observed data \\\tilde{y}\\ is
>
> \\ \operatorname{p}(\tilde{y}) \stackrel{\text{def}}{=}\int \operatorname{p}(\tilde{y}\mid \theta)\\ \operatorname{p}(\theta)\\ d\theta, \\
>
> with the integral replaced by a sum over the possible values of \\\theta\\ when \\\theta\\ is discrete.

> **NOTE:**
>
> **Theorem 1 (Bayes’ theorem for parameters)** If \\\operatorname{p}(\tilde{y}) \> 0\\, then
>
> \\ \operatorname{p}(\theta \mid \tilde{y}) = \frac{\operatorname{p}(\tilde{y}\mid \theta)\\ \operatorname{p}(\theta)}{\operatorname{p}(\tilde{y})}. \tag{1}\\

> **NOTE:**
>
> *Proof*. By the definition of a conditional density, \\\operatorname{p}(\theta \mid \tilde{y}) = \operatorname{p}(\theta, \tilde{y}) / \operatorname{p}(\tilde{y})\\ and \\\operatorname{p}(\theta, \tilde{y}) = \operatorname{p}(\tilde{y}\mid \theta)\\ \operatorname{p}(\theta)\\, where \\\operatorname{p}(\tilde{y})\\ is the marginal density of \\\tilde{Y}\\ at \\\tilde{y}\\. That marginal density is
>
> \\ \begin{aligned} \operatorname{p}(\tilde{y}) &= \int \operatorname{p}(\theta, \tilde{y})\\ d\theta && \text{(marginalizing over \$\theta\$)}\\ &= \int \operatorname{p}(\tilde{y}\mid \theta)\\ \operatorname{p}(\theta)\\ d\theta && \text{(substituting the factorization of \$\operatorname{p}(\theta, \tilde{y})\$)}, \end{aligned} \\
>
> which is the [marginal likelihood](#def-marginal-likelihood). Substituting the factorization into the numerator of \\\operatorname{p}(\theta, \tilde{y}) / \operatorname{p}(\tilde{y})\\ gives [Equation 1](#eq-bayes-posterior).

> **NOTE:**
>
> **Example 3 (Posterior probability that a coin is biased, computed)** Continuing [Example 2](#exm-posterior), let \\\tilde{y}\\ be the three heads, so \\\operatorname{p}(\tilde{y}\mid \theta) = \theta^3\\. The [marginal likelihood](#def-marginal-likelihood) sums over the two possible values of \\\theta\\:
>
> \\ \begin{aligned} \operatorname{p}(\tilde{y}) &= \operatorname{p}(\tilde{y}\mid 0.5)\\ \operatorname{p}(0.5) + \operatorname{p}(\tilde{y}\mid 0.8)\\ \operatorname{p}(0.8)\\ &= 0.5^3 \cdot 0.9 + 0.8^3 \cdot 0.1\\ &= 0.1125 + 0.0512\\ &= 0.1637. \end{aligned} \\
>
> By [Theorem 1](#thm-bayes-posterior),
>
> \\ \operatorname{p}(0.8 \mid \tilde{y}) = \frac{\operatorname{p}(\tilde{y}\mid 0.8)\\ \operatorname{p}(0.8)}{\operatorname{p}(\tilde{y})} = \frac{0.0512}{0.1637} \approx 0.313, \\
>
> and \\\operatorname{p}(0.5 \mid \tilde{y}) = 0.1125 / 0.1637 \approx 0.687\\. Three heads in a row raise the probability that the coin is biased from \\0.1\\ to about \\0.31\\.

> **NOTE:**
>
> **Corollary 1 (The posterior is proportional to likelihood times prior)** As a function of \\\theta\\, with the data \\\tilde{y}\\ held fixed,
>
> \\ \underbrace{\operatorname{p}(\theta \mid \tilde{y})}\_{\text{posterior}} \\\propto\\ \underbrace{\operatorname{p}(\tilde{y}\mid \theta)}\_{\text{likelihood}} \cdot \underbrace{\operatorname{p}(\theta)}\_{\text{prior}}. \tag{2}\\

> **NOTE:**
>
> *Proof*. In [Equation 1](#eq-bayes-posterior), the denominator \\\operatorname{p}(\tilde{y})\\ does not depend on \\\theta\\.

[Theorem 1](#thm-bayes-posterior) is [Bayes’ theorem](https://morrison-lab.github.io/rme/chapters/probability.html#thm-bayes) for events, restated for densities. Here \\\operatorname{p}(\tilde{y}\mid \theta)\\, viewed as a function of \\\theta\\, is the [likelihood](intro-MLEs.llms.md#def-lik) \\\mathcal{L}(\theta)\\. [Corollary 1](#cor-bayes-proportional) is the workhorse of applied Bayesian analysis: it identifies the posterior from the shape of likelihood times prior, without computing the integral \\\operatorname{p}(\tilde{y})\\, and it is what makes the simulation methods of [Section 5](#sec-foundations) possible ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e), p. 272).

### 2.1 A Gaussian mean with a Gaussian prior

> **NOTE:**
>
> **Example 4 (Posterior for a Gaussian mean)** Suppose that, given the mean \\\mu\\, \\X_1, \ldots, X_n \\ \sim\_{\operatorname{iid}}\\ \operatorname{N}\mathopen{}\left(\mu, 1\right)\mathclose{}\\, so the variance is known, and that the prior for \\\mu\\ is \\\operatorname{N}\mathopen{}\left(0, 1\right)\mathclose{}\\. Let \\\tilde{x}= (x_1, \ldots, x_n)\\ be the observed data, with sample mean \\\bar x\\.
>
> The likelihood is
>
> \\ \begin{aligned} \operatorname{p}(\tilde{x}\mid \mu) &= \prod\_{i=1}^n (2\pi)^{-1/2} \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}(x_i - \mu)^2\right\\\mathclose{} && \text{(independent Gaussian observations)}\\ &= (2\pi)^{-n/2} \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\sum\_{i=1}^n (x_i - \mu)^2\right\\\mathclose{} && \text{(combining the exponents)}\\ &= (2\pi)^{-n/2} \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mathopen{}\left(\sum\_{i=1}^n x_i^2 - 2 \mu n \bar x + n \mu^2\right)\mathclose{}\right\\\mathclose{} && \text{(expanding the square; \$\sum_i x_i = n \bar x\$)}\\ &\propto \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mathopen{}\left(n \mu^2 - 2 \mu n \bar x\right)\mathclose{}\right\\\mathclose{} && \text{(dropping factors that do not involve \$\mu\$)}, \end{aligned} \\
>
> and the prior density is \\\operatorname{p}(\mu) \propto \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mu^2\right\\\mathclose{}\\. Let \\m \stackrel{\text{def}}{=}\frac{n}{n+1} \bar x\\. By [Corollary 1](#cor-bayes-proportional),
>
> \\ \begin{aligned} \operatorname{p}(\mu \mid \tilde{x}) &\propto \operatorname{p}(\tilde{x}\mid \mu)\\ \operatorname{p}(\mu) && \text{(posterior is proportional to likelihood times prior)}\\ &\propto \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mathopen{}\left(n \mu^2 - 2 \mu n \bar x\right)\mathclose{}\right\\\mathclose{} \cdot \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mu^2\right\\\mathclose{} && \text{(substituting likelihood and prior)}\\ &= \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mathopen{}\left((n+1)\mu^2 - 2 \mu n \bar x\right)\mathclose{}\right\\\mathclose{} && \text{(adding exponents)}\\ &= \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}(n+1)\mathopen{}\left(\mu^2 - 2 \mu m\right)\mathclose{}\right\\\mathclose{} && \text{(factoring out \$n+1\$; definition of \$m\$)}\\ &= \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}(n+1)\mathopen{}\left((\mu - m)^2 - m^2\right)\mathclose{}\right\\\mathclose{} && \text{(completing the square)}\\ &\propto \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}(n+1)(\mu - m)^2\right\\\mathclose{} && \text{(dropping the factor \$\operatorname{exp}\mathopen{}\left\\\tfrac{1}{2}(n+1)m^2\right\\\mathclose{}\$)}. \end{aligned} \\
>
> The last line is, up to a constant, the density of a Gaussian distribution with mean \\m\\ and variance \\1/(n+1)\\, so the posterior is
>
> \\ \mu \mid \tilde{x}\\\sim\\ \operatorname{N}\mathopen{}\left(\frac{n}{n+1}\bar{x},\\ \frac{1}{n+1}\right)\mathclose{}. \\
>
> The posterior mean \\\frac{n}{n+1}\bar{x}\\ is the sample mean shrunk toward the prior mean \\0\\, and the shrinkage factor \\\frac{n}{n+1}\\ approaches \\1\\ as \\n \to \infty\\.

### 2.2 Two readings of an interval estimate

The two paradigms differ most visibly in how they interpret an interval estimate ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e), p. 271). A frequentist 95% [confidence interval](inference.llms.md#def-confidence-interval) is a random interval whose coverage probability, over repeated samples with \\\theta\\ held fixed, is 0.95. Any one realized interval either contains \\\theta\\ or does not; the 0.95 describes the procedure, not that interval. A Bayesian interval estimate instead makes a probability statement about \\\theta\\ itself, given the data actually observed.

> **NOTE:**
>
> **Definition 4 (Credible interval)** A \\100(1-\alpha)\\\\ **credible interval** for a parameter \\\theta\\, given observed data \\\tilde{y}\\, is an interval \\\mathopen{}\left\[l(\tilde{y}),\\ r(\tilde{y})\right\]\mathclose{}\\ whose [posterior](#def-posterior) probability is \\1 - \alpha\\:
>
> \\ \Pr\mathopen{}\left(l(\tilde{y}) \le \theta \le r(\tilde{y}) \mid \tilde{Y}= \tilde{y}\right)\mathclose{} = 1 - \alpha. \\

In a credible interval, the data are fixed at their observed values and \\\theta\\ is random, so the probability statement is about \\\theta\\ directly. Many intervals have posterior probability \\1 - \alpha\\. The usual choice, and the one used on this page, is the **equal-tailed** interval, whose endpoints are the \\\alpha/2\\ and \\1 - \alpha/2\\ quantiles of the posterior distribution.

> **NOTE:**
>
> **Example 5 (Credible and confidence intervals for a Gaussian mean)** We simulate \\n = 20\\ observations from the model of [Example 4](#exm-normal-normal), with true mean \\\mu = 2\\, and compute both a 95% confidence interval, \\\bar x \pm 1.96 / \sqrt{n}\\ (the variance is known to be 1), and the equal-tailed 95% credible interval from the \\\operatorname{N}\mathopen{}\left(\frac{n}{n+1}\bar{x},\\ \frac{1}{n+1}\right)\mathclose{}\\ posterior:
>
> ``` downlit
> set.seed(1)
> mu_true <- 2
> n <- 20
> x <- rnorm(n = n, mean = mu_true, sd = 1)
> xbar <- mean(x)
> ci_freq <- xbar + stats::qnorm(c(0.025, 0.975)) / sqrt(n)
> post_mean <- n / (n + 1) * xbar
> post_sd <- sqrt(1 / (n + 1))
> ci_bayes <- stats::qnorm(c(0.025, 0.975), mean = post_mean, sd = post_sd)
> rbind(confidence = ci_freq, credible = ci_bayes) |>
>   round(3) |>
>   `colnames<-`(c("lower", "upper"))
> #>            lower upper
> #> confidence 1.752 2.629
> #> credible   1.659 2.514
> ```
>
> The sample mean is \\\bar x = 2.191\\. The credible interval is slightly narrower than the confidence interval, because the prior adds information, and shifted toward the prior mean \\0\\.
>
> [Figure 1](#fig-normal-prior-lik-post) shows how the posterior combines prior and data. Completing the square in the likelihood of [Example 4](#exm-normal-normal) as a function of \\\mu\\ alone shows that the likelihood is proportional to a \\\operatorname{N}\mathopen{}\left(\bar x, 1/n\right)\mathclose{}\\ density, which is the curve drawn for it.
>
> Code
>
> ``` downlit
> mu_grid <- seq(-3, 5, length.out = 801)
> curves <- tibble::tibble(
>   mu = rep(mu_grid, times = 3),
>   curve = rep(c("prior", "likelihood", "posterior"), each = length(mu_grid)),
>   density = c(
>     stats::dnorm(mu_grid, mean = 0, sd = 1),
>     stats::dnorm(mu_grid, mean = xbar, sd = 1 / sqrt(n)),
>     stats::dnorm(mu_grid, mean = post_mean, sd = post_sd)
>   )
> )
> ggplot2::ggplot(curves) +
>   ggplot2::aes(x = mu, y = density, colour = curve) +
>   ggplot2::geom_line() +
>   ggplot2::labs(x = expression(mu), y = "density", colour = NULL)
> ```
>
> [![Three bell-shaped curves over the mean mu: a wide prior centered at 0, a narrow likelihood centered near 2.2, and a posterior just as narrow, centered slightly closer to 0 than the likelihood.](bayesian-inference_files/figure-html/unnamed-chunk-1-1.png)](bayesian-inference_files/figure-html/unnamed-chunk-1-1.png "Figure 1: The \operatorname{N}\mathopen{}\left(0, 1\right)\mathclose{} prior, the likelihood (scaled to integrate to 1), and the posterior for the mean \mu, for the data of Example 5.")
>
> Figure 1: The \\\operatorname{N}\mathopen{}\left(0, 1\right)\mathclose{}\\ prior, the likelihood (scaled to integrate to 1), and the posterior for the mean \\\mu\\, for the data of [Example 5](#exm-normal-credible-vs-confidence).
>
> Because \\\mu\\ has a distribution, the Bayesian can also compute the posterior probability that \\\mu\\ lies in the realized *confidence* interval:
>
> ``` downlit
> pr_in_ci <- stats::pnorm(ci_freq, mean = post_mean, sd = post_sd) |> diff()
> round(pr_in_ci, 3)
> #> [1] 0.931
> ```
>
> That probability is 0.931, not 0.95: under this prior, the confidence interval sits slightly too far from \\0\\. A frequentist cannot assign any probability to the event that \\\mu\\ lies in one realized interval, since both are fixed.

### 2.3 The parameter space

> **NOTE:**
>
> **Definition 5 (Parameter space)** The **parameter space** \\\Theta\\ of a model is the set of values that its parameter \\\theta\\ can take.

Because the Bayesian treats \\\theta\\ as random, the prior and posterior are distributions over the parameter space ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e), p. 274), and the prior has to respect it.

> **NOTE:**
>
> **Example 6 (Parameter spaces and priors that respect them)**  
>
> - A probability \\\pi\\ has parameter space \\(0, 1)\\, so its prior should be a distribution on the unit interval, such as the uniform prior of [Example 1](#exm-prior).
> - A variance \\\sigma^2\\ has parameter space \\(0, \infty)\\, so its prior should be a distribution on the positive half-line.
> - A vector of \\p\\ regression coefficients has parameter space \\\mathbb{R}^p\\, so its prior should be a distribution on \\\mathbb{R}^p\\.

> **NOTE:**
>
> **Corollary 2 (The posterior cannot put probability where the prior puts none)** If \\\operatorname{p}(\theta) = 0\\ for every \\\theta\\ in a set \\A \subset \Theta\\, then \\\operatorname{p}(\theta \mid \tilde{y}) = 0\\ for every \\\theta \in A\\, whatever the data \\\tilde{y}\\.

> **NOTE:**
>
> *Proof*. For \\\theta \in A\\, the numerator of [Equation 1](#eq-bayes-posterior) is \\\operatorname{p}(\tilde{y}\mid \theta) \cdot 0 = 0\\.

> **NOTE:**
>
> **Example 7 (A prior that rules out the truth)** An analyst sure that fewer than half of adults smoke might put a uniform prior on \\(0, 0.5)\\ for the smoking probability \\\pi\\. By [Corollary 2](#cor-prior-support), the posterior then gives probability 0 to \\\pi \> 0.5\\, even if 90 of 100 sampled adults smoke. The support of the prior is itself a modeling assumption, and one that no amount of data can correct.

## 3 Priors

The [prior](#def-prior) encodes what is known about \\\theta\\ before the current data are seen. Choosing it is the step that most distinguishes Bayesian practice from frequentist practice, and it is where most of the controversy and most of the craft lie ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e), p. 281).

### 3.1 Conjugate priors

> **NOTE:**
>
> **Definition 6 (Conjugate prior)** A family of prior distributions is **conjugate** to a likelihood if, for every prior in the family and every possible data set, the [posterior](#def-posterior) is also in the family.

A conjugate prior gives the posterior in closed form: updating the prior only changes the family’s parameters. In [Example 4](#exm-normal-normal), a Gaussian prior for a Gaussian mean gave a Gaussian posterior.

> **NOTE:**
>
> **Example 8 (Beta-Bernoulli updating)** Let \\Y_1, \ldots, Y_n \\ \sim\_{\operatorname{iid}}\\ \operatorname{Bernoulli}(\pi)\\ given \\\pi\\, with \\r = \sum\_{i=1}^n y_i\\ successes, and let the prior for \\\pi\\ be a \\\operatorname{Beta}(a, b)\\ distribution, whose density is proportional to \\\pi^{a-1}(1-\pi)^{b-1}\\ on \\(0, 1)\\. The likelihood is
>
> \\ \begin{aligned} \operatorname{p}(\tilde{y}\mid \pi) &= \prod\_{i=1}^n \pi^{y_i}(1-\pi)^{1-y_i} && \text{(independent Bernoulli observations)}\\ &= \pi^{\sum_i y_i}(1-\pi)^{n - \sum_i y_i} && \text{(adding exponents)}\\ &= \pi^{r}(1-\pi)^{n-r} && \text{(definition of \$r\$)}. \end{aligned} \\
>
> By [Corollary 1](#cor-bayes-proportional),
>
> \\ \begin{aligned} \operatorname{p}(\pi \mid \tilde{y}) &\propto \pi^{r}(1-\pi)^{n-r} \cdot \pi^{a-1}(1-\pi)^{b-1} && \text{(likelihood times prior)}\\ &= \pi^{a + r - 1}(1-\pi)^{b + n - r - 1} && \text{(adding exponents)}, \end{aligned} \\
>
> which is proportional to the \\\operatorname{Beta}(a + r,\\ b + n - r)\\ density. So the Beta family is conjugate to the Bernoulli likelihood. The prior parameters \\a\\ and \\b\\ act as **pseudo-counts** of prior successes and failures: the posterior adds the \\r\\ observed successes and \\n - r\\ observed failures to them.
>
> The uniform prior of [Example 1](#exm-prior) is \\\operatorname{Beta}(1, 1)\\. With that prior and \\r = 55\\ successes in \\n = 91\\ trials, the posterior is \\\operatorname{Beta}(56, 37)\\, with this mean and equal-tailed 95% [credible interval](#def-credible-interval):
>
> ``` downlit
> a_post <- 1 + 55
> b_post <- 1 + 91 - 55
> c(
>   mean = a_post / (a_post + b_post),
>   lower = stats::qbeta(0.025, a_post, b_post),
>   upper = stats::qbeta(0.975, a_post, b_post)
> ) |>
>   round(3)
> #>  mean lower upper 
> #> 0.602 0.501 0.699
> ```
>
> The mean uses the \\\operatorname{Beta}(a, b)\\ mean \\a / (a + b)\\ ([Casella and Berger 2002, sec. 3.3](#ref-CaseBerg01)).

### 3.2 Informative, weakly informative, and flat priors

Priors range along a spectrum of how strongly they constrain \\\theta\\ ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e), p. 281).

> **NOTE:**
>
> **Definition 7 (Informative prior)** An **informative prior** is a [prior](#def-prior) that concentrates its probability in a region of the parameter space singled out by knowledge from outside the current data, such as previous studies, biological limits, or expert judgment.

An informative prior pulls the posterior toward its region, most strongly when the data are sparse.

> **NOTE:**
>
> **Definition 8 (Weakly informative prior)** A **weakly informative prior** is a [prior](#def-prior) that gives little probability to implausible values of \\\theta\\, while spreading its probability nearly evenly across the range of scientifically plausible values.

> **NOTE:**
>
> **Definition 9 (Flat prior)** A **flat prior**, also called a **uniform** or **noninformative** prior, is a [prior](#def-prior) whose density is constant on the parameter space: \\\operatorname{p}(\theta) \propto 1\\ for \\\theta \in \Theta\\.

> **NOTE:**
>
> **Definition 10 (Improper prior)** An **improper prior** is a nonnegative function \\\operatorname{p}(\theta)\\, used in place of a prior density, whose integral over the parameter space is infinite, so that it is not a probability density.

> **NOTE:**
>
> **Example 9 (Three priors for a log odds ratio)** Let \\\beta\\ be the log odds ratio of disease for exposed versus unexposed people, so the odds ratio is \\e^\beta\\, and \\\beta\\ can be any real number.
>
> - **Informative**: a previous study estimated the odds ratio as 1.5, with a standard error of 0.2 for its logarithm, so an analyst adopts the prior \\\beta \sim \operatorname{N}\mathopen{}\left(\log 1.5,\\ 0.2^2\right)\mathclose{}\\.
> - **Weakly informative**: an analyst with no previous study, who nonetheless regards odds ratios above 100 as implausible, adopts \\\beta \sim \operatorname{N}\mathopen{}\left(0,\\ 2.5^2\right)\mathclose{}\\.
> - **Flat**: \\\operatorname{p}(\beta) \propto 1\\ on the whole real line. This prior is **improper**, since \\\int\_{-\infty}^{\infty} 1 \\ d\beta = \infty\\; it gives an odds ratio of \\10^6\\ the same density as an odds ratio of \\1\\.
>
> The two proper priors’ probabilities for large odds ratios:
>
> ``` downlit
> or_cutoffs <- c(10, 100, 1e6)
> rbind(
>   informative = stats::pnorm(log(or_cutoffs), log(1.5), 0.2,
>     lower.tail = FALSE
>   ),
>   weakly_informative = stats::pnorm(log(or_cutoffs), 0, 2.5,
>     lower.tail = FALSE
>   )
> ) |>
>   signif(2) |>
>   `colnames<-`(c("Pr(OR > 10)", "Pr(OR > 100)", "Pr(OR > 1e6)"))
> #>                    Pr(OR > 10) Pr(OR > 100) Pr(OR > 1e6)
> #> informative            1.2e-21      3.4e-98      0.0e+00
> #> weakly_informative     1.8e-01      3.3e-02      1.6e-08
> ```
>
> The informative prior all but rules out an odds ratio of 10; the weakly informative prior leaves a few percent of its probability above 100, and effectively none above \\10^6\\.

> **NOTE:**
>
> **Example 10 (A flat prior on a probability is not flat on its log-odds)** A [flat prior](#def-flat-prior) is flat only on the scale on which it is stated. Let \\\pi\\ have the uniform prior of [Example 1](#exm-prior), and let \\\eta \stackrel{\text{def}}{=}\operatorname{logit}(\pi)\\ be its log-odds, so that \\\pi = \operatorname{expit}(\eta) = 1 / (1 + e^{-\eta})\\. The derivative of \\\operatorname{expit}\\ is
>
> \\ \begin{aligned} \frac{d}{d\eta} \operatorname{expit}(\eta) &= \frac{d}{d\eta} (1 + e^{-\eta})^{-1}\\ &= -(1 + e^{-\eta})^{-2} \cdot (-e^{-\eta}) && \text{(chain rule)}\\ &= \frac{1}{1 + e^{-\eta}} \cdot \frac{e^{-\eta}}{1 + e^{-\eta}} && \text{(splitting the fraction)}\\ &= \operatorname{expit}(\eta)\\ \mathopen{}\left(1 - \operatorname{expit}(\eta)\right)\mathclose{} && \text{(\$\tfrac{e^{-\eta}}{1 + e^{-\eta}} = 1 - \tfrac{1}{1 + e^{-\eta}}\$)}. \end{aligned} \\
>
> By the change-of-variables formula for densities ([Casella and Berger 2002](#ref-CaseBerg01), Theorem 2.1.5), the prior density of \\\eta\\ is
>
> \\ \begin{aligned} \operatorname{p}\_\eta(\eta) &= \operatorname{p}\_\pi\mathopen{}\left(\operatorname{expit}(\eta)\right)\mathclose{} \cdot \mathopen{}\left\|\frac{d}{d\eta} \operatorname{expit}(\eta)\right\|\mathclose{} && \text{(change of variables)}\\ &= 1 \cdot \operatorname{expit}(\eta)\\ \mathopen{}\left(1 - \operatorname{expit}(\eta)\right)\mathclose{} && \text{(uniform density of \$\pi\$; derivative of \$\operatorname{expit}\$)}, \end{aligned} \\
>
> the standard logistic density, which peaks at \\\eta = 0\\ and decays in both directions. Under this prior, \\\Pr(-1 \< \eta \< 1) = \operatorname{expit}(1) - \operatorname{expit}(-1) \approx 0.46\\, whereas a flat prior on \\\eta\\ would make every interval of length 2 equally likely. “Noninformative” therefore depends on the parameterization.

> **NOTE:**
>
> **Corollary 3 (Under a flat prior, the posterior is proportional to the likelihood)** If the prior is [flat](#def-flat-prior) on a parameter space \\\Theta\\ of finite length (or volume), then, as a function of \\\theta \in \Theta\\,
>
> \\ \operatorname{p}(\theta \mid \tilde{y}) \propto \mathcal{L}(\theta), \\
>
> where \\\mathcal{L}\\ is the [likelihood](intro-MLEs.llms.md#def-lik), and any value of \\\theta\\ that maximizes the posterior density is a [maximum likelihood estimate](intro-MLEs.llms.md#def-mle).

> **NOTE:**
>
> *Proof*. By [Corollary 1](#cor-bayes-proportional), \\\operatorname{p}(\theta \mid \tilde{y}) \propto \mathcal{L}(\theta)\\ \operatorname{p}(\theta)\\, and \\\operatorname{p}(\theta)\\ is the same constant for every \\\theta \in \Theta\\. Multiplying a function by a positive constant does not change where it is maximized.

A flat prior on an unbounded parameter space, such as \\\mathbb{R}\\, is [improper](#def-improper-prior), so it does not define a joint distribution of \\\theta\\ and \\\tilde{Y}\\, and [Definition 2](#def-posterior) does not apply directly. In practice the posterior is then *defined* as likelihood times prior, normalized to integrate to 1, which is possible only when that product has a finite integral; the posterior is again proportional to the likelihood.

> **NOTE:**
>
> **Example 11 (Posterior mode and maximum likelihood estimate for a probability)** In [Example 8](#exm-beta-bernoulli) the prior is uniform on \\(0, 1)\\, so by [Corollary 3](#cor-flat-prior-posterior) the posterior density, proportional to \\\pi^{55}(1-\pi)^{36}\\, is maximized at the maximum likelihood estimate. Setting the derivative of the log-likelihood \\r \log \pi + (n - r)\log(1 - \pi)\\, which is \\r/\pi - (n - r)/(1 - \pi)\\, to zero gives \\\hat\pi = r/n = 55/91 \approx 0.604\\. The posterior *mean*, \\56/93 \approx 0.602\\, is not the maximum likelihood estimate: [Corollary 3](#cor-flat-prior-posterior) concerns the posterior’s shape, and so its mode, but a mean depends on the whole distribution.

### 3.3 A skeptical prior

> **NOTE:**
>
> **Definition 11 (Skeptical prior)** A **skeptical prior** is an [informative prior](#def-informative-prior) centered on the parameter value that represents no effect, and concentrated near that value ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e), p. 281).

A skeptical prior asks how strong the data must be to overturn a default of no effect.

> **NOTE:**
>
> **Example 12 (A skeptical prior for a Gaussian mean)** In the model of [Example 4](#exm-normal-normal), replace the \\\operatorname{N}\mathopen{}\left(0, 1\right)\mathclose{}\\ prior by the [skeptical prior](#def-skeptical-prior) \\\mu \sim \operatorname{N}\mathopen{}\left(0, \tau^2\right)\mathclose{}\\, whose standard deviation \\\tau\\ sets how skeptical it is. Its density is proportional to \\\operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mu^2/\tau^2\right\\\mathclose{}\\. Let \\m\_\tau \stackrel{\text{def}}{=}\frac{n \bar x}{n + 1/\tau^2}\\. Reusing the likelihood from [Example 4](#exm-normal-normal):
>
> \\ \begin{aligned} \operatorname{p}(\mu \mid \tilde{x}) &\propto \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mathopen{}\left(n \mu^2 - 2 \mu n \bar x\right)\mathclose{}\right\\\mathclose{} \cdot \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\frac{\mu^2}{\tau^2}\right\\\mathclose{} && \text{(likelihood times prior)}\\ &= \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mathopen{}\left(\mathopen{}\left(n + \frac{1}{\tau^2}\right)\mathclose{}\mu^2 - 2 \mu n \bar x\right)\mathclose{}\right\\\mathclose{} && \text{(adding exponents)}\\ &= \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mathopen{}\left(n + \frac{1}{\tau^2}\right)\mathclose{}\mathopen{}\left(\mu^2 - 2 \mu m\_\tau\right)\mathclose{}\right\\\mathclose{} && \text{(factoring; definition of \$m\_\tau\$)}\\ &= \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mathopen{}\left(n + \frac{1}{\tau^2}\right)\mathclose{}\mathopen{}\left((\mu - m\_\tau)^2 - m\_\tau^2\right)\mathclose{}\right\\\mathclose{} && \text{(completing the square)}\\ &\propto \operatorname{exp}\mathopen{}\left\\-\frac{1}{2}\mathopen{}\left(n + \frac{1}{\tau^2}\right)\mathclose{}(\mu - m\_\tau)^2\right\\\mathclose{} && \text{(dropping a factor that does not involve \$\mu\$)}. \end{aligned} \\
>
> So \\\mu \mid \tilde{x}\sim \operatorname{N}\mathopen{}\left(m\_\tau,\\ 1 / (n + 1/\tau^2)\right)\mathclose{}\\, and \\\tau = 1\\ recovers [Example 4](#exm-normal-normal). The posterior mean
>
> \\ m\_\tau = \frac{n \cdot \bar x + \frac{1}{\tau^2} \cdot 0}{n + \frac{1}{\tau^2}} \\
>
> is a weighted average of the sample mean and the prior mean \\0\\, weighted by the precision \\n\\ of the data and the precision \\1/\tau^2\\ of the prior (a precision is a reciprocal variance). The more skeptical the prior (the smaller \\\tau\\), the more the posterior mean shrinks toward \\0\\. With \\\bar x = 2\\ and \\n = 20\\ held fixed:
>
> ``` downlit
> xbar <- 2
> n <- 20
> tau <- c(0.1, 0.25, 0.5, 1, 2, 10)
> data.frame(prior_sd = tau, posterior_mean = n * xbar / (n + 1 / tau^2)) |>
>   round(3)
> ```
>
> The most skeptical prior (\\\tau = 0.1\\) pulls the posterior mean down to one sixth of the sample mean, while the most diffuse (\\\tau = 10\\) leaves it essentially at \\\bar x\\.

## 4 Distributions and hierarchies

> **NOTE:**
>
> **Definition 12 (Hierarchical model)** A **hierarchical model**, also called a **multilevel model**, builds the prior in stages: the data depend on group-level parameters, the group-level parameters have a distribution that depends on further unknown parameters, and those further parameters have a prior of their own ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e), p. 281).

> **NOTE:**
>
> **Definition 13 (Hyperparameter)** In a [hierarchical model](#def-hierarchical-model), a **hyperparameter** is a parameter of the distribution of the group-level parameters.

> **NOTE:**
>
> **Definition 14 (Hyperprior)** In a [hierarchical model](#def-hierarchical-model), the **hyperprior** is the prior distribution of the [hyperparameters](#def-hyperparameter).

> **NOTE:**
>
> **Example 13 (A two-level Gaussian model)** Observations \\Y\_{ij}\\ come from groups \\j = 1, \ldots, J\\, and each group has its own mean \\\theta_j\\. A two-level model specifies
>
> \\ \begin{aligned} Y\_{ij} \mid \theta_j &\sim \operatorname{N}\mathopen{}\left(\theta_j,\\ \sigma^2\right)\mathclose{} && \text{(data given group means)}\\ \theta_j \mid \mu, \tau &\sim \operatorname{N}\mathopen{}\left(\mu,\\ \tau^2\right)\mathclose{} && \text{(group means given hyperparameters)}\\ (\mu, \tau) &\sim \text{a hyperprior} && \text{(hyperparameters)}. \end{aligned} \\
>
> The group means \\\theta_j\\ are the group-level parameters, \\\mu\\ and \\\tau\\ are the [hyperparameters](#def-hyperparameter), and the within-group standard deviation \\\sigma\\ needs a prior as well.

The middle level lets the groups **borrow strength** from one another: the posterior for each \\\theta_j\\ is pulled toward the overall mean \\\mu\\, by an amount that depends on the between-group standard deviation \\\tau\\, which the data themselves inform ([Dobson and Barnett 2018, chap. 12](#ref-dobson4e), p. 281). This random-effects *model structure* is the one fit by maximum likelihood in ([Dobson and Barnett 2018, chap. 11](#ref-dobson4e)) and in [an introduction to multilevel models](https://morrison-lab.github.io/rme/chapters/intro-multilevel-models.html). The Bayesian *inference method* differs only in placing a hyperprior on \\\mu\\ and \\\tau\\ and returning a full posterior for them, rather than point estimates of the variance components.

## 5 Foundations of MCMC

When the posterior has a known closed form, as in [Example 8](#exm-beta-bernoulli), we can compute its summaries exactly or sample from it directly. In most real-world models, however, the [marginal likelihood](#def-marginal-likelihood) \\\operatorname{p}(\tilde{y})\\ that normalizes the posterior cannot be computed, so neither can the posterior’s summaries. **Markov chain Monte Carlo (MCMC)** methods get around this problem: instead of independent draws from the posterior, they generate a *correlated* sequence of draws whose distribution converges to the posterior ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 287).

### 5.1 Why the normalizing constant is hard to compute

With a parameter vector \\\tilde{\theta}\\, the normalizing constant of the posterior is

\\\operatorname{p}(\tilde{y}) = \int \operatorname{p}(\tilde{y}\mid \tilde{\theta})\\ \operatorname{p}(\tilde{\theta})\\ d\tilde{\theta},\\

an integral over every dimension of \\\tilde{\theta}\\ that typically has no closed form. Computing it numerically becomes infeasible as the dimension of \\\tilde{\theta}\\ grows ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 287). MCMC sidesteps the problem: MCMC samplers use the posterior only through ratios \\\operatorname{p}(\tilde{\theta}^\* \mid \tilde{y}) / \operatorname{p}(\tilde{\theta}\mid \tilde{y})\\, in which the normalizing constant cancels.

### 5.2 Monte Carlo integration

> **NOTE:**
>
> **Definition 15 (Monte Carlo estimate)** Given draws \\\tilde{\theta}^{(1)}, \ldots, \tilde{\theta}^{(M)} \\ \sim\_{\operatorname{iid}}\\ \operatorname{p}(\tilde{\theta}\mid \tilde{y})\\ and a function \\g\\, the **Monte Carlo estimate** of the posterior expectation \\\operatorname{E}\mathopen{}\left\[g(\tilde{\theta}) \mid \tilde{y}\right\]\mathclose{}\\ is
>
> \\ \frac{1}{M} \sum\_{m=1}^{M} g\mathopen{}\left(\tilde{\theta}^{(m)}\right)\mathclose{}. \\

By the law of large numbers, a Monte Carlo estimate converges to the posterior expectation it estimates as the number of draws \\M\\ grows ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 290). The posterior mean (\\g(\theta) = \theta\\) and posterior probabilities (\\g(\theta) = \text{1}\_{\theta \le c}\\, an indicator) are posterior expectations, so they are estimated by averages of the draws; posterior quantiles, and so credible-interval endpoints, are estimated by the corresponding quantiles of the draws.

> **NOTE:**
>
> **Example 14 (Monte Carlo posterior summaries for a Bernoulli model)** The posterior in [Example 8](#exm-beta-bernoulli) is \\\operatorname{Beta}(56, 37)\\. We draw \\M = 5{,}000\\ values from it, and compare Monte Carlo estimates with the exact values:
>
> ``` downlit
> set.seed(42)
> pi_draws <- stats::rbeta(n = 5000, shape1 = 56, shape2 = 37)
> rbind(
>   exact = c(
>     mean = 56 / (56 + 37),
>     lower = stats::qbeta(0.025, 56, 37),
>     upper = stats::qbeta(0.975, 56, 37)
>   ),
>   monte_carlo = c(
>     mean(pi_draws),
>     stats::quantile(pi_draws, c(0.025, 0.975))
>   )
> ) |>
>   round(4)
> #>               mean  lower  upper
> #> exact       0.6022 0.5014 0.6988
> #> monte_carlo 0.6022 0.5011 0.7013
> ```
>
> The two agree to about two decimal places, and the agreement improves as \\M\\ grows.

### 5.3 Markov chains

> **NOTE:**
>
> **Definition 16 (Markov chain)** A sequence of random variables \\\tilde{\theta}^{(1)}, \tilde{\theta}^{(2)}, \ldots\\ is a **Markov chain** if, for every \\t\\, the conditional distribution of \\\tilde{\theta}^{(t+1)}\\ given all the earlier values depends only on \\\tilde{\theta}^{(t)}\\:
>
> \\ \operatorname{p}\mathopen{}\left(\tilde{\theta}^{(t+1)} \mid \tilde{\theta}^{(t)}, \tilde{\theta}^{(t-1)}, \ldots, \tilde{\theta}^{(1)}\right)\mathclose{} = \operatorname{p}\mathopen{}\left(\tilde{\theta}^{(t+1)} \mid \tilde{\theta}^{(t)}\right)\mathclose{}. \\

> **NOTE:**
>
> **Definition 17 (Stationary distribution)** A distribution \\\pi\\ is a **stationary distribution** of a [Markov chain](#def-markov-chain) if, whenever \\\tilde{\theta}^{(t)}\\ has distribution \\\pi\\, \\\tilde{\theta}^{(t+1)}\\ also has distribution \\\pi\\.

> **NOTE:**
>
> **Example 15 (A two-state weather chain)** Each day is dry or wet. A dry day is followed by a dry day with probability 0.9, and a wet day is followed by a dry day with probability 0.5, whatever the weather on earlier days. So the daily weather is a [Markov chain](#def-markov-chain).
>
> Let \\\pi\_{\text{dry}}\\ be the probability that a day is dry. For that probability to be the same the next day,
>
> \\ \begin{aligned} \pi\_{\text{dry}} &= 0.9\\ \pi\_{\text{dry}} + 0.5\\ (1 - \pi\_{\text{dry}}) && \text{(tomorrow is dry after a dry or a wet day)}\\ &= 0.5 + 0.4\\ \pi\_{\text{dry}} && \text{(collecting terms)}, \end{aligned} \\
>
> so \\0.6\\ \pi\_{\text{dry}} = 0.5\\ and \\\pi\_{\text{dry}} = 5/6\\. The [stationary distribution](#def-stationary-distribution) is dry with probability \\5/6\\ and wet with probability \\1/6\\. A simulated chain, started on a wet day, spends about that fraction of its days dry:
>
> ``` downlit
> set.seed(7)
> n_days <- 10000
> dry <- logical(n_days)
> for (t in seq(2, n_days)) {
>   p_dry <- if (dry[t - 1]) 0.9 else 0.5
>   dry[t] <- stats::runif(1) < p_dry
> }
> c(simulated = mean(dry), stationary = 5 / 6) |> round(3)
> #>  simulated stationary 
> #>      0.833      0.833
> ```

Under mild conditions on its transition probabilities, a Markov chain has a unique stationary distribution, the distribution of \\\tilde{\theta}^{(t)}\\ converges to it, and averages along the chain converge to expectations under it, even though successive values are correlated ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 291). MCMC algorithms construct a Markov chain whose stationary distribution is the posterior \\\operatorname{p}(\tilde{\theta}\mid \tilde{y})\\, so that [Monte Carlo estimates](#def-monte-carlo-estimate) can be computed from the chain’s values in place of independent draws.

## 6 MCMC samplers

### 6.1 The Metropolis–Hastings algorithm

> **NOTE:**
>
> **Definition 18 (Metropolis–Hastings algorithm)** Given a target posterior \\\operatorname{p}(\tilde{\theta}\mid \tilde{y}) \propto \operatorname{p}(\tilde{y}\mid \tilde{\theta})\\ \operatorname{p}(\tilde{\theta})\\, a **proposal distribution** \\q(\cdot \mid \tilde{\theta})\\, and a starting value \\\tilde{\theta}^{(1)}\\, the **Metropolis–Hastings algorithm** produces \\\tilde{\theta}^{(t+1)}\\ from \\\tilde{\theta}^{(t)}\\ as follows ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 293):
>
> 1.  Draw a proposal \\\tilde{\theta}^\* \sim q(\cdot \mid \tilde{\theta}^{(t)})\\.
> 2.  Compute the **acceptance ratio** \\ \alpha \stackrel{\text{def}}{=} \frac{\operatorname{p}(\tilde{y}\mid \tilde{\theta}^\*)\\ \operatorname{p}(\tilde{\theta}^\*)}{\operatorname{p}(\tilde{y}\mid \tilde{\theta}^{(t)})\\ \operatorname{p}(\tilde{\theta}^{(t)})} \cdot \frac{q(\tilde{\theta}^{(t)} \mid \tilde{\theta}^\*)}{q(\tilde{\theta}^\* \mid \tilde{\theta}^{(t)})}. \\
> 3.  With probability \\\min(1, \alpha)\\, set \\\tilde{\theta}^{(t+1)} = \tilde{\theta}^\*\\ (**accept**); otherwise set \\\tilde{\theta}^{(t+1)} = \tilde{\theta}^{(t)}\\ (**reject**).

The first factor of \\\alpha\\ is the ratio \\\operatorname{p}(\tilde{\theta}^\* \mid \tilde{y}) / \operatorname{p}(\tilde{\theta}^{(t)} \mid \tilde{y})\\ with the normalizing constant \\\operatorname{p}(\tilde{y})\\ canceled ([Equation 1](#eq-bayes-posterior)), so the algorithm needs only the unnormalized posterior. When the proposal is symmetric, \\q(\tilde{\theta}^\* \mid \tilde{\theta}) = q(\tilde{\theta}\mid \tilde{\theta}^\*)\\, as for a random walk \\\tilde{\theta}^\* = \tilde{\theta}^{(t)} + \varepsilon\\ with \\\varepsilon\\ drawn from a distribution symmetric about 0, the second factor equals 1. The resulting chain is a [Markov chain](#def-markov-chain) whose stationary distribution is the posterior ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 293).

> **NOTE:**
>
> **Example 16 (Metropolis–Hastings for a Bernoulli model)** We sample the posterior of [Example 8](#exm-beta-bernoulli) (\\r = 55\\ successes in \\n = 91\\ trials, uniform prior) with a Gaussian random-walk proposal \\\pi^\* = \pi^{(t)} + \varepsilon\\, \\\varepsilon \sim \operatorname{N}\mathopen{}\left(0, 0.05^2\right)\mathclose{}\\. The proposal is symmetric, and the uniform prior density is 1 on \\(0, 1)\\, so the log of the acceptance ratio is the difference of log-likelihoods, and a proposal outside \\(0, 1)\\ is always rejected.
>
> ``` downlit
> log_post_unnorm <- function(pi, r, n) {
>   if (pi <= 0 || pi >= 1) {
>     return(-Inf)
>   }
>   r * log(pi) + (n - r) * log(1 - pi)
> }
>
> mh_bernoulli <- function(n_iter, r, n, pi_init, step_sd = 0.05) {
>   chain <- numeric(n_iter)
>   chain[1] <- pi_init
>   for (t in seq(2, n_iter)) {
>     pi_curr <- chain[t - 1]
>     pi_prop <- pi_curr + stats::rnorm(1, sd = step_sd)
>     log_alpha <- log_post_unnorm(pi_prop, r, n) -
>       log_post_unnorm(pi_curr, r, n)
>     accept <- log(stats::runif(1)) < log_alpha
>     chain[t] <- if (accept) pi_prop else pi_curr
>   }
>   chain
> }
>
> set.seed(1)
> mh_chain <- mh_bernoulli(n_iter = 5000, r = 55, n = 91, pi_init = 0.5)
> c(
>   acceptance_rate = mean(diff(mh_chain) != 0),
>   mh_mean = mean(mh_chain),
>   exact_mean = 56 / 93
> ) |>
>   round(3)
> #> acceptance_rate         mh_mean      exact_mean 
> #>           0.710           0.601           0.602
> ```
>
> Comparing \\\log u\\, for \\u\\ uniform on \\(0, 1)\\, with \\\log \alpha\\ accepts with probability \\\min(1, \alpha)\\, and avoids computing \\\alpha\\ itself, which can overflow or underflow. Every accepted proposal changes the chain’s value, so the fraction of iterations that change estimates the acceptance rate. The chain’s mean is close to the exact posterior mean \\56/93\\.

### 6.2 Trace plots and burn-in

> **NOTE:**
>
> **Definition 19 (Trace plot)** A **trace plot** of an MCMC chain plots each sampled value of a parameter against its iteration number.

> **NOTE:**
>
> **Definition 20 (Burn-in)** The **burn-in** period is the initial segment of an MCMC chain that is discarded before posterior summaries are computed ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 301).

A chain started far from where the posterior puts its probability takes some iterations to get there, and until it does, its values are not draws from the posterior. Burn-in removes those iterations. Its length is chosen by inspecting [trace plots](#def-trace-plot) of chains started from different values: the burn-in should end after the chains have stopped drifting and are moving around the same region.

> **NOTE:**
>
> **Example 17 (Burn-in for the Bernoulli sampler)** Continuing [Example 16](#exm-mh-bernoulli), we start two more chains at the extreme values \\0.05\\ and \\0.95\\. [Figure 2](#fig-mh-burnin) shows their first 200 iterations.
>
> Code
>
> ``` downlit
> set.seed(2)
> chain_low <- mh_bernoulli(n_iter = 5000, r = 55, n = 91, pi_init = 0.05)
> chain_high <- mh_bernoulli(n_iter = 5000, r = 55, n = 91, pi_init = 0.95)
> shown <- 1:200
> traces <- tibble::tibble(
>   iteration = rep(shown, times = 2),
>   pi = c(chain_low[shown], chain_high[shown]),
>   start = rep(c("0.05", "0.95"), each = length(shown))
> )
> ggplot2::ggplot(traces) +
>   ggplot2::aes(x = iteration, y = pi, colour = start) +
>   ggplot2::geom_line() +
>   ggplot2::labs(y = expression(pi), colour = "starting value")
> ```
>
> [![Two trace plots of pi against iteration. One chain starts at 0.05, the other at 0.95; both move to about 0.6 within a few dozen iterations and then fluctuate together between about 0.5 and 0.7.](bayesian-inference_files/figure-html/unnamed-chunk-2-1.png)](bayesian-inference_files/figure-html/unnamed-chunk-2-1.png "Figure 2: Trace plots of the first 200 iterations of two Metropolis–Hastings chains for the Bernoulli model, started at \pi = 0.05 and \pi = 0.95.")
>
> Figure 2: [Trace plots](#def-trace-plot) of the first 200 iterations of two Metropolis–Hastings chains for the Bernoulli model, started at \\\pi = 0.05\\ and \\\pi = 0.95\\.
>
> Both chains reach the region around \\0.6\\ within a few dozen iterations, and after that the two are indistinguishable, so discarding the first 500 iterations of each leaves a generous margin.

### 6.3 The Gibbs sampler

> **NOTE:**
>
> **Definition 21 (Full conditional distribution)** For a parameter vector \\\tilde{\theta}= (\theta_1, \ldots, \theta_K)\\, the **full conditional distribution** of the component \\\theta_k\\ is its conditional distribution given the data and all the other components, \\\operatorname{p}(\theta_k \mid \tilde{\theta}\_{-k}, \tilde{y})\\, where \\\tilde{\theta}\_{-k}\\ denotes every component of \\\tilde{\theta}\\ except \\\theta_k\\.

> **NOTE:**
>
> **Definition 22 (Gibbs sampler)** The **Gibbs sampler** produces \\\tilde{\theta}^{(t+1)}\\ from \\\tilde{\theta}^{(t)}\\ by updating one component at a time: for \\k = 1, \ldots, K\\ in turn, it draws \\\theta_k^{(t+1)}\\ from the [full conditional distribution](#def-full-conditional) of \\\theta_k\\, with each other component set to its most recent value ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 300).

The Gibbs sampler is a special case of the [Metropolis–Hastings algorithm](#def-mh), one component at a time, whose proposal is the full conditional itself; with that proposal the acceptance ratio is always 1, so every draw is accepted ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 300). It needs a way to draw from each full conditional. **JAGS** (“Just Another Gibbs Sampler”) builds a Gibbs sampler from a model’s description, choosing a sampling method for each full conditional ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e)).

> **NOTE:**
>
> **Example 18 (Gibbs sampling from a correlated Gaussian target)** Let the target be the bivariate Gaussian distribution of \\(\theta_1, \theta_2)\\ with means 0, variances 1 and correlation \\\rho\\, whose density is proportional to \\\operatorname{exp}\mathopen{}\left\\-\frac{\theta_1^2 - 2\rho\theta_1\theta_2 + \theta_2^2}{2(1-\rho^2)}\right\\\mathclose{}\\ ([Casella and Berger 2002](#ref-CaseBerg01), Definition 4.5.10). As a function of \\\theta_1\\,
>
> \\ \begin{aligned} \operatorname{p}(\theta_1 \mid \theta_2) &\propto \operatorname{exp}\mathopen{}\left\\-\frac{\theta_1^2 - 2\rho\theta_1\theta_2}{2(1-\rho^2)}\right\\\mathclose{} && \text{(dropping the factor with \$\theta_2^2\$ only)}\\ &= \operatorname{exp}\mathopen{}\left\\-\frac{(\theta_1 - \rho\theta_2)^2 - \rho^2\theta_2^2}{2(1-\rho^2)}\right\\\mathclose{} && \text{(completing the square)}\\ &\propto \operatorname{exp}\mathopen{}\left\\-\frac{(\theta_1 - \rho\theta_2)^2}{2(1-\rho^2)}\right\\\mathclose{} && \text{(dropping the factor with \$\theta_2^2\$ only)}, \end{aligned} \\
>
> so the [full conditional](#def-full-conditional) of \\\theta_1\\ is \\\operatorname{N}\mathopen{}\left(\rho\theta_2,\\ 1 - \rho^2\right)\mathclose{}\\, and by symmetry that of \\\theta_2\\ is \\\operatorname{N}\mathopen{}\left(\rho\theta_1,\\ 1 - \rho^2\right)\mathclose{}\\. We run the Gibbs sampler with \\\rho = 0\\ and with \\\rho = 0.99\\:
>
> ``` downlit
> gibbs_bvn <- function(n_iter, rho) {
>   draws <- matrix(NA_real_, nrow = n_iter, ncol = 2)
>   theta <- c(0, 0)
>   cond_sd <- sqrt(1 - rho^2)
>   for (t in seq_len(n_iter)) {
>     theta[1] <- stats::rnorm(1, mean = rho * theta[2], sd = cond_sd)
>     theta[2] <- stats::rnorm(1, mean = rho * theta[1], sd = cond_sd)
>     draws[t, ] <- theta
>   }
>   draws
> }
>
> set.seed(3)
> draws_indep <- gibbs_bvn(n_iter = 2000, rho = 0)
> draws_corr <- gibbs_bvn(n_iter = 2000, rho = 0.99)
> lag1_autocorrelation <- function(x) stats::cor(x[-1], x[-length(x)])
> c(
>   rho_0 = lag1_autocorrelation(draws_indep[, 1]),
>   rho_0.99 = lag1_autocorrelation(draws_corr[, 1])
> ) |>
>   round(3)
> #>    rho_0 rho_0.99 
> #>    0.020    0.971
> ```
>
> With \\\rho = 0\\, successive draws of \\\theta_1\\ are nearly uncorrelated. With \\\rho = 0.99\\, each full conditional has standard deviation \\\sqrt{1 - 0.99^2} \approx 0.14\\, so each update moves only a short way along the narrow ridge where the target puts its probability, and successive draws are almost perfectly correlated: 2,000 such draws carry far less information about the target than 2,000 independent ones.

## 7 Checking and improving MCMC

Because MCMC draws are correlated, and a chain may take many iterations to reach its stationary distribution, we must check whether the chains have converged before using them for inference ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 302). [Trace plots](#def-trace-plot) give a visual check; the potential scale reduction factor gives a numerical one, by comparing several chains started from different values.

> **NOTE:**
>
> **Definition 23 (Potential scale reduction factor)** Suppose \\m\\ chains each contribute \\n\\ draws of a parameter \\\theta\\ after burn-in, with chain means \\\bar\theta_1, \ldots, \bar\theta_m\\, overall mean \\\bar\theta\\, and within-chain sample variances \\s_1^2, \ldots, s_m^2\\. Let
>
> \\ \begin{aligned} W &\stackrel{\text{def}}{=}\frac{1}{m} \sum\_{j=1}^m s_j^2 && \text{(within-chain variance)}\\ B &\stackrel{\text{def}}{=}\frac{n}{m - 1} \sum\_{j=1}^m \mathopen{}\left(\bar\theta_j - \bar\theta\right)\mathclose{}^2 && \text{(between-chain variance)}\\ \hat V &\stackrel{\text{def}}{=}\frac{n - 1}{n} W + \frac{1}{n} B && \text{(pooled variance estimate)}. \end{aligned} \\
>
> The **Gelman–Rubin potential scale reduction factor** is
>
> \\ \hat{R}\stackrel{\text{def}}{=}\sqrt{\hat V / W}. \\

If the chains have all converged to the posterior, \\W\\ and \\\hat V\\ both estimate the posterior variance, and \\\hat{R}\\ is close to 1. If the chains are still exploring different regions, the chain means differ, \\B\\ is large, and \\\hat{R}\\ exceeds 1 ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 302). Software reports \\\hat{R}\\ as `psrf` or `Rhat`; [`coda::gelman.diag()`](https://rdrr.io/pkg/coda/man/gelman.diag.html) also applies a small-sample correction, so its value differs slightly from [Definition 23](#def-psrf)’s. A value of \\\hat{R}\\ near 1 does not prove convergence: chains that are all stuck in the same wrong region also agree.

> **NOTE:**
>
> **Example 19 (Potential scale reduction factor for the Bernoulli sampler)** Continuing [Example 17](#exm-burnin), we compute \\\hat{R}\\ for the two chains, first over their first 50 iterations, which include the burn-in, and then over iterations 501 to 5,000:
>
> ``` downlit
> psrf <- function(chains) {
>   n <- nrow(chains)
>   w <- mean(apply(chains, 2, stats::var))
>   b <- n * stats::var(colMeans(chains))
>   v_hat <- (n - 1) / n * w + b / n
>   sqrt(v_hat / w)
> }
> chains <- cbind(chain_low, chain_high)
> c(
>   first_50 = psrf(chains[1:50, ]),
>   after_burnin = psrf(chains[501:5000, ])
> ) |>
>   round(3)
> #>     first_50 after_burnin 
> #>        1.648        1.001
> ```
>
> Here `stats::var(colMeans(chains))` is \\\frac{1}{m-1}\sum_j (\bar\theta_j - \bar\theta)^2\\, so `b` is \\B\\. While the chains are still approaching the posterior from opposite ends, \\\hat{R}\\ is well above 1; after burn-in it is essentially 1.

### 7.1 Comparing MCMC estimates to maximum likelihood

When the prior is weak and the sample is moderate or large, the posterior mean from a well-mixed chain and the [maximum likelihood estimate](intro-MLEs.llms.md#def-mle) typically agree closely, and the posterior standard deviation is close to the frequentist [standard error](estimation.llms.md#def-SE) ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 298). As \\n\\ grows the likelihood dominates the prior, so the posterior concentrates near the maximum likelihood estimate. Comparing the two is therefore a useful check on an MCMC analysis.

> **NOTE:**
>
> **Example 20 (Posterior mean and maximum likelihood estimate for a Bernoulli model)** With \\r = 55\\ successes in \\n = 91\\ trials, the maximum likelihood estimate is \\\hat\pi = r / n\\, with estimated standard error \\\sqrt{\hat\pi(1 - \hat\pi)/n}\\. Under the uniform prior, the posterior is \\\operatorname{Beta}(r + 1, n - r + 1)\\ ([Example 8](#exm-beta-bernoulli)), whose mean is \\(r + 1)/(n + 2)\\ and whose standard deviation is \\\sqrt{ab / \mathopen{}\left((a + b)^2 (a + b + 1)\right)\mathclose{}}\\ with \\a = r + 1\\ and \\b = n - r + 1\\ ([Casella and Berger 2002, sec. 3.3](#ref-CaseBerg01)):
>
> ``` downlit
> r <- 55
> n <- 91
> pi_hat <- r / n
> a <- r + 1
> b <- n - r + 1
> rbind(
>   maximum_likelihood = c(
>     estimate = pi_hat,
>     spread = sqrt(pi_hat * (1 - pi_hat) / n)
>   ),
>   posterior = c(a / (a + b), sqrt(a * b / ((a + b)^2 * (a + b + 1))))
> ) |>
>   round(4)
> #>                    estimate spread
> #> maximum_likelihood   0.6044 0.0513
> #> posterior            0.6022 0.0505
> ```
>
> The two estimates differ only through the prior’s pseudo-counts, and so do the two measures of spread; both differences vanish as \\n\\ grows. The MCMC mean in [Example 16](#exm-mh-bernoulli) agrees with the exact posterior mean, and so with the maximum likelihood estimate to about two decimal places.

A persistent discrepancy between the two is a signal worth investigating: it may reflect a genuinely informative prior, an unconverged chain, or a coding error in the model.

### 7.2 The importance of parameterization

How a model is written affects how well its sampler mixes ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 299). Two algebraically equivalent parameterizations of the same model can produce chains with very different autocorrelation. Strong posterior correlation between parameters slows a sampler that updates one component at a time, because each update can move only a short way along a narrow, tilted ridge, as [Example 18](#exm-gibbs-bivariate-normal) shows with \\\rho = 0.99\\.

Common remedies include **centering** predictors (subtracting their means), so that the intercept and slopes are less correlated, and **reparameterizing** variance components on a scale on which the posterior is more nearly symmetric. These changes leave the model, and so the scientific conclusions, unchanged; they alter only the geometry the sampler must explore.

## 8 Deviance information criterion

To compare Bayesian models fit to the same data, we need a measure that balances goodness of fit against complexity, as [Akaike’s information criterion](https://morrison-lab.github.io/rme/chapters/Linear-models-overview.html#def-aic) does for models fit by maximum likelihood. The standard criterion computed from MCMC output is the **deviance information criterion** ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 306).

> **NOTE:**
>
> **Definition 24 (Deviance of a parameter value)** In the deviance information criterion, the **deviance** of a parameter value \\\tilde{\theta}\\ is
>
> \\ D(\tilde{\theta}) \stackrel{\text{def}}{=}-2 \log \operatorname{p}(\tilde{y}\mid \tilde{\theta}). \\

This deviance is minus twice the log-likelihood. A generalized linear model’s deviance subtracts the same quantity for the saturated model, which does not depend on \\\tilde{\theta}\\, so the two differ by a constant that cancels in comparisons between models of the same data.

> **NOTE:**
>
> **Definition 25 (Effective number of parameters)** Let \\\overline{D} \stackrel{\text{def}}{=}\operatorname{E}\mathopen{}\left\[D(\tilde{\theta}) \mid \tilde{y}\right\]\mathclose{}\\ be the posterior mean of the [deviance](#def-bayes-deviance), and let \\\bar{\tilde{\theta}} \stackrel{\text{def}}{=}\operatorname{E}\mathopen{}\left\[\tilde{\theta}\mid \tilde{y}\right\]\mathclose{}\\ be the posterior mean of the parameters. The **effective number of parameters** is
>
> \\ p_D \stackrel{\text{def}}{=}\overline{D} - D(\bar{\tilde{\theta}}). \\

> **NOTE:**
>
> **Definition 26 (Deviance information criterion)** The **deviance information criterion** is
>
> \\ \operatorname{DIC} \stackrel{\text{def}}{=}D(\bar{\tilde{\theta}}) + 2\\p_D, \\
>
> with \\D\\ from [Definition 24](#def-bayes-deviance) and \\p_D\\ from [Definition 25](#def-effective-parameters).

Substituting [Definition 25](#def-effective-parameters) gives an equivalent form:

\\ \begin{aligned} \operatorname{DIC} &= D(\bar{\tilde{\theta}}) + 2\mathopen{}\left(\overline{D} - D(\bar{\tilde{\theta}})\right)\mathclose{} && \text{(definition of \$p_D\$)}\\ &= 2\overline{D} - D(\bar{\tilde{\theta}}) && \text{(collecting terms)}\\ &= \overline{D} + \mathopen{}\left(\overline{D} - D(\bar{\tilde{\theta}})\right)\mathclose{} && \text{(splitting \$2\overline{D}\$)}\\ &= \overline{D} + p_D && \text{(definition of \$p_D\$)}. \end{aligned} \\

The term \\D(\bar{\tilde{\theta}})\\ rewards fit, while \\p_D\\ penalizes complexity: it measures how much the deviance is reduced, on average, by letting the parameters adapt to the data. As with Akaike’s criterion, **lower DIC is better**, and only differences in DIC between models fit to the same data are meaningful ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 306). Both \\\overline{D}\\ and \\\bar{\tilde{\theta}}\\ are [Monte Carlo estimates](#def-monte-carlo-estimate) from the posterior draws, so DIC is a by-product of an MCMC run.

> **NOTE:**
>
> **Example 21 (DIC for the Bernoulli model)** For \\r = 55\\ successes in \\n = 91\\ trials, \\D(\pi) = -2\mathopen{}\left(r \log \pi + (n - r) \log(1 - \pi)\right)\mathclose{}\\. We estimate \\\overline{D}\\ and \\\bar\pi\\ from 5,000 draws from the \\\operatorname{Beta}(56, 37)\\ posterior of [Example 8](#exm-beta-bernoulli):
>
> ``` downlit
> deviance_bernoulli <- function(pi, r = 55, n = 91) {
>   -2 * (r * log(pi) + (n - r) * log(1 - pi))
> }
> set.seed(4)
> pi_draws <- stats::rbeta(5000, shape1 = 56, shape2 = 37)
> d_bar <- mean(deviance_bernoulli(pi_draws))
> d_at_mean <- deviance_bernoulli(mean(pi_draws))
> c(
>   d_bar = d_bar,
>   d_at_mean = d_at_mean,
>   p_d = d_bar - d_at_mean,
>   dic = 2 * d_bar - d_at_mean
> ) |>
>   round(2)
> #>     d_bar d_at_mean       p_d       dic 
> #>    123.13    122.16      0.97    124.10
> ```
>
> The model has one parameter, and its effective number of parameters \\p_D\\ is close to 1.

DIC should be used with care: it can behave poorly for models with weakly identified parameters or markedly non-Gaussian posteriors ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e), p. 306).

## 9 A first example: a single proportion

From here on, the models are fit with **JAGS** (“Just Another Gibbs Sampler”), a program that builds an MCMC sampler from a text description of a model ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e)), driven from R through the `rjags` package. We begin with the simplest possible model, a single Bernoulli probability, whose exact posterior is known from [Example 8](#exm-beta-bernoulli), so the output can be checked. The example shows the mechanics that every later analysis reuses: specifying a model, supplying data, running a burn-in, monitoring parameters, and summarizing and checking the draws. In JAGS, `dnorm(mean, precision)` is parameterized by the precision, the reciprocal of the variance.

> **NOTE:**
>
> **Example 22 (A Bernoulli model in JAGS)** The data are \\r = 55\\ successes in \\n = 91\\ trials, and the prior is uniform, as in [Example 8](#exm-beta-bernoulli). Each chain gets its own random-number generator seed, so the output is reproducible:
>
> ``` downlit
> y <- rep(c(1L, 0L), times = c(55L, 36L))
> bernoulli_model <- "
> model {
>   for (i in 1:N) {
>     y[i] ~ dbern(p)
>   }
>   p ~ dbeta(1, 1)
> }
> "
> inits <- list(
>   list(.RNG.name = "base::Mersenne-Twister", .RNG.seed = 1),
>   list(.RNG.name = "base::Mersenne-Twister", .RNG.seed = 2)
> )
> fit <- rjags::jags.model(
>   textConnection(bernoulli_model),
>   data = list(y = y, N = length(y)),
>   inits = inits,
>   n.chains = 2,
>   quiet = TRUE
> )
> stats::update(fit, n.iter = 1000, progress.bar = "none") # burn-in
> draws <- rjags::coda.samples(
>   fit,
>   variable.names = "p",
>   n.iter = 4000,
>   progress.bar = "none"
> )
> p_draws <- as.matrix(draws)[, "p"]
> c(
>   mean = mean(p_draws),
>   stats::quantile(p_draws, c(0.025, 0.975)),
>   Rhat = coda::gelman.diag(draws)$psrf[1, "Point est."]
> ) |>
>   round(3)
> #>  mean  2.5% 97.5%  Rhat 
> #> 0.601 0.499 0.698 1.000
> ```
>
> The posterior mean and equal-tailed 95% credible interval agree with the exact \\\operatorname{Beta}(56, 37)\\ values of [Example 8](#exm-beta-bernoulli) to about two decimal places, and the [potential scale reduction factor](#def-psrf) is 1.

## 10 Binary outcomes: logistic regression

For a binary outcome \\Y_i \sim \operatorname{Bernoulli}(\pi_i)\\ with \\\operatorname{logit}(\pi_i) = {\tilde{x}\_i}^{\top}\tilde{\beta}\\, the [logistic regression](https://morrison-lab.github.io/rme/chapters/logistic-regression.html) model, a Bayesian analysis places a prior on the coefficient vector \\\tilde{\beta}\\ and samples the posterior \\\operatorname{p}(\tilde{\beta}\mid \tilde{y})\\ by MCMC ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e), p. 318). Each \\\beta_j\\ is summarized by the mean and quantiles of its draws. No large-sample Gaussian approximation is needed: a credible interval is read directly from the posterior quantiles, and the posterior of an odds ratio \\e^{\beta_j}\\, or of any other function of \\\tilde{\beta}\\, is obtained by transforming the draws.

> **NOTE:**
>
> **Example 23 (Bayesian logistic regression)** We simulate \\N = 200\\ observations from a logistic model with one continuous predictor, intercept \\\beta_0 = -0.5\\ and slope \\\beta_1 = 1.2\\, and place a diffuse \\\operatorname{N}\mathopen{}\left(0, 10^2\right)\mathclose{}\\ prior on each coefficient (precision \\0.01\\ in JAGS). The model also monitors the odds ratio \\e^{\beta_1}\\ for a one-unit increase in \\x\\.
>
> ``` downlit
> set.seed(2024)
> n_obs <- 200L
> x <- stats::rnorm(n_obs)
> y <- stats::rbinom(n_obs, size = 1, prob = stats::plogis(-0.5 + 1.2 * x))
>
> logistic_model <- "
> model {
>   for (i in 1:N) {
>     y[i] ~ dbern(pi[i])
>     logit(pi[i]) <- beta0 + beta1 * x[i]
>   }
>   beta0 ~ dnorm(0, 0.01)
>   beta1 ~ dnorm(0, 0.01)
>   OR <- exp(beta1)
> }
> "
> inits <- list(
>   list(.RNG.name = "base::Mersenne-Twister", .RNG.seed = 1),
>   list(.RNG.name = "base::Mersenne-Twister", .RNG.seed = 2)
> )
> fit <- rjags::jags.model(
>   textConnection(logistic_model),
>   data = list(y = y, x = x, N = n_obs),
>   inits = inits,
>   n.chains = 2,
>   quiet = TRUE
> )
> stats::update(fit, n.iter = 1000, progress.bar = "none")
> draws <- rjags::coda.samples(
>   fit,
>   variable.names = c("beta0", "beta1", "OR"),
>   n.iter = 4000,
>   progress.bar = "none"
> )
> draws_matrix <- as.matrix(draws)
> cbind(
>   mean = colMeans(draws_matrix),
>   t(apply(draws_matrix, 2, stats::quantile, probs = c(0.025, 0.975))),
>   Rhat = coda::gelman.diag(draws, multivariate = FALSE)$psrf[, "Point est."]
> ) |>
>   round(3)
> #>         mean   2.5%  97.5%  Rhat
> #> OR     3.417  2.275  5.132 1.000
> #> beta0 -0.654 -1.002 -0.316 1.001
> #> beta1  1.207  0.822  1.635 1.000
> ```
>
> Each 95% credible interval contains its coefficient’s true value, and every \\\hat{R}\\ is near 1. As [Section 7.1](#sec-mcmc-vs-mle) leads us to expect, the posterior means are close to the maximum likelihood estimates:
>
> ``` downlit
> stats::glm(y ~ x, family = stats::binomial()) |>
>   stats::coef() |>
>   round(3)
> #> (Intercept)           x 
> #>      -0.647       1.183
> ```

## 11 Survival analysis

Parametric survival models, such as those with exponential or Weibull event times, admit a Bayesian treatment: priors are placed on the baseline-hazard parameters and the regression coefficients, and the posterior is sampled by MCMC ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e), p. 330). Censoring enters through the likelihood, exactly as in the frequentist [likelihood with censoring](https://morrison-lab.github.io/rme/chapters/intro-to-survival-analysis.html#sec-likelihood-with-censoring): an observed event at time \\t\\ contributes its density \\{\lambda}(t)\\\operatorname{S}(t)\\, and an observation right-censored at time \\t\\ contributes its survival probability \\\operatorname{S}(t)\\, where \\{\lambda}\\ is the hazard and \\\operatorname{S}\\ the survival function.

When a model’s log-likelihood contribution \\\ell_i\\ for observation \\i\\ is not one of the distributions built into JAGS, the **zeros trick** supplies it. An observed value of 0 from a Poisson distribution with mean \\\phi_i\\ has probability \\e^{-\phi_i}\\, and with \\\phi_i \stackrel{\text{def}}{=}C - \ell_i\\ for a constant \\C\\,

\\ \begin{aligned} e^{-\phi_i} &= e^{-(C - \ell_i)} && \text{(definition of \$\phi_i\$)}\\ &= e^{-C} e^{\ell_i} && \text{(splitting the exponent)}\\ &\propto e^{\ell_i} && \text{(\$C\$ does not depend on the parameters)}, \end{aligned} \\

which is observation \\i\\’s likelihood contribution. So declaring data `zeros[i] = 0` with `zeros[i] ~ dpois(C - loglik[i])` multiplies the likelihood by \\e^{\ell_i}\\. The constant \\C\\ only has to be large enough to keep every \\\phi_i\\ positive.

> **NOTE:**
>
> **Example 24 (Bayesian exponential survival regression)** We simulate \\N = 200\\ right-censored exponential survival times, with a binary covariate \\x_i\\ (say, treatment) and hazard \\{\lambda}\_i = \operatorname{exp}\mathopen{}\left\\\beta_0 + \beta_1 x_i\right\\\mathclose{}\\, where the log baseline hazard is \\\beta_0 = \log 0.05\\ and the log hazard ratio is \\\beta_1 = -0.7\\. With event indicator \\\delta_i\\ (1 for an event, 0 for a censored time) and follow-up time \\t_i\\, the exponential density is \\{\lambda}\_i e^{-{\lambda}\_i t}\\ and its survival function is \\e^{-{\lambda}\_i t}\\, so observation \\i\\ contributes the log-likelihood
>
> \\ \ell_i \stackrel{\text{def}}{=}\delta_i \log {\lambda}\_i - {\lambda}\_i t_i. \\
>
> JAGS has no built-in distribution for this contribution, so we fit it with the zeros trick.
>
> ``` downlit
> set.seed(2026)
> n_obs <- 200L
> x <- stats::rbinom(n_obs, size = 1, prob = 0.5)
> event_time <- stats::rexp(n_obs, rate = exp(log(0.05) - 0.7 * x))
> censor_time <- stats::rexp(n_obs, rate = 0.03)
> follow_up <- pmin(event_time, censor_time)
> event <- as.integer(event_time <= censor_time)
>
> survival_model <- "
> model {
>   C <- 10000
>   for (i in 1:N) {
>     log(lambda[i]) <- beta0 + beta1 * x[i]
>     loglik[i] <- event[i] * log(lambda[i]) - lambda[i] * follow_up[i]
>     zeros[i] ~ dpois(C - loglik[i])
>   }
>   beta0 ~ dnorm(0, 0.01)
>   beta1 ~ dnorm(0, 0.01)
>   HR <- exp(beta1)
> }
> "
> inits <- list(
>   list(.RNG.name = "base::Mersenne-Twister", .RNG.seed = 1),
>   list(.RNG.name = "base::Mersenne-Twister", .RNG.seed = 2)
> )
> fit <- rjags::jags.model(
>   textConnection(survival_model),
>   data = list(
>     follow_up = follow_up, x = x, event = event,
>     N = n_obs, zeros = rep(0, n_obs)
>   ),
>   inits = inits,
>   n.chains = 2,
>   quiet = TRUE
> )
> stats::update(fit, n.iter = 1000, progress.bar = "none")
> draws <- rjags::coda.samples(
>   fit,
>   variable.names = c("beta0", "beta1", "HR"),
>   n.iter = 4000,
>   progress.bar = "none"
> )
> draws_matrix <- as.matrix(draws)
> cbind(
>   mean = colMeans(draws_matrix),
>   t(apply(draws_matrix, 2, stats::quantile, probs = c(0.025, 0.975))),
>   Rhat = coda::gelman.diag(draws, multivariate = FALSE)$psrf[, "Point est."]
> ) |>
>   round(3)
> #>         mean   2.5%  97.5% Rhat
> #> HR     0.602  0.390  0.875    1
> #> beta0 -3.119 -3.391 -2.870    1
> #> beta1 -0.529 -0.941 -0.133    1
> ```
>
> About 50% of the follow-up times end in an event. The 95% credible interval for \\\beta_1\\ contains the true \\-0.7\\, though the posterior mean is some distance from it. The maximum likelihood estimates, from the same log-likelihood, show that the gap is sampling variation in this data set rather than an effect of the prior:
>
> ``` downlit
> neg_loglik <- function(beta) {
>   lambda <- exp(beta[1] + beta[2] * x)
>   -sum(event * log(lambda) - lambda * follow_up)
> }
> stats::optim(c(0, 0), neg_loglik)$par |>
>   stats::setNames(c("beta0", "beta1")) |>
>   round(3)
> #>  beta0  beta1 
> #> -3.112 -0.524
> ```
>
> The monitored \\e^{\beta_1}\\ gives the hazard ratio and its credible interval directly.

## 12 Random effects

The [hierarchical model](#def-hierarchical-model) of [Example 13](#exm-two-level-normal) is the random-effects *model structure*, with group-level parameters \\\theta_j \sim \operatorname{N}\mathopen{}\left(\mu, \tau^2\right)\mathclose{}\\ drawn from a common distribution. What changes here from a maximum likelihood fit is the *inference method*: the Bayesian analysis places priors on the hyperparameters \\\mu\\ and \\\tau\\ and samples their joint posterior together with the group-level parameters ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e), p. 333). The posterior shrinks each group’s estimate toward the overall mean, by an amount the data determine through \\\tau\\, and the posterior for \\\tau\\ carries the uncertainty about the between-group spread into every group-level summary.

> **NOTE:**
>
> **Example 25 (A Bayesian random-intercept model)** We simulate \\J = 8\\ groups of 12 observations each, with group means drawn from \\\operatorname{N}\mathopen{}\left(\mu, \tau^2\right)\mathclose{}\\ (\\\mu = 5\\, \\\tau = 1.5\\) and within-group standard deviation \\\sigma = 2\\. The priors are a diffuse \\\operatorname{N}\mathopen{}\left(0, 100^2\right)\mathclose{}\\ for \\\mu\\ and [flat priors](#def-flat-prior) on \\(0, 100)\\ for the standard deviations \\\tau\\ and \\\sigma\\. Being flat on the standard-deviation scale is a choice: as [Example 10](#exm-flat-prior-reparam) shows for a probability, it is not flat on another scale, such as the variance.
>
> ``` downlit
> set.seed(2025)
> n_groups <- 8L
> n_per_group <- 12L
> theta_true <- stats::rnorm(n_groups, mean = 5, sd = 1.5)
> group <- rep(seq_len(n_groups), each = n_per_group)
> y <- stats::rnorm(n_groups * n_per_group, mean = theta_true[group], sd = 2)
>
> random_intercept_model <- "
> model {
>   for (i in 1:N) {
>     y[i] ~ dnorm(theta[group[i]], 1 / sigma^2)
>   }
>   for (j in 1:J) {
>     theta[j] ~ dnorm(mu, 1 / tau^2)
>   }
>   mu ~ dnorm(0, 1.0E-4)
>   sigma ~ dunif(0, 100)
>   tau ~ dunif(0, 100)
> }
> "
> inits <- list(
>   list(.RNG.name = "base::Mersenne-Twister", .RNG.seed = 1),
>   list(.RNG.name = "base::Mersenne-Twister", .RNG.seed = 2)
> )
> fit <- rjags::jags.model(
>   textConnection(random_intercept_model),
>   data = list(y = y, group = group, N = length(y), J = n_groups),
>   inits = inits,
>   n.chains = 2,
>   quiet = TRUE
> )
> stats::update(fit, n.iter = 2000, progress.bar = "none")
> draws <- rjags::coda.samples(
>   fit,
>   variable.names = c("mu", "tau", "sigma", "theta"),
>   n.iter = 10000,
>   progress.bar = "none"
> )
> draws_matrix <- as.matrix(draws)
> posterior_summary <- cbind(
>   mean = colMeans(draws_matrix),
>   t(apply(draws_matrix, 2, stats::quantile, probs = c(0.025, 0.975))),
>   Rhat = coda::gelman.diag(draws, multivariate = FALSE)$psrf[, "Point est."]
> )
> round(posterior_summary[c("mu", "tau", "sigma"), ], 3)
> #>        mean  2.5% 97.5%  Rhat
> #> mu    5.572 4.733 6.405 1.002
> #> tau   0.868 0.125 2.002 1.004
> #> sigma 2.161 1.867 2.520 1.000
> ```
>
> The 95% credible intervals contain the true \\\mu = 5\\, \\\tau = 1.5\\ and \\\sigma = 2\\. The interval for \\\tau\\ is wide: eight groups say little about how spread out group means are, and the posterior reports that uncertainty instead of a single estimate of the variance component.
>
> Each group’s posterior mean lies between its sample mean and the overall sample mean:
>
> ``` downlit
> sample_means <- as.vector(tapply(y, group, mean))
> tibble::tibble(
>   group_id = seq_len(n_groups),
>   sample_mean = sample_means,
>   posterior_mean = posterior_summary[
>     paste0("theta[", seq_len(n_groups), "]"), "mean"
>   ]
> ) |>
>   dplyr::mutate(overall_mean = mean(y)) |>
>   round(2)
> ```
>
> This is the borrowing of strength described in [Section 4](#sec-bayes-hierarchies): group 4, with the largest sample mean, is pulled furthest toward the overall mean.

## 13 Bayesian model averaging

When several candidate models are plausible, committing to a single “best” one ignores the uncertainty about which model is right. **Bayesian model averaging** instead averages over the models, weighting each by its posterior probability ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e), p. 338). This approach carries *model* uncertainty, not just parameter uncertainty, into the final inference. It is an alternative to choosing a single model by [predictor selection](https://morrison-lab.github.io/rme/chapters/predictor-selection.html).

> **NOTE:**
>
> **Definition 27 (Bayesian model averaging)** Let \\M_1, \ldots, M_K\\ be candidate models with prior probabilities \\\operatorname{p}(M_k)\\ summing to 1, and let \\\operatorname{p}(\tilde{y}\mid M_k)\\ be the [marginal likelihood](#def-marginal-likelihood) of the data under model \\M_k\\. The **posterior model probabilities** are
>
> \\ \operatorname{p}(M_k \mid \tilde{y}) \stackrel{\text{def}}{=} \frac{\operatorname{p}(\tilde{y}\mid M_k)\\ \operatorname{p}(M_k)}{\sum\_{l=1}^K \operatorname{p}(\tilde{y}\mid M_l)\\ \operatorname{p}(M_l)}, \\
>
> and **Bayesian model averaging** estimates a quantity \\\Delta\\ that has the same meaning in every model by its posterior distribution averaged over the models:
>
> \\ \operatorname{p}(\Delta \mid \tilde{y}) \stackrel{\text{def}}{=}\sum\_{k=1}^K \operatorname{p}(\Delta \mid M_k, \tilde{y})\\ \operatorname{p}(M_k \mid \tilde{y}). \\

> **NOTE:**
>
> **Definition 28 (Posterior inclusion probability)** When the candidate models of [Definition 27](#def-bma) differ in which predictors they include, the **posterior inclusion probability** of a predictor is the total posterior probability of the models that include it.

> **NOTE:**
>
> **Example 26 (A BIC approximation to Bayesian model averaging)** Marginal likelihoods are hard to compute, but with equal prior probabilities for the models, the [Bayesian information criterion](https://morrison-lab.github.io/rme/chapters/Linear-models-overview.html#def-bic) gives a large-sample approximation to the posterior model probabilities ([Schwarz 1978](#ref-schwarz1978estimating)):
>
> \\ \operatorname{p}(M_k \mid \tilde{y}) \approx \frac{\operatorname{exp}\mathopen{}\left\\-\tfrac{1}{2}\operatorname{BIC}\_k\right\\\mathclose{}}{\sum\_{l=1}^K \operatorname{exp}\mathopen{}\left\\-\tfrac{1}{2}\operatorname{BIC}\_l\right\\\mathclose{}}. \\
>
> We simulate data in which only \\x_1\\ and \\x_2\\ affect the outcome, fit a linear regression for every subset of the three predictors \\x_1\\, \\x_2\\ and \\x_3\\, and compute these approximate posterior model probabilities:
>
> ``` downlit
> set.seed(2027)
> n_obs <- 120L
> dat <- tibble::tibble(
>   x1 = stats::rnorm(n_obs),
>   x2 = stats::rnorm(n_obs),
>   x3 = stats::rnorm(n_obs)
> ) |>
>   dplyr::mutate(y = 1 + 0.8 * x1 + 0.5 * x2 + stats::rnorm(n_obs))
>
> predictors <- c("x1", "x2", "x3")
> subsets <- lapply(0:3, function(k) {
>   utils::combn(predictors, k, simplify = FALSE)
> }) |>
>   unlist(recursive = FALSE)
> models <- lapply(subsets, function(vars) {
>   rhs <- if (length(vars) > 0) paste(vars, collapse = " + ") else "1"
>   stats::lm(stats::as.formula(paste("y ~", rhs)), data = dat)
> })
> bic <- vapply(models, stats::BIC, numeric(1))
> weight <- exp(-0.5 * (bic - min(bic)))
> weight <- weight / sum(weight)
> ```
>
> Subtracting the smallest BIC before exponentiating leaves the normalized weights unchanged and avoids numerical underflow. The [posterior inclusion probability](#def-pip) of each predictor sums the weights of the models that contain it:
>
> ``` downlit
> includes <- function(v) vapply(subsets, function(s) v %in% s, logical(1))
> vapply(predictors, function(v) sum(weight[includes(v)]), numeric(1)) |>
>   round(3)
> #>    x1    x2    x3 
> #> 1.000 1.000 0.152
> ```
>
> For the model-averaged slope of \\x_1\\, we approximate its posterior mean within each model by the least-squares estimate, taken as \\0\\ in models that exclude \\x_1\\, and average with the posterior model probabilities as weights:
>
> ``` downlit
> beta_x1 <- vapply(models, function(m) {
>   cf <- stats::coef(m)
>   if ("x1" %in% names(cf)) cf[["x1"]] else 0
> }, numeric(1))
> c(
>   bma_slope_x1 = sum(weight * beta_x1),
>   least_squares_x1_x2 = stats::coef(stats::lm(y ~ x1 + x2, data = dat))[["x1"]]
> ) |>
>   round(3)
> #>        bma_slope_x1 least_squares_x1_x2 
> #>               0.947               0.948
> ```
>
> The predictors that affect the outcome, \\x_1\\ and \\x_2\\, have inclusion probabilities near 1, and the irrelevant \\x_3\\ a much smaller one. The models without \\x_1\\ get almost no weight, so the model-averaged slope of \\x_1\\ is close to its least-squares estimate in the model with \\x_1\\ and \\x_2\\ only. Both differ from the true slope \\0.8\\ by sampling variation in this data set, not because of the averaging.

## 14 Further reading

The following resources cover Bayesian inference in more depth.

### 14.1 UC Davis courses

- [STA 015C](https://catalog.ucdavis.edu/search/?q=STA+015C): “Introduction to Statistical Data Science III”
- [STA 035C](https://catalog.ucdavis.edu/search/?q=STA+035C): “Statistical Data Science III”
- [STA 145](https://catalog.ucdavis.edu/search/?q=STA+145): “Bayesian Statistical Inference”
- [ECL 234](https://catalog.ucdavis.edu/search/?q=ECL+234): “Bayesian Models - A Statistical Primer”
- [PLS 207](https://catalog.ucdavis.edu/search/?q=PLS+207): “Applied Statistical Modeling for the Environmental Sciences”
- [PSC 205H](https://catalog.ucdavis.edu/search/?q=PSC+205H): “Applied Bayesian Statistics for Social Scientists”
- [POL 280](https://catalog.ucdavis.edu/search/?q=POL+280): “Bayesian Methods: for Social & Behavioral Sciences”
- [BAX 442](https://catalog.ucdavis.edu/search/?q=BAX+442): “Advanced Statistics”

### 14.2 Books

- Ross ([2022](#ref-rossbayes)), a free online textbook
- Aragon ([2018](#ref-aragon2018population)), on population health thinking with Bayesian networks
- McElreath ([2020](#ref-statrethink2e)), which [ECL 234](https://catalog.ucdavis.edu/search/?q=ECL+234) uses; its author was formerly a UC Davis professor, and has published [video lectures](https://www.youtube.com/playlist?list=PLDcUM9US4XdPz-KxHM4XHt7uUVGWWVSus) and [course materials](https://github.com/rmcelreath/stat_rethinking_2024)
- Korner-Nievergelt and Korner-Nievergelt ([2015](#ref-korner.bayes.ecology))
- Cowles ([2013](#ref-CowlesMaryKathryn2013ABSW))
- Kéry et al. ([2012](#ref-kery-bayes-pop))
- Hobbs and Hooten ([2015](#ref-HobbsN.Thompson2015Bmas)), which has been used in [PLS 207](https://catalog.ucdavis.edu/search/?q=PLS+207)

## References

Aragon, Tomas J. 2018. *Population Health Thinking with Bayesian Networks*. <https://escholarship.org/uc/item/8000r5m5>.

Casella, George, and Roger Berger. 2002. *Statistical Inference*. 2nd ed. Cengage Learning. <https://www.cengage.com/c/statistical-inference-2e-casella-berger/9780534243128/>.

Cowles, Mary Kathryn. 2013. *Applied Bayesian Statistics: With R and OpenBUGS Examples*. Vol. 98. Springer Texts in Statistics. Springer Nature. <https://doi.org/10.1007/978-1-4614-5696-4>.

Dobson, Annette J, and Adrian G Barnett. 2018. *An Introduction to Generalized Linear Models*. 4th ed. CRC press. <https://doi.org/10.1201/9781315182780>.

Hobbs, N. Thompson, and Mevin B Hooten. 2015. *Bayesian Models: A Statistical Primer for Ecologists*. STU - Student edition. Princeton University Press.

Kéry, Marc., Michael. Schaub, and Steven R. Beissinger. 2012. *Bayesian Population Analysis Using WinBUGS : A Hierarchical Perspective*. 1st ed. Academic Press. <https://shop.elsevier.com/books/bayesian-population-analysis-using-winbugs/kery/978-0-12-387020-9>.

Korner-Nievergelt, Fränzi, and Fränzi Korner-Nievergelt. 2015. *Bayesian Data Analysis in Ecology Using Linear Models with R, BUGS, and Stan*. 1st ed. Academic Press.

McElreath, Richard. 2020. *Statistical Rethinking : A Bayesian Course with Examples in R and Stan*. Second edition. Chapman & Hall/CRC Texts in Statistical Science Series. CRC Press.

Ross, Kevin. 2022. *An Introduction to Bayesian Reasoning and Methods*. Online. <https://bookdown.org/kevin_davisross/bayesian-reasoning-and-methods/>.

Schwarz, Gideon. 1978. “Estimating the Dimension of a Model.” *The Annals of Statistics* 6 (2): 461–64. <https://doi.org/10.1214/aos/1176344136>.

Back to top

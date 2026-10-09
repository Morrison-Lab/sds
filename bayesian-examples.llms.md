# Fitting Models by Bayesian Inference with JAGS

Code

Published

Last modified: 2026-10-09 12:07:46 (PDT)

This page fits models by Bayesian inference, using the JAGS sampler driven from R: a single proportion, a logistic regression, a survival model, and a random-effects model, and then averages over linear regression models ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e)). It uses the priors of the [Bayesian Inference](bayesian-inference.llms.md) page and the sampling and convergence checks of the [Markov Chain Monte Carlo](mcmc.llms.md) page.

## 1 A first example: a single proportion

From here on, the models are fit by Bayesian inference with JAGS (“Just Another Gibbs Sampler”), a program that builds an MCMC sampler from a text description of a model ([Dobson and Barnett 2018, chap. 13](#ref-dobson4e)), driven from R through the `rjags` package. We begin with the simplest possible model, a single Bernoulli probability, whose exact posterior is known from [the Beta-Bernoulli example](bayesian-inference.llms.md#exm-beta-bernoulli), so the output can be checked. The example shows the mechanics that every later analysis reuses: specifying a model, supplying data, running a burn-in, monitoring parameters, and summarizing and checking the draws. In JAGS, `dnorm(mean, precision)` is parameterized by the precision, the reciprocal of the variance.

> **NOTE:**
>
> **Example 1 (A Bernoulli model fitted with JAGS)** The data are \\r = 55\\ successes in \\n = 91\\ trials, and the prior is uniform, as in [the Beta-Bernoulli example](bayesian-inference.llms.md#exm-beta-bernoulli). Each chain gets its own random-number generator seed, so the output is reproducible:
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
> The posterior mean and equal-tailed 95% credible interval agree with the exact \\\operatorname{Beta}(56, 37)\\ values of [the Beta-Bernoulli example](bayesian-inference.llms.md#exm-beta-bernoulli) to about two decimal places, and the [potential scale reduction factor](mcmc.llms.md#def-psrf) is 1.

## 2 Binary outcomes: logistic regression

For a binary outcome \\Y_i \sim \operatorname{Bernoulli}(\pi_i)\\ with \\\operatorname{logit}(\pi_i) = \tilde{x}\_i \cdot \tilde{\beta}\\, the [logistic regression](https://morrison-lab.github.io/rme/chapters/logistic-regression.html) model, a Bayesian analysis places a prior on the coefficient vector \\\tilde{\beta}\\ and samples the posterior \\\operatorname{p}(\tilde{\beta}\mid \tilde{y})\\ by MCMC ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e), p. 318). Each \\\beta\_{x_j}\\ is summarized by the mean and quantiles of its draws. No large-sample Gaussian approximation is needed: a credible interval is read directly from the posterior quantiles, and the posterior of an odds ratio \\e^{\beta\_{x_j}}\\, or of any other function of \\\tilde{\beta}\\, is obtained by transforming the draws. For a video introduction, see Richard McElreath’s lecture [*Modeling Events*](https://www.youtube.com/watch?v=RuBUVQELw-c) (Statistical Rethinking 2026, Lecture A09).

> **NOTE:**
>
> **Example 2 (Logistic regression fitted by Bayesian inference)** We simulate \\N = 200\\ observations from a logistic model with one continuous predictor, intercept \\\beta\_{0}= -0.5\\ and slope \\\beta\_{x} = 1.2\\, and place a diffuse \\\operatorname{N}\mathopen{}\left(0, 10^2\right)\mathclose{}\\ prior on each coefficient (precision \\0.01\\ in JAGS). The JAGS program also monitors the odds ratio \\e^{\beta\_{x}}\\ for a one-unit increase in \\x\\. In the code, `beta0` and `beta1` are \\\beta\_{0}\\ and \\\beta\_{x}\\.
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
> Each 95% credible interval contains its coefficient’s true value, and every \\\hat{R}\\ is near 1. As [comparing MCMC estimates to maximum likelihood](mcmc.llms.md#sec-mcmc-vs-mle) leads us to expect, the posterior means are close to the maximum likelihood estimates:
>
> ``` downlit
> stats::glm(y ~ x, family = stats::binomial()) |>
>   stats::coef() |>
>   round(3)
> #> (Intercept)           x 
> #>      -0.647       1.183
> ```

## 3 Survival analysis

Parametric survival models, such as those with exponential or Weibull event times, can be fit by Bayesian inference: priors are placed on the baseline-hazard parameters and the regression coefficients, and the posterior is sampled by MCMC ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e), p. 327). Censoring enters through the likelihood, exactly as in maximum likelihood estimation with the [likelihood with censoring](https://morrison-lab.github.io/rme/chapters/intro-to-survival-analysis.html#sec-likelihood-with-censoring): an observed event at time \\t\\ contributes its density \\{\lambda}(t)\\\operatorname{S}(t)\\, and an observation right-censored at time \\t\\ contributes its survival probability \\\operatorname{S}(t)\\, where \\{\lambda}\\ is the hazard and \\\operatorname{S}\\ the survival function.

When a model’s log-likelihood contribution \\\ell_i\\ for observation \\i\\ is not one of the distributions built into JAGS, the *zeros trick* supplies it. An observed value of 0 from a Poisson distribution with mean \\\phi_i\\ has probability \\e^{-\phi_i}\\, and with \\\phi_i \stackrel{\text{def}}{=}C - \ell_i\\ for a constant \\C\\,

\\ \begin{aligned} e^{-\phi_i} &= e^{-(C - \ell_i)} && \text{(definition of \$\phi_i\$)}\\ &= e^{-C} e^{\ell_i} && \text{(splitting the exponent)}\\ &\propto e^{\ell_i} && \text{(\$C\$ does not depend on the parameters)}, \end{aligned} \\

which is observation \\i\\’s likelihood contribution. So declaring data `zeros[i] = 0` with `zeros[i] ~ dpois(C - loglik[i])` multiplies the likelihood by \\e^{\ell_i}\\. The constant \\C\\ only has to be large enough to keep every \\\phi_i\\ positive.

> **NOTE:**
>
> **Example 3 (Exponential survival regression fitted by Bayesian inference)** We simulate \\N = 200\\ right-censored exponential survival times, with a binary covariate \\x_i\\ (say, treatment) and hazard \\{\lambda}\_i = \operatorname{exp}\mathopen{}\left\\\beta\_{0}+ \beta\_{x} x_i\right\\\mathclose{}\\, where the log baseline hazard is \\\beta\_{0}= \log 0.05\\ and the log hazard ratio is \\\beta\_{x} = -0.7\\. With event indicator \\\delta_i\\ (1 for an event, 0 for a censored time) and follow-up time \\t_i\\, the exponential density is \\{\lambda}\_i e^{-{\lambda}\_i t}\\ and its survival function is \\e^{-{\lambda}\_i t}\\, so observation \\i\\ contributes the log-likelihood
>
> \\ \ell_i \stackrel{\text{def}}{=}\delta_i \log {\lambda}\_i - {\lambda}\_i t_i. \\
>
> JAGS has no built-in distribution for this contribution, so we fit it with the zeros trick. In the code, `beta0` and `beta1` are \\\beta\_{0}\\ and \\\beta\_{x}\\.
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
> About 50% of the follow-up times end in an event. The 95% credible interval for \\\beta\_{x}\\ contains the true \\-0.7\\, though the posterior mean is some distance from it. The maximum likelihood estimates, from the same log-likelihood, show that the gap is sampling variation in this data set rather than an effect of the prior:
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
> The monitored \\e^{\beta\_{x}}\\ gives the hazard ratio and its credible interval directly.

## 4 Random effects

The [hierarchical model](bayesian-inference.llms.md#def-hierarchical-model) of [the two-level Gaussian example](bayesian-inference.llms.md#exm-two-level-normal) is the random-effects *model structure*, with group-level parameters \\\theta_j \sim \operatorname{N}\mathopen{}\left(\mu, \tau^2\right)\mathclose{}\\ drawn from a common distribution. What changes here from a maximum likelihood fit is the *inference method*: the Bayesian analysis places priors on the hyperparameters \\\mu\\ and \\\tau\\ and samples their joint posterior together with the group-level parameters ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e), p. 329). The posterior shrinks each group’s estimate toward the overall mean, by an amount the data determine through \\\tau\\, and the posterior for \\\tau\\ carries the uncertainty about the between-group spread into every group-level summary.

> **NOTE:**
>
> **Example 4 (A random-intercept model fitted by Bayesian inference)** We simulate \\J = 8\\ groups of 12 observations each, with group means drawn from \\\operatorname{N}\mathopen{}\left(\mu, \tau^2\right)\mathclose{}\\ (\\\mu= 5\\, \\\tau= 1.5\\) and within-group standard deviation \\\sigma= 2\\. The priors are a diffuse \\\operatorname{N}\mathopen{}\left(0, 100^2\right)\mathclose{}\\ for \\\mu\\ and [flat priors](bayesian-inference.llms.md#def-flat-prior) on \\(0, 100)\\ for the standard deviations \\\tau\\ and \\\sigma\\. Being flat on the standard-deviation scale is a choice: as [a flat prior on the log-odds](bayesian-inference.llms.md#exm-flat-prior-reparam) shows for a probability, it is not flat on another scale, such as the variance.
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
> The 95% credible intervals contain the true \\\mu= 5\\, \\\tau= 1.5\\ and \\\sigma= 2\\. The interval for \\\tau\\ is wide: eight groups say little about how spread out group means are, and the posterior reports that uncertainty instead of a single estimate of the variance component.
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
> This is the borrowing of strength described in [distributions and hierarchies](bayesian-inference.llms.md#sec-bayes-hierarchies): group 4, with the largest sample mean, is pulled furthest toward the overall mean.

## 5 Bayesian model averaging

When several candidate models are plausible, committing to a single “best” one ignores the uncertainty about which model is right. Bayesian model averaging instead averages over the models, weighting each by its posterior probability ([Dobson and Barnett 2018, chap. 14](#ref-dobson4e), p. 339). This approach carries *model* uncertainty, not just parameter uncertainty, into the final inference. It is an alternative to choosing a single model by [predictor selection](https://morrison-lab.github.io/rme/chapters/predictor-selection.html).

> **NOTE:**
>
> **Definition 1 (Posterior model probability)** Let \\M_1, \ldots, M_K\\ be candidate models with prior probabilities \\\operatorname{p}(M_k)\\ summing to 1, and let \\\operatorname{p}(\tilde{y}\mid M_k)\\ be the [marginal likelihood](bayesian-inference.llms.md#def-marginal-likelihood) of the data under model \\M_k\\. The **posterior model probability** of \\M_k\\ is
>
> \\ \operatorname{p}(M_k \mid \tilde{y}) \stackrel{\text{def}}{=} \frac{\operatorname{p}(\tilde{y}\mid M_k)\\ \operatorname{p}(M_k)}{\sum\_{l=1}^{K} \operatorname{p}(\tilde{y}\mid M_l)\\ \operatorname{p}(M_l)}. \\

> **NOTE:**
>
> **Example 5 (Posterior probabilities of two models)** Two models with equal prior probabilities
>
> \\ \begin{aligned} \operatorname{p}(M_1) &= \operatorname{p}(M_2) \\ &= 0.5 \end{aligned} \\
>
> and marginal likelihoods \\\operatorname{p}(\tilde{y}\mid M_1) = 0.02\\ and \\\operatorname{p}(\tilde{y}\mid M_2) = 0.06\\ have posterior probabilities
>
> \\ \begin{aligned} \operatorname{p}(M_1 \mid \tilde{y}) &= 0.01 / (0.01 + 0.03) \\ &= 0.25 \end{aligned} \\
>
> and \\\operatorname{p}(M_2 \mid \tilde{y}) = 0.75\\.

> **NOTE:**
>
> **Definition 2 (Bayesian model averaging)** With the [posterior model probabilities](#def-posterior-model-probability) \\\operatorname{p}(M_k \mid \tilde{y})\\ of candidate models \\M_1, \ldots, M_K\\, **Bayesian model averaging** estimates a quantity \\\Delta\\ that has the same meaning in every model by its posterior distribution averaged over the models:
>
> \\ \operatorname{p}(\Delta\mid \tilde{y}) \stackrel{\text{def}}{=}\sum\_{k=1}^{K} \operatorname{p}(\Delta\mid M_k, \tilde{y})\\ \operatorname{p}(M_k \mid \tilde{y}). \\

> **NOTE:**
>
> **Definition 3 (Posterior inclusion probability)** When the candidate models of [Definition 2](#def-bma) differ in which predictors they include, the **posterior inclusion probability** of a predictor is the total posterior probability of the models that include it.

> **NOTE:**
>
> **Example 6 (A BIC approximation to Bayesian model averaging)** Marginal likelihoods are hard to compute, but with equal prior probabilities for the models, the [Bayesian information criterion](https://morrison-lab.github.io/rme/chapters/Linear-models-overview.html#def-bic) gives a large-sample approximation to the posterior model probabilities ([Schwarz 1978](#ref-schwarz1978estimating)):
>
> \\ \operatorname{p}(M_k \mid \tilde{y}) \approx \frac{\operatorname{exp}\mathopen{}\left\\-\tfrac{1}{2}\operatorname{BIC}\_k\right\\\mathclose{}}{\sum\_{l=1}^{K} \operatorname{exp}\mathopen{}\left\\-\tfrac{1}{2}\operatorname{BIC}\_l\right\\\mathclose{}}. \\
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
>
> tibble::tibble(
>   model = vapply(
>     subsets,
>     function(s) if (length(s) > 0) paste(s, collapse = " + ") else "(none)",
>     character(1)
>   ),
>   weight = round(weight, 3)
> )
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

## References

Dobson, Annette J, and Adrian G Barnett. 2018. *An Introduction to Generalized Linear Models*. 4th ed. CRC press. <https://doi.org/10.1201/9781315182780>.

Schwarz, Gideon. 1978. “Estimating the Dimension of a Model.” *The Annals of Statistics* 6 (2): 461–64. <https://doi.org/10.1214/aos/1176344136>.

Back to top

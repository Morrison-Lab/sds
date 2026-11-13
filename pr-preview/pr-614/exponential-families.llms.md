# Exponential Families

Code

Published

Last modified: 2026-11-12 17:36:09 (PST)

Many of the distributions in this course, such as the [Bernoulli](https://morrison-lab.github.io/pds/random-variables.html#def-bernoulli), [Poisson](https://morrison-lab.github.io/pds/distributions.html#def-poisson) and [Normal](https://morrison-lab.github.io/pds/random-variables.html#def-normal) distributions, share one algebraic form for their [probability mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) or [density](https://morrison-lab.github.io/pds/random-variables.html#def-pdf). Distributions with that form are called an [exponential family](#def-exponential-family), and they share properties that make estimation easier. This page defines the form and its [natural parameter](#def-natural-parameter), and checks the form for the [Poisson distribution](https://morrison-lab.github.io/pds/distributions.html#def-poisson) on data.

# 1 The exponential family form

> **NOTE:**
>
> **Definition 1 (Exponential family)** Let $X$ be a random variable whose distribution depends on one parameter $\eta$, and let $\mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{}$ be its [probability mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) or [density](https://morrison-lab.github.io/pds/random-variables.html#def-pdf). The distributions of $X$ form an **exponential family** if there are a nonnegative [function](https://morrison-lab.github.io/mcs/functions.html#def-function) $h$ and a function $T$ of $x$ alone, and a function $A$ of $\eta$ alone, such that
>
> $$\mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{}
> = {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> \tag{1}$$
>
> for every value $x$ and every allowed $\eta$.

> **NOTE:**
>
> *Remark 1* (Source: Exponential family). Casella and Berger [\[1, Sec. 3.4\]](#ref-CaseBerg01), Eq. 3.4.1 write the family as a sum of $k$ terms inside the exponential, each a [function](https://morrison-lab.github.io/mcs/functions.html#def-function) of the parameter times a function of $x$; Dobson and Barnett [\[2, Sec. 3.2\]](#ref-dobson4e), Eq. 3.3 write it in the form ${\operatorname{exp}\mathopen{}\left\{a(y) b(\theta) + c(\theta) + d(y)\right\}\mathclose{}}$. [Equation 1](#eq-exponential-family) is the case of one term. It is Dobson and Barnett’s canonical form when ${T\mathopen{}\left(x\right)\mathclose{}} = x$, and the [natural parameter](#def-natural-parameter) $\eta$ plays the role of their $b(\theta)$. See the [notation choices](https://morrison-lab.github.io/macros/notation-choices.html#sec-exponential-family-notation) for how the symbols line up.

> **NOTE:**
>
> **Example 1 (The Poisson distribution is an exponential family)** Let $X\sim \operatorname{Pois}({\lambda})$, the [Poisson distribution](https://morrison-lab.github.io/pds/distributions.html#def-poisson) with rate ${\lambda}> 0$. Its [probability mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) has one factor free of ${\lambda}$, and the factors ${\lambda}^{x}$ and ${\operatorname{exp}\mathopen{}\left\{-{\lambda}\right\}\mathclose{}}$. We rewrite it in the form of [Equation 1](#eq-exponential-family) by writing ${\lambda}^{x}$ as an exponential of a logarithm:
>
> $$\begin{aligned}
> \mathbb{f}\mathopen{}\left(x; {\lambda}\right)\mathclose{}
> &= \frac{{\lambda}^{x} \, {\operatorname{exp}\mathopen{}\left\{-{\lambda}\right\}\mathclose{}}}{x!}
> && \text{(Poisson mass function)}\\
> &= \frac{1}{x!} \, {\operatorname{exp}\mathopen{}\left\{{\operatorname{log}\mathopen{}\left\{{\lambda}^{x}\right\}\mathclose{}}\right\}\mathclose{}} \, {\operatorname{exp}\mathopen{}\left\{-{\lambda}\right\}\mathclose{}}
> && \text{(a positive number is the exponential of its logarithm)}\\
> &= \frac{1}{x!} \, {\operatorname{exp}\mathopen{}\left\{x\, {\operatorname{log}\mathopen{}\left\{{\lambda}\right\}\mathclose{}}\right\}\mathclose{}} \, {\operatorname{exp}\mathopen{}\left\{-{\lambda}\right\}\mathclose{}}
> && \text{(the logarithm of a power is the exponent times the logarithm)}\\
> &= \frac{1}{x!} \, {\operatorname{exp}\mathopen{}\left\{x\, {\operatorname{log}\mathopen{}\left\{{\lambda}\right\}\mathclose{}} - {\lambda}\right\}\mathclose{}}
> && \text{(the product of exponentials is the exponential of the sum)}
> \end{aligned}$$
>
> So the Poisson distributions are an [exponential family](#def-exponential-family) with ${{h\mathopen{}\left(x\right)\mathclose{}}} = 1 / x!$, ${T\mathopen{}\left(x\right)\mathclose{}} = x$, [natural parameter](#def-natural-parameter) $\eta= {\operatorname{log}\mathopen{}\left\{{\lambda}\right\}\mathclose{}}$, and ${A\mathopen{}\left(\eta\right)\mathclose{}} = {\lambda}= {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}$.
>
> To check the algebra on data, we use the number of tropical cyclones in northeastern Australia in each of 13 seasons [\[2, Sec. 1.6.5\]](#ref-dobson4e), with the rate set to the [sample mean](exploratory-descriptive.llms.md#def-sample-mean). We evaluate both sides of [Equation 1](#eq-exponential-family) at every observed count.
>
> ## R
>
> ``` downlit
> cyclones <- c(6, 5, 4, 6, 6, 3, 12, 7, 4, 2, 6, 7, 4)
> rate <- mean(cyclones)
>
> base_measure <- function(x) 1 / factorial(x)
> natural_parameter <- log(rate)
> log_partition <- function(eta) exp(eta)
>
> exponential_form <- base_measure(cyclones) *
>   exp(natural_parameter * cyclones - log_partition(natural_parameter))
>
> data.frame(
>   count = cyclones,
>   poisson = dpois(cyclones, rate),
>   exponential_form = exponential_form
> )
> ```
>
> ``` downlit
> max(abs(dpois(cyclones, rate) - exponential_form))
> #> [1] 1.11022e-16
> ```
>
> ## Python
>
> ``` python
> import numpy as np
> import pandas as pd
> from scipy.special import factorial
> from scipy.stats import poisson
>
> cyclones = np.array([6, 5, 4, 6, 6, 3, 12, 7, 4, 2, 6, 7, 4])
> rate = cyclones.mean()
>
> natural_parameter = np.log(rate)
> exponential_form = (1 / factorial(cyclones)) * np.exp(
>     natural_parameter * cyclones - np.exp(natural_parameter)
> )
>
> table = pd.DataFrame(
>     {
>         "count": cyclones,
>         "poisson": poisson.pmf(cyclones, rate),
>         "exponential_form": exponential_form,
>     }
> )
> print(table)
> #>     count   poisson  exponential_form
> #> 0       6  0.157645          0.157645
> #> 1       5  0.170782          0.170782
> #> 2       4  0.154178          0.154178
> #> 3       6  0.157645          0.157645
> #> 4       6  0.157645          0.157645
> #> 5       3  0.111351          0.111351
> #> 6      12  0.006839          0.006839
> #> 7       7  0.124730          0.124730
> #> 8       4  0.154178          0.154178
> #> 9       2  0.060315          0.060315
> #> 10      6  0.157645          0.157645
> #> 11      7  0.124730          0.124730
> #> 12      4  0.154178          0.154178
> print(np.max(np.abs(poisson.pmf(cyclones, rate) - exponential_form)))
> #> 5.551115123125783e-17
> ```
>
> The two columns agree to within rounding error: the largest difference is 1.1e-16.

> **NOTE:**
>
> **Definition 2 (Natural parameter)** In the form of [Equation 1](#eq-exponential-family) of an [exponential family](#def-exponential-family), the parameter $\eta$ that multiplies the [statistic](sufficiency.llms.md#def-statistic) ${T\mathopen{}\left(x\right)\mathclose{}}$ inside the exponential is the **natural parameter**, also called the **canonical parameter** [\[2, Sec. 3.2\]](#ref-dobson4e).

> **NOTE:**
>
> **Example 2 (The natural parameter of the Poisson distribution is the log rate)** In [Example 1](#exm-poisson-exponential-family), the [Poisson](https://morrison-lab.github.io/pds/distributions.html#def-poisson) rate ${\lambda}$ and the [natural parameter](#def-natural-parameter) $\eta$ are related by
>
> $$\eta= {\operatorname{log}\mathopen{}\left\{{\lambda}\right\}\mathclose{}}
> \qquad \text{and} \qquad
> {\lambda}= {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}$$
>
> For the cyclone data, the rate set to the [sample mean](exploratory-descriptive.llms.md#def-sample-mean) is 5.538 cyclones per season, so the natural parameter is $\eta= 1.712$. The natural parameter can be any real number, while the rate must be greater than zero.

> **NOTE:**
>
> **Example 3 (The Bernoulli distribution is an exponential family)**  
>
> Let $X\sim \operatorname{Bernoulli}(\pi)$, the [Bernoulli distribution](https://morrison-lab.github.io/pds/random-variables.html#def-bernoulli) with success [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) $\pi\in (0, 1)$. Its [probability mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) is $\pi^{x} \mathopen{}\left(1 - \pi\right)\mathclose{}^{1 - x}$ for $x\in {\mathopen{}\left\{0, 1\right\}\mathclose{}}$. We rewrite it in the form of [Equation 1](#eq-exponential-family) by collecting the factors that have the [exponent](https://morrison-lab.github.io/mds/algebra-basics.html#def-power-exponent) $x$:
>
> $$\begin{aligned}
> \mathbb{f}\mathopen{}\left(x; \pi\right)\mathclose{}
> &= \pi^{x} \mathopen{}\left(1 - \pi\right)\mathclose{}^{1 - x}
> && \text{(Bernoulli mass function)}\\
> &= \pi^{x} \mathopen{}\left(1 - \pi\right)\mathclose{}^{-x} \mathopen{}\left(1 - \pi\right)\mathclose{}
> && \text{(a power with a sum of exponents is the product of the powers)}\\
> &= \mathopen{}\left(\frac{\pi}{1 - \pi}\right)\mathclose{}^{x} \mathopen{}\left(1 - \pi\right)\mathclose{}
> && \text{(powers with the same exponent combine)}\\
> &= {\operatorname{exp}\mathopen{}\left\{{\operatorname{log}\mathopen{}\left\{\mathopen{}\left(\frac{\pi}{1 - \pi}\right)\mathclose{}^{x}\right\}\mathclose{}}\right\}\mathclose{}} \mathopen{}\left(1 - \pi\right)\mathclose{}
> && \text{(a positive number is the exponential of its logarithm)}\\
> &= {\operatorname{exp}\mathopen{}\left\{x\, {\operatorname{log}\mathopen{}\left\{\frac{\pi}{1 - \pi}\right\}\mathclose{}}\right\}\mathclose{}} \mathopen{}\left(1 - \pi\right)\mathclose{}
> && \text{(the logarithm of a power is the exponent times the logarithm)}\\
> &= {\operatorname{exp}\mathopen{}\left\{x\, {\operatorname{log}\mathopen{}\left\{\frac{\pi}{1 - \pi}\right\}\mathclose{}}\right\}\mathclose{}} {\operatorname{exp}\mathopen{}\left\{{\operatorname{log}\mathopen{}\left\{1 - \pi\right\}\mathclose{}}\right\}\mathclose{}}
> && \text{(a positive number is the exponential of its logarithm)}\\
> &= {\operatorname{exp}\mathopen{}\left\{x\, {\operatorname{log}\mathopen{}\left\{\frac{\pi}{1 - \pi}\right\}\mathclose{}} + {\operatorname{log}\mathopen{}\left\{1 - \pi\right\}\mathclose{}}\right\}\mathclose{}}
> && \text{(the product of exponentials is the exponential of the sum)}
> \end{aligned}$$
>
> The [statistic](sufficiency.llms.md#def-statistic) is ${T\mathopen{}\left(x\right)\mathclose{}} = x$, and ${{h\mathopen{}\left(x\right)\mathclose{}}} = 1$. The [natural parameter](#def-natural-parameter) is the [log odds](https://morrison-lab.github.io/pds/probability-basics.html#def-log-odds), $\eta= {\operatorname{log}\mathopen{}\left\{\pi/ \mathopen{}\left(1 - \pi\right)\mathclose{}\right\}\mathclose{}}$. Inverting it gives $\pi= {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} / \mathopen{}\left(1 + {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}\right)\mathclose{}$, so $1 - \pi= 1 / \mathopen{}\left(1 + {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}\right)\mathclose{}$, and the last term in the exponent is ${\operatorname{log}\mathopen{}\left\{1 - \pi\right\}\mathclose{}} = -{\operatorname{log}\mathopen{}\left\{1 + {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}\right\}\mathclose{}}$. Hence the Bernoulli distributions are an [exponential family](#def-exponential-family) with ${A\mathopen{}\left(\eta\right)\mathclose{}} = {\operatorname{log}\mathopen{}\left\{1 + {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}\right\}\mathclose{}}$.
>
> To check the algebra on data, we use the `birthwt` data, which record the birth weight of babies born at Baystate Medical Center in Springfield, Massachusetts [\[3\]](#ref-hosmer1989applied), as distributed in R’s `MASS` package [\[4\]](#ref-venables2002modern). The variable `low` is 1 for a baby with low birth weight and 0 otherwise. We set the success probability to the [sample mean](exploratory-descriptive.llms.md#def-sample-mean) of `low`, and evaluate both sides of [Equation 1](#eq-exponential-family) at the two possible values of $x$.
>
> ## R
>
> ``` downlit
> low <- MASS::birthwt$low
> prob <- mean(low)
>
> natural_parameter <- log(prob / (1 - prob))
> exp_natural_parameter <- exp(natural_parameter)
> log_partition <- log(1 + exp_natural_parameter)
>
> x <- c(0, 1)
> exponent <- natural_parameter * x - log_partition
> exponential_form <- exp(exponent)
> bernoulli <- dbinom(x, size = 1, prob = prob)
>
> abs_difference <- abs(bernoulli - exponential_form)
> max_difference <- max(abs_difference)
>
> tibble::tibble(x, bernoulli, exponential_form)
> ```
>
> ``` downlit
> max_difference
> #> [1] 1.11022e-16
> ```
>
> ## Python
>
> ``` python
> import numpy as np
> import pandas as pd
> from scipy.stats import bernoulli
>
> birthwt = pd.read_csv("data/birthwt.csv")
> prob = birthwt["low"].mean()
>
> natural_parameter = np.log(prob / (1 - prob))
> log_partition = np.log(1 + np.exp(natural_parameter))
>
> x = np.array([0, 1])
> exponential_form = np.exp(natural_parameter * x - log_partition)
>
> table = pd.DataFrame(
>     {
>         "x": x,
>         "bernoulli": bernoulli.pmf(x, prob),
>         "exponential_form": exponential_form,
>     }
> )
> print(table)
> #>    x  bernoulli  exponential_form
> #> 0  0   0.687831          0.687831
> #> 1  1   0.312169          0.312169
> print(np.max(np.abs(bernoulli.pmf(x, prob) - exponential_form)))
> #> 2.220446049250313e-16
> ```
>
> The value of `prob` is 0.312, so the natural parameter is $\eta= -0.79$. The two columns agree to within rounding error: the largest difference is 1.1e-16.

> **NOTE:**
>
> **Example 4 (The Gaussian distribution with known variance is an exponential family)**  
>
> Let $X\sim \operatorname{N}(\mu, \sigma^2)$, the [Gaussian distribution](https://morrison-lab.github.io/pds/random-variables.html#def-normal) with [mean](https://morrison-lab.github.io/pds/expectation.html#def-expectation) $\mu\in \mathbb{R}$ and a [variance](https://morrison-lab.github.io/pds/variance-covariance.html#def-variance) $\sigma^2> 0$ that we treat as known. Its [density](https://morrison-lab.github.io/pds/random-variables.html#def-pdf) is $\mathopen{}\left(2 \pi \sigma^2\right)\mathclose{}^{-1/2} {\operatorname{exp}\mathopen{}\left\{-\mathopen{}\left(x- \mu\right)\mathclose{}^2 / \mathopen{}\left(2 \sigma^2\right)\mathclose{}\right\}\mathclose{}}$. We rewrite it in the form of [Equation 1](#eq-exponential-family) by expanding the [square](https://morrison-lab.github.io/mds/algebra-basics.html#def-square) in the [exponent](https://morrison-lab.github.io/mds/algebra-basics.html#def-power-exponent) and separating the factors that involve $\mu$:
>
> $$\begin{aligned}
> \mathbb{f}\mathopen{}\left(x; \mu\right)\mathclose{}
> &= \frac{1}{\sqrt{2 \pi \sigma^2}} \, {\operatorname{exp}\mathopen{}\left\{-\frac{\mathopen{}\left(x- \mu\right)\mathclose{}^2}{2 \sigma^2}\right\}\mathclose{}}
> && \text{(Gaussian density)}\\
> &= \frac{1}{\sqrt{2 \pi \sigma^2}} \, {\operatorname{exp}\mathopen{}\left\{-\frac{x^2 - 2 x\mu+ \mu^2}{2 \sigma^2}\right\}\mathclose{}}
> && \text{(the square of a difference)}\\
> &= \frac{1}{\sqrt{2 \pi \sigma^2}} \, {\operatorname{exp}\mathopen{}\left\{-\frac{x^2}{2 \sigma^2} + \frac{x\mu}{\sigma^2} - \frac{\mu^2}{2 \sigma^2}\right\}\mathclose{}}
> && \text{(divide each term by the denominator)}\\
> &= \frac{1}{\sqrt{2 \pi \sigma^2}} \, {\operatorname{exp}\mathopen{}\left\{-\frac{x^2}{2 \sigma^2}\right\}\mathclose{}} \, {\operatorname{exp}\mathopen{}\left\{\frac{\mu}{\sigma^2} x- \frac{\mu^2}{2 \sigma^2}\right\}\mathclose{}}
> && \text{(the exponential of a sum is the product of the exponentials)}
> \end{aligned}$$
>
> The [statistic](sufficiency.llms.md#def-statistic) is ${T\mathopen{}\left(x\right)\mathclose{}} = x$, and ${{h\mathopen{}\left(x\right)\mathclose{}}} = {\operatorname{exp}\mathopen{}\left\{-x^2 / \mathopen{}\left(2 \sigma^2\right)\mathclose{}\right\}\mathclose{}} / \sqrt{2 \pi \sigma^2}$, which does not involve $\mu$. The [natural parameter](#def-natural-parameter) is $\eta= \mu/ \sigma^2$. Inverting it gives $\mu= \sigma^2\eta$, so $\mu^2 / \mathopen{}\left(2 \sigma^2\right)\mathclose{} = \sigma^2\eta^2 / 2$. Hence the Gaussian distributions with a known variance are an [exponential family](#def-exponential-family) with ${A\mathopen{}\left(\eta\right)\mathclose{}} = \sigma^2\eta^2 / 2$.
>
> To check the algebra on data, we use the birth weights in grams from the `birthwt` data [\[3\]](#ref-hosmer1989applied), as distributed in R’s `MASS` package [\[4\]](#ref-venables2002modern). We set $\mu$ to the [sample mean](exploratory-descriptive.llms.md#def-sample-mean) and $\sigma^2$ to the [sample variance](exploratory-descriptive.llms.md#def-sample-variance) of the birth weights, and evaluate both sides of [Equation 1](#eq-exponential-family) at every observed birth weight.
>
> ## R
>
> ``` downlit
> bwt <- MASS::birthwt$bwt
> mean_bwt <- mean(bwt)
> sd_bwt <- sd(bwt)
> variance <- sd_bwt^2
>
> natural_parameter <- mean_bwt / variance
> log_partition <- variance * natural_parameter^2 / 2
>
> base_exponent <- -bwt^2 / (2 * variance)
> base_scale <- sqrt(2 * pi * variance)
> base_measure <- exp(base_exponent) / base_scale
>
> exponent <- natural_parameter * bwt - log_partition
> exponential_form <- base_measure * exp(exponent)
> normal <- dnorm(bwt, mean = mean_bwt, sd = sd_bwt)
>
> relative_difference <- abs(normal - exponential_form) / normal
> max_relative_difference <- max(relative_difference)
>
> tibble::tibble(bwt, normal, exponential_form)
> ```
>
> ``` downlit
> max_relative_difference
> #> [1] 3.52031e-15
> ```
>
> ## Python
>
> ``` python
> import numpy as np
> import pandas as pd
> from scipy.stats import norm
>
> birthwt = pd.read_csv("data/birthwt.csv")
> bwt = birthwt["bwt"]
> mean_bwt = bwt.mean()
> variance = bwt.var(ddof=1)
>
> natural_parameter = mean_bwt / variance
> log_partition = variance * natural_parameter**2 / 2
>
> base_measure = np.exp(-bwt**2 / (2 * variance)) / np.sqrt(2 * np.pi * variance)
> exponential_form = base_measure * np.exp(natural_parameter * bwt - log_partition)
> normal = norm.pdf(bwt, loc=mean_bwt, scale=np.sqrt(variance))
>
> table = pd.DataFrame(
>     {"bwt": bwt, "normal": normal, "exponential_form": exponential_form}
> )
> print(table.head())
> #>     bwt    normal  exponential_form
> #> 0  2523  0.000463          0.000463
> #> 1  2551  0.000473          0.000473
> #> 2  2557  0.000475          0.000475
> #> 3  2594  0.000487          0.000487
> #> 4  2600  0.000489          0.000489
> print(np.max(np.abs(normal - exponential_form) / normal))
> #> 3.324739754359985e-15
> ```
>
> For these data, $\eta= 0.00554$ per gram. The two columns agree to within rounding error: the largest relative difference is 3.5e-15.

> **NOTE:**
>
> **Example 5 (The uniform distribution on** $[0, \beta]$ is not an exponential family)  
>
> Let $X\sim \operatorname{Uniform}(0, \beta)$, the [uniform distribution](https://morrison-lab.github.io/pds/random-variables.html#def-uniform) on the [interval](https://morrison-lab.github.io/mcs/sets.html#def-interval) from $0$ to $\beta> 0$. Its [density](https://morrison-lab.github.io/pds/random-variables.html#def-pdf) is
>
> $$\mathbb{f}\mathopen{}\left(x; \beta\right)\mathclose{}
> = \begin{cases}
> \dfrac{1}{\beta}, & 0 \le x\le \beta\\
> 0, & \text{otherwise.}
> \end{cases}$$
>
> Suppose these densities were those of an [exponential family](#def-exponential-family), indexed by some parameter $\eta$ that determines $\beta$. Then [Equation 1](#eq-exponential-family) would give
>
> $$\mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{}
> = {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}.$$
>
> The [exponential function](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-exponential-function) is positive for every $\eta$ and every $x$, so $\mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} > 0$ exactly when ${{h\mathopen{}\left(x\right)\mathclose{}}} > 0$. The set of values $x$ with a positive density would then be the same for every parameter value.
>
> The uniform density does depend on it. At $x= 3/2$, the density is $1/2$ when $\beta= 2$ and $0$ when $\beta= 1$. So the uniform densities on $[0, \beta]$ are not an exponential family. The set of values $x$ with a positive density depends on the parameter, which the form of [Equation 1](#eq-exponential-family) does not allow.

# 2 The log-partition function

> **NOTE:**
>
> **Exercise 1 (The exponential of the log-partition function is a normalizing integral)** Let $X$ be a [continuous random variable](https://morrison-lab.github.io/pds/random-variables.html#def-continuous-rv) whose [density](https://morrison-lab.github.io/pds/random-variables.html#def-pdf) has the form of [Equation 1](#eq-exponential-family). Use the fact that a density integrates to one to show that
>
> $${\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> = \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx.$$
>
> For a [discrete random variable](https://morrison-lab.github.io/pds/random-variables.html#def-discrete-rv), replace the [integral](https://morrison-lab.github.io/mds/measures-integrals.html#def-integral) with a [sum](https://morrison-lab.github.io/mds/algebra-sums.html#def-summation) over the possible values.

> **NOTE:**
>
> *Solution 1*. We start from the fact that the [density](https://morrison-lab.github.io/pds/random-variables.html#def-pdf) integrates to one, and isolate the factor ${\operatorname{exp}\mathopen{}\left\{-{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}$ that does not depend on $x$:
>
> $$\begin{aligned}
> 1
> &= \int \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, dx
> && \text{(a density integrates to one)}\\
> &= \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(definition of an exponential family)}\\
> &= \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, {\operatorname{exp}\mathopen{}\left\{-{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(the exponential of a sum is the product of the exponentials)}\\
> &= {\operatorname{exp}\mathopen{}\left\{-{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(a factor free of the integration variable moves out of the integral)}
> \end{aligned}$$
>
> Multiplying both sides by ${\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}$ gives
>
> $$\begin{aligned}
> {\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> &= {\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \, {\operatorname{exp}\mathopen{}\left\{-{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(multiply both sides by } {\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \text{)}\\
> &= {\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(the product of exponentials is the exponential of the sum)}\\
> &= {\operatorname{exp}\mathopen{}\left\{0\right\}\mathclose{}} \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(a number minus itself is zero)}\\
> &= \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(the exponential of zero is one)}
> \end{aligned}$$

> **NOTE:**
>
> **Exercise 2 (The derivative of the log-partition function is the mean of the statistic)** In the setting of [Exercise 1](#exr-log-partition-normalization), differentiate both sides of
>
> $${\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> = \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx$$
>
> with respect to $\eta$. Assume that the [derivative](https://morrison-lab.github.io/mds/calculus-derivatives.html#def-derivative) of the [integral](https://morrison-lab.github.io/mds/measures-integrals.html#def-integral) is the integral of the derivative. Show that
>
> $$\frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta} = {\mathbb{E}\mathopen{}\left[{T\mathopen{}\left(X\right)\mathclose{}}\right]\mathclose{}}.$$

> **NOTE:**
>
> *Solution 2*. The left side of [Exercise 1](#exr-log-partition-normalization) is a function of $\eta$ alone, and its [derivative](https://morrison-lab.github.io/mds/calculus-derivatives.html#def-derivative) is
>
> $$\begin{aligned}
> \frac{d {\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}}{d \eta}
> &= {\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \, \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}
> && \text{(chain rule)}
> \end{aligned}$$
>
> The derivative of the right side moves inside the [integral](https://morrison-lab.github.io/mds/measures-integrals.html#def-integral), where only the [exponential function](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-exponential-function) depends on $\eta$:
>
> $$\begin{aligned}
> \frac{d }{d \eta} \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> &= \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, \frac{d {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}}}{d \eta} \, dx
> && \text{(the derivative of the integral is the integral of the derivative)}\\
> &= \int {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, {T\mathopen{}\left(x\right)\mathclose{}} \, dx
> && \text{(chain rule)}\\
> &= \int {T\mathopen{}\left(x\right)\mathclose{}} \, {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(multiplication is commutative)}
> \end{aligned}$$
>
> The two derivatives are equal, because the two sides of [Exercise 1](#exr-log-partition-normalization) are equal:
>
> $${\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \, \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}
> = \int {T\mathopen{}\left(x\right)\mathclose{}} \, {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx.$$
>
> Solving for the derivative of the log-partition function:
>
> $$\begin{aligned}
> \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}
> &= \frac{1}{{\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}} \int {T\mathopen{}\left(x\right)\mathclose{}} \, {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(divide both sides by } {\operatorname{exp}\mathopen{}\left\{{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \text{)}\\
> &= {\operatorname{exp}\mathopen{}\left\{-{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \int {T\mathopen{}\left(x\right)\mathclose{}} \, {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(the reciprocal of an exponential is the exponential of the negative)}\\
> &= \int {\operatorname{exp}\mathopen{}\left\{-{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \, {T\mathopen{}\left(x\right)\mathclose{}} \, {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(a factor free of the integration variable moves into the integral)}\\
> &= \int {T\mathopen{}\left(x\right)\mathclose{}} \, {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}}\right\}\mathclose{}} \, {\operatorname{exp}\mathopen{}\left\{-{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(multiplication is commutative)}\\
> &= \int {T\mathopen{}\left(x\right)\mathclose{}} \, {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \, dx
> && \text{(the product of exponentials is the exponential of the sum)}\\
> &= \int {T\mathopen{}\left(x\right)\mathclose{}} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, dx
> && \text{(definition of an exponential family)}\\
> &= {\mathbb{E}\mathopen{}\left[{T\mathopen{}\left(X\right)\mathclose{}}\right]\mathclose{}}
> && \text{(definition of the expectation)}
> \end{aligned}$$

> **NOTE:**
>
> **Theorem 1 (The mean of the statistic is the derivative of the log-partition function)** Let $X$ have a [distribution](https://morrison-lab.github.io/pds/random-variables.html#def-random-variable) in an [exponential family](#def-exponential-family) with [natural parameter](#def-natural-parameter) $\eta$, [statistic](sufficiency.llms.md#def-statistic) $T$, and log-partition function $A$, and let $\eta$ be in the interior of the allowed values. Then
>
> $${\mathbb{E}\mathopen{}\left[{T\mathopen{}\left(X\right)\mathclose{}}\right]\mathclose{}} = \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}.$$

> **NOTE:**
>
> *Proof*. The solution to [Exercise 2](#exr-log-partition-derivative), worked in [Solution 2](#sol-log-partition-derivative), proves the statement. It uses the solution to [Exercise 1](#exr-log-partition-normalization), worked in [Solution 1](#sol-log-partition-normalization).

> **NOTE:**
>
> **Example 6 (The mean of the Poisson distribution from its log-partition function)**  
>
> In [Example 1](#exm-poisson-exponential-family), the [statistic](sufficiency.llms.md#def-statistic) is ${T\mathopen{}\left(x\right)\mathclose{}} = x$ and the log-partition function is ${A\mathopen{}\left(\eta\right)\mathclose{}} = {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}$. By [Theorem 1](#thm-log-partition-mean),
>
> $${\mathbb{E}\mathopen{}\left[X\right]\mathclose{}}
> = {\mathbb{E}\mathopen{}\left[{T\mathopen{}\left(X\right)\mathclose{}}\right]\mathclose{}}
> = \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}
> = {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}.$$
>
> Since ${\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} = {\lambda}$, we have ${\mathbb{E}\mathopen{}\left[X\right]\mathclose{}} = {\lambda}$, the [mean](https://morrison-lab.github.io/pds/expectation.html#def-expectation) of the [Poisson distribution](https://morrison-lab.github.io/pds/distributions.html#def-poisson).
>
> To check [Theorem 1](#thm-log-partition-mean) on data, we compute its two sides separately for the cyclone counts of [Example 1](#exm-poisson-exponential-family), with ${\lambda}$ set to the [sample mean](exploratory-descriptive.llms.md#def-sample-mean). The left side adds $x\, \mathbb{f}\mathopen{}\left(x; {\lambda}\right)\mathclose{}$ over the counts from 0 to 100, and the right side is a central difference of ${A\mathopen{}\left(\eta\right)\mathclose{}}$ at $\eta= {\operatorname{log}\mathopen{}\left\{{\lambda}\right\}\mathclose{}}$.
>
> ## R
>
> ``` downlit
> cyclones <- c(6, 5, 4, 6, 6, 3, 12, 7, 4, 2, 6, 7, 4)
> rate <- mean(cyclones)
> natural_parameter <- log(rate)
>
> counts <- 0:100
> weighted_masses <- counts * dpois(counts, rate)
> mean_statistic <- sum(weighted_masses)
>
> log_partition <- exp
> step <- 1e-6
> log_partition_up <- log_partition(natural_parameter + step)
> log_partition_down <- log_partition(natural_parameter - step)
> derivative <- (log_partition_up - log_partition_down) / (2 * step)
>
> tibble::tibble(mean_statistic, derivative)
> ```
>
> ## Python
>
> ``` python
> import numpy as np
> import pandas as pd
> from scipy.stats import poisson
>
> cyclones = np.array([6, 5, 4, 6, 6, 3, 12, 7, 4, 2, 6, 7, 4])
> rate = cyclones.mean()
> natural_parameter = np.log(rate)
>
> counts = np.arange(0, 101)
> mean_statistic = np.sum(counts * poisson.pmf(counts, rate))
>
> log_partition = np.exp
> step = 1e-6
> log_partition_up = log_partition(natural_parameter + step)
> log_partition_down = log_partition(natural_parameter - step)
> derivative = (log_partition_up - log_partition_down) / (2 * step)
>
> pd.DataFrame({"mean_statistic": [mean_statistic], "derivative": [derivative]})
> #>    mean_statistic  derivative
> #> 0        5.538462    5.538462
> ```
>
> The two sides agree at 5.538, and differ by 1.8e-10. That difference is numerical error.

> **NOTE:**
>
> **Exercise 3 (The second derivative of the log-partition function is the variance of the statistic)** In the setting of [Exercise 2](#exr-log-partition-derivative), differentiate both sides of
>
> $$\frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}
> = \int {T\mathopen{}\left(x\right)\mathclose{}} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, dx$$
>
> with respect to $\eta$. Assume that the [derivative](https://morrison-lab.github.io/mds/calculus-derivatives.html#def-derivative) of the [integral](https://morrison-lab.github.io/mds/measures-integrals.html#def-integral) is the integral of the derivative. Use [Theorem 1](#thm-log-partition-mean) and the [second moment](https://morrison-lab.github.io/pds/variance-covariance.html#lem-second-moment-variance) to show that
>
> $$\frac{d ^2 {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta^2} = {\operatorname{Var}\mathopen{}\left({T\mathopen{}\left(X\right)\mathclose{}}\right)\mathclose{}}.$$

> **NOTE:**
>
> *Solution 3*. The left side of [Exercise 3](#exr-log-partition-second-derivative) differentiates to the [second derivative](https://morrison-lab.github.io/mds/calculus-derivatives.html#def-second-derivative) of ${A\mathopen{}\left(\eta\right)\mathclose{}}$. On the right side, the [derivative](https://morrison-lab.github.io/mds/calculus-derivatives.html#def-derivative) moves inside the [integral](https://morrison-lab.github.io/mds/measures-integrals.html#def-integral), where only the [density](https://morrison-lab.github.io/pds/random-variables.html#def-pdf) depends on $\eta$:
>
> $$\begin{aligned}
> \frac{d }{d \eta} \int {T\mathopen{}\left(x\right)\mathclose{}} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, dx
> &= \int {T\mathopen{}\left(x\right)\mathclose{}} \, \frac{d \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{}}{d \eta} \, dx
> && \text{(the derivative of the integral is the integral of the derivative)}
> \end{aligned}$$
>
> The derivative of the density follows from its form in [Equation 1](#eq-exponential-family):
>
> $$\begin{aligned}
> \frac{d \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{}}{d \eta}
> &= \frac{d }{d \eta} {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> && \text{(definition of an exponential family)}\\
> &= {{h\mathopen{}\left(x\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \, \frac{d \mathopen{}\left(\eta\, {T\mathopen{}\left(x\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right)\mathclose{}}{d \eta}
> && \text{(chain rule)}\\
> &= \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, \frac{d \mathopen{}\left(\eta\, {T\mathopen{}\left(x\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right)\mathclose{}}{d \eta}
> && \text{(definition of an exponential family)}\\
> &= \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, \mathopen{}\left({T\mathopen{}\left(x\right)\mathclose{}} - \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}\right)\mathclose{}
> && \text{(the derivative of a difference is the difference of the derivatives)}
> \end{aligned}$$
>
> Substituting this derivative into the integral gives
>
> $$\begin{aligned}
> \int {T\mathopen{}\left(x\right)\mathclose{}} \, \frac{d \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{}}{d \eta} \, dx
> &= \int {T\mathopen{}\left(x\right)\mathclose{}} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, \mathopen{}\left({T\mathopen{}\left(x\right)\mathclose{}} - \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}\right)\mathclose{} \, dx
> && \text{(substitute the derivative of the density)}\\
> &= \int \mathopen{}\left({\mathopen{}\left({T\mathopen{}\left(x\right)\mathclose{}}\right)\mathclose{}}^{2} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} - \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta} \, {T\mathopen{}\left(x\right)\mathclose{}} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{}\right)\mathclose{} \, dx
> && \text{(distribute the product over the difference)}\\
> &= \int {\mathopen{}\left({T\mathopen{}\left(x\right)\mathclose{}}\right)\mathclose{}}^{2} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, dx- \int \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta} \, {T\mathopen{}\left(x\right)\mathclose{}} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, dx
> && \text{(the integral of a difference is the difference of the integrals)}\\
> &= \int {\mathopen{}\left({T\mathopen{}\left(x\right)\mathclose{}}\right)\mathclose{}}^{2} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, dx- \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta} \int {T\mathopen{}\left(x\right)\mathclose{}} \, \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{} \, dx
> && \text{(a factor free of the integration variable moves out of the integral)}\\
> &= {\mathbb{E}\mathopen{}\left[{\mathopen{}\left({T\mathopen{}\left(X\right)\mathclose{}}\right)\mathclose{}}^{2}\right]\mathclose{}} - \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta} \, {\mathbb{E}\mathopen{}\left[{T\mathopen{}\left(X\right)\mathclose{}}\right]\mathclose{}}
> && \text{(definition of the expectation)}\\
> &= {\mathbb{E}\mathopen{}\left[{\mathopen{}\left({T\mathopen{}\left(X\right)\mathclose{}}\right)\mathclose{}}^{2}\right]\mathclose{}} - {\mathopen{}\left({\mathbb{E}\mathopen{}\left[{T\mathopen{}\left(X\right)\mathclose{}}\right]\mathclose{}}\right)\mathclose{}}^{2}
> && \text{(the derivative of the log-partition function is the mean of the statistic)}\\
> &= {\operatorname{Var}\mathopen{}\left({T\mathopen{}\left(X\right)\mathclose{}}\right)\mathclose{}}
> && \text{(the second moment is the variance plus the squared mean)}
> \end{aligned}$$
>
> The last line rearranges the second moment of ${T\mathopen{}\left(X\right)\mathclose{}}$, which is its [variance](https://morrison-lab.github.io/pds/variance-covariance.html#def-variance) plus the [square](https://morrison-lab.github.io/mds/algebra-basics.html#def-square) of its [mean](https://morrison-lab.github.io/pds/expectation.html#def-expectation). Equating the two sides of [Exercise 3](#exr-log-partition-second-derivative) gives the result.

> **NOTE:**
>
> **Theorem 2 (The variance of the statistic is the second derivative of the log-partition function)** Let $X$ have a [distribution](https://morrison-lab.github.io/pds/random-variables.html#def-random-variable) in an [exponential family](#def-exponential-family) with [natural parameter](#def-natural-parameter) $\eta$, [statistic](sufficiency.llms.md#def-statistic) $T$, and log-partition function $A$, and let $\eta$ be in the interior of the allowed values. Then
>
> $${\operatorname{Var}\mathopen{}\left({T\mathopen{}\left(X\right)\mathclose{}}\right)\mathclose{}} = \frac{d ^2 {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta^2}.$$

> **NOTE:**
>
> *Proof*. The solution to [Exercise 3](#exr-log-partition-second-derivative), worked in [Solution 3](#sol-log-partition-second-derivative), proves the statement. It uses [Theorem 1](#thm-log-partition-mean).

> **NOTE:**
>
> **Example 7 (The variance of the Poisson distribution from its log-partition function)**  
>
> In [Example 6](#exm-poisson-log-partition-mean), the log-partition function is ${A\mathopen{}\left(\eta\right)\mathclose{}} = {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}$, and the [statistic](sufficiency.llms.md#def-statistic) is ${T\mathopen{}\left(x\right)\mathclose{}} = x$. By [Theorem 2](#thm-log-partition-variance),
>
> $${\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}}
> = {\operatorname{Var}\mathopen{}\left({T\mathopen{}\left(X\right)\mathclose{}}\right)\mathclose{}}
> = \frac{d ^2 {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta^2}
> = {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}.$$
>
> Since ${\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} = {\lambda}$, we have ${\operatorname{Var}\mathopen{}\left(X\right)\mathclose{}} = {\lambda}$, the [variance](https://morrison-lab.github.io/pds/variance-covariance.html#def-variance) of the [Poisson distribution](https://morrison-lab.github.io/pds/distributions.html#def-poisson).
>
> To check [Theorem 2](#thm-log-partition-variance) on data, we compute its two sides separately for the cyclone counts of [Example 1](#exm-poisson-exponential-family), with ${\lambda}$ set to the [sample mean](exploratory-descriptive.llms.md#def-sample-mean). The left side adds ${\mathopen{}\left(x- {\lambda}\right)\mathclose{}}^{2} \, \mathbb{f}\mathopen{}\left(x; {\lambda}\right)\mathclose{}$ over the counts from 0 to 100, and the right side is a second central difference of ${A\mathopen{}\left(\eta\right)\mathclose{}}$ at $\eta= {\operatorname{log}\mathopen{}\left\{{\lambda}\right\}\mathclose{}}$.
>
> ## R
>
> ``` downlit
> cyclones <- c(6, 5, 4, 6, 6, 3, 12, 7, 4, 2, 6, 7, 4)
> rate <- mean(cyclones)
> natural_parameter <- log(rate)
>
> counts <- 0:100
> squared_deviations <- (counts - rate)^2
> weighted_deviations <- squared_deviations * dpois(counts, rate)
> variance_statistic <- sum(weighted_deviations)
>
> log_partition <- exp
> step <- 1e-4
> log_partition_up <- log_partition(natural_parameter + step)
> log_partition_mid <- log_partition(natural_parameter)
> log_partition_down <- log_partition(natural_parameter - step)
> second_diff <- log_partition_up - 2 * log_partition_mid + log_partition_down
> second_derivative <- second_diff / step^2
>
> tibble::tibble(variance_statistic, second_derivative)
> ```
>
> ## Python
>
> ``` python
> import numpy as np
> import pandas as pd
> from scipy.stats import poisson
>
> cyclones = np.array([6, 5, 4, 6, 6, 3, 12, 7, 4, 2, 6, 7, 4])
> rate = cyclones.mean()
> natural_parameter = np.log(rate)
>
> counts = np.arange(0, 101)
> squared_deviations = (counts - rate) ** 2
> variance_statistic = np.sum(squared_deviations * poisson.pmf(counts, rate))
>
> log_partition = np.exp
> step = 1e-4
> log_partition_up = log_partition(natural_parameter + step)
> log_partition_mid = log_partition(natural_parameter)
> log_partition_down = log_partition(natural_parameter - step)
> second_diff = log_partition_up - 2 * log_partition_mid + log_partition_down
> second_derivative = second_diff / step**2
>
> pd.DataFrame(
>     {
>         "variance_statistic": [variance_statistic],
>         "second_derivative": [second_derivative],
>     }
> )
> #>    variance_statistic  second_derivative
> #> 0            5.538462           5.538462
> ```
>
> The two sides agree at 5.538, and differ by 6.2e-08. That difference is numerical error, from stopping the counts at 100 and from the finite step of the second difference.

# 3 Sufficiency in an exponential family

> **NOTE:**
>
> **Exercise 4 (The joint mass function of an exponential family sample factors through the sum of the statistic)** Let $X_1, \ldots, X_n \ \sim_{\operatorname{iid}}\ \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{}$ be a [sample](exploratory-descriptive.llms.md#def-sample) of a [discrete random variable](https://morrison-lab.github.io/pds/random-variables.html#def-discrete-rv) whose [probability mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) has the form of [Equation 1](#eq-exponential-family). Show that the joint [mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) of the sample is
>
> $$\mathbb{f}\mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}; \eta\right)\mathclose{}
> = {\operatorname{exp}\mathopen{}\left\{\eta\sum_{i=1}^n{T\mathopen{}\left(x_i\right)\mathclose{}} - n \, {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> \prod_{i=1}^n{{h\mathopen{}\left(x_i\right)\mathclose{}}}.$$

> **NOTE:**
>
> *Solution 4*. The [observations](exploratory-descriptive.llms.md#def-observation) are [independent](https://morrison-lab.github.io/pds/independence.html#def-independence), so the joint [mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) multiplies the individual mass functions. Each factor has the form of [Equation 1](#eq-exponential-family):
>
> $$\begin{aligned}
> \mathbb{f}\mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}; \eta\right)\mathclose{}
> &= \prod_{i=1}^n\mathbb{f}\mathopen{}\left(x_i; \eta\right)\mathclose{}
> && \text{(independent observations)}\\
> &= \prod_{i=1}^n{{h\mathopen{}\left(x_i\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x_i\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> && \text{(definition of an exponential family)}\\
> &= \prod_{i=1}^n{{h\mathopen{}\left(x_i\right)\mathclose{}}} \prod_{i=1}^n{\operatorname{exp}\mathopen{}\left\{\eta\, {T\mathopen{}\left(x_i\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> && \text{(a product of two-factor terms is the product of the first factors times the product of the second factors)}\\
> &= \prod_{i=1}^n{{h\mathopen{}\left(x_i\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\sum_{i=1}^n\mathopen{}\left(\eta\, {T\mathopen{}\left(x_i\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right)\mathclose{}\right\}\mathclose{}}
> && \text{(the product of exponentials is the exponential of the sum)}\\
> &= \prod_{i=1}^n{{h\mathopen{}\left(x_i\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\sum_{i=1}^n\eta\, {T\mathopen{}\left(x_i\right)\mathclose{}} - \sum_{i=1}^n{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> && \text{(the sum of a difference is the difference of the sums)}\\
> &= \prod_{i=1}^n{{h\mathopen{}\left(x_i\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\sum_{i=1}^n{T\mathopen{}\left(x_i\right)\mathclose{}} - \sum_{i=1}^n{A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> && \text{(a factor free of the index moves out of the sum)}\\
> &= \prod_{i=1}^n{{h\mathopen{}\left(x_i\right)\mathclose{}}} \, {\operatorname{exp}\mathopen{}\left\{\eta\sum_{i=1}^n{T\mathopen{}\left(x_i\right)\mathclose{}} - n \, {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}}
> && \text{(a sum of } n \text{ equal terms is } n \text{ times the term)}\\
> &= {\operatorname{exp}\mathopen{}\left\{\eta\sum_{i=1}^n{T\mathopen{}\left(x_i\right)\mathclose{}} - n \, {A\mathopen{}\left(\eta\right)\mathclose{}}\right\}\mathclose{}} \prod_{i=1}^n{{h\mathopen{}\left(x_i\right)\mathclose{}}}
> && \text{(multiplication is commutative)}
> \end{aligned}$$

> **NOTE:**
>
> **Theorem 3 (The sum of the statistic is sufficient in an exponential family)** Let $X_1, \ldots, X_n \ \sim_{\operatorname{iid}}\ \mathbb{f}\mathopen{}\left(x; \eta\right)\mathclose{}$ be a [sample](exploratory-descriptive.llms.md#def-sample) of a [discrete random variable](https://morrison-lab.github.io/pds/random-variables.html#def-discrete-rv) whose [distribution](https://morrison-lab.github.io/pds/random-variables.html#def-random-variable) is in an [exponential family](#def-exponential-family) with [natural parameter](#def-natural-parameter) $\eta$ and [statistic](sufficiency.llms.md#def-statistic) $T$. Then the [sum](https://morrison-lab.github.io/mds/algebra-sums.html#def-summation) $\sum_{i=1}^n{T\mathopen{}\left(X_i\right)\mathclose{}}$ is [sufficient](sufficiency.llms.md#def-sufficient) for $\eta$.

> **NOTE:**
>
> *Proof*. The solution to [Exercise 4](#exr-sample-factorization), worked in [Solution 4](#sol-sample-factorization), writes the joint [mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) as a function of $\eta$ and the [sum](https://morrison-lab.github.io/mds/algebra-sums.html#def-summation), times a function of the data alone. That form is the one in the [factorization theorem](sufficiency.llms.md#thm-factorization), which proves the statement.

> **NOTE:**
>
> **Example 8 (Two sets of Poisson counts with the same total have a mass function quotient free of the parameter)**  
>
> By [Theorem 3](#thm-exponential-family-sufficient), the [sum](https://morrison-lab.github.io/mds/algebra-sums.html#def-summation) of the counts is [sufficient](sufficiency.llms.md#def-sufficient) for the [natural parameter](#def-natural-parameter) of the [Poisson distribution](https://morrison-lab.github.io/pds/distributions.html#def-poisson). So two sets of counts with the same sum differ in their joint [mass functions](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) only by a factor that does not depend on the parameter. To check the result on data, we take the first three cyclone counts of [Example 1](#exm-poisson-exponential-family), 6, 5 and 4, and the counts 5, 5 and 5. Each set adds up to 15. We divide the joint mass function of the first set by that of the second at four values of ${\lambda}$.
>
> ## R
>
> ``` downlit
> sample_a <- c(6, 5, 4)
> sample_b <- c(5, 5, 5)
>
> rates <- c(2, 4, 6, 8)
> n_obs <- length(sample_a)
> n_rates <- length(rates)
>
> counts_a <- rep(sample_a, times = n_rates)
> counts_b <- rep(sample_b, times = n_rates)
> rates_rep <- rep(rates, each = n_obs)
>
> log_mass_a <- dpois(counts_a, rates_rep, log = TRUE)
> log_mass_b <- dpois(counts_b, rates_rep, log = TRUE)
> log_matrix_a <- matrix(log_mass_a, nrow = n_obs)
> log_matrix_b <- matrix(log_mass_b, nrow = n_obs)
>
> log_joint_a <- colSums(log_matrix_a)
> log_joint_b <- colSums(log_matrix_b)
> masses_a <- exp(log_joint_a)
> masses_b <- exp(log_joint_b)
> ratio <- masses_a / masses_b
>
> tibble::tibble(rates, masses_a, masses_b, ratio)
> ```
>
> ## Python
>
> ``` python
> import numpy as np
> import pandas as pd
> from scipy.stats import poisson
>
> sample_a = np.array([6, 5, 4])
> sample_b = np.array([5, 5, 5])
>
> rates = np.array([2, 4, 6, 8])
> masses_a = [np.prod(poisson.pmf(sample_a, r)) for r in rates]
> masses_b = [np.prod(poisson.pmf(sample_b, r)) for r in rates]
> ratio = np.array(masses_a) / np.array(masses_b)
>
> pd.DataFrame(
>     {
>         "rates": rates,
>         "masses_a": masses_a,
>         "masses_b": masses_b,
>         "ratio": ratio,
>     }
> )
> #>    rates  masses_a  masses_b     ratio
> #> 0      2  0.000039  0.000047  0.833333
> #> 1      4  0.003182  0.003818  0.833333
> #> 2      6  0.003453  0.004144  0.833333
> #> 3      8  0.000641  0.000769  0.833333
> ```
>
> At every value of ${\lambda}$, the first [mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) is 0.8333 times the second. That factor is $\mathopen{}\left(5!\right)\mathclose{}^3 / \mathopen{}\left(6! \, 5! \, 4!\right)\mathclose{}$, which is free of ${\lambda}$.

# 4 The canonical link function

> **NOTE:**
>
> **Definition 3 (Canonical link function)** Let $X$ have a [distribution](https://morrison-lab.github.io/pds/random-variables.html#def-random-variable) in an [exponential family](#def-exponential-family) with [natural parameter](#def-natural-parameter) $\eta$, [statistic](sufficiency.llms.md#def-statistic) ${T\mathopen{}\left(x\right)\mathclose{}} = x$, and log-partition function $A$. By [Theorem 1](#thm-log-partition-mean), the [mean](https://morrison-lab.github.io/pds/expectation.html#def-expectation) of $X$ is $\mu= \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}$. The **canonical link function** is the function that takes the mean to the natural parameter, the [inverse function](https://morrison-lab.github.io/mcs/functions.html#def-inverse-function) of that [derivative](https://morrison-lab.github.io/mds/calculus-derivatives.html#def-derivative):
>
> $$\eta= {\mathopen{}\left(\frac{d A}{d \eta}\right)\mathclose{}}^{-1}\mathopen{}\left(\mu\right)\mathclose{}.$$

> **NOTE:**
>
> **Example 9 (The canonical links of the Poisson and Bernoulli distributions)**  
>
> In each case, [Theorem 1](#thm-log-partition-mean) says the [mean](https://morrison-lab.github.io/pds/expectation.html#def-expectation) is the [derivative](https://morrison-lab.github.io/mds/calculus-derivatives.html#def-derivative) of the log-partition function, so we differentiate it and then solve for $\eta$:
>
> - **[Poisson distribution](https://morrison-lab.github.io/pds/distributions.html#def-poisson).** In [Example 1](#exm-poisson-exponential-family), ${A\mathopen{}\left(\eta\right)\mathclose{}} = {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}$, so the mean is:
>
>   $$\begin{aligned}
>   \mu
>   &= \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}
>   && \text{(the mean is the derivative of the log-partition function)}\\
>   &= {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}
>   && \text{(the derivative of ${\operatorname{exp}\mathopen{}\left\{u\right\}\mathclose{}}$ is ${\operatorname{exp}\mathopen{}\left\{u\right\}\mathclose{}}$)}
>   \end{aligned}$$
>
>   The [logarithm](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-logarithm) inverts the [exponential function](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-exponential-function), so $\eta= {\operatorname{log}\mathopen{}\left\{\mu\right\}\mathclose{}}$. The [canonical link function](#def-canonical-link) is the logarithm.
>
> - **[Bernoulli distribution](https://morrison-lab.github.io/pds/random-variables.html#def-bernoulli).** In [Example 3](#exm-bernoulli-exponential-family), ${A\mathopen{}\left(\eta\right)\mathclose{}} = {\operatorname{log}\mathopen{}\left\{1 + {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}\right\}\mathclose{}}$, so the mean is:
>
>   $$\begin{aligned}
>   \mu
>   &= \frac{d {A\mathopen{}\left(\eta\right)\mathclose{}}}{d \eta}
>   && \text{(the mean is the derivative of the log-partition function)}\\
>   &= \frac{{\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}}{1 + {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}}
>   && \text{(chain rule: the derivative of } {\operatorname{log}\mathopen{}\left\{u\right\}\mathclose{}} \text{ is } 1/u \text{ times the derivative of } u \text{)}
>   \end{aligned}$$
>
>   We solve this equation for $\eta$, one operation per line:
>
>   $$\begin{aligned}
>   \mu\mathopen{}\left(1 + {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}\right)\mathclose{} &= {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}
>   && \text{(multiply both sides by } 1 + {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} \text{)}\\
>   \mu+ \mu\, {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} &= {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}
>   && \text{(distribute } \mu\text{ over the sum)}\\
>   \mu&= {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} - \mu\, {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}}
>   && \text{(subtract } \mu\, {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} \text{ from both sides)}\\
>   \mu&= {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} \mathopen{}\left(1 - \mu\right)\mathclose{}
>   && \text{(factor out } {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} \text{)}\\
>   {\operatorname{exp}\mathopen{}\left\{\eta\right\}\mathclose{}} &= \frac{\mu}{1 - \mu}
>   && \text{(divide both sides by } 1 - \mu\text{)}\\
>   \eta&= {\operatorname{log}\mathopen{}\left\{\frac{\mu}{1 - \mu}\right\}\mathclose{}}
>   && \text{(take the logarithm of both sides)}
>   \end{aligned}$$
>
>   The canonical link function is the [logit](https://morrison-lab.github.io/pds/probability-basics.html#def-log-odds), the function that takes a [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) to its [log odds](https://morrison-lab.github.io/pds/probability-basics.html#def-log-odds).

# 5 Further reading

- The [logistic regression](https://morrison-lab.github.io/rme/chapters/logistic-regression.html) chapter of the regression notes uses the [log odds](https://morrison-lab.github.io/pds/probability-basics.html#def-log-odds) as its link. Linear models with a link function are called generalized linear models [\[2, Ch. 3\]](#ref-dobson4e).

- The [Fall 2024 course site for UC Berkeley’s Stat 210A, *Theoretical Statistics*](https://stat210a.berkeley.edu/fall-2024/) (Will Fithian) has a course reader on exponential families, sufficiency, completeness and [unbiased](estimation.llms.md#def-unbiased) estimation.

# Definitions on this page

- [Definition 1 (Exponential family)](#def-exponential-family)
- [Definition 2 (Natural parameter)](#def-natural-parameter)
- [Definition 3 (Canonical link function)](#def-canonical-link)

# References

\[1\]

G. Casella and R. Berger, *Statistical inference*, 2nd ed. Cengage Learning, 2002. Available: <https://www.cengage.com/c/statistical-inference-2e-casella-berger/9780534243128/>

\[2\]

A. J. Dobson and A. G. Barnett, *An introduction to generalized linear models*, 4th ed. CRC press, 2018. doi: [10.1201/9781315182780](https://doi.org/10.1201/9781315182780).

\[3\]

D. W. Hosmer and S. Lemeshow, *Applied logistic regression*. New York: Wiley, 1989.

\[4\]

W. N. Venables and B. D. Ripley, *Modern applied statistics with S*, 4th ed. New York: Springer, 2002. doi: [10.1007/978-0-387-21706-2](https://doi.org/10.1007/978-0-387-21706-2).

Back to top

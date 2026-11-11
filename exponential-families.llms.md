# Exponential Families

Code

Published

Last modified: 2026-11-10 22:36:29 (PST)

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

# 2 Further reading

- The [Fall 2024 course site for UC Berkeley’s Stat 210A, *Theoretical Statistics*](https://stat210a.berkeley.edu/fall-2024/) (Will Fithian) has a course reader on exponential families, sufficiency, completeness and [unbiased](estimation.llms.md#def-unbiased) estimation.

# Definitions on this page

- [Definition 1 (Exponential family)](#def-exponential-family)
- [Definition 2 (Natural parameter)](#def-natural-parameter)

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

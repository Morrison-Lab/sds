# Exponential Families

Code

Published

Last modified: 2026-10-26 17:35:11 (PDT)

Many of the distributions in this course, such as the [Bernoulli](https://morrison-lab.github.io/pds/random-variables.html#def-bernoulli), [Poisson](https://morrison-lab.github.io/pds/distributions.html#def-poisson) and [Normal](https://morrison-lab.github.io/pds/random-variables.html#def-normal) distributions, share one algebraic form for their [probability mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) or [density](https://morrison-lab.github.io/pds/random-variables.html#def-pdf). Distributions with that form are called an [exponential family](#def-exponential-family), and they share properties that make estimation easier. This page defines the form and its [natural parameter](#def-natural-parameter), and checks the form for the [Poisson distribution](https://morrison-lab.github.io/pds/distributions.html#def-poisson) on data.

## 1 The exponential family form

> **NOTE:**
>
> **Definition 1 (Exponential family)** Let \\X\\ be a random variable whose distribution depends on one parameter \\\eta\\, and let \\\operatorname{f}\mathopen{}\left(x; \eta\right)\mathclose{}\\ be its [probability mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) or [density](https://morrison-lab.github.io/pds/random-variables.html#def-pdf). The distributions of \\X\\ form an **exponential family** if there are a nonnegative [function](https://morrison-lab.github.io/mds/functions.html#def-function) \\h\\ and a function \\T\\ of \\x\\ alone, and a function \\A\\ of \\\eta\\ alone, such that
>
> \\ \operatorname{f}\mathopen{}\left(x; \eta\right)\mathclose{} = {{h\mathopen{}\left(x\right)\mathclose{}}} \\ {\operatorname{exp}\mathopen{}\left\\\eta\\ {T\mathopen{}\left(x\right)\mathclose{}} - {A\mathopen{}\left(\eta\right)\mathclose{}}\right\\\mathclose{}} \tag{1}\\
>
> for every value \\x\\ and every allowed \\\eta\\.

> **NOTE:**
>
> *Remark 1* (Source: Exponential family). Casella and Berger [\[1, Sec. 3.4\]](#ref-CaseBerg01), Eq. 3.4.1 write the family as a sum of \\k\\ terms inside the exponential, each a [function](https://morrison-lab.github.io/mds/functions.html#def-function) of the parameter times a function of \\x\\; Dobson and Barnett [\[2, Sec. 3.2\]](#ref-dobson4e), Eq. 3.3 write it in the form \\{\operatorname{exp}\mathopen{}\left\\a(y) b(\theta) + c(\theta) + d(y)\right\\\mathclose{}}\\. [Equation 1](#eq-exponential-family) is the case of one term. It is Dobson and Barnett’s canonical form when \\{T\mathopen{}\left(x\right)\mathclose{}} = x\\, and the [natural parameter](#def-natural-parameter) \\\eta\\ plays the role of their \\b(\theta)\\. See the [notation choices](https://morrison-lab.github.io/macros/notation-choices.html#sec-exponential-family-notation) for how the symbols line up.

> **NOTE:**
>
> **Example 1 (The Poisson distribution is an exponential family)** Let \\X\sim \operatorname{Pois}({\lambda})\\, the [Poisson distribution](https://morrison-lab.github.io/pds/distributions.html#def-poisson) with rate \\{\lambda}\> 0\\. Its [probability mass function](https://morrison-lab.github.io/pds/random-variables.html#def-pmf) has one factor free of \\{\lambda}\\, and the factors \\{\lambda}^{x}\\ and \\{\operatorname{exp}\mathopen{}\left\\-{\lambda}\right\\\mathclose{}}\\. We rewrite it in the form of [Equation 1](#eq-exponential-family) by writing \\{\lambda}^{x}\\ as an exponential of a logarithm:
>
> \\ \begin{aligned} \operatorname{f}\mathopen{}\left(x; {\lambda}\right)\mathclose{} &= \frac{{\lambda}^{x} \\ {\operatorname{exp}\mathopen{}\left\\-{\lambda}\right\\\mathclose{}}}{x!} && \text{(Poisson mass function)}\\ &= \frac{1}{x!} \\ {\operatorname{exp}\mathopen{}\left\\{\operatorname{log}\mathopen{}\left\\{\lambda}^{x}\right\\\mathclose{}}\right\\\mathclose{}} \\ {\operatorname{exp}\mathopen{}\left\\-{\lambda}\right\\\mathclose{}} && \text{(a positive number is the exponential of its logarithm)}\\ &= \frac{1}{x!} \\ {\operatorname{exp}\mathopen{}\left\\x\\ {\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}}\right\\\mathclose{}} \\ {\operatorname{exp}\mathopen{}\left\\-{\lambda}\right\\\mathclose{}} && \text{(the logarithm of a power is the exponent times the logarithm)}\\ &= \frac{1}{x!} \\ {\operatorname{exp}\mathopen{}\left\\x\\ {\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}} - {\lambda}\right\\\mathclose{}} && \text{(the product of exponentials is the exponential of the sum)} \end{aligned} \\
>
> So the Poisson distributions are an [exponential family](#def-exponential-family) with \\{{h\mathopen{}\left(x\right)\mathclose{}}} = 1 / x!\\, \\{T\mathopen{}\left(x\right)\mathclose{}} = x\\, [natural parameter](#def-natural-parameter) \\\eta= {\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}}\\, and \\{A\mathopen{}\left(\eta\right)\mathclose{}} = {\lambda}= {\operatorname{exp}\mathopen{}\left\\\eta\right\\\mathclose{}}\\.
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
> **Definition 2 (Natural parameter)** In the form of [Equation 1](#eq-exponential-family) of an [exponential family](#def-exponential-family), the parameter \\\eta\\ that multiplies the [statistic](sufficiency.llms.md#def-statistic) \\{T\mathopen{}\left(x\right)\mathclose{}}\\ inside the exponential is the **natural parameter**, also called the **canonical parameter** [\[2, Sec. 3.2\]](#ref-dobson4e).

> **NOTE:**
>
> **Example 2 (The natural parameter of the Poisson distribution is the log rate)** In [Example 1](#exm-poisson-exponential-family), the [Poisson](https://morrison-lab.github.io/pds/distributions.html#def-poisson) rate \\{\lambda}\\ and the [natural parameter](#def-natural-parameter) \\\eta\\ are related by
>
> \\ \eta= {\operatorname{log}\mathopen{}\left\\{\lambda}\right\\\mathclose{}} \qquad \text{and} \qquad {\lambda}= {\operatorname{exp}\mathopen{}\left\\\eta\right\\\mathclose{}} \\
>
> For the cyclone data, the rate set to the [sample mean](exploratory-descriptive.llms.md#def-sample-mean) is 5.538 cyclones per season, so the natural parameter is \\\eta= 1.712\\. The natural parameter can be any real number, while the rate must be greater than zero.

## 2 Further reading

- The [Fall 2024 course site for UC Berkeley’s Stat 210A, *Theoretical Statistics*](https://stat210a.berkeley.edu/fall-2024/) (Will Fithian) has a course reader on exponential families, sufficiency, completeness and [unbiased](estimation.llms.md#def-unbiased) estimation.

## References

\[1\]

G. Casella and R. Berger, *Statistical inference*, 2nd ed. Cengage Learning, 2002. Available: <https://www.cengage.com/c/statistical-inference-2e-casella-berger/9780534243128/>

\[2\]

A. J. Dobson and A. G. Barnett, *An introduction to generalized linear models*, 4th ed. CRC press, 2018. doi: [10.1201/9781315182780](https://doi.org/10.1201/9781315182780).

Back to top

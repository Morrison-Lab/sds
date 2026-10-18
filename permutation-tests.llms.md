# Permutation Tests

Code

- [Show All Code](javascript:void(0))

- [Hide All Code](javascript:void(0))

- 

  ------------------------------------------------------------------------

- [View Source](javascript:void(0))

Published

Last modified: 2026-10-18 01:13:21 (PDT)

The p-value of a [t-test](basic-statistical-methods.llms.md#def-two-sample-t-test) comes from a distributional approximation: the statistic is only approximately t-distributed unless the data are Gaussian. A **permutation test** takes its null distribution from the data instead. If the null hypothesis says that two groups have the same distribution, then under that hypothesis the group labels carry no information, so reassigning the labels at random produces data sets that are as plausible as the observed one. The spread of the test statistic across those relabelings is its null distribution.

This page defines exchangeability, the permutation distribution and the permutation p-value, shows why that p-value is valid, and then approximates it by random relabelings, which is how it is computed in practice. It continues the [bootstrap](bootstrap.llms.md) page’s idea of computing a [sampling distribution](estimation.llms.md#def-sampling-distribution) by resampling, and supplies the p-values that the [multiple testing](multiple-testing.llms.md) page corrects. These notes follow chapter 13 of James et al. ([2021](#ref-james2021islr2e)) and the treatment in Good ([2005](#ref-good2005permutation)).

## 1 The Khan gene expression data

The examples on this page use gene expression data from Khan et al. ([2001](#ref-khan2001classification)), who measured 2308 genes in tissue samples from children with small round blue cell tumors. The samples fall into four tumor classes, numbered 1 to 4 in the data. This site keeps a copy of the 63 training samples at [`data/khan.csv`](data/khan.csv), taken from the `Khan` data of the R package [`ISLR2`](https://cran.r-project.org/package=ISLR2) ([James et al. 2021](#ref-james2021islr2e)): the column `tumor_class` holds the class, and the columns `gene_1` to `gene_2308` hold the expression values. The examples compare classes 2 and 4.

``` downlit
khan <- read.csv("data/khan.csv")
khan_pair <- khan[khan$tumor_class %in% c(2, 4), ]
table(tumor_class = khan_pair$tumor_class)
#> tumor_class
#>  2  4 
#> 23 20
```

## 2 Exchangeability under the null hypothesis

> **NOTE:**
>
> **Definition 1 (Exchangeable random variables)** For a permutation \\\pi\\ of \\\mathopen{}\left\\1, \ldots, n\right\\\mathclose{}\\ and a vector \\y = (y_1, \ldots, y_n)\\, write \\y\_\pi \stackrel{\text{def}}{=}(y\_{\pi(1)}, \ldots, y\_{\pi(n)})\\ for the vector with its entries reordered by \\\pi\\. Random variables \\Y_1, \ldots, Y_n\\ are **exchangeable** if reordering them does not change their joint distribution: for every permutation \\\pi\\ and every set \\A\\ of vectors,
>
> \\\Pr(Y\_\pi \in A) = \Pr(Y \in A).\\
>
> Source: Wikipedia contributors ([2026a](#ref-wikipedia_exchangeable_random_variables)).

> **NOTE:**
>
> **Example 1 (Two groups with the same distribution)** Let a gene’s expression be measured in \\n_1\\ samples from tumor class 2 and \\n_2\\ samples from tumor class 4, and let \\H_0\\ say that the expression has the same distribution in both classes. Under \\H_0\\ the \\n = n_1 + n_2\\ values \\Y_1, \ldots, Y_n\\ are independent and identically distributed, and independent, identically distributed variables are exchangeable, because their joint distribution is the product of the same marginal distribution \\n\\ times, which does not depend on the order of the factors. Given the set of observed values, every assignment of them to the two groups is then equally likely. With 23 samples in class 2 and 20 in class 4 there are
>
> ``` downlit
> choose(43, 20)
> #> [1] 9.60567e+11
> ```
>
> ways to choose which 20 of the 43 values form the class 4 group.

## 3 The permutation distribution and p-value

### 3.1 The permutation distribution

> **NOTE:**
>
> **Definition 2 (Permutation distribution)** Let \\y = (y_1, \ldots, y_n)\\ hold the observed values, with the first \\n_1\\ entries belonging to group 1 and the rest to group 2, and let \\T(y)\\ be a [test statistic](inference.llms.md#def-test-statistic) computed from the data and the group assignment. Let \\S_n\\ be the set of all \\n!\\ permutations of \\\mathopen{}\left\\1, \ldots, n\right\\\mathclose{}\\. The **permutation distribution** of \\T\\ is the distribution of \\T(y\_\pi)\\ when \\\pi\\ is drawn uniformly from \\S_n\\ and \\y\\ is held fixed. It puts probability \\1 / n!\\ on each relabeling \\y\_\pi\\, so for every \\t\\
>
> \\\Pr\_\pi\mathopen{}\left(T(y\_\pi) \ge t\right)\mathclose{} \stackrel{\text{def}}{=}\frac{1}{n!} \sum\_{\pi \in S_n} \mathbb{1}\_{T(y\_\pi) \ge t}.\\

> **NOTE:**
>
> **Example 2 (The permutation distribution of six expression values)** Take gene 3 in the Khan data, and keep the first three samples from tumor class 2 and the first three from class 4. The test statistic is the absolute value of [Welch’s t statistic](basic-statistical-methods.llms.md#def-two-sample-t-test). Only \\\binom{6}{3} =\\ 20 relabelings differ in which values form group 1 (the other \\3! \times 3!\\ permutations within each group give the same statistic), so all of them can be listed:
>
> ``` downlit
> toy <- rbind(
>   head(khan_pair[khan_pair$tumor_class == 2, ], 3),
>   head(khan_pair[khan_pair$tumor_class == 4, ], 3)
> )
> y_toy <- toy$gene_3
> abs_welch_t <- function(y, in_group1) {
>   x1 <- y[in_group1]
>   x2 <- y[!in_group1]
>   abs(mean(x1) - mean(x2)) / sqrt(var(x1) / length(x1) + var(x2) / length(x2))
> }
> group1_choices <- combn(6, 3)
> t_toy <- apply(
>   group1_choices, 2,
>   function(idx) abs_welch_t(y_toy, seq_along(y_toy) %in% idx)
> )
> t_observed_toy <- abs_welch_t(y_toy, seq_along(y_toy) %in% 1:3)
> data.frame(
>   group_1 = apply(group1_choices, 2, paste, collapse = " "),
>   statistic = t_toy
> ) |>
>   dplyr::arrange(dplyr::desc(statistic)) |>
>   knitr::kable(digits = 3)
> ```
>
> | group_1 | statistic |
> |:--------|----------:|
> | 1 4 5   |     1.793 |
> | 2 3 6   |     1.793 |
> | 1 3 5   |     1.624 |
> | 2 4 6   |     1.624 |
> | 1 2 6   |     1.312 |
> | 3 4 5   |     1.312 |
> | 1 5 6   |     1.270 |
> | 2 3 4   |     1.270 |
> | 1 2 3   |     1.019 |
> | 4 5 6   |     1.019 |
> | 1 2 4   |     0.917 |
> | 3 5 6   |     0.917 |
> | 1 2 5   |     0.646 |
> | 3 4 6   |     0.646 |
> | 1 3 6   |     0.463 |
> | 2 4 5   |     0.463 |
> | 1 4 6   |     0.383 |
> | 2 3 5   |     0.383 |
> | 1 3 4   |     0.188 |
> | 2 5 6   |     0.188 |
>
> The statistics come in equal pairs, because swapping the two groups gives the same absolute value. The observed statistic is 1.019, the value of the relabeling `1 2 3`.

### 3.2 The permutation p-value

> **NOTE:**
>
> **Definition 3 (Permutation p-value)** With the notation of [Definition 2](#def-permutation-distribution), the **permutation p-value** of the observed statistic \\t = T(y)\\ is the proportion of relabelings whose statistic is at least as extreme as the observed one:
>
> \\p\_{\text{perm}} \stackrel{\text{def}}{=}\Pr\_\pi\mathopen{}\left(T(y\_\pi) \ge T(y)\right)\mathclose{} = \frac{1}{n!} \sum\_{\pi \in S_n} \mathbb{1}\_{T(y\_\pi) \ge T(y)}.\\
>
> Because the identity permutation is one of the \\n!\\ relabelings, \\p\_{\text{perm}} \ge 1 / n!\\.
>
> Source: Wikipedia contributors ([2026b](#ref-wikipedia_permutation_test)).

> **NOTE:**
>
> **Example 3 (Exact permutation p-value for six expression values)** Of the 20 relabelings in [Example 2](#exm-permutation-distribution), count those whose statistic is at least the observed one. Rounding before the comparison keeps floating-point error from separating values that are equal in exact arithmetic, such as the observed statistic and the one for its mirror image:
>
> ``` downlit
> n_extreme <- sum(round(t_toy, 10) >= round(t_observed_toy, 10))
> c(
>   extreme = n_extreme,
>   relabelings = length(t_toy),
>   p_perm = n_extreme / length(t_toy)
> )
> #>     extreme relabelings      p_perm 
> #>        10.0        20.0         0.5
> ```
>
> The exact permutation p-value is 0.5. With three samples per group the smallest p-value any data could give is \\2 / 20 =\\ 0.1, because each statistic has a mirror image, so six samples cannot provide evidence at the 5% level.

> **NOTE:**
>
> *Remark 1* (What a permutation test tests). Relabeling is justified only if the null hypothesis makes the labels irrelevant, that is, if the two groups have the same distribution. A permutation test of a difference in means therefore tests the hypothesis of equal distributions. Such a test can reject because the groups differ in spread rather than in mean, and a test that does not assume equal distributions needs a different method.

### 3.3 Why the permutation p-value is valid

> **NOTE:**
>
> **Exercise 1 (Counting values with few larger-or-equal values)** Let \\t_1, \ldots, t_N\\ be real numbers, and for each \\j\\ let \\N_j\\ be the number of \\i\\ with \\t_i \ge t_j\\ (including \\i = j\\). Show that for every integer \\k \ge 0\\, at most \\k\\ of the \\N_j\\ are at most \\k\\:
>
> \\\sum\_{j=1}^N \mathbb{1}\_{N_j \le k} \le k.\\

> **NOTE:**
>
> *Solution 1*. List the values in decreasing order, breaking ties arbitrarily, so that \\t\_{\[1\]} \ge t\_{\[2\]} \ge \cdots \ge t\_{\[N\]}\\. Suppose the value \\t\_{\[r\]}\\ at position \\r \> k\\ has \\N_j \le k\\, where \\j\\ is its original index. Then the \\r\\ values at positions \\1, \ldots, r\\ are all at least \\t\_{\[r\]}\\, so \\N_j \ge r \> k\\, which contradicts \\N_j \le k\\. So every \\j\\ with \\N_j \le k\\ sits at a position \\r \le k\\ of the sorted list. That list has \\k\\ such positions, and each belongs to one index, so at most \\k\\ indices have \\N_j \le k\\.

> **NOTE:**
>
> **Lemma 1 (At most \\k\\ values have \\k\\ or fewer values at least as large)** Let \\t_1, \ldots, t_N\\ be real numbers, and for each \\j\\ let \\N_j\\ be the number of indices \\i\\ with \\t_i \ge t_j\\ (including \\i = j\\). Then for every integer \\k \ge 0\\, at most \\k\\ of the \\N_j\\ are at most \\k\\:
>
> \\\sum\_{j=1}^N \mathbb{1}\_{N_j \le k} \le k,\\
>
> where \\\mathbb{1}\_{A}\\ is \\1\\ if \\A\\ is true and \\0\\ otherwise.

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 1](#exr-top-k-count), worked in [Solution 1](#sol-top-k-count).

> **NOTE:**
>
> **Exercise 2 (Relabeling the data permutes the relabelings)** For a permutation \\\sigma\\ define \\N\_\sigma(y)\\, the number of relabelings at least as extreme as \\y\_\sigma\\:
>
> \\N\_\sigma(y) \stackrel{\text{def}}{=}\sum\_{\pi \in S_n} \mathbb{1}\_{T(y\_\pi) \ge T(y\_\sigma)}.\\
>
> Write \\\iota\\ for the identity permutation, so \\N\_\iota(y)\\ is \\n!\\ times the permutation p-value of [Definition 3](#def-permutation-p-value). Express \\N\_\sigma(y)\\ in terms of \\N\_\iota\\.

> **NOTE:**
>
> *Solution 2*. The entries of \\(y\_\sigma)\_{\pi'}\\ are \\y\_{\sigma(\pi'(i))}\\, so \\(y\_\sigma)\_{\pi'} = y\_{\sigma \circ \pi'}\\.
>
> \\ \begin{aligned} N\_\iota(y\_\sigma) &= \sum\_{\pi' \in S_n} \mathbb{1}\_{T\mathopen{}\left((y\_\sigma)\_{\pi'}\right)\mathclose{} \ge T(y\_\sigma)} && \text{(definition, with \$y\_\sigma\$ in place of \$y\$)}\\ &= \sum\_{\pi' \in S_n} \mathbb{1}\_{T\mathopen{}\left(y\_{\sigma \circ \pi'}\right)\mathclose{} \ge T(y\_\sigma)} && \text{(\$(y\_\sigma)\_{\pi'} = y\_{\sigma \circ \pi'}\$)}\\ &= \sum\_{\pi \in S_n} \mathbb{1}\_{T(y\_\pi) \ge T(y\_\sigma)} && \text{(\$\pi = \sigma \circ \pi'\$ is a bijection of \$S_n\$)}\\ &= N\_\sigma(y) && \text{(definition)} \end{aligned} \\
>
> So \\N\_\sigma(y) = N\_\iota(y\_\sigma)\\.

> **NOTE:**
>
> **Lemma 2 (Relabeling the data permutes the relabelings)** Let \\T\\ be a statistic, let \\y = (y_1, \ldots, y_n)\\ be data, let \\S_n\\ be the set of permutations of \\\\1, \ldots, n\\\\, and let \\y\_\sigma\\ be \\y\\ with its entries relabeled by \\\sigma \in S_n\\. For \\\sigma \in S_n\\ let \\N\_\sigma(y) \stackrel{\text{def}}{=}\sum\_{\pi \in S_n} \mathbb{1}\_{T(y\_\pi) \ge T(y\_\sigma)}\\ be the number of relabelings at least as extreme as \\y\_\sigma\\, and write \\\iota\\ for the identity permutation, so that \\N\_\iota(y)\\ is \\n!\\ times the [permutation p-value](#def-permutation-p-value) of \\T(y)\\. Then relabeling the data by \\\sigma\\ turns \\N\_\iota\\ into \\N\_\sigma\\:
>
> \\N\_\sigma(y) = N\_\iota(y\_\sigma).\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 2](#exr-relabeling-count), worked in [Solution 2](#sol-relabeling-count).

> **NOTE:**
>
> **Theorem 1 (The permutation p-value is valid)** Let \\Y = (Y_1, \ldots, Y_n)\\ be exchangeable under \\H_0\\ ([Definition 1](#def-exchangeable)), and let \\p\_{\text{perm}}\\ be the [permutation p-value](#def-permutation-p-value) of \\T(Y)\\. Then \\p\_{\text{perm}}\\ is a [valid p-value](multiple-testing.llms.md#def-valid-p-value):
>
> \\\Pr\_{H_0}\mathopen{}\left(p\_{\text{perm}} \le u\right)\mathclose{} \le u \quad \text{for every } u \in \[0, 1\].\\

> **NOTE:**
>
> *Proof*. Since \\p\_{\text{perm}} = N\_\iota(Y) / n!\\ takes values in multiples of \\1 / n!\\, it is enough to take \\u = k / n!\\ for an integer \\k\\ with \\0 \le k \le n!\\: for other \\u\\ the event \\\mathopen{}\left\\p\_{\text{perm}} \le u\right\\\mathclose{}\\ equals the event for \\\mathopen{}\left\lfloor u \\ n!\right\rfloor\mathclose{} / n!\\, which is at most \\u\\.
>
> \\ \begin{aligned} \Pr\_{H_0}\mathopen{}\left(p\_{\text{perm}} \le \frac{k}{n!}\right)\mathclose{} &= \Pr\_{H_0}\mathopen{}\left(N\_\iota(Y) \le k\right)\mathclose{} && \text{(multiply the inequality by \$n!\$)}\\ &= \Pr\_{H_0}\mathopen{}\left(N\_\iota(Y\_\sigma) \le k\right)\mathclose{} && \text{(for each \$\sigma\$, \$Y\_\sigma\$ has the distribution of \$Y\$, by exchangeability)}\\ &= \Pr\_{H_0}\mathopen{}\left(N\_\sigma(Y) \le k\right)\mathclose{} && \text{(relabeling identity)}\\ &= \operatorname{E}\mathopen{}\left\[\mathbb{1}\_{N\_\sigma(Y) \le k}\right\]\mathclose{} && \text{(probability of an event is the expected value of its indicator)}\\ &= \frac{1}{n!} \sum\_{\sigma \in S_n} \operatorname{E}\mathopen{}\left\[\mathbb{1}\_{N\_\sigma(Y) \le k}\right\]\mathclose{} && \text{(the average of \$n!\$ equal terms)}\\ &= \frac{1}{n!} \operatorname{E}\mathopen{}\left\[\sum\_{\sigma \in S_n} \mathbb{1}\_{N\_\sigma(Y) \le k}\right\]\mathclose{} && \text{(expectation of a sum is the sum of expectations)}\\ &\le \frac{1}{n!} \operatorname{E}\mathopen{}\left\[k\right\]\mathclose{} && \text{(counting bound, with \$N = n!\$ and \$t\_\sigma = T(Y\_\sigma)\$)}\\ &= \frac{k}{n!} && \text{(the expected value of a constant is the constant)} \end{aligned} \\
>
> The justifications of the third and the seventh line are [Lemma 2](#lem-relabeling-count) and [Lemma 1](#lem-top-k-count).

> **NOTE:**
>
> **Example 4 (Validity in a small simulation)** Simulate \\10^4\\ data sets of 6 independent standard Gaussian values, three per group, so that \\H_0\\ holds, and compute the exact permutation p-value of \\\mathopen{}\left\|\bar y_1 - \bar y_2\right\|\mathclose{}\\ for each:
>
> ``` downlit
> set.seed(580)
> group1_choices <- combn(6, 3)
> exact_p <- replicate(1e4, {
>   y <- rnorm(6)
>   stats <- apply(group1_choices, 2, function(idx) {
>     in1 <- 1:6 %in% idx
>     abs(mean(y[in1]) - mean(y[!in1]))
>   })
>   mean(round(stats, 10) >= round(stats[1], 10))
> })
> u <- c(0.1, 0.2, 0.5)
> data.frame(
>   u = u,
>   fraction_p_at_most_u = sapply(u, function(x) mean(exact_p <= x))
> )
> ```
>
> Each fraction is close to its \\u\\, within simulation error. Here the exact p-value takes the values \\0.1, 0.2, \ldots, 1\\ with equal probability, because the 20 statistics form 10 mirror pairs with no other ties, so [Theorem 1](#thm-permutation-p-valid) holds with equality.

> **NOTE:**
>
> - Hogg et al. ([2019, sec. 8.5](#ref-hoggtanis2015), pp. 392–402) covers some distribution-free tests.
> - Rice ([2007, sec. 11.2.3](#ref-rice2007mathematical), pp. 435–442) covers the Mann–Whitney test.
> - Rice ([2007, sec. 11.4.6](#ref-rice2007mathematical), p. 456) covers randomization.

## 4 The Monte Carlo approximation

> **NOTE:**
>
> **Definition 4 (Monte Carlo permutation p-value)** With the notation of [Definition 2](#def-permutation-distribution), draw \\B\\ permutations \\\pi_1, \ldots, \pi_B\\ independently and uniformly from \\S_n\\, and let \\T_b \stackrel{\text{def}}{=}T(y\_{\pi_b})\\. The **Monte Carlo permutation p-value** counts the observed labeling as one more relabeling, so it adds 1 to the numerator and to the denominator:
>
> \\\hat p\_{\text{perm}} \stackrel{\text{def}}{=}\frac{1 + \sum\_{b=1}^B \mathbb{1}\_{T_b \ge T(y)}}{B + 1}.\\
>
> Source: Phipson and Smyth ([2010](#ref-phipson2010permutation)).

> **NOTE:**
>
> **Example 5 (Monte Carlo p-value for gene 3)** Compare tumor classes 2 and 4 on gene 3 of the Khan data, using \\\mathopen{}\left\|t\right\|\mathclose{}\\ of Welch’s statistic and \\B = 10{,}000\\ random relabelings. The \\43\\ values admit \\\binom{43}{20} =\\ 960,566,918,220 relabelings ([Example 1](#exm-exchangeable)), too many to list:
>
> ``` downlit
> y3 <- khan_pair$gene_3
> in_class4 <- khan_pair$tumor_class == 4
> t_obs <- abs_welch_t(y3, in_class4)
>
> B <- 10000
> set.seed(581)
> t_perm <- replicate(B, abs_welch_t(y3, sample(in_class4)))
> n_exceed <- sum(t_perm >= t_obs)
> p_mc <- (1 + n_exceed) / (B + 1)
> c(
>   t_observed = t_obs,
>   exceedances = n_exceed,
>   p_mc = p_mc,
>   p_welch = t.test(y3 ~ khan_pair$tumor_class)$p.value
> )
> #>  t_observed exceedances        p_mc     p_welch 
> #> 3.723675686 5.000000000 0.000599940 0.000641807
> ```
>
> Only 5 of the 10,000 relabelings give a statistic at least as large as the observed 3.72. The Monte Carlo p-value is 0.0006, close to the p-value 0.00064 from Welch’s t-test. [Figure 1](#fig-permutation-distribution-gene3) shows the permutation distribution.
>
> Show R code
>
> ``` downlit
> ggplot(data.frame(t = t_perm), aes(x = t)) +
>   geom_histogram(bins = 50, fill = "grey60", color = "white") +
>   geom_vline(xintercept = t_obs, color = "firebrick", linewidth = 1) +
>   labs(x = "Absolute Welch t statistic", y = "Number of relabelings")
> ```
>
> > **NOTE:**
> >
> > [![Histogram of 10,000 permuted absolute Welch t statistics for gene 3. The histogram is concentrated between 0 and 2, with a long thin right tail. A vertical line marks the observed statistic, which lies far out in the right tail, where almost none of the permuted statistics fall.](permutation-tests_files/figure-html/fig-permutation-distribution-gene3-1.png)](permutation-tests_files/figure-html/fig-permutation-distribution-gene3-1.png "Figure 1: Permutation distribution of the absolute Welch t statistic for gene 3, from 10,000 random relabelings of tumor classes 2 and 4. The vertical line is the observed statistic.")
> >
> > Figure 1: Permutation distribution of the absolute Welch t statistic for gene 3, from 10,000 random relabelings of tumor classes 2 and 4. The vertical line is the observed statistic.
>
> The Monte Carlo error of \\\hat p\_{\text{perm}}\\ is about \\\sqrt{\hat p\_{\text{perm}} (1 - \hat p\_{\text{perm}}) / B} =\\ 0.00024, which is comparable to the p-value itself, so a p-value this small needs a larger \\B\\ before its second digit means anything.

> **NOTE:**
>
> **Theorem 2 (The Monte Carlo permutation p-value is valid)** Let \\Y\\ be exchangeable under \\H_0\\ ([Definition 1](#def-exchangeable)), and let \\\hat p\_{\text{perm}}\\ be the [Monte Carlo permutation p-value](#def-monte-carlo-p-value) of \\T(Y)\\ from \\B\\ independent uniform permutations. Then \\\hat p\_{\text{perm}}\\ is a [valid p-value](multiple-testing.llms.md#def-valid-p-value):
>
> \\\Pr\_{H_0}\mathopen{}\left(\hat p\_{\text{perm}} \le u\right)\mathclose{} \le u \quad \text{for every } u \in \[0, 1\].\\

> **NOTE:**
>
> *Remark 2* (Source: The Monte Carlo permutation p-value is valid). Phipson and Smyth ([2010](#ref-phipson2010permutation)) show that the Monte Carlo p-value with the added 1 is valid for random permutations. The proof is omitted here.

> **NOTE:**
>
> **Example 6 (Validity in a small simulation)** Simulate 2000 data sets of 20 independent standard Gaussian values, ten per group, so that \\H_0\\ holds. For each, compute \\\hat p\_{\text{perm}}\\ of the absolute difference in means with \\B = 99\\:
>
> ``` downlit
> set.seed(582)
> in_group1 <- rep(c(TRUE, FALSE), each = 10)
> abs_diff_means <- function(y, in1) abs(mean(y[in1]) - mean(y[!in1]))
> p_hat <- replicate(2000, {
>   y <- rnorm(20)
>   t_obs <- abs_diff_means(y, in_group1)
>   t_perm <- replicate(99, abs_diff_means(y, sample(in_group1)))
>   (1 + sum(t_perm >= t_obs)) / 100
> })
> u <- c(0.01, 0.05, 0.1)
> data.frame(
>   u = u,
>   fraction_p_at_most_u = sapply(u, function(x) mean(p_hat <= x))
> )
> ```
>
> With \\B = 99\\ the p-value takes the values \\0.01, 0.02, \ldots, 1\\, and for a statistic with no ties each value has probability \\0.01\\ under \\H_0\\, so \\\Pr(\hat p\_{\text{perm}} \le u) = u\\ for \\u\\ in that grid. The fractions are close to \\u\\, within simulation error. Choosing \\B + 1\\ to be a round number such as 100 makes the grid easy to read.

> **NOTE:**
>
> *Remark 3* (Why add 1). Without the 1, a data set whose statistic exceeds all \\B\\ permuted statistics would get a p-value of 0, which claims that the observed result is impossible under \\H_0\\. Under \\H_0\\, with no ties, that happens with probability \\1 / (B + 1)\\, because the observed statistic is equally likely to be any one of the \\B + 1\\ values it is compared with. A p-value that equals 0 with positive probability is not valid. With the 1, the smallest value of \\\hat p\_{\text{perm}}\\ is \\1 / (B + 1)\\.

> **NOTE:**
>
> Hogg et al. ([2019, sec. 7.7](#ref-hoggtanis2015), pp. 353–360) covers resampling methods.

## 5 Permutation tests and multiple testing

> **NOTE:**
>
> **Example 7 (Permutation p-values for all 2308 genes)** Relabeling the samples once permutes every gene at the same time, so \\B = 1000\\ relabelings give a permutation null distribution for each of the 2308 genes. This computes \\\mathopen{}\left\|t\right\|\mathclose{}\\ for all genes from column means and sums of squares, in a function checked against [`t.test()`](https://rdrr.io/r/stats/t.test.html) on gene 3:
>
> ``` downlit
> expr_matrix <- as.matrix(khan_pair[, grepl("^gene_", names(khan_pair))])
> abs_welch_t_all <- function(x, in_group1) {
>   n1 <- sum(in_group1)
>   n2 <- sum(!in_group1)
>   mean1 <- colMeans(x[in_group1, , drop = FALSE])
>   mean2 <- colMeans(x[!in_group1, , drop = FALSE])
>   var1 <- (colSums(x[in_group1, , drop = FALSE]^2) - n1 * mean1^2) / (n1 - 1)
>   var2 <- (colSums(x[!in_group1, , drop = FALSE]^2) - n2 * mean2^2) / (n2 - 1)
>   abs(mean1 - mean2) / sqrt(var1 / n1 + var2 / n2)
> }
> t_all <- abs_welch_t_all(expr_matrix, in_class4)
> all.equal(unname(t_all["gene_3"]), t_obs)
> #> [1] TRUE
> ```
>
> Each relabeling yields 2308 statistics, one per gene. The permutation p-value of a gene counts the relabelings whose statistic for that gene reaches its observed one:
>
> ``` downlit
> B_all <- 1000
> set.seed(583)
> exceed_counts <- Reduce(
>   `+`,
>   lapply(seq_len(B_all), function(b) {
>     abs_welch_t_all(expr_matrix, sample(in_class4)) >= t_all
>   })
> )
> p_perm_all <- (1 + exceed_counts) / (B_all + 1)
> c(
>   smallest_possible = 1 / (B_all + 1),
>   genes_at_smallest = sum(p_perm_all == 1 / (B_all + 1)),
>   bonferroni_threshold = 0.05 / length(p_perm_all)
> )
> #>    smallest_possible    genes_at_smallest bonferroni_threshold 
> #>          9.99001e-04          1.36000e+02          2.16638e-05
> ```
>
> The smallest p-value that 1000 relabelings can give is 0.001, and 136 genes reach it. The Bonferroni threshold, 0.000022, is far below the smallest possible p-value, so the Bonferroni correction cannot reject any gene with these p-values. For a Bonferroni correction at level \\\alpha\\ across \\m\\ tests the p-values must be able to fall below \\\alpha/ m\\, which needs \\B + 1 \ge m / \alpha\\, here \\B \ge\\ 46,159 relabelings. The [BH procedure](multiple-testing.llms.md#def-bh) needs less resolution, because its thresholds grow with the rank. At \\q = 0.05\\ it rejects genes from the permutation p-values and from Welch’s t-test p-values as follows:
>
> ``` downlit
> welch_p_all <- vapply(
>   as.data.frame(expr_matrix),
>   function(x) t.test(x ~ khan_pair$tumor_class)$p.value,
>   numeric(1)
> )
> bh_counts <- c(
>   permutation = sum(p.adjust(p_perm_all, method = "BH") <= 0.05),
>   welch = sum(p.adjust(welch_p_all, method = "BH") <= 0.05)
> )
> bh_counts
> #> permutation       welch 
> #>         249         250
> ```
>
> The two sets of p-values give BH rejection counts of 249 and 250.

## 6 Further reading

- Good ([2005](#ref-good2005permutation)) is a book-length treatment of permutation tests.
- Phipson and Smyth ([2010](#ref-phipson2010permutation)) explains why Monte Carlo permutation p-values need the added 1.
- Chapter 12 of the [*Computational and Inferential Thinking*](https://www.inferentialthinking.com/) textbook for UC Berkeley’s Data 8 introduces permutation tests through plain-language A/B testing examples.
- Chapter 13 of James et al. ([2021](#ref-james2021islr2e)) applies permutation and other resampling methods to multiple testing.

### 6.1 Online references

- Wikipedia contributors ([2026b](#ref-wikipedia_permutation_test)) — the test, its assumptions and its variants

- Wikipedia contributors ([2026a](#ref-wikipedia_exchangeable_random_variables)) — exchangeability and its role in permutation tests

- Wikipedia contributors ([2026c](#ref-wikipedia_resampling_statistics)) — permutation tests among the resampling methods

## References

Good, Phillip I. 2005. *Permutation, Parametric and Bootstrap Tests of Hypotheses*. 3rd ed. Springer. <https://doi.org/10.1007/b138696>.

Hogg, Robert V., Elliot A. Tanis, and Dale L. Zimmerman. 2019. *Probability and Statistical Inference*. Tenth edition. Pearson.

James, Gareth, Daniela Witten, Trevor Hastie, and Robert Tibshirani. 2021. *An Introduction to Statistical Learning: With Applications in R*. 2nd ed. Springer. <https://doi.org/10.1007/978-1-0716-1418-1>.

Khan, Javed, Jun S. Wei, Markus Ringnér, et al. 2001. “Classification and Diagnostic Prediction of Cancers Using Gene Expression Profiling and Artificial Neural Networks.” *Nature Medicine* 7 (6): 673–79. <https://doi.org/10.1038/89044>.

Phipson, Belinda, and Gordon K. Smyth. 2010. “Permutation p-Values Should Never Be Zero: Calculating Exact p-Values When Permutations Are Randomly Drawn.” *Statistical Applications in Genetics and Molecular Biology* 9 (1). <https://doi.org/10.2202/1544-6115.1585>.

Rice, John A. 2007. *Mathematical Statistics and Data Analysis*. 3rd ed. Cengage Learning.

Wikipedia contributors. 2026a. *Exchangeable Random Variables — Wikipedia, the Free Encyclopedia*. <https://en.wikipedia.org/wiki/Exchangeable_random_variables>.

Wikipedia contributors. 2026b. *Permutation Test — Wikipedia, the Free Encyclopedia*. <https://en.wikipedia.org/wiki/Permutation_test>.

Wikipedia contributors. 2026c. *Resampling (Statistics) — Wikipedia, the Free Encyclopedia*. <https://en.wikipedia.org/wiki/Resampling_%28statistics%29>.

Back to top

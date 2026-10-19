# Comparing Proportions

Code

Published

Last modified: 2026-10-19 10:06:41 (PDT)

This page reviews tests for comparing groups on a categorical outcome: the chi-square test and Fisher’s exact test for contingency tables. It uses the chi-square reference distribution defined on the [Statistical Inference](inference.llms.md#sec-reference-distributions) page. This page is adapted from Vittinghoff et al. [\[1\]](#ref-vittinghoff2e), Chapter 3.

## 1 The HERS data

The examples on this page use the HERS data, which the [Comparing Means](basic-statistical-methods.llms.md#sec-hers-intro) page describes. The `rmb` R package includes the dataset; [`haven::as_factor()`](https://forcats.tidyverse.org/reference/as_factor.html) converts its Stata value labels to factors:

``` downlit
hers <- rmb::hers |> haven::as_factor()
hers |> head()
```

## 2 Comparing two groups: categorical outcomes

### 2.1 Contingency tables

> **NOTE:**
>
> **Example 1 (Exercise by treatment group in HERS)** [Table 1](#tbl-hers-crosstab) cross-tabulates regular exercise at baseline by treatment group, as a [contingency table](exploratory-descriptive.llms.md#def-contingency-table) with row percentages.
>
> > **NOTE:**
> >
> > Show R code
> >
> > ``` downlit
> > hers |>
> >   gtsummary::tbl_cross(
> >     row = exercise,
> >     col = HT,
> >     label = list(
> >       exercise ~ "Exercises regularly",
> >       HT ~ "Treatment group"
> >     ),
> >     percent = "row"
> >   )
> > ```
> >
> > [TABLE]
> >
> > Table 1: Exercise by treatment group in HERS

> **NOTE:**
>
> - Hogg et al. [\[2, Sec. 7.3\]](#ref-hoggtanis2015), pp. 323–328 covers confidence intervals for proportions.
> - Hogg et al. [\[2, Sec. 8.4\]](#ref-hoggtanis2015), pp. 385–391 covers tests about proportions.

### 2.2 The chi-square test

> **NOTE:**
>
> **Definition 1 (Expected count under independence)** Let a contingency table have \\r\\ rows and \\c\\ columns, with observed count \\O\_{ij}\\ in row \\i\\ and column \\j\\, row totals \\R_i\\, column totals \\C_j\\, and grand total \\n\\. The **expected count** in cell \\(i, j)\\ under independence is
>
> \\E\_{ij} \stackrel{\text{def}}{=}\frac{R_i \\ C_j}{n}.\\
>
> Source: Wikipedia contributors [\[3\]](#ref-wikipedia_contingency_table).

> **NOTE:**
>
> **Example 2 (Expected count in a 2 x 2 table)** In a table with \\n = 100\\, first-row total \\R_1 = 30\\, and first-column total \\C_1 = 40\\, the expected count in cell \\(1, 1)\\ is
>
> \\ \begin{aligned} E\_{11} &= 30 \cdot 40 / 100 \\ &= 12. \end{aligned} \\

> **NOTE:**
>
> **Definition 2 (Pearson’s chi-square test of independence)** With observed counts \\O\_{ij}\\ and [expected counts](#def-expected-count) \\E\_{ij}\\ in an \\r \times c\\ contingency table, **Pearson’s chi-square test** of the null hypothesis that the row and column variables are independent uses the [statistic](sufficiency.llms.md#def-statistic)
>
> \\X^2 \stackrel{\text{def}}{=}\sum\_{i=1}^{r} \sum\_{j=1}^{c} \frac{(O\_{ij} - E\_{ij})^2}{E\_{ij}}.\\
>
> Its p-value is \\\Pr(W \ge X^2)\\, where \\W\\ has the \\\chi^2\_{(r-1)(c-1)}\\ distribution ([chi-square distribution](inference.llms.md#def-chi-square-dist)).
>
> Source: Wikipedia contributors [\[4\]](#ref-wikipedia_pearsons_chi_squared_test).

> **NOTE:**
>
> **Theorem 1 (Large-sample null distribution of the chi-square statistic)** Let \\n\\ observations be sampled independently and classified by two categorical variables, and let the two variables be independent. Then as \\n \to \infty\\, the distribution of \\X^2\\ ([Definition 2](#def-chi-square-test)) converges to the \\\chi^2\_{(r-1)(c-1)}\\ distribution [\[2, Sec. 9.2\]](#ref-hoggtanis2015), p. 440.

> **NOTE:**
>
> *Remark 1* (Small expected counts). The chi-square approximation is poor when some expected counts are small. A common rule of thumb asks for every \\E\_{ij}\\ to be at least 5.

> **NOTE:**
>
> **Example 3 (Chi-square test of exercise by treatment group in HERS)** The expected counts and statistic of [Definition 2](#def-chi-square-test) for [Table 1](#tbl-hers-crosstab):
>
> ``` downlit
> observed <- table(hers$exercise, hers$HT)
> expected <- outer(rowSums(observed), colSums(observed)) / sum(observed)
> x_squared <- sum((observed - expected)^2 / expected)
> expected
> #>     placebo hormone therapy
> #> no   848.42          846.58
> #> yes  534.58          533.42
> c(
>   x_squared = x_squared,
>   p_value = pchisq(x_squared, df = 1, lower.tail = FALSE)
> )
> #> x_squared   p_value 
> #>  0.128054  0.720458
> ```
>
> Every expected count is large, so the \\\chi^2_1\\ approximation of [Theorem 1](#thm-chi-square-null) is reasonable. [`chisq.test()`](https://rdrr.io/r/stats/chisq.test.html) with `correct = FALSE` reports the same values:
>
> ``` downlit
> chisq.test(hers$exercise, hers$HT, correct = FALSE)
> #> 
> #>  Pearson's Chi-squared test
> #> 
> #> data:  hers$exercise and hers$HT
> #> X-squared = 0.1281, df = 1, p-value = 0.72
> ```
>
> The p-value is large: the data give no evidence that exercise depends on treatment group, as randomization would lead us to expect.

> **NOTE:**
>
> *Remark 2* (Yates’ continuity correction). For a \\2 \times 2\\ table, [`chisq.test()`](https://rdrr.io/r/stats/chisq.test.html) applies Yates’ continuity correction by default, which subtracts 0.5 from each \\\mathopen{}\left\|O\_{ij} - E\_{ij}\right\|\mathclose{}\\ before squaring, and so gives a smaller statistic than [Definition 2](#def-chi-square-test). `correct = FALSE` turns the correction off.

> **NOTE:**
>
> - Hogg et al. [\[2, Sec. 9.1\]](#ref-hoggtanis2015), pp. 425–434 covers chi-square goodness-of-fit tests.
> - Hogg et al. [\[2, Sec. 9.2\]](#ref-hoggtanis2015), pp. 435–445 covers contingency tables.
> - Rice [\[5, Sec. 13.3\]](#ref-rice2007mathematical), pp. 516–519 covers the chi-square test of homogeneity.
> - Rice [\[5, Sec. 13.4\]](#ref-rice2007mathematical), pp. 520–522 covers the chi-square test of independence.
> - Rice [\[5, Sec. 9.5\]](#ref-rice2007mathematical), pp. 341–346 covers likelihood ratio tests for the multinomial distribution.

### 2.3 Fisher’s exact test

> **NOTE:**
>
> **Definition 3 (Fisher’s exact test)** Take a \\2 \times 2\\ contingency table with cells \\a\\, \\b\\, \\c\\, and \\d\\ as in [the contingency table definition](exploratory-descriptive.llms.md#def-contingency-table), and hold its row and column totals fixed. Under independence of the row and column variables, the probability that the top-left cell equals \\x\\ is the hypergeometric probability
>
> \\p(x) \stackrel{\text{def}}{=}\frac{\binom{a+b}{x} \binom{c+d}{a+c-x}}{\binom{n}{a+c}}.\\
>
> **Fisher’s exact test** of independence has p-value [\[6\]](#ref-wikipedia_fishers_exact_test)
>
> \\\sum\_{x \\:\\ p(x) \le p(a)} p(x),\\
>
> the total probability of the tables with the same totals that are no more probable than the observed table.

> **NOTE:**
>
> *Remark 3* (Why Fisher’s exact test is exact). The p-value is exact: it comes from the null distribution itself, not from a large-sample approximation, so the test is valid even when expected counts are small, and it is often used for \\2 \times 2\\ tables in which some expected count is below 5 ([Theorem 1](#thm-chi-square-null)). Other two-sided versions exist; this one is the version that R’s [`fisher.test()`](https://rdrr.io/r/stats/fisher.test.html) computes.

> **NOTE:**
>
> **Example 4 (Fisher’s exact test of exercise by treatment group in HERS)** The p-value of [Definition 3](#def-fishers-exact) for [Table 1](#tbl-hers-crosstab), computed from the hypergeometric probabilities with [`dhyper()`](https://rdrr.io/r/stats/Hypergeometric.html):
>
> ``` downlit
> a <- observed[1, 1]
> row1 <- sum(observed[1, ])
> row2 <- sum(observed[2, ])
> col1 <- sum(observed[, 1])
> x <- max(0, col1 - row2):min(row1, col1)
> p_x <- dhyper(x, m = row1, n = row2, k = col1)
> p_a <- dhyper(a, m = row1, n = row2, k = col1)
> sum(p_x[p_x <= p_a * (1 + 1e-7)])
> #> [1] 0.72528
> ```
>
> The tolerance `1e-7` keeps tables whose probability equals \\p(a)\\ up to rounding error, as [`fisher.test()`](https://rdrr.io/r/stats/fisher.test.html) does. [`fisher.test()`](https://rdrr.io/r/stats/fisher.test.html) reports the same p-value:
>
> ``` downlit
> fisher.test(hers$exercise, hers$HT)
> #> 
> #>  Fisher's Exact Test for Count Data
> #> 
> #> data:  hers$exercise and hers$HT
> #> p-value = 0.725
> #> alternative hypothesis: true odds ratio is not equal to 1
> #> 95 percent confidence interval:
> #>  0.879664 1.202192
> #> sample estimates:
> #> odds ratio 
> #>    1.02836
> ```
>
> With counts this large, the exact p-value is close to the chi-square p-value of [Example 3](#exm-hers-chisq).

> **NOTE:**
>
> Rice [\[5, Sec. 13.2\]](#ref-rice2007mathematical), pp. 514–515 covers Fisher’s exact test.

### 2.4 Measures of association for \\2 \times 2\\ tables

Tests of independence say whether two binary variables are associated, but not how strongly. The [risk difference](#def-risk-difference), the [risk ratio](#def-risk-ratio) and the [odds ratio](#def-odds-ratio) measure the strength of the association.

> **NOTE:**
>
> **Definition 4 (Risk of a binary outcome)** The **risk** of a [binary](data.llms.md#def-binary-var) outcome in a group is the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) that a member of the group has the outcome.
>
> The risk lies in \\\[0, 1\]\\, and its [maximum likelihood estimate](intro-MLEs.llms.md#def-mle) is the proportion of the group’s observations that have the outcome.
>
> Source: Wikipedia contributors [\[7\]](#ref-wikipedia_relative_risk).

> **NOTE:**
>
> **Example 5 (Risk of regular exercise in each HERS treatment group)** In [Table 1](#tbl-hers-crosstab), the outcome is regular exercise at baseline. The estimated [risk](#def-outcome-risk) in each treatment group is the proportion of that group’s column who exercise regularly:
>
> ``` downlit
> risk_hat <- prop.table(table(hers$exercise, hers$HT), margin = 2)["yes", ]
> risk_hat
> #>         placebo hormone therapy 
> #>        0.383225        0.389855
> ```
>
> The estimated risk of regular exercise is 0.383 in the placebo group and 0.39 in the hormone therapy group.

> **NOTE:**
>
> **Definition 5 (Reference group)** In a comparison of an outcome measure between two groups, the **reference group** is the group whose measure is the subtrahend of a difference or the denominator of a quotient. The other group is the group being compared with it.

> **NOTE:**
>
> **Example 6 (The placebo group as the reference group in HERS)** To compare the [risks](#def-outcome-risk) of regular exercise in [Example 5](#exm-hers-outcome-risk), take the placebo group as the [reference group](#def-reference-group) and the hormone therapy group as the group being compared with it. Then a difference is hormone therapy minus placebo, and a quotient is hormone therapy divided by placebo.

> **NOTE:**
>
> **Definition 6 (Risk difference (also called the absolute risk reduction))** Let:
>
> - \\\pi_1\\ be the [risk](#def-outcome-risk) of a [binary](data.llms.md#def-binary-var) outcome in group 1.
> - \\\pi_2\\ be the risk of the same outcome in the [reference group](#def-reference-group), group 2.
>
> The **risk difference**, also called the **absolute risk reduction**, of group 1 compared with group 2 is
>
> \\\operatorname{RD}\stackrel{\text{def}}{=}\pi_1 - \pi_2 \in \[-1, 1\].\\
>
> Source: Wikipedia contributors [\[8\]](#ref-wikipedia_absolute_risk_reduction).

> **NOTE:**
>
> **Example 7 (Risk difference of regular exercise in HERS)** Take group 1 to be hormone therapy and group 2, the [reference group](#def-reference-group), to be placebo. The estimated [risk difference](#def-risk-difference) for the estimated [risks](#def-outcome-risk) of [Example 5](#exm-hers-outcome-risk) is:
>
> ``` downlit
> rd_hat <- risk_hat[["hormone therapy"]] - risk_hat[["placebo"]]
> rd_hat
> #> [1] 0.0066302
> ```
>
> The estimated [risk](#def-outcome-risk) of regular exercise is 0.007 higher in the hormone therapy group than in the placebo group. Multiplying by 100 gives 0.7 percentage points.

> **NOTE:**
>
> **Definition 7 (Risk ratio (also called the relative risk))** Let:
>
> - \\\pi_1\\ be the [risk](#def-outcome-risk) of a [binary](data.llms.md#def-binary-var) outcome in group 1.
> - \\\pi_2 \> 0\\ be the risk of the same outcome in the [reference group](#def-reference-group), group 2.
>
> The **risk ratio**, also called the **relative risk**, of group 1 compared with group 2 is
>
> \\\text{ϙ}\_{\pi}\stackrel{\text{def}}{=}\frac{\pi_1}{\pi_2} \in \[0, \infty).\\
>
> Source: Wikipedia contributors [\[7\]](#ref-wikipedia_relative_risk).

> **NOTE:**
>
> **Example 8 (Risk ratio of regular exercise in HERS)** Take group 1 to be hormone therapy and group 2, the [reference group](#def-reference-group), to be placebo. The estimated [risk ratio](#def-risk-ratio) for the estimated [risks](#def-outcome-risk) of [Example 5](#exm-hers-outcome-risk) is:
>
> ``` downlit
> rr_hat <- risk_hat[["hormone therapy"]] / risk_hat[["placebo"]]
> rr_hat
> #> [1] 1.0173
> ```
>
> The estimated [risk](#def-outcome-risk) of regular exercise in the hormone therapy group is 1.017 times the estimated risk in the placebo group. This [estimate](estimation.llms.md#def-estimate) is close to 1, which agrees with the large [p-value](inference.llms.md#def-p-value) of [Example 3](#exm-hers-chisq): the two groups have about the same estimated risk. The estimate alone does not show how precise it is.

> **NOTE:**
>
> **Definition 8 (Odds ratio)** Let:
>
> - \\\omega_1\\ be the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of a [binary](data.llms.md#def-binary-var) outcome in group 1.
> - \\\omega_2\\ be the odds of the same outcome in the [reference group](#def-reference-group), group 2.
>
> The **odds ratio** of group 1 compared with group 2 is
>
> \\\text{ϙ}\_{\omega}\stackrel{\text{def}}{=}\frac{\omega_1}{\omega_2} \in (0, \infty).\\
>
> Here \\\omega_g = \pi_g / (1 - \pi_g)\\ for the [risk](#def-outcome-risk) \\\pi_g\\ of group \\g\\.
>
> Source: Wikipedia contributors [\[9\]](#ref-wikipedia_odds_ratio).

> **NOTE:**
>
> **Example 9 (Odds ratio of regular exercise in HERS)** Take group 1 to be hormone therapy and group 2, the [reference group](#def-reference-group), to be placebo. The [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of regular exercise in each group follow from the estimated [risks](#def-outcome-risk) of [Example 5](#exm-hers-outcome-risk). The estimated [odds ratio](#def-odds-ratio) divides the odds in the hormone therapy group by the odds in the placebo group:
>
> ``` downlit
> odds_hat <- risk_hat / (1 - risk_hat)
> or_hat <- odds_hat[["hormone therapy"]] / odds_hat[["placebo"]]
> c(odds_hat, odds_ratio = or_hat)
> #>         placebo hormone therapy      odds_ratio 
> #>        0.621336        0.638955        1.028356
> ```
>
> The estimated odds ratio 1.028 is close to the [risk ratio](#def-risk-ratio) 1.017 of [Example 8](#exm-hers-risk-ratio), because the two groups have nearly equal risks. The odds ratio is 1 exactly when the risk ratio is 1, so it also agrees with the large [p-value](inference.llms.md#def-p-value) of [Example 3](#exm-hers-chisq).

> **NOTE:**
>
> Rice [\[5, Sec. 13.6\]](#ref-rice2007mathematical), pp. 526–529 covers odds ratios.

## References

\[1\]

E. Vittinghoff, D. V. Glidden, S. C. Shiboski, and C. E. McCulloch, *Regression methods in biostatistics: Linear, logistic, survival, and repeated measures models*, 2nd ed. Springer, 2012. doi: [10.1007/978-1-4614-1353-0](https://doi.org/10.1007/978-1-4614-1353-0).

\[2\]

R. V. Hogg, E. A. Tanis, and D. L. Zimmerman, *Probability and statistical inference*, Tenth edition. Boston: Pearson, 2019.

\[3\]

Wikipedia contributors, “Contingency table — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Contingency_table>

\[4\]

Wikipedia contributors, “Pearson’s chi-squared test — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Pearson%27s_chi-squared_test>

\[5\]

J. A. Rice, *Mathematical statistics and data analysis*, 3rd ed. Belmont, CA: Cengage Learning, 2007.

\[6\]

Wikipedia contributors, “Fisher’s exact test — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Fisher%27s_exact_test>

\[7\]

Wikipedia contributors, “Relative risk — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Relative_risk>

\[8\]

Wikipedia contributors, “Absolute risk reduction — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Absolute_risk_reduction>

\[9\]

Wikipedia contributors, “Odds ratio — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Odds_ratio>

Back to top

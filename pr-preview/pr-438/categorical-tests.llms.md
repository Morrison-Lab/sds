# Comparing Proportions

Code

Published

Last modified: 2026-10-22 15:07:28 (PDT)

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
> **Definition 4 (Risk of a binary outcome (also called the incidence proportion or cumulative incidence))** The **risk** of a [binary](data.llms.md#def-binary-var) outcome in a group is the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) that a member of the group has the outcome. When the outcome is an event, the risk is for a specified time period. The risk is also called the **incidence proportion** or **cumulative incidence**.
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
> *Remark 4* (Cumulative incidence has a second meaning). The name [cumulative incidence](#def-outcome-risk) for the [risk](#def-outcome-risk) fits a closed [population](exploratory-descriptive.llms.md#def-population), where no one enters or leaves after the start of the time period [\[8, Ch. 4\]](#ref-me4). The same name is also used for a different quantity: when several event types compete, the cumulative incidence function of one event type at time \\t\\ is the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) that this type of event occurs by time \\t\\ [\[8, Ch. 22\]](#ref-me4). This page uses the name only for the risk of a [binary](data.llms.md#def-binary-var) outcome.

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
> Source: Wikipedia contributors [\[9\]](#ref-wikipedia_absolute_risk_reduction).

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
> **Exercise 1** Let:
>
> - \\\pi_1\\ and \\\pi_2\\ be the [risks](#def-outcome-risk) of a [binary](data.llms.md#def-binary-var) outcome in group 1 and group 2.
> - \\\operatorname{RD}\stackrel{\text{def}}{=}\pi_1 - \pi_2\\ be the [risk difference](#def-risk-difference) of group 1 compared with group 2.
>
> Express the risk difference of group 2 compared with group 1, \\\pi_2 - \pi_1\\, in terms of \\\operatorname{RD}\\.

> **NOTE:**
>
> *Solution 1*. \\ \begin{aligned} \pi_2 - \pi_1 &= -1 \cdot \mathopen{}\left(\pi_1 - \pi_2\right)\mathclose{} && \text{(factor \$-1\$ out of both terms)} \\ &= -\operatorname{RD} && \text{(definition of \$\operatorname{RD}\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 2 (Switching the reference group in a risk difference)** Let:
>
> - \\\pi_1\\ and \\\pi_2\\ be the [risks](#def-outcome-risk) of a [binary](data.llms.md#def-binary-var) outcome in group 1 and group 2.
> - \\\operatorname{RD}\stackrel{\text{def}}{=}\pi_1 - \pi_2\\ be the [risk difference](#def-risk-difference) of group 1 compared with group 2, with group 2 as the [reference group](#def-reference-group).
>
> Then the risk difference of group 2 compared with group 1, with group 1 as the reference group, is the negative of \\\operatorname{RD}\\:
>
> \\\pi_2 - \pi_1 = -\operatorname{RD}.\\

> **NOTE:**
>
> *Proof*. This is the result of [Solution 1](#sol-risk-difference-switch-ref).

> **NOTE:**
>
> **Example 8 (Switching the reference group in the HERS risk difference)** In [Example 7](#exm-hers-risk-difference) the placebo group is the [reference group](#def-reference-group), and the estimated [risk difference](#def-risk-difference) is 0.007. Taking the hormone therapy group as the reference group instead gives:
>
> ``` downlit
> rd_hat_switched <- risk_hat[["placebo"]] - risk_hat[["hormone therapy"]]
> rd_hat_switched
> #> [1] -0.0066302
> ```
>
> This [estimate](estimation.llms.md#def-estimate), -0.007, is the negative of 0.007, as [Theorem 2](#thm-risk-difference-switch-ref) states.

> **NOTE:**
>
> **Definition 7 (Risk ratio (also called the relative risk, relative risk ratio or probability ratio))** Let:
>
> - \\\pi_1\\ be the [risk](#def-outcome-risk) of a [binary](data.llms.md#def-binary-var) outcome in group 1.
> - \\\pi_2 \> 0\\ be the risk of the same outcome in the [reference group](#def-reference-group), group 2.
>
> The **risk ratio**, also called the **relative risk**, **relative risk ratio** or **probability ratio**, of group 1 compared with group 2 is
>
> \\\text{ϙ}\_{\pi}\stackrel{\text{def}}{=}\frac{\pi_1}{\pi_2} \in \[0, \infty).\\
>
> Source: Wikipedia contributors [\[7\]](#ref-wikipedia_relative_risk).

> **NOTE:**
>
> **Example 9 (Risk ratio of regular exercise in HERS)** Take group 1 to be hormone therapy and group 2, the [reference group](#def-reference-group), to be placebo. The estimated [risk ratio](#def-risk-ratio) for the estimated [risks](#def-outcome-risk) of [Example 5](#exm-hers-outcome-risk) is:
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
> *Remark 5* (The risk ratio is not the rate ratio). Some texts call the [risk ratio](#def-risk-ratio) the rate ratio. The rate ratio is a different quantity: the quotient of two event rates, as in count regression.

> **NOTE:**
>
> **Exercise 2** Let:
>
> - \\\pi_1\\ and \\\pi_2 \> 0\\ be the [risks](#def-outcome-risk) of a [binary](data.llms.md#def-binary-var) outcome in group 1 and group 2.
> - \\\text{ϙ}\_{\pi}\stackrel{\text{def}}{=}\pi_1 / \pi_2\\ be the [risk ratio](#def-risk-ratio) of group 1 compared with group 2.
> - \\\text{ϙ}\_{\pi}\> 0\\.
>
> Express the risk ratio of group 2 compared with group 1, \\\pi_2 / \pi_1\\, in terms of \\\text{ϙ}\_{\pi}\\.

> **NOTE:**
>
> *Solution 2*. \\ \begin{aligned} \frac{\pi_2}{\pi_1} &= \frac{1}{\pi_1 / \pi_2} && \text{(the reciprocal of a quotient swaps numerator and denominator)} \\ &= \frac{1}{\text{ϙ}\_{\pi}} && \text{(definition of \$\text{ϙ}\_{\pi}\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 3 (Switching the reference group in a risk ratio)** Let:
>
> - \\\pi_1\\ and \\\pi_2 \> 0\\ be the [risks](#def-outcome-risk) of a [binary](data.llms.md#def-binary-var) outcome in group 1 and group 2.
> - \\\text{ϙ}\_{\pi}\stackrel{\text{def}}{=}\pi_1 / \pi_2\\ be the [risk ratio](#def-risk-ratio) of group 1 compared with group 2, with group 2 as the [reference group](#def-reference-group).
> - \\\text{ϙ}\_{\pi}\> 0\\.
>
> Then the risk ratio of group 2 compared with group 1, with group 1 as the reference group, is the reciprocal of \\\text{ϙ}\_{\pi}\\:
>
> \\\frac{\pi_2}{\pi_1} = \frac{1}{\text{ϙ}\_{\pi}}.\\

> **NOTE:**
>
> *Proof*. This is the result of [Solution 2](#sol-risk-ratio-switch-ref).

> **NOTE:**
>
> **Example 10 (Switching the reference group in the HERS risk ratio)** In [Example 9](#exm-hers-risk-ratio) the placebo group is the [reference group](#def-reference-group), and the estimated [risk ratio](#def-risk-ratio) is 1.017. Taking the hormone therapy group as the reference group instead gives:
>
> ``` downlit
> rr_hat_switched <- risk_hat[["placebo"]] / risk_hat[["hormone therapy"]]
> rr_hat_switched
> #> [1] 0.982993
> ```
>
> This [estimate](estimation.llms.md#def-estimate), 0.983, is the reciprocal of 1.017, 0.983, as [Theorem 3](#thm-risk-ratio-switch-ref) states.

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
> Source: Wikipedia contributors [\[10\]](#ref-wikipedia_odds_ratio).

> **NOTE:**
>
> **Example 11 (Odds ratio of regular exercise in HERS)** Take group 1 to be hormone therapy and group 2, the [reference group](#def-reference-group), to be placebo. The [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of regular exercise in each group follow from the estimated [risks](#def-outcome-risk) of [Example 5](#exm-hers-outcome-risk). The estimated [odds ratio](#def-odds-ratio) divides the odds in the hormone therapy group by the odds in the placebo group:
>
> ``` downlit
> odds_hat <- risk_hat / (1 - risk_hat)
> or_hat <- odds_hat[["hormone therapy"]] / odds_hat[["placebo"]]
> c(odds_hat, odds_ratio = or_hat)
> #>         placebo hormone therapy      odds_ratio 
> #>        0.621336        0.638955        1.028356
> ```
>
> The estimated odds ratio 1.028 is close to the [risk ratio](#def-risk-ratio) 1.017 of [Example 9](#exm-hers-risk-ratio), because the two groups have nearly equal risks. The odds ratio is 1 exactly when the risk ratio is 1, so it also agrees with the large [p-value](inference.llms.md#def-p-value) of [Example 3](#exm-hers-chisq).

> **NOTE:**
>
> **Exercise 3** Let:
>
> - \\X\\ and \\Y\\ be [binary](data.llms.md#def-binary-var) random variables, each with values \\0\\ and \\1\\.
> - \\{\operatorname{P}\mathopen{}\left(X = x, Y = y\right)\mathclose{}} \> 0\\ for each \\x, y \in {\mathopen{}\left\\0, 1\right\\\mathclose{}}\\.
>
> Express the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of \\Y = 1\\ given \\X = x\\ in terms of the joint probabilities \\{\operatorname{P}\mathopen{}\left(X = x, Y = 1\right)\mathclose{}}\\ and \\{\operatorname{P}\mathopen{}\left(X = x, Y = 0\right)\mathclose{}}\\.

> **NOTE:**
>
> *Solution 3*. \\ \begin{aligned} \omega &= \frac{{\operatorname{P}\mathopen{}\left(Y = 1 \mid X = x\right)\mathclose{}}}{1 - {\operatorname{P}\mathopen{}\left(Y = 1 \mid X = x\right)\mathclose{}}} && \text{(definition of odds)} \\ &= \frac{{\operatorname{P}\mathopen{}\left(Y = 1 \mid X = x\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(Y = 0 \mid X = x\right)\mathclose{}}} && \text{(the two values of \$Y\$ have conditional probabilities that sum to 1)} \\ &= \frac{{\operatorname{P}\mathopen{}\left(X = x, Y = 1\right)\mathclose{}} / {\operatorname{P}\mathopen{}\left(X = x\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(X = x, Y = 0\right)\mathclose{}} / {\operatorname{P}\mathopen{}\left(X = x\right)\mathclose{}}} && \text{(definition of conditional probability, in numerator and denominator)} \\ &= \frac{{\operatorname{P}\mathopen{}\left(X = x, Y = 1\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(X = x, Y = 0\right)\mathclose{}}} && \text{(divide the numerator and the denominator by the same positive number \${\operatorname{P}\mathopen{}\left(X = x\right)\mathclose{}}\$)} \end{aligned} \\

> **NOTE:**
>
> **Theorem 4 (The odds ratio as a ratio of cross products)** Let:
>
> - \\X\\ and \\Y\\ be [binary](data.llms.md#def-binary-var) random variables, each with values \\0\\ and \\1\\.
> - \\{\operatorname{P}\mathopen{}\left(X = x, Y = y\right)\mathclose{}} \> 0\\ for each \\x, y \in {\mathopen{}\left\\0, 1\right\\\mathclose{}}\\.
>
> The [odds ratio](#def-odds-ratio) of \\Y = 1\\ comparing the group \\X = 1\\ with the [reference group](#def-reference-group) \\X = 0\\ is
>
> \\ {\text{ϙ}\_{\omega}\mathopen{}\left(Y \mid X\right)\mathclose{}} = \frac{{\operatorname{P}\mathopen{}\left(X = 1, Y = 1\right)\mathclose{}} {\operatorname{P}\mathopen{}\left(X = 0, Y = 0\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(X = 1, Y = 0\right)\mathclose{}} {\operatorname{P}\mathopen{}\left(X = 0, Y = 1\right)\mathclose{}}}. \\

> **NOTE:**
>
> *Proof*. By [Solution 3](#sol-odds-from-joint-probs), the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of \\Y = 1\\ in the group \\X = 1\\ are \\{\operatorname{P}\mathopen{}\left(X = 1, Y = 1\right)\mathclose{}} / {\operatorname{P}\mathopen{}\left(X = 1, Y = 0\right)\mathclose{}}\\. By the same solution, the odds of \\Y = 1\\ in the group \\X = 0\\ are \\{\operatorname{P}\mathopen{}\left(X = 0, Y = 1\right)\mathclose{}} / {\operatorname{P}\mathopen{}\left(X = 0, Y = 0\right)\mathclose{}}\\. The [odds ratio](#def-odds-ratio) is the first odds divided by the second. Dividing by a fraction is multiplying by its reciprocal, which gives the stated product of the four joint probabilities.

> **NOTE:**
>
> **Example 12 (The HERS odds ratio from the cell proportions)** Take \\X = 1\\ for hormone therapy and \\X = 0\\ for placebo, and \\Y = 1\\ for regular exercise. The estimated joint probabilities are the cell proportions of the HERS table:
>
> ``` downlit
> joint_hat <- prop.table(table(HT = hers$HT, exercise = hers$exercise))
> cross_ratio <-
>   joint_hat["hormone therapy", "yes"] * joint_hat["placebo", "no"] /
>   (joint_hat["hormone therapy", "no"] * joint_hat["placebo", "yes"])
> cross_ratio
> #> [1] 1.02836
> ```
>
> The cross-product expression equals 1.028. It equals the estimated [odds ratio](#def-odds-ratio) 1.028 of [Example 11](#exm-hers-odds-ratio), as [Theorem 4](#thm-odds-ratio-cross-product) states.

> **NOTE:**
>
> **Theorem 5 (The odds ratio is reversible)** Let:
>
> - \\X\\ and \\Y\\ be [binary](data.llms.md#def-binary-var) random variables, each with values \\0\\ and \\1\\.
> - \\{\operatorname{P}\mathopen{}\left(X = x, Y = y\right)\mathclose{}} \> 0\\ for each \\x, y \in {\mathopen{}\left\\0, 1\right\\\mathclose{}}\\.
>
> The [odds ratio](#def-odds-ratio) of \\Y = 1\\ comparing \\X = 1\\ with \\X = 0\\ equals the odds ratio of \\X = 1\\ comparing \\Y = 1\\ with \\Y = 0\\:
>
> \\ {\text{ϙ}\_{\omega}\mathopen{}\left(Y \mid X\right)\mathclose{}} = {\text{ϙ}\_{\omega}\mathopen{}\left(X \mid Y\right)\mathclose{}}. \\

> **NOTE:**
>
> *Proof*. By [Theorem 4](#thm-odds-ratio-cross-product), with the roles of \\X\\ and \\Y\\ exchanged,
>
> \\ {\text{ϙ}\_{\omega}\mathopen{}\left(X \mid Y\right)\mathclose{}} = \frac{{\operatorname{P}\mathopen{}\left(Y = 1, X = 1\right)\mathclose{}} {\operatorname{P}\mathopen{}\left(Y = 0, X = 0\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(Y = 1, X = 0\right)\mathclose{}} {\operatorname{P}\mathopen{}\left(Y = 0, X = 1\right)\mathclose{}}}. \\
>
> The event \\{\mathopen{}\left\\Y = y, X = x\right\\\mathclose{}}\\ is the event \\{\mathopen{}\left\\X = x, Y = y\right\\\mathclose{}}\\, so each joint [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) here equals the joint probability with its arguments in the other order. The denominator is a product of two joint probabilities, and multiplication is commutative. Reordering its two factors gives the denominator of [Theorem 4](#thm-odds-ratio-cross-product) for \\{\text{ϙ}\_{\omega}\mathopen{}\left(Y \mid X\right)\mathclose{}}\\.

> **NOTE:**
>
> **Example 13 (Reversing the roles of treatment and exercise in HERS)** In [Example 12](#exm-hers-odds-ratio-cross-product), the [odds ratio](#def-odds-ratio) compares the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of regular exercise between the hormone therapy and placebo groups. Reversing the roles compares the odds of hormone therapy between the women who exercise regularly and those who do not:
>
> ``` downlit
> counts <- table(HT = hers$HT, exercise = hers$exercise)
> odds_ht_exercise <- counts["hormone therapy", "yes"] / counts["placebo", "yes"]
> odds_ht_no_exercise <- counts["hormone therapy", "no"] / counts["placebo", "no"]
> or_reversed <- odds_ht_exercise / odds_ht_no_exercise
> or_reversed
> #> [1] 1.02836
> ```
>
> The reversed odds ratio is 1.028. It equals the odds ratio 1.028 of [Example 11](#exm-hers-odds-ratio), as [Theorem 5](#thm-odds-ratio-reversible) states.

> **NOTE:**
>
> **Theorem 6 (The conditional odds ratio is reversible)** Let:
>
> - \\X\\ and \\Y\\ be [binary](data.llms.md#def-binary-var) random variables, each with values \\0\\ and \\1\\.
> - \\Z\\ be a random variable, and \\z\\ be a value of \\Z\\.
> - \\{\operatorname{P}\mathopen{}\left(X = x, Y = y, Z = z\right)\mathclose{}} \> 0\\ for each \\x, y \in {\mathopen{}\left\\0, 1\right\\\mathclose{}}\\.
>
> The [odds ratio](#def-odds-ratio) of \\Y = 1\\ comparing \\X = 1\\ with the [reference group](#def-reference-group) \\X = 0\\, among the units with \\Z = z\\, equals the odds ratio of \\X = 1\\ comparing \\Y = 1\\ with \\Y = 0\\, among the units with \\Z = z\\:
>
> \\ {\text{ϙ}\_{\omega}\mathopen{}\left(Y \mid X, Z = z\right)\mathclose{}} = {\text{ϙ}\_{\omega}\mathopen{}\left(X \mid Y, Z = z\right)\mathclose{}}. \\

> **NOTE:**
>
> *Proof*. First, find the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of \\Y = 1\\ in the group \\X = x\\ among the units with \\Z = z\\:
>
> \\ \begin{aligned} \omega\_{x} &= \frac{{\operatorname{P}\mathopen{}\left(Y = 1 \mid X = x, Z = z\right)\mathclose{}}}{1 - {\operatorname{P}\mathopen{}\left(Y = 1 \mid X = x, Z = z\right)\mathclose{}}} && \text{(definition of odds)} \\ &= \frac{{\operatorname{P}\mathopen{}\left(Y = 1 \mid X = x, Z = z\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(Y = 0 \mid X = x, Z = z\right)\mathclose{}}} && \text{(the two values of \$Y\$ have conditional probabilities that sum to 1)} \\ &= \frac{{\operatorname{P}\mathopen{}\left(X = x, Y = 1, Z = z\right)\mathclose{}} / {\operatorname{P}\mathopen{}\left(X = x, Z = z\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(X = x, Y = 0, Z = z\right)\mathclose{}} / {\operatorname{P}\mathopen{}\left(X = x, Z = z\right)\mathclose{}}} && \text{(definition of conditional probability, in numerator and denominator)} \\ &= \frac{{\operatorname{P}\mathopen{}\left(X = x, Y = 1, Z = z\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(X = x, Y = 0, Z = z\right)\mathclose{}}} && \text{(divide the numerator and the denominator by the same positive number \${\operatorname{P}\mathopen{}\left(X = x, Z = z\right)\mathclose{}}\$)} \end{aligned} \\
>
> The [odds ratio](#def-odds-ratio) is the odds \\\omega_1\\ divided by the odds \\\omega_0\\. Dividing by a fraction is multiplying by its reciprocal, so
>
> \\ {\text{ϙ}\_{\omega}\mathopen{}\left(Y \mid X, Z = z\right)\mathclose{}} = \frac{{\operatorname{P}\mathopen{}\left(X = 1, Y = 1, Z = z\right)\mathclose{}} {\operatorname{P}\mathopen{}\left(X = 0, Y = 0, Z = z\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(X = 1, Y = 0, Z = z\right)\mathclose{}} {\operatorname{P}\mathopen{}\left(X = 0, Y = 1, Z = z\right)\mathclose{}}}. \\
>
> The same steps with the roles of \\X\\ and \\Y\\ exchanged give
>
> \\ {\text{ϙ}\_{\omega}\mathopen{}\left(X \mid Y, Z = z\right)\mathclose{}} = \frac{{\operatorname{P}\mathopen{}\left(Y = 1, X = 1, Z = z\right)\mathclose{}} {\operatorname{P}\mathopen{}\left(Y = 0, X = 0, Z = z\right)\mathclose{}}}{{\operatorname{P}\mathopen{}\left(Y = 1, X = 0, Z = z\right)\mathclose{}} {\operatorname{P}\mathopen{}\left(Y = 0, X = 1, Z = z\right)\mathclose{}}}. \\
>
> The event \\{\mathopen{}\left\\Y = y, X = x, Z = z\right\\\mathclose{}}\\ is the event \\{\mathopen{}\left\\X = x, Y = y, Z = z\right\\\mathclose{}}\\, so each joint [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) here equals the joint probability with its arguments in the other order. The denominator is a product of two joint probabilities, and multiplication is commutative. Reordering its two factors gives the denominator of the first display.

> **NOTE:**
>
> **Example 14 (Reversing the roles of treatment and exercise within diabetes strata in HERS)** In [Example 13](#exm-hers-odds-ratio-reversible), the roles of hormone therapy and regular exercise are reversed among all the women. Here the same two [odds ratios](#def-odds-ratio) are computed separately for the women with diabetes and the women without it:
>
> ``` downlit
> or_by_diabetes <- sapply(c("no", "yes"), function(z) {
>   counts <- table(
>     HT = hers$HT[hers$diabetes == z],
>     exercise = hers$exercise[hers$diabetes == z]
>   )
>   ht <- "hormone therapy"
>   c(
>     ht_odds_ratio = unname(
>       (counts[ht, "yes"] / counts["placebo", "yes"]) /
>         (counts[ht, "no"] / counts["placebo", "no"])
>     ),
>     exercise_odds_ratio = unname(
>       (counts[ht, "yes"] / counts[ht, "no"]) /
>         (counts["placebo", "yes"] / counts["placebo", "no"])
>     )
>   )
> })
> or_by_diabetes
> #>                          no     yes
> #> ht_odds_ratio       1.02222 1.08842
> #> exercise_odds_ratio 1.02222 1.08842
> ```
>
> The first row compares the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of hormone therapy between the women who exercise regularly and those who do not. The second row compares the odds of regular exercise between the hormone therapy and placebo groups. Among the women without diabetes the two odds ratios are 1.022 and 1.022, and among the women with diabetes they are 1.088 and 1.088. In each stratum the two agree, as [Theorem 6](#thm-conditional-odds-ratio-reversible) states. The stratum odds ratios differ from the [odds ratio](#def-odds-ratio) 1.028 of [Example 11](#exm-hers-odds-ratio) for all the women, because the theorem equates the two odds ratios within a stratum, not either one with the marginal odds ratio.

> **NOTE:**
>
> **Definition 9 (Case)** In a study that selects its participants by whether they have an outcome of interest, a **case** is a participant who has the outcome [\[8, Ch. 8\]](#ref-me4).

> **NOTE:**
>
> **Definition 10 (Control)** In a study that selects its participants by whether they have an outcome of interest, a **control** is a participant who does not have the outcome, sampled from the same [population](exploratory-descriptive.llms.md#def-population) as the [cases](#def-case) [\[8, Ch. 8\]](#ref-me4).

> **NOTE:**
>
> **Definition 11 (Case-control study)** A **case-control study** is an observational study that selects its participants by outcome: it includes the [cases](#def-case) of a [population](exploratory-descriptive.llms.md#def-population) and a [sample](exploratory-descriptive.llms.md#def-sample) of [controls](#def-control) from the same population, and then compares the exposure of the two groups [\[8, Ch. 8\]](#ref-me4).

> **NOTE:**
>
> **Example 15 (A case-control study of regular exercise in HERS)** Take the women who exercise regularly as the [cases](#def-case). Draw as many [controls](#def-control) as there are cases, at random, from the women who do not exercise regularly. Then compare the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of hormone therapy between the cases and the controls:
>
> ``` downlit
> set.seed(571)
> cases <- hers[hers$exercise == "yes", ]
> non_cases <- hers[hers$exercise == "no", ]
> controls <- non_cases[sample(nrow(non_cases), nrow(cases)), ]
> odds_ht <- function(d) {
>   sum(d$HT == "hormone therapy") / sum(d$HT == "placebo")
> }
> or_case_control <- odds_ht(cases) / odds_ht(controls)
> or_case_control
> #> [1] 1.03816
> ```
>
> The study has 1068 cases and 1068 controls. Its [odds ratio](#def-odds-ratio) is 1.038, near the odds ratio 1.028 of [Example 11](#exm-hers-odds-ratio) from the whole cohort. The two are close because the odds ratio is reversible ([Theorem 5](#thm-odds-ratio-reversible)): sampling by outcome does not change it, although it would change the [risks](#def-outcome-risk).

> **NOTE:**
>
> *Remark 6* (Controls in experiments). The word “control” has a second meaning. In an experiment, the investigator assigns the exposure. The **controls** are the participants who receive the baseline treatment for comparison, such as a placebo [\[8, Ch. 6\]](#ref-me4). These controls are chosen by assignment, not by outcome. They are not the [controls](#def-control) of a [case-control study](#def-case-control-study).

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

K. J. Rothman, T. L. Lash, T. J. VanderWeele, and S. Haneuse, *Modern epidemiology*, 4th ed. Philadelphia: Wolters Kluwer, 2021.

\[9\]

Wikipedia contributors, “Absolute risk reduction — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Absolute_risk_reduction>

\[10\]

Wikipedia contributors, “Odds ratio — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Odds_ratio>

Back to top

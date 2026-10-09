# Comparing Proportions

Code

Published

Last modified: 2026-10-08 19:43:37 (PDT)

This page reviews tests for comparing groups on a categorical outcome: the chi-square test and Fisher’s exact test for contingency tables. It uses the chi-square reference distribution defined on the [Statistical Inference](inference.llms.md#sec-reference-distributions) page. This page is adapted from Vittinghoff et al. ([2012](#ref-vittinghoff2e)), Chapter 3.

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
> Show R code
>
> ``` downlit
> hers |>
>   gtsummary::tbl_cross(
>     row = exercise,
>     col = HT,
>     label = list(
>       exercise ~ "Exercises regularly",
>       HT ~ "Treatment group"
>     ),
>     percent = "row"
>   )
> ```
>
> [TABLE]
>
> Table 1: Exercise by treatment group in HERS

### 2.2 The chi-square test

> **NOTE:**
>
> **Definition 1 (Expected count under independence)** Let a contingency table have \\r\\ rows and \\c\\ columns, with observed count \\O\_{ij}\\ in row \\i\\ and column \\j\\, row totals \\R_i\\, column totals \\C_j\\, and grand total \\n\\. The **expected count** in cell \\(i, j)\\ under independence is
>
> \\E\_{ij} \stackrel{\text{def}}{=}\frac{R_i \\ C_j}{n}.\\

> **NOTE:**
>
> **Example 2 (Expected count in a 2 x 2 table)** In a table with \\n = 100\\, first-row total \\R_1 = 30\\, and first-column total \\C_1 = 40\\, the expected count in cell \\(1, 1)\\ is \\E\_{11} = 30 \cdot 40 / 100 = 12\\.

> **NOTE:**
>
> **Definition 2 (Pearson’s chi-square test of independence)** With observed counts \\O\_{ij}\\ and [expected counts](#def-expected-count) \\E\_{ij}\\ in an \\r \times c\\ contingency table, **Pearson’s chi-square test** of the null hypothesis that the row and column variables are independent uses the statistic
>
> \\X^2 \stackrel{\text{def}}{=}\sum\_{i=1}^{r} \sum\_{j=1}^{c} \frac{(O\_{ij} - E\_{ij})^2}{E\_{ij}}.\\
>
> Its p-value is \\\Pr(W \ge X^2)\\, where \\W\\ has the \\\chi^2\_{(r-1)(c-1)}\\ distribution ([chi-square distribution](inference.llms.md#def-chi-square-dist)).

> **NOTE:**
>
> **Theorem 1 (Large-sample null distribution of the chi-square statistic)** Let \\n\\ observations be sampled independently and classified by two categorical variables, and let the two variables be independent. Then as \\n \to \infty\\, the distribution of \\X^2\\ ([Definition 2](#def-chi-square-test)) converges to the \\\chi^2\_{(r-1)(c-1)}\\ distribution ([Hogg et al. 2019, sec. 9.2](#ref-hoggtanis2015), p. 440).

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

### 2.3 Fisher’s exact test

> **NOTE:**
>
> **Definition 3 (Fisher’s exact test)** Take a \\2 \times 2\\ contingency table with cells \\a\\, \\b\\, \\c\\, and \\d\\ as in [the contingency table definition](exploratory-descriptive.llms.md#def-contingency-table), and hold its row and column totals fixed. Under independence of the row and column variables, the probability that the top-left cell equals \\x\\ is the hypergeometric probability
>
> \\p(x) \stackrel{\text{def}}{=}\frac{\binom{a+b}{x} \binom{c+d}{a+c-x}}{\binom{n}{a+c}}.\\
>
> **Fisher’s exact test** of independence has p-value
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

### 2.4 Measures of association for \\2 \times 2\\ tables

Tests of independence say whether two binary variables are associated, but not how strongly. Risk differences, risk ratios, and odds ratios measure the strength of the association; see [Odds Ratios and Relative Risks](https://morrison-lab.github.io/rme/chapters/binary-outcome-associations.html#sec-OR-RR).

## References

Hogg, Robert V., Elliot A. Tanis, and Dale L. Zimmerman. 2019. *Probability and Statistical Inference*. Tenth edition. Pearson.

Vittinghoff, Eric, David V Glidden, Stephen C Shiboski, and Charles E McCulloch. 2012. *Regression Methods in Biostatistics: Linear, Logistic, Survival, and Repeated Measures Models*. 2nd ed. Springer. <https://doi.org/10.1007/978-1-4614-1353-0>.

Back to top

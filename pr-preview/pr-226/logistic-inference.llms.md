# Inference for Logistic Regression

Code

Published

Last modified: 2026-10-15 18:18:20 (PDT)

## 1 Introduction

Logistic regression models a binary outcome, such as whether a patient recovers, from one or more predictors. Its fitted coefficients are maximum likelihood estimates, so the likelihood theory of [Introduction to maximum likelihood](intro-MLEs.llms.md#sec-intro-MLEs) gives them standard errors, confidence intervals and tests. This page specializes that theory to the logistic model and introduces the deviance, the measure of fit that the likelihood ratio test of a logistic model is built from.

> **NOTE:**
>
> **Definition 1 (Logistic regression)** A **logistic regression** model for binary outcomes \\y_1, \dots, y_n \in \mathopen{}\left\\0, 1\right\\\mathclose{}\\ with predictor vectors \\\tilde{x}\_1, \dots, \tilde{x}\_n\\ says that the outcomes are independent and that
>
> \\ \Pr\mathopen{}\left(Y_i = 1 \mid \tilde{x}\_i\right)\mathclose{} = \pi_i = \sigma\mathopen{}\left(\tilde{\beta} \cdot \tilde{x}\_i\right)\mathclose{}, \qquad \sigma\mathopen{}\left(u\right)\mathclose{} = \frac{1}{1 + e^{-u}}, \tag{1}\\
>
> where \\\tilde{x}\_i = {\mathopen{}\left(1, x\_{i1}, \dots, x\_{ip}\right)\mathclose{}}^{\top}\\ and \\\tilde{\beta}= {\mathopen{}\left(\beta\_{0}, \beta\_{1}, \dots, \beta\_{p}\right)\mathclose{}}^{\top}\\. The leading \\1\\ in \\\tilde{x}\_i\\ makes \\\beta\_{0}\\ the intercept, and \\\beta\_{j}\\ for \\j \ge 1\\ is the slope for the \\j\\th predictor.

> **NOTE:**
>
> **Example 1 (A six-patient trial)** Six patients are split into a control group, coded \\x= -1\\, and a treatment group, coded \\x= +1\\. The outcome is \\y= 1\\ if the patient recovered. Fitting the model of [Equation 1](#eq-logistic-model) by maximum likelihood gives the coefficients below.
>
> ``` downlit
> # group coded -1 (control) and +1 (treatment); y = 1 means recovered
> wf_x <- rep(c(-1, 1), each = 3)
> wf_y <- c(0, 0, 1, 0, 1, 1)
> # maximum likelihood fit of the logistic model
> wf_fit <- glm(wf_y ~ wf_x, family = binomial)
> # the fitted intercept and slope
> round(coef(wf_fit), 3)
> #> (Intercept)        wf_x 
> #>       0.000       0.693
> ```
>
> The fitted slope is \\\hat{\beta}\_{1} = 0.693\\. The control group recovered at rate \\1/3\\ and the treatment group at \\2/3\\, so the model fits both group proportions exactly.

## 2 Deviance

> **NOTE:**
>
> **Definition 2 (Deviance)** The **deviance** of a fitted logistic regression with labels \\y_i \in \mathopen{}\left\\0, 1\right\\\mathclose{}\\ is minus twice its maximized log-likelihood:
>
> \\ D\stackrel{\text{def}}{=}-2 \\ \ell\mathopen{}\left(\hat{\tilde{\beta}}\right)\mathclose{} = -2 \sum\_{i=1}^n\mathopen{}\left\\y_i \ln \hat\pi_i + \mathopen{}\left(1 - y_i\right)\mathclose{} \ln\mathopen{}\left(1 - \hat\pi_i\right)\mathclose{}\right\\\mathclose{}, \tag{2}\\
>
> where \\\hat\pi_i = \sigma\mathopen{}\left(\hat{\tilde{\beta}} \cdot \tilde{x}\_i\right)\mathclose{}\\ is the fitted probability.

> **NOTE:**
>
> Nelder and Wedderburn ([1972](#ref-nelder1972generalized)) introduced the deviance for the whole family of generalized linear models; logistic regression is the case of Bernoulli outcomes with the logit link. Hastie et al. ([2009, sec. 4.4.2](#ref-hastie2009elements)) defines the residual deviance of a fitted logistic regression as minus twice its log-likelihood.

> **NOTE:**
>
> **Example 2 (The deviance of the six-patient trial)** For the fit of [Example 1](#exm-logistic-regression), R’s `glm` reports the deviance. We check it against [Equation 2](#eq-deviance) computed by hand.
>
> ``` downlit
> # fitted probabilities of recovery
> wf_p <- fitted(wf_fit)
> # minus twice the log-likelihood, from the formula
> wf_dev_hand <- -2 * sum(wf_y * log(wf_p) + (1 - wf_y) * log(1 - wf_p))
> # the deviance that glm reports
> wf_dev_glm <- deviance(wf_fit)
> c(by_hand = wf_dev_hand, glm = wf_dev_glm)
> #> by_hand     glm 
> #> 7.63817 7.63817
> ```
>
> Both give \\D= 7.638\\.

> **NOTE:**
>
> *Remark 1* (Why the deviance measures a shortfall). For labels \\y_i \in \mathopen{}\left\\0, 1\right\\\mathclose{}\\ the largest log-likelihood any model can reach is \\0\\, by giving each label probability \\1\\. So \\D\\ is twice the amount by which the maximized log-likelihood falls short of that largest value.

> **NOTE:**
>
> **Definition 3 (Null deviance)** The **null deviance** is the [deviance](#def-deviance) of the model with an intercept and no other predictors:
>
> \\ D_0= -2 n \mathopen{}\left\\\bar y\ln \bar y+ \mathopen{}\left(1 - \bar y\right)\mathclose{} \ln\mathopen{}\left(1 - \bar y\right)\mathclose{}\right\\\mathclose{}, \tag{3}\\
>
> where \\\bar y\\ is the fraction of labels equal to \\1\\.

> **NOTE:**
>
> **Example 3 (The null deviance of the six-patient trial)** Three of the six patients recovered, so \\\bar y= 1/2\\ and [Equation 3](#eq-null-deviance) gives \\D_0= 2 \times 6 \ln 2\\.
>
> ``` downlit
> # null deviance from the formula with ybar = 1/2
> wf_null_hand <- 2 * 6 * log(2)
> # the null deviance that glm reports
> wf_null_glm <- wf_fit$null.deviance
> c(by_hand = wf_null_hand, glm = wf_null_glm)
> #> by_hand     glm 
> #> 8.31777 8.31777
> ```
>
> Both give \\D_0= 8.318\\.

> **NOTE:**
>
> *Remark 2* (Where the null deviance formula comes from). The intercept-only model gives every observation the same fitted probability, and the maximizing value is the overall fraction \\\bar y\\ of labels equal to \\1\\. Substituting \\\bar y\\ for each \\\hat\pi_i\\ in [Equation 2](#eq-deviance) gives [Equation 3](#eq-null-deviance).

> **NOTE:**
>
> **Theorem 1 (The drop in deviance is the likelihood ratio statistic)** Let \\D_0\\ be the [null deviance](#def-null-deviance) and \\D\\ the [deviance](#def-deviance) of a logistic regression with \\q\\ predictors besides the intercept. Then the [likelihood ratio statistic](intro-MLEs.llms.md#def-lrt-stat) of \\H_0\\: all \\q\\ slopes are zero is
>
> \\ \Lambda= D_0- D. \\

> **NOTE:**
>
> *Proof*. In the notation of the [likelihood ratio statistic](intro-MLEs.llms.md#def-lrt-stat), the unrestricted MLE \\\hat\theta\_{\text{ML}}\\ is the fitted coefficient vector \\\hat{\tilde{\beta}}\\, and \\\hat{\theta}\_0\\ is the fit of the intercept-only model that \\H_0\\ imposes. Then \\\ell\mathopen{}\left(\hat\theta\_{\text{ML}}\right)\mathclose{} = -D/ 2\\ and \\\ell\mathopen{}\left(\hat{\theta}\_0\right)\mathclose{} = -D_0/ 2\\. Substituting both into the definition gives \\\Lambda= 2 \mathopen{}\left(-D/2 + D_0/2\right)\mathclose{} = D_0- D\\.

> **NOTE:**
>
> **Example 4 (The likelihood ratio statistic of the treatment effect)** In the six-patient trial, \\q = 1\\.
>
> ``` downlit
> # drop in deviance, the likelihood ratio statistic
> wf_g2 <- wf_fit$null.deviance - deviance(wf_fit)
> wf_g2
> #> [1] 0.679596
> ```
>
> The statistic is \\0.68\\.

> **NOTE:**
>
> **Corollary 1 (Distribution of the drop in deviance)** Suppose the regularity conditions of [Wilks’ theorem](intro-MLEs.llms.md#thm-wilks) hold for the logistic regression model. Then for a large sample the drop in deviance \\D_0- D\\ has approximately a \\\chi^2_q\\ distribution when \\H_0\\ holds.

> **NOTE:**
>
> *Proof*. By [Theorem 1](#thm-deviance-drop) the drop in deviance is the likelihood ratio statistic of \\q\\ constraints, and [Wilks’ theorem](intro-MLEs.llms.md#thm-wilks) gives its approximate distribution.

> **NOTE:**
>
> **Example 5 (Testing the treatment effect)** For the statistic of [Example 4](#exm-deviance-drop), the p-value comes from the chi-square distribution with \\q = 1\\ degree of freedom.
>
> ``` downlit
> # upper tail of the chi-square distribution with 1 degree of freedom
> wf_g2_p <- pchisq(wf_g2, df = 1, lower.tail = FALSE)
> wf_g2_p
> #> [1] 0.409726
> ```
>
> The p-value is \\0.41\\, so six patients give no evidence of a treatment effect.

## 3 Confidence intervals for the coefficients

> **NOTE:**
>
> **Theorem 2 (Approximate distribution of the fitted coefficients)** Suppose the outcomes follow the [logistic regression model](#def-logistic-regression). Let \\X\\ be the matrix whose rows are \\{\tilde{x}\_i}^{\top}\\, and let \\W\\ be the diagonal matrix with entries \\\pi_i \mathopen{}\left(1 - \pi_i\right)\mathclose{}\\. Under regularity conditions, for a large sample the fitted coefficients are approximately Gaussian,
>
> \\ \hat{\tilde{\beta}}\approx \operatorname{N}\mathopen{}\left(\tilde{\beta}, {\mathopen{}\left({X}^{\top} W X\right)\mathclose{}}^{-1}\right)\mathclose{}. \tag{4}\\

> **NOTE:**
>
> *Proof*. The log-likelihood has score \\{X}^{\top} \mathopen{}\left(\tilde{y}- \tilde{\pi}\right)\mathclose{}\\, and its Hessian is \\-{X}^{\top} W X\\, which does not involve the outcomes. The observed and expected information are therefore both \\{X}^{\top} W X\\. The claim is the Gaussian approximation of the [central limit theorem for MLEs](intro-MLEs.llms.md#thm-dist-mle), with this information in place of the inverse covariance. The result is stated for logistic regression by Hastie et al. ([2009, sec. 4.4.3](#ref-hastie2009elements)). For independent but non-identically distributed outcomes it holds under conditions on the predictors that Fahrmeir and Kaufmann ([1985](#ref-fahrmeir1985consistency)) give.

> **NOTE:**
>
> **Corollary 2 (Wald interval for a logistic coefficient)** Let \\\hat W\\ be \\W\\ with each \\\pi_i\\ replaced by its fitted value. The estimated standard error of \\\hat{\beta}\_{j}\\ is the square root of the diagonal entry of \\{\mathopen{}\left({X}^{\top} \hat W X\right)\mathclose{}}^{-1}\\ in the row and column of \\\beta\_{j}\\; because \\\beta\_{0}\\ comes first, that is the \\(j+1)\\th diagonal entry counting from \\1\\, and a [Wald confidence interval](intro-MLEs.llms.md#def-wald-ci) with level \\1 - \alpha\\ for \\\beta\_{j}\\ is
>
> \\ \hat{\beta}\_{j} \pm z\_{1 - \alpha/2} \\ \mathop{\widehat{\operatorname{se}}}\nolimits\mathopen{}\left(\hat{\beta}\_{j}\right)\mathclose{}. \\

> **NOTE:**
>
> **Example 6 (A Wald interval from six patients)** For the fit of [Example 1](#exm-logistic-regression), `vcov` returns \\{\mathopen{}\left({X}^{\top} \hat W X\right)\mathclose{}}^{-1}\\.
>
> ``` downlit
> # standard errors: square roots of the diagonal of (X'WX)^-1
> wf_se <- sqrt(diag(vcov(wf_fit)))
> wf_slope <- coef(wf_fit)[["wf_x"]]
> # 95% Wald interval for the slope
> wf_ci <- wf_slope + c(-1, 1) * qnorm(0.975) * wf_se[["wf_x"]]
> wf_summary <- c(
>   slope = wf_slope, se = wf_se[["wf_x"]], lower = wf_ci[1], upper = wf_ci[2]
> )
> round(wf_summary, 3)
> #>  slope     se  lower  upper 
> #>  0.693  0.866 -1.004  2.391
> ```
>
> The interval for \\\beta\_{1}\\ is \\(-1, 2.39)\\. It contains \\0\\, consistent with the test of [Example 5](#exm-deviance-drop-distribution).

> **NOTE:**
>
> **Corollary 3 (Interval for the odds factor of a logistic coefficient)** If \\\mathopen{}\left(L, U\right)\mathclose{}\\ is a confidence interval for \\\beta\_{j}\\ from [Corollary 2](#cor-logistic-wald), then \\\mathopen{}\left(e^{L}, e^{U}\right)\mathclose{}\\ is a confidence interval with the same level for \\e^{\beta\_{j}}\\, the factor by which a one-unit increase in \\x_j\\, holding the other predictors fixed, multiplies the odds of \\y= 1\\.

> **NOTE:**
>
> *Proof*. The exponential function is increasing, so \\L \le \beta\_{j} \le U\\ holds exactly when \\e^{L} \le e^{\beta\_{j}} \le e^{U}\\.

> **NOTE:**
>
> **Example 7 (How little six patients tell us)** The two groups of [Example 1](#exm-logistic-regression) sit two units apart on the \\x\\ scale, so the odds ratio between them is \\e^{2 \beta\_{1}}\\.
>
> ``` downlit
> # fitted group odds ratio, and its interval: exponentiate twice the slope
> wf_group_or_hat <- exp(2 * wf_slope)
> wf_group_or <- exp(2 * wf_ci)
> c(estimate = wf_group_or_hat, lower = wf_group_or[1], upper = wf_group_or[2])
> #>   estimate      lower      upper 
> #>   4.000000   0.134195 119.229587
> ```
>
> The fitted odds of recovery in the treatment group are \\4\\ times those in the control group, with interval \\(0.13, 119.2)\\. The interval runs from a strong harm to a large benefit. Its width shows how little information six observations carry about the slope.

## References

Fahrmeir, Ludwig, and Heinz Kaufmann. 1985. “Consistency and Asymptotic Normality of the Maximum Likelihood Estimator in Generalized Linear Models.” *The Annals of Statistics* 13 (1): 342–68. <https://doi.org/10.1214/aos/1176346597>.

Hastie, Trevor, Robert Tibshirani, and Jerome Friedman. 2009. *The Elements of Statistical Learning: Data Mining, Inference, and Prediction*. 2nd ed. Springer. <https://doi.org/10.1007/978-0-387-84858-7>.

Nelder, John A., and Robert W. M. Wedderburn. 1972. “Generalized Linear Models.” *Journal of the Royal Statistical Society: Series A (General)* 135 (3): 370–84. <https://doi.org/10.2307/2344614>.

Back to top

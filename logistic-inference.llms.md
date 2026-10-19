# Inference for Logistic Regression

Code

Published

Last modified: 2026-10-19 00:18:04 (PDT)

## 1 Introduction

Logistic regression models a binary outcome, such as whether a patient recovers, from one or more predictors. Its fitted coefficients are maximum likelihood estimates, so the likelihood theory of [Introduction to maximum likelihood](intro-MLEs.llms.md#sec-intro-MLEs) gives them standard errors, confidence intervals and tests. This page specializes that theory to the logistic model and introduces the deviance, the measure of fit that the likelihood ratio test of a logistic model is built from [\[1\]](#ref-wikipedia_likelihood_ratio_test).

> **NOTE:**
>
> **Definition 1 (Logistic regression)** A **logistic regression** model for binary outcomes \\y_1, \dots, y_n \in \mathopen{}\left\\0, 1\right\\\mathclose{}\\ with predictor vectors \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_1, \dots, \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_n\\ says that the outcomes are independent and that [\[2\]](#ref-wikipedia_logistic_regression)
>
> \\ \Pr\mathopen{}\left(Y_i= 1 \mid \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_i\right)\mathclose{} = \pi_i = \sigma\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}} \cdot \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_i\right)\mathclose{}, \qquad \sigma\mathopen{}\left(u\right)\mathclose{} = \frac{1}{1 + e^{-u}}, \tag{1}\\
>
> where \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_i= {\mathopen{}\left(1, x\_{i1}, \dots, x\_{ip}\right)\mathclose{}}^{\top}\\ and \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}= {\mathopen{}\left(\beta\_{0}, \beta\_{1}, \dots, \beta\_{p}\right)\mathclose{}}^{\top}\\. The leading \\1\\ in \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_i\\ makes \\\beta\_{0}\\ the intercept, and \\\beta\_{j}\\ for \\j \ge 1\\ is the slope for the \\j\\th predictor.
>
> Source: Wikipedia contributors [\[2\]](#ref-wikipedia_logistic_regression).

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
> **Definition 2 (Deviance)** The **deviance** of a fitted logistic regression with labels \\y_i\in \mathopen{}\left\\0, 1\right\\\mathclose{}\\ is minus twice its maximized log-likelihood:
>
> \\ D\stackrel{\text{def}}{=}-2 \\ \ell\mathopen{}\left(\hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{} = -2 \sum\_{i=1}^n\mathopen{}\left\\y_i\ln \hat\pi_i + \mathopen{}\left(1 - y_i\right)\mathclose{} \ln\mathopen{}\left(1 - \hat\pi_i\right)\mathclose{}\right\\\mathclose{}, \tag{2}\\
>
> where \\\hat\pi_i = \sigma\mathopen{}\left(\hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}} \cdot \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_i\right)\mathclose{}\\ is the fitted probability.
>
> Source: Wikipedia contributors [\[3\]](#ref-wikipedia_deviance_statistics).

> **NOTE:**
>
> Nelder and Wedderburn [\[4\]](#ref-nelder1972generalized) introduced the deviance for the whole family of generalized linear models; logistic regression is the case of Bernoulli outcomes with the logit link. Hastie et al. [\[5, Sec. 4.4.2\]](#ref-hastie2009elements) defines the residual deviance of a fitted logistic regression as minus twice its log-likelihood.

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
> *Remark 1* (Why the deviance measures a shortfall). For labels \\y_i\in \mathopen{}\left\\0, 1\right\\\mathclose{}\\ the largest log-likelihood any model can reach is \\0\\, by giving each label probability \\1\\. So \\D\\ is twice the amount by which the maximized log-likelihood falls short of that largest value.

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
> *Proof*. In the notation of the [likelihood ratio statistic](intro-MLEs.llms.md#def-lrt-stat), the unrestricted MLE \\\hat\theta\_{\text{ML}}\\ is the fitted coefficient vector \\\hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}}\\, and \\\hat{\theta}\_0\\ is the fit of the intercept-only model that \\H_0\\ imposes. Then \\\ell\mathopen{}\left(\hat\theta\_{\text{ML}}\right)\mathclose{} = -D/ 2\\ and \\\ell\mathopen{}\left(\hat{\theta}\_0\right)\mathclose{} = -D_0/ 2\\. Substituting both into the definition gives \\\Lambda= 2 \mathopen{}\left(-D/2 + D_0/2\right)\mathclose{} = D_0- D\\.

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

## 3 Covariate patterns and the saturated model

> **NOTE:**
>
> **Definition 4 (Covariate pattern)** A **covariate pattern** is a distinct value of the predictor vector among the observations \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_1, \dots, \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_n\\. The \\K\\ distinct values are written \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}^{(1)}, \dots, \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}^{(K)}\\, so \\K\le n\\.

> **NOTE:**
>
> **Definition 5 (Replicates)** The **replicates** of the [covariate pattern](#def-covariate-pattern) \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}^{(k)}\\ are the observations \\i\\ with \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_i= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}^{(k)}\\. Their number is written \\m_k\\, so \\\sum\_{k=1}^{K}m_k = n\\.

> **NOTE:**
>
> Dobson and Barnett [\[6, Sec. 5.5\]](#ref-dobson4e) introduces both terms: observations that share a combination of factor levels and the same values of any continuous predictors have the same covariate pattern, and are called replicates.

> **NOTE:**
>
> **Definition 6 (Events at a covariate pattern)** The number of **events** at the [covariate pattern](#def-covariate-pattern) \\\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}^{(k)}\\ is the sum of the binary outcomes over its [replicates](#def-replicates):
>
> \\ s_k = \sum\_{i:\\ \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_i= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}^{(k)}} y_i, \\
>
> so \\0 \le s_k \le m_k\\.

> **NOTE:**
>
> **Example 6 (Covariate patterns in the low-birth-weight data)** The `birthwt` data record whether each of 189 babies had low birth weight (`low = 1`, under 2.5 kg), along with the mother’s smoking status and race, among other predictors [\[7\]](#ref-hosmer1989applied). Take `smoke` (0 or 1) and `race` (1, 2 or 3) as the predictors. Counting the distinct pairs, and the babies and low-weight births at each, gives one row per [covariate pattern](#def-covariate-pattern).
>
> ``` downlit
> bw <- read.csv("data/birthwt.csv")
> bw$race <- factor(bw$race)
> # one row per covariate pattern: replicates and events
> bw_grouped <- bw |>
>   dplyr::summarize(
>     nreps = dplyr::n(),
>     nevents = sum(low),
>     .by = c(smoke, race)
>   ) |>
>   dplyr::arrange(smoke, race)
> bw_grouped
> ```
>
> There are \\K= 6\\ covariate patterns among \\n= 189\\ babies. The pattern with the most [replicates](#def-replicates) has `smoke` = 0 and `race` = 3, and it has 55 of them.

> **NOTE:**
>
> **Definition 7 (Saturated model (full model, maximal model))** The **saturated model** (also called the **full model** [\[6, Sec. 5.5\]](#ref-dobson4e) or **maximal model** [\[6, Sec. 5.5\]](#ref-dobson4e)) for binary outcomes gives each pattern its own free event probability:
>
> \\ \Pr\mathopen{}\left(Y_i= 1 \mid \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_i= \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}^{(k)}\right)\mathclose{} = \pi_k, \qquad k = 1, \dots, K, \tag{4}\\
>
> with the outcomes independent given the predictors.
>
> Source: Wikipedia contributors [\[8\]](#ref-wikipedia_saturated_model).

> **NOTE:**
>
> Dobson and Barnett [\[6, Sec. 5.5\]](#ref-dobson4e) defines the saturated model as the model with the maximum number of parameters that can be estimated, one per distinct covariate pattern, and says it is also called a maximal or full model. In model selection, “full model” often means something else: the model with every candidate predictor [\[6, Sec. 6.3\]](#ref-dobson4e). That model is generally smaller than the saturated model.

> **NOTE:**
>
> **Theorem 2 (The saturated model fits each pattern’s observed proportion)** The maximum likelihood estimate of \\\pi_k\\ in the [saturated model](#def-saturated-model) is the observed proportion of [events](#def-pattern-events) among the replicates of pattern \\k\\:
>
> \\ \hat\pi_k = \frac{s_k}{m_k}. \\

> **NOTE:**
>
> *Proof*. Independence gives each pattern its own log-likelihood term, and the outcomes at pattern \\k\\ contribute \\s_k \ln \pi_k + \mathopen{}\left(m_k - s_k\right)\mathclose{} \ln\mathopen{}\left(1 - \pi_k\right)\mathclose{}\\. The terms share no parameters, so each is maximized on its own. First suppose \\0 \< s_k \< m_k\\, so that both logarithms are defined for \\0 \< \pi_k \< 1\\. Setting the derivative with respect to \\\pi_k\\ to zero gives \\s_k / \pi_k - \mathopen{}\left(m_k - s_k\right)\mathclose{} / \mathopen{}\left(1 - \pi_k\right)\mathclose{} = 0\\. Multiplying through by \\\pi_k \mathopen{}\left(1 - \pi_k\right)\mathclose{}\\ gives \\s_k \mathopen{}\left(1 - \pi_k\right)\mathclose{} = \mathopen{}\left(m_k - s_k\right)\mathclose{} \pi_k\\. Expanding gives \\s_k - s_k \pi_k = m_k \pi_k - s_k \pi_k\\. Adding \\s_k \pi_k\\ to both sides gives \\s_k = m_k \pi_k\\. Dividing both sides by \\m_k\\ gives \\\hat\pi_k = s_k / m_k\\. The log-likelihood term increases to this point and decreases after it, so the point is a maximum. Now suppose \\s_k = 0\\. A count of \\0\\ times a logarithm is taken as \\0\\, so the term is \\m_k \ln\mathopen{}\left(1 - \pi_k\right)\mathclose{}\\, which decreases in \\\pi_k\\ and so peaks at \\\pi_k = 0\\. Next suppose \\s_k = m_k\\. By the same convention, the term is \\m_k \ln \pi_k\\, which peaks at \\\pi_k = 1\\. Both agree with \\s_k / m_k\\.

> **NOTE:**
>
> **Definition 8 (Deviance relative to the saturated model)** The **deviance relative to the saturated model** of a fitted model is twice the amount by which its maximized log-likelihood \\\ell\mathopen{}\left(\hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}\\ falls short of the maximized log-likelihood \\\ell\_{\mathrm{sat}}\\ of the [saturated model](#def-saturated-model):
>
> \\ D\_{\mathrm{sat}}= 2 \mathopen{}\left(\ell\_{\mathrm{sat}}- \ell\mathopen{}\left(\hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}\right)\mathclose{}. \tag{5}\\

> **NOTE:**
>
> **Theorem 3 (The deviance relative to the saturated model, from grouped counts)** For a fitted logistic regression with fitted event probabilities \\\hat\pi_k\\ at the \\K\\ covariate patterns,
>
> \\ D\_{\mathrm{sat}} = 2 \sum\_{k=1}^{K}\mathopen{}\left\\s_k \ln\mathopen{}\left(\frac{s_k}{m_k \hat\pi_k}\right)\mathclose{} + \mathopen{}\left(m_k - s_k\right)\mathclose{} \ln\mathopen{}\left(\frac{m_k - s_k}{m_k \mathopen{}\left(1 - \hat\pi_k\right)\mathclose{}}\right)\mathclose{}\right\\\mathclose{}, \tag{6}\\
>
> where a term with \\s_k = 0\\ or \\s_k = m_k\\ contributes \\0\\ in its zero-count part.

> **NOTE:**
>
> *Proof*. Grouping the outcomes by pattern, the fitted model’s log-likelihood is \\\ell\mathopen{}\left(\hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{} = \sum\_{k=1}^{K}\mathopen{}\left\\s_k \ln \hat\pi_k + \mathopen{}\left(m_k - s_k\right)\mathclose{} \ln\mathopen{}\left(1 - \hat\pi_k\right)\mathclose{}\right\\\mathclose{}\\. By [Theorem 2](#thm-saturated-mle), the saturated log-likelihood is the same sum with \\\hat\pi_k\\ replaced by \\s_k / m_k\\. Subtracting the fitted from the saturated log-likelihood, term by term, replaces each \\\ln\mathopen{}\left(s_k / m_k\right)\mathclose{} - \ln \hat\pi_k\\ by \\\ln\mathopen{}\left(s_k / \mathopen{}\left(m_k \hat\pi_k\right)\mathclose{}\right)\mathclose{}\\, and likewise for the non-events. Multiplying by \\2\\, as [Equation 5](#eq-saturated-deviance) does, gives [Equation 6](#eq-saturated-deviance-grouped). A count of \\0\\ times \\\ln 0\\ is taken as \\0\\, its limit.

> **NOTE:**
>
> Dobson and Barnett [\[6, Sec. 5.6.1\]](#ref-dobson4e) derives the deviance of a binomial model relative to the saturated model, and Section 7.5 writes it in the form of [Equation 6](#eq-saturated-deviance-grouped). Section 7.5 also notes that when every observation has its own covariate pattern, so each count is \\0\\ or \\1\\, this deviance is not a useful measure of fit.

> **NOTE:**
>
> **Corollary 2 (The deviance is the saturated-model deviance shifted by a constant)** The [deviance](#def-deviance) of a fitted logistic regression and its [deviance relative to the saturated model](#def-saturated-deviance) differ by a constant that depends on the data and not on the fitted model:
>
> \\ D= D\_{\mathrm{sat}}- 2 \ell\_{\mathrm{sat}}. \\

> **NOTE:**
>
> *Proof*. [Definition 2](#def-deviance) gives \\D= -2 \ell\mathopen{}\left(\hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}\\. Distributing the \\2\\ in [Equation 5](#eq-saturated-deviance) gives \\D\_{\mathrm{sat}}= 2 \ell\_{\mathrm{sat}}- 2 \ell\mathopen{}\left(\hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}\\. Substituting \\D= -2 \ell\mathopen{}\left(\hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}\\ into this expression gives \\D\_{\mathrm{sat}}= 2 \ell\_{\mathrm{sat}}+ D\\. Subtracting \\2 \ell\_{\mathrm{sat}}\\ from both sides gives the claim.

> **NOTE:**
>
> *Remark 6* (Why the shift does not change the drop in deviance). The constant \\2 \ell\_{\mathrm{sat}}\\ in [Corollary 2](#cor-deviance-shift) is the same for every model fit to the same data, because the saturated model depends only on the data. So the difference between the deviances of two models, such as the drop in deviance of [Theorem 1](#thm-deviance-drop), is the same whether it is computed from \\D\\ or from \\D\_{\mathrm{sat}}\\. The two deviances differ in their size, though: when every pattern has one replicate, the saturated model fits every label exactly, \\\ell\_{\mathrm{sat}}= 0\\, and \\D\_{\mathrm{sat}}= D\\.

> **NOTE:**
>
> **Example 7 (The deviance of the low-birth-weight model, ungrouped and grouped)** Fit a logistic regression of low birth weight on smoking and race, once to the 189 individual babies and once to the 6 grouped counts of [Example 6](#exm-covariate-patterns). R’s [`deviance()`](https://rdrr.io/r/stats/deviance.html) is the deviance of [Definition 2](#def-deviance) for the first fit and the deviance relative to the saturated model of [Definition 8](#def-saturated-deviance) for the second. We check the second against [Equation 6](#eq-saturated-deviance-grouped) computed by hand.
>
> ``` downlit
> # fit to the individual babies
> bw_fit <- glm(low ~ smoke + race, family = binomial, data = bw)
> # fit to the grouped counts: events and non-events at each pattern
> bw_fit_grouped <- glm(
>   cbind(nevents, nreps - nevents) ~ smoke + race,
>   family = binomial,
>   data = bw_grouped
> )
> # fitted probability at each pattern
> bw_phat <- fitted(bw_fit_grouped)
> # one term of the grouped formula; a zero count contributes 0
> bw_term <- function(count, expected) {
>   ifelse(count == 0, 0, count * log(count / expected))
> }
> bw_sat_dev_hand <- 2 * sum(
>   bw_term(bw_grouped$nevents, bw_grouped$nreps * bw_phat) +
>     bw_term(
>       bw_grouped$nreps - bw_grouped$nevents,
>       bw_grouped$nreps * (1 - bw_phat)
>     )
> )
> c(
>   by_hand = bw_sat_dev_hand,
>   glm_grouped = deviance(bw_fit_grouped),
>   glm_ungrouped = deviance(bw_fit)
> )
> #>       by_hand   glm_grouped glm_ungrouped 
> #>       3.15694       3.15694     219.97471
> ```
>
> The deviance relative to the saturated model is \\D\_{\mathrm{sat}}= 3.157\\ on the grouped counts, and the deviance is \\D= 219.975\\ on the individual babies.

> **NOTE:**
>
> **Example 8 (The shift between the two deviances)** For the two fits of [Example 7](#exm-saturated-deviance), [Corollary 2](#cor-deviance-shift) says that \\D- D\_{\mathrm{sat}}= -2 \ell\_{\mathrm{sat}}\\. The left side is 216.818. We compute the right side from the observed proportions of [Theorem 2](#thm-saturated-mle).
>
> ``` downlit
> # twice the saturated log-likelihood, from the observed proportions
> bw_phat_sat <- bw_grouped$nevents / bw_grouped$nreps
> bw_two_llik_sat <- 2 * sum(
>   ifelse(bw_grouped$nevents == 0, 0, bw_grouped$nevents * log(bw_phat_sat)) +
>     ifelse(
>       bw_grouped$nreps == bw_grouped$nevents,
>       0,
>       (bw_grouped$nreps - bw_grouped$nevents) * log(1 - bw_phat_sat)
>     )
> )
> c(
>   difference = deviance(bw_fit) - deviance(bw_fit_grouped),
>   minus_two_llik_sat = -bw_two_llik_sat
> )
> #>         difference minus_two_llik_sat 
> #>            216.818            216.818
> ```

## 4 Confidence intervals for the coefficients

> **NOTE:**
>
> **Theorem 4 (Approximate distribution of the fitted coefficients)** Suppose the outcomes follow the [logistic regression model](#def-logistic-regression). Let \\X\\ be the matrix whose rows are \\{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{x}}\vphantom{x}}\_i}^{\top}\\, and let \\W\\ be the diagonal matrix with entries \\\pi_i \mathopen{}\left(1 - \pi_i\right)\mathclose{}\\. Under regularity conditions, for a large sample the fitted coefficients are approximately Gaussian,
>
> \\ \hat{\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}}\approx \operatorname{N}\mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\beta}}\vphantom{\beta}}, {\mathopen{}\left({X}^{\top} W X\right)\mathclose{}}^{-1}\right)\mathclose{}. \tag{7}\\

> **NOTE:**
>
> *Proof*. The log-likelihood has score \\{X}^{\top} \mathopen{}\left(\mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{y}}\vphantom{y}}- \mathord{\smash\[b\]{\underset{\raise.3ex\hbox{\$\scriptstyle\sim\$}}{\pi}}\vphantom{\pi}}\right)\mathclose{}\\, and its Hessian is \\-{X}^{\top} W X\\, which does not involve the outcomes. The observed and expected information are therefore both \\{X}^{\top} W X\\. The claim is the Gaussian approximation of the [central limit theorem for MLEs](intro-MLEs.llms.md#thm-dist-mle), with this information in place of the inverse covariance. The result is stated for logistic regression by Hastie et al. [\[5, Sec. 4.4.3\]](#ref-hastie2009elements). For independent but non-identically distributed outcomes it holds under conditions on the predictors that Fahrmeir and Kaufmann [\[9\]](#ref-fahrmeir1985consistency) give.

> **NOTE:**
>
> **Corollary 3 (Wald interval for a logistic coefficient)** Let \\\hat W\\ be \\W\\ with each \\\pi_i\\ replaced by its fitted value. The estimated standard error of \\\hat{\beta}\_{j}\\ is the square root of the diagonal entry of \\{\mathopen{}\left({X}^{\top} \hat W X\right)\mathclose{}}^{-1}\\ in the row and column of \\\beta\_{j}\\; because \\\beta\_{0}\\ comes first, that is the \\(j+1)\\th diagonal entry counting from \\1\\, and a [Wald confidence interval](intro-MLEs.llms.md#def-wald-ci) with level \\1 - \alpha\\ for \\\beta\_{j}\\ is
>
> \\ \hat{\beta}\_{j} \pm z\_{1 - \alpha/2} \\ \mathop{\widehat{\operatorname{se}}}\nolimits\mathopen{}\left(\hat{\beta}\_{j}\right)\mathclose{}. \\

> **NOTE:**
>
> **Example 9 (A Wald interval from six patients)** For the fit of [Example 1](#exm-logistic-regression), `vcov` returns \\{\mathopen{}\left({X}^{\top} \hat W X\right)\mathclose{}}^{-1}\\.
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
> **Corollary 4 (Interval for the odds factor of a logistic coefficient)** If \\\mathopen{}\left(L, U\right)\mathclose{}\\ is a confidence interval for \\\beta\_{j}\\ from [Corollary 3](#cor-logistic-wald), then \\\mathopen{}\left(e^{L}, e^{U}\right)\mathclose{}\\ is a confidence interval with the same level for \\e^{\beta\_{j}}\\, the factor by which a one-unit increase in \\x_j\\, holding the other predictors fixed, multiplies the odds of \\y= 1\\.

> **NOTE:**
>
> *Proof*. The exponential function is increasing, so \\L \le \beta\_{j} \le U\\ holds exactly when \\e^{L} \le e^{\beta\_{j}} \le e^{U}\\.

> **NOTE:**
>
> **Example 10 (How little six patients tell us)** The two groups of [Example 1](#exm-logistic-regression) sit two units apart on the \\x\\ scale, so the odds ratio between them is \\e^{2 \beta\_{1}}\\.
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

\[1\]

Wikipedia contributors, “Likelihood-ratio test — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Likelihood-ratio_test>

\[2\]

Wikipedia contributors, “Logistic regression — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Logistic_regression>

\[3\]

Wikipedia contributors, “Deviance (statistics) — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Deviance_%28statistics%29>

\[4\]

J. A. Nelder and R. W. M. Wedderburn, “Generalized linear models,” *Journal of the Royal Statistical Society: Series A (General)*, vol. 135, no. 3, pp. 370–384, 1972, doi: [10.2307/2344614](https://doi.org/10.2307/2344614).

\[5\]

T. Hastie, R. Tibshirani, and J. Friedman, *The elements of statistical learning: Data mining, inference, and prediction*, 2nd ed. Springer, 2009. doi: [10.1007/978-0-387-84858-7](https://doi.org/10.1007/978-0-387-84858-7).

\[6\]

A. J. Dobson and A. G. Barnett, *An introduction to generalized linear models*, 4th ed. CRC press, 2018. doi: [10.1201/9781315182780](https://doi.org/10.1201/9781315182780).

\[7\]

D. W. Hosmer and S. Lemeshow, *Applied logistic regression*. New York: Wiley, 1989.

\[8\]

Wikipedia contributors, “Saturated model — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Saturated_model>

\[9\]

L. Fahrmeir and H. Kaufmann, “Consistency and asymptotic normality of the maximum likelihood estimator in generalized linear models,” *The Annals of Statistics*, vol. 13, no. 1, pp. 342–368, 1985, doi: [10.1214/aos/1176346597](https://doi.org/10.1214/aos/1176346597).

Back to top

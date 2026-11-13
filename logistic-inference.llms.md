# Inference for Logistic Regression

Code

Published

Last modified: 2026-11-13 00:22:44 (PST)

# 1 Introduction

Logistic regression models a binary outcome, such as whether a patient recovers, from one or more predictors. Its fitted coefficients are maximum likelihood estimates, so the likelihood theory of [Introduction to maximum likelihood](intro-MLEs.llms.md#sec-intro-MLEs) gives them standard errors, confidence intervals and tests. This page specializes that theory to the logistic model and introduces the deviance, the measure of fit that the likelihood ratio test of a logistic model is built from [\[1\]](#ref-wikipedia_likelihood_ratio_test).

> **NOTE:**
>
> **Definition 1 (Logistic regression)** A **logistic regression** model for binary outcomes $y_1, \dots, y_n \in {\mathopen{}\left\{0, 1\right\}\mathclose{}}$ with predictor vectors $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_1, \dots, \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_n$ says that the outcomes are [independent](https://morrison-lab.github.io/pds/independence.html#def-indpt) and that
>
> $${\Pr\mathopen{}\left(Y_i= 1 \mid \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_i\right)\mathclose{}} = \pi_i
> = {\operatorname{expit}\mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_i\right)\mathclose{}},
> \qquad
> {\operatorname{expit}\mathopen{}\left(u\right)\mathclose{}} = \frac{1}{1 + e^{-u}},
> \tag{1}$$
>
> where $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_i= {\mathopen{}\left(1, x_{i1}, \dots, x_{ip}\right)\mathclose{}}^{\top}$ and $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}= {\mathopen{}\left(\beta_{0}, \beta_{1}, \dots, \beta_{p}\right)\mathclose{}}^{\top}$. The leading $1$ in $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_i$ makes $\beta_{0}$ the intercept, and $\beta_{j}$ for $j \ge 1$ is the slope for the $j$th predictor.
>
> Source: Wikipedia contributors [\[2\]](#ref-wikipedia_logistic_regression).

> **NOTE:**
>
> **Example 1 (A six-patient trial)** Six patients are split into a control group, coded $x= -1$, and a treatment group, coded $x= +1$. The outcome is $y= 1$ if the patient recovered. Fitting the model of [Equation 1](#eq-logistic-model) by maximum likelihood gives the coefficients below.
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
> The fitted slope is $\hat{\beta}_{1} = 0.693$. The control group recovered at rate $1/3$ and the treatment group at $2/3$, so the model fits both group proportions exactly.

# 2 Odds and the coefficients

> **NOTE:**
>
> **Lemma 1 (The log-odds in a logistic regression model)** In the [logistic regression model](#def-logistic-regression) of [Equation 1](#eq-logistic-model), the [log-odds](https://morrison-lab.github.io/pds/probability-basics.html#def-log-odds) of $Y= 1$ at [predictor](https://morrison-lab.github.io/pds/expectation.html#def-input) vector $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ are
>
> $${\eta\mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}} = \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}.$$

> **NOTE:**
>
> *Proof*. Write $u \stackrel{\text{def}}{=}\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ and $\pi\stackrel{\text{def}}{=}{\operatorname{expit}\mathopen{}\left(u\right)\mathclose{}}$, so that
>
> $$\begin{aligned}
> 1 - \pi
> &= 1 - \frac{1}{1 + \text{e}^{-u}}
> && \text{(the logistic model)}
> \\
> &= \frac{1 + \text{e}^{-u}}{1 + \text{e}^{-u}} - \frac{1}{1 + \text{e}^{-u}}
> && \text{(write } 1 \text{ over the denominator } 1 + \text{e}^{-u} \text{)}
> \\
> &= \frac{\mathopen{}\left(1 + \text{e}^{-u}\right)\mathclose{} - 1}{1 + \text{e}^{-u}}
> && \text{(subtract fractions with the same denominator)}
> \\
> &= \frac{\text{e}^{-u}}{1 + \text{e}^{-u}}.
> && \text{(} \mathopen{}\left(1 + a\right)\mathclose{} - 1 = a \text{)}
> \end{aligned}$$
>
> The first step substitutes the model of [Equation 1](#eq-logistic-model). So the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) are
>
> $$\begin{aligned}
> \frac{\pi}{1 - \pi}
> &= \frac{1 / \mathopen{}\left(1 + \text{e}^{-u}\right)\mathclose{}}{\text{e}^{-u} / \mathopen{}\left(1 + \text{e}^{-u}\right)\mathclose{}}
> && \text{(the logistic model, and the display for } 1 - \pi\text{)}
> \\
> &= \frac{1}{\text{e}^{-u}}
> && \text{(divide fractions with the same denominator)}
> \\
> &= \text{e}^{u},
> && \text{(} 1 / \text{e}^{-u} = \text{e}^{u} \text{)}
> \end{aligned}$$
>
> and the [log-odds](https://morrison-lab.github.io/pds/probability-basics.html#def-log-odds) are ${\operatorname{log}\mathopen{}\left\{\text{e}^{u}\right\}\mathclose{}} = u = \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$.

> **NOTE:**
>
> **Example 2 (The log-odds of recovery in the six-patient trial)**  
>
> In the [six-patient trial](#exm-logistic-regression), a treated patient has $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}= {\mathopen{}\left(1, 1\right)\mathclose{}}^{\top}$. Under the [maximum likelihood fit](intro-MLEs.llms.md#def-mle), the code computes the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) of recovery, its [log-odds](https://morrison-lab.github.io/pds/probability-basics.html#def-log-odds), and the [dot product](https://morrison-lab.github.io/mds/linear-algebra-vectors.html#def-dot-product) $\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$.
>
> ``` downlit
> # fitted probability of recovery for a treated patient (x = +1)
> wf_treated_data <- tibble::tibble(wf_x = 1)
> wf_prob_treated <- predict(wf_fit, wf_treated_data, type = "response")
> wf_prob_treated <- unname(wf_prob_treated)
> wf_log_odds_treated <- log(wf_prob_treated / (1 - wf_prob_treated))
> wf_coef <- coef(wf_fit)
> wf_dot_treated <- sum(wf_coef)
> c(prob = wf_prob_treated, log_odds = wf_log_odds_treated, dot = wf_dot_treated)
> #>     prob log_odds      dot 
> #> 0.666667 0.693147 0.693147
> ```
>
> That probability is $0.6667$, and both the log-odds and the dot product are $0.6931$, as [Lemma 1](#lem-logistic-log-odds) states.

> **NOTE:**
>
> **Definition 2 (Odds multiplier)** Let:
>
> - $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}$ be the coefficient vector of a [logistic regression model](#def-logistic-regression).
> - $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ be a change in the [predictor](https://morrison-lab.github.io/pds/expectation.html#def-input) vector, whose first entry is $0$, because every predictor vector has first entry $1$.
>
> The **odds multiplier** of $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ is the [exponential](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-exponential-function) of the [dot product](https://morrison-lab.github.io/mds/linear-algebra-vectors.html#def-dot-product) of $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}$ with $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$:
>
> $${\theta_{\omega}\mathopen{}\left(\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}} \stackrel{\text{def}}{=}\text{e}^{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}}.$$

> **NOTE:**
>
> **Example 3 (The odds multiplier of moving from control to treatment)**  
>
> In the [six-patient trial](#exm-logistic-regression), moving a patient from the control group ($x= -1$) to the treatment group ($x= +1$) changes the predictor vector by $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}= {\mathopen{}\left(0, 2\right)\mathclose{}}^{\top}$. The code computes the [odds multiplier](#def-odds-multiplier) of that change under the [maximum likelihood fit](intro-MLEs.llms.md#def-mle).
>
> ``` downlit
> # change in the predictor vector from control to treatment
> wf_change <- c(0, 2)
> wf_change_terms <- coef(wf_fit) * wf_change
> wf_change_dot <- sum(wf_change_terms)
> wf_multiplier <- exp(wf_change_dot)
> wf_multiplier
> #> [1] 4
> ```
>
> That odds multiplier is $\text{e}^{2 \hat{\beta}_{x}} = 4$.

> **NOTE:**
>
> **Example 4 (The risk ratio is not the odds multiplier)**  
>
> In the [six-patient trial](#exm-logistic-regression), the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) of recovery under the [maximum likelihood fit](intro-MLEs.llms.md#def-mle) is $2/3$ in the treatment group and $1/3$ in the control group. The code computes the [risk ratio](categorical-tests.llms.md#def-risk-ratio) of treatment against control, and shows beside it the [odds multiplier](#def-odds-multiplier) of the change $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}= {\mathopen{}\left(0, 2\right)\mathclose{}}^{\top}$ from [Example 3](#exm-odds-multiplier).
>
> ``` downlit
> # fitted probabilities of recovery: control (x = -1), treatment (x = +1)
> wf_group_codes <- c(-1, 1)
> wf_groups <- tibble::tibble(wf_x = wf_group_codes)
> wf_probs <- predict(wf_fit, wf_groups, type = "response")
> wf_probs <- unname(wf_probs)
> wf_prob_ratio <- wf_probs[2] / wf_probs[1]
> c(risk_ratio = wf_prob_ratio, odds_multiplier = wf_multiplier)
> #>      risk_ratio odds_multiplier 
> #>               2               4
> ```
>
> The risk ratio is $2$, but the odds multiplier is $4$. The odds multiplier compares [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds), $2$ against $1/2$, while the risk ratio compares probabilities.

> **NOTE:**
>
> **Theorem 1 (A change in the predictors multiplies the odds by its odds multiplier)** Let:
>
> - $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ be a [predictor](https://morrison-lab.github.io/pds/expectation.html#def-input) vector in the [logistic regression model](#def-logistic-regression) of [Equation 1](#eq-logistic-model).
> - $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ be a change in the predictor vector, with first entry $0$.
> - $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}' \stackrel{\text{def}}{=}\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}+ \Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$.
>
> Then the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of $Y= 1$ at $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}'$ are the odds at $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ times the [odds multiplier](#def-odds-multiplier) of $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$:
>
> $${\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}'\right\}\mathclose{}} = {\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right\}\mathclose{}} \, {\theta_{\omega}\mathopen{}\left(\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}}.$$

> **NOTE:**
>
> *Proof*. The [log-odds](https://morrison-lab.github.io/pds/probability-basics.html#def-log-odds) are the [natural logarithm](https://morrison-lab.github.io/mds/algebra-exponentials.html#def-natural-log) of the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds), so the odds at a [predictor](https://morrison-lab.github.io/pds/expectation.html#def-input) vector are $\text{e}^{}$ raised to the log-odds there, which [Lemma 1](#lem-logistic-log-odds) gives.
>
> $$\begin{aligned}
> {\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}'\right\}\mathclose{}}
> &= \text{e}^{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}'}
> && \text{(log-odds of the model at } \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}' \text{)}
> \\
> &= \text{e}^{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}+ \Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}}
> && \text{(definition of } \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}' \text{)}
> \\
> &= \text{e}^{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}} + \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}}
> && \text{(the dot product is linear in each slot)}
> \\
> &= \text{e}^{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}} \, \text{e}^{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}}
> && \text{(} \text{e}^{a + b} = \text{e}^{a} \text{e}^{b} \text{)}
> \\
> &= {\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right\}\mathclose{}} \, \text{e}^{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}}
> && \text{(log-odds of the model at } \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\text{)}
> \\
> &= {\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right\}\mathclose{}} \, {\theta_{\omega}\mathopen{}\left(\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}}.
> && \text{(definition of the odds multiplier)}
> \end{aligned}$$
>
> The first and fifth steps use [Lemma 1](#lem-logistic-log-odds), the third step uses the [linearity of the dot product](https://morrison-lab.github.io/mds/linear-algebra-direct-sums.html#thm-dot-linear), and the last step uses [Definition 2](#def-odds-multiplier).

> **NOTE:**
>
> **Example 5 (The treated odds from the control odds)**  
>
> In the [six-patient trial](#exm-logistic-regression), take $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}= {\mathopen{}\left(1, -1\right)\mathclose{}}^{\top}$, a control patient, and $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}= {\mathopen{}\left(0, 2\right)\mathclose{}}^{\top}$, so that $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}' = {\mathopen{}\left(1, 1\right)\mathclose{}}^{\top}$ is a treated patient. Under the [maximum likelihood fit](intro-MLEs.llms.md#def-mle), the code computes the [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) of recovery at both [predictor](https://morrison-lab.github.io/pds/expectation.html#def-input) vectors, and the control odds times the [odds multiplier](#def-odds-multiplier) of $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$.
>
> ``` downlit
> # fitted odds of recovery: control (x = -1), treatment (x = +1)
> wf_odds <- wf_probs / (1 - wf_probs)
> c(
>   odds_control = wf_odds[1],
>   odds_treated = wf_odds[2],
>   control_times_multiplier = wf_odds[1] * wf_multiplier
> )
> #>             odds_control             odds_treated control_times_multiplier 
> #>                      0.5                      2.0                      2.0
> ```
>
> The control odds are $0.5$, and $0.5 \times 4 = 2$ equals the treated odds, as [Theorem 1](#thm-odds-multiplier) states.

> **NOTE:**
>
> **Corollary 1 (The odds ratio between two predictor vectors)** Let $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ and $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}'$ be [predictor](https://morrison-lab.github.io/pds/expectation.html#def-input) vectors in the [logistic regression model](#def-logistic-regression) of [Equation 1](#eq-logistic-model). The [odds ratio](categorical-tests.llms.md#def-odds-ratio) of $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}'$ compared with $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ is the [odds multiplier](#def-odds-multiplier) of their difference:
>
> $${\text{ϙ}_{\omega}\mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}', \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}} = {\theta_{\omega}\mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}' - \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}}.$$

> **NOTE:**
>
> *Proof*. Let $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\stackrel{\text{def}}{=}\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}' - \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$, so that $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}' = \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}+ \Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$, and the first entry of $\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}$ is $1 - 1 = 0$.
>
> $$\begin{aligned}
> {\text{ϙ}_{\omega}\mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}', \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}}
> &= \frac{{\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}'\right\}\mathclose{}}}{{\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right\}\mathclose{}}}
> && \text{(definition of the odds ratio)}
> \\
> &= \frac{{\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right\}\mathclose{}} \, {\theta_{\omega}\mathopen{}\left(\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}}}{{\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right\}\mathclose{}}}
> && \text{(odds multiplier theorem)}
> \\
> &= {\theta_{\omega}\mathopen{}\left(\Delta\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right)\mathclose{}}.
> && \text{(divide numerator and denominator by } {\operatorname{odds}\mathopen{}\left\{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}\right\}\mathclose{}} > 0 \text{)}
> \end{aligned}$$
>
> The first step is the definition of the [odds ratio](categorical-tests.llms.md#def-odds-ratio), and the second is [Theorem 1](#thm-odds-multiplier).

> **NOTE:**
>
> **Example 6 (The odds ratio of treatment against control from the group counts)**  
>
> In the [six-patient trial](#exm-logistic-regression), $2$ of the $3$ treated patients and $1$ of the $3$ control patients recovered. The code computes the [odds ratio](categorical-tests.llms.md#def-odds-ratio) of treatment against control from those counts, and the [odds multiplier](#def-odds-multiplier) under the [maximum likelihood fit](intro-MLEs.llms.md#def-mle) of $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}' - \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}= {\mathopen{}\left(1, 1\right)\mathclose{}}^{\top} - {\mathopen{}\left(1, -1\right)\mathclose{}}^{\top}$.
>
> ``` downlit
> # odds ratio from the counts: treated 2 of 3, control 1 of 3
> count_or <- ((2 / 3) / (1 / 3)) / ((1 / 3) / (2 / 3))
> wf_difference <- c(1, 1) - c(1, -1)
> wf_difference_terms <- coef(wf_fit) * wf_difference
> wf_difference_dot <- sum(wf_difference_terms)
> wf_difference_multiplier <- exp(wf_difference_dot)
> c(count_or = count_or, odds_multiplier = wf_difference_multiplier)
> #>        count_or odds_multiplier 
> #>               4               4
> ```
>
> Both are $4$, as [Corollary 1](#cor-logistic-odds-ratio) states, because the model fits the two group [proportions](https://morrison-lab.github.io/mds/algebra-sums.html#def-proportion) exactly.

# 3 Fitting by iteratively reweighted least squares

> **NOTE:**
>
> This section is adapted from the generalized linear model part of the Newton’s method lecture of Zhou [\[3\]](#ref-zhou2025newton), used under the MIT License. The license text is:
>
> ``` text
> Copyright (c) 2025 ucla-biostat-257
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
> ```
>
> The source writes the logistic [score](intro-MLEs.llms.md#def-score) and information, notes that Newton’s method and [Fisher scoring](intro-MLEs.llms.md#def-fisher-scoring) coincide, and rewrites the step as a weighted least squares fit. Here the step is stated as a theorem and proved, with the step length fixed at $1$. The example, using the six-patient trial, is new. The source’s treatment of general generalized linear models, Gauss-Newton and Levenberg-Marquardt is not part of this section. The general optimization methods behind [IRLS](#def-irls) are on the [Optimization](https://morrison-lab.github.io/mds/optimization.html) page of the math notes.

> **NOTE:**
>
> **Definition 3 (Iteratively reweighted least squares (IRLS))** Suppose the outcomes follow the [logistic regression model](#def-logistic-regression). Let $X$ be the matrix whose rows are ${\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_{i}}^{\top}$. From a current [estimate](estimation.llms.md#def-estimate) $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^*$ with fitted [probabilities](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) $\pi_{i}^*$ (collected in $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\pi}}\vphantom{\pi}}^*$), form
>
> - the weights $w_{i} = \pi_{i}^* \mathopen{}\left(1 - \pi_{i}^*\right)\mathclose{}$, collected in the diagonal matrix $W$;
> - the working responses $z_{i} = \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^* \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_{i} + \mathopen{}\left(y_{i} - \pi_{i}^*\right)\mathclose{} / w_{i}$, collected in $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}}$.
>
> **Iteratively reweighted least squares** replaces $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^*$ by the weighted least squares fit of $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}}$ on $X$, the minimizer of $\sum_{i=1}^{n} w_{i} \mathopen{}\left(z_{i} - \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_{i}\right)\mathclose{}^2$, which is
>
> $${\mathopen{}\left(\mathopen{}\left({X}^{\top} W X\right)\mathclose{}\right)\mathclose{}}^{-1} {X}^{\top} W \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}},$$
>
> and repeats until the estimate stops changing.

> **NOTE:**
>
> **Exercise 1 (One IRLS step for the six-patient trial)** In the [six-patient trial](#exm-logistic-regression), start from $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^* = \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{0}}\vphantom{0}}$.
>
> 1.  Find the fitted [probabilities](https://morrison-lab.github.io/pds/probability-basics.html#def-probability), the weights and the working responses.
> 2.  Compute ${X}^{\top} W X$ and ${X}^{\top} W \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}}$.
> 3.  Compute the updated coefficients ${\mathopen{}\left(\mathopen{}\left({X}^{\top} W X\right)\mathclose{}\right)\mathclose{}}^{-1} {X}^{\top} W \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}}$.

> **NOTE:**
>
> *Solution 1*. Here the rows of $X$ are $(1, -1)$ for the three patients in the group coded $-1$ and $(1, 1)$ for the three treated patients, and $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{y}}\vphantom{y}}= {(0, 0, 1, 0, 1, 1)}^{\top}$.
>
> **1.** At $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^* = \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{0}}\vphantom{0}}$ every fitted [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) is ${\operatorname{expit}\mathopen{}\left(0\right)\mathclose{}} = 1/2$, so every weight is $w_{i} = (1/2)(1/2) = 1/4$. The working responses are $z_{i} = 0 + \mathopen{}\left(y_{i} - 1/2\right)\mathclose{} / (1/4) = 4 y_{i} - 2$:
>
> $$\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}} = {(-2, -2, 2, -2, 2, 2)}^{\top}.$$
>
> **2.** With $W = \tfrac{1}{4} \mathbf{I}_6$,
>
> $${X}^{\top} W X
> = \tfrac{1}{4}
> \begin{bmatrix} 6 & 0 \\ 0 & 6 \end{bmatrix}
> = \begin{bmatrix} 3/2 & 0 \\ 0 & 3/2 \end{bmatrix},$$
>
> because the entries of the first column of $X$ sum to $6$, the squares in the second column sum to $6$, and the two columns multiply to a sum of $-3 + 3 = 0$. The first entry of ${X}^{\top} W \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}}$ is $\tfrac{1}{4}(-2 - 2 + 2 - 2 + 2 + 2) = 0$, and the second is $\tfrac{1}{4}\mathopen{}\left((-1)(-2 - 2 + 2) + (1)(-2 + 2 + 2)\right)\mathclose{} = \tfrac{1}{4}(2 + 2) = 1$, so ${X}^{\top} W \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}} = {(0, 1)}^{\top}$.
>
> **3.** The updated coefficients are
>
> $$\begin{bmatrix} 2/3 & 0 \\ 0 & 2/3 \end{bmatrix}
> \begin{bmatrix} 0 \\ 1 \end{bmatrix}
> = \begin{bmatrix} 0 \\ 2/3 \end{bmatrix}.$$
>
> The [intercept](correlation-regression.llms.md#def-slr-intercept) stays at $0$ and the [slope](correlation-regression.llms.md#def-slr-slope) moves from $0$ to $2/3$.

> **NOTE:**
>
> **Theorem 2 (An IRLS step is a Newton-Raphson step and a Fisher scoring step)** Suppose the outcomes follow the [logistic regression model](#def-logistic-regression). One step of [iteratively reweighted least squares](#def-irls) from $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^*$ equals
>
> - one step of the [Newton-Raphson algorithm](intro-MLEs.llms.md#def-newton-raphson) on the [log-likelihood](intro-MLEs.llms.md#def-loglik) from $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^*$, and
> - one step of [Fisher scoring](intro-MLEs.llms.md#def-fisher-scoring) from $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^*$:
>
> $$\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^* + {\mathopen{}\left(\mathopen{}\left({X}^{\top} W X\right)\mathclose{}\right)\mathclose{}}^{-1} {X}^{\top} \mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{y}}\vphantom{y}}- \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\pi}}\vphantom{\pi}}^*\right)\mathclose{}.
> \tag{2}$$

> **NOTE:**
>
> *Proof*. The [log-likelihood](intro-MLEs.llms.md#def-loglik) has [score](intro-MLEs.llms.md#def-score) ${X}^{\top} \mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{y}}\vphantom{y}}- \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\pi}}\vphantom{\pi}}\right)\mathclose{}$ and [Hessian](intro-MLEs.llms.md#def-hessian) $-{X}^{\top} W X$ at every $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}$ (with $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\pi}}\vphantom{\pi}}$ and $W$ computed from $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}$), and the Hessian does not involve the outcomes (proof of [Theorem 6](#thm-logistic-mle-distribution)). So the [observed information](intro-MLEs.llms.md#def-oinf) ${X}^{\top} W X$ equals the [expected information](intro-MLEs.llms.md#def-einf), and the Newton-Raphson and [Fisher scoring](intro-MLEs.llms.md#def-fisher-scoring) steps both equal [Equation 2](#eq-irls-newton).
>
> For [IRLS](#def-irls), the working responses satisfy $W \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}} = W X \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^* + \mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{y}}\vphantom{y}}- \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\pi}}\vphantom{\pi}}^*\right)\mathclose{}$, so
>
> $$\begin{aligned}
> {\mathopen{}\left(\mathopen{}\left({X}^{\top} W X\right)\mathclose{}\right)\mathclose{}}^{-1} {X}^{\top} W \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}}
> &= {\mathopen{}\left(\mathopen{}\left({X}^{\top} W X\right)\mathclose{}\right)\mathclose{}}^{-1} {X}^{\top} W X \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^* + {\mathopen{}\left(\mathopen{}\left({X}^{\top} W X\right)\mathclose{}\right)\mathclose{}}^{-1} {X}^{\top} \mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{y}}\vphantom{y}}- \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\pi}}\vphantom{\pi}}^*\right)\mathclose{}
> && \text{(substitute } W \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{z}}\vphantom{z}} \text{)}
> \\
> &= \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^* + {\mathopen{}\left(\mathopen{}\left({X}^{\top} W X\right)\mathclose{}\right)\mathclose{}}^{-1} {X}^{\top} \mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{y}}\vphantom{y}}- \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\pi}}\vphantom{\pi}}^*\right)\mathclose{}.
> && \text{(cancel } {X}^{\top} W X \text{)}
> \end{aligned}$$

> **NOTE:**
>
> **Example 7 (IRLS on the six-patient trial)** The code runs [IRLS](#def-irls) from $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}^* = \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{0}}\vphantom{0}}$ on the data of the [six-patient trial](#exm-logistic-regression) and compares the result with the coefficients from [`glm()`](https://rdrr.io/r/stats/glm.html).
>
> ``` downlit
> # design matrix: intercept, group (-1 control, +1 treatment); y = 1: recovered
> irls_x <- cbind(1, rep(c(-1, 1), each = 3))
> irls_y <- c(0, 0, 1, 0, 1, 1)
> # start from zero coefficients and take six IRLS steps
> irls_coef <- c(0, 0)
> irls_path <- data.frame(step = 0, intercept = 0, slope = 0)
> for (step in 1:6) {
>   prob <- plogis(drop(irls_x %*% irls_coef))
>   weight <- prob * (1 - prob)
>   work_resp <- drop(irls_x %*% irls_coef) + (irls_y - prob) / weight
>   irls_coef <- drop(solve(crossprod(irls_x, weight * irls_x),
>                           crossprod(irls_x, weight * work_resp)))
>   irls_path[step + 1, ] <- c(step, irls_coef)
> }
> irls_path
> ```
>
> ``` downlit
> # the maximum likelihood fit from glm()
> coef(glm(irls_y ~ irls_x[, 2], family = binomial))
> #>  (Intercept)  irls_x[, 2] 
> #> -2.25619e-16  6.93147e-01
> ```
>
> The first step moves the [slope](correlation-regression.llms.md#def-slr-slope) to $0.6667$, which is $2/3$ ([the hand computation](#exr-irls-step)). After six steps the slope is $0.693147$, and [`glm()`](https://rdrr.io/r/stats/glm.html) reports $0.693147$. The slope settles at $\ln 2 = 0.693147$, half the natural logarithm of the [odds ratio](basic-statistical-methods.llms.md#def-odds-ratio) between the treatment group (recovery [odds](https://morrison-lab.github.io/pds/probability-basics.html#def-odds) $2$) and the other group (recovery odds $1/2$), since the groups are coded $\pm 1$.

# 4 Deviance

> **NOTE:**
>
> **Definition 4 (Deviance)** The **deviance** of a fitted logistic regression with labels $y_i\in {\mathopen{}\left\{0, 1\right\}\mathclose{}}$ is minus twice its maximized log-likelihood:
>
> $$\operatorname{dev}\stackrel{\text{def}}{=}-2 \, {\ell\mathopen{}\left(\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}}
> = -2 \sum_{i=1}^n\mathopen{}\left\{y_i\ln \hat\pi_i + \mathopen{}\left(1 - y_i\right)\mathclose{} {\ln\mathopen{}\left(1 - \hat\pi_i\right)\mathclose{}}\right\}\mathclose{},
> \tag{3}$$
>
> where $\hat\pi_i = {\operatorname{expit}\mathopen{}\left(\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}} \cdot \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_i\right)\mathclose{}}$ is the fitted probability.
>
> Source: Wikipedia contributors [\[4\]](#ref-wikipedia_deviance_statistics).

> **NOTE:**
>
> Nelder and Wedderburn [\[5\]](#ref-nelder1972generalized) introduced the deviance for the whole family of generalized linear models; logistic regression is the case of Bernoulli outcomes with the logit link. Hastie et al. [\[6, Sec. 4.4.2\]](#ref-hastie2009elements) defines the residual deviance of a fitted logistic regression as minus twice its log-likelihood.

> **NOTE:**
>
> **Example 8 (The deviance of the six-patient trial)** For the fit of [Example 1](#exm-logistic-regression), R’s `glm` reports the deviance. We check it against [Equation 3](#eq-deviance) computed by hand.
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
> Both give $\operatorname{dev}= 7.638$.

> **NOTE:**
>
> *Remark 2* (Why the deviance measures a shortfall). For labels $y_i\in {\mathopen{}\left\{0, 1\right\}\mathclose{}}$ the largest log-likelihood any model can reach is $0$, by giving each label probability $1$. So $\operatorname{dev}$ is twice the amount by which the maximized log-likelihood falls short of that largest value.

> **NOTE:**
>
> **Definition 5 (Null deviance)** The **null deviance** is the [deviance](#def-deviance) of the model with an intercept and no other predictors:
>
> $$\operatorname{dev}_0= -2 n \mathopen{}\left\{\bar y\ln \bar y+ \mathopen{}\left(1 - \bar y\right)\mathclose{} {\ln\mathopen{}\left(1 - \bar y\right)\mathclose{}}\right\}\mathclose{},
> \tag{4}$$
>
> where $\bar y$ is the fraction of labels equal to $1$.

> **NOTE:**
>
> **Example 9 (The null deviance of the six-patient trial)** Three of the six patients recovered, so $\bar y= 1/2$ and [Equation 4](#eq-null-deviance) gives $\operatorname{dev}_0= 2 \times 6 \ln 2$.
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
> Both give $\operatorname{dev}_0= 8.318$.

> **NOTE:**
>
> *Remark 3* (Where the null deviance formula comes from). The intercept-only model gives every observation the same fitted probability, and the maximizing value is the overall fraction $\bar y$ of labels equal to $1$. Substituting $\bar y$ for each $\hat\pi_i$ in [Equation 3](#eq-deviance) gives [Equation 4](#eq-null-deviance).

> **NOTE:**
>
> **Theorem 3 (The drop in deviance is the likelihood ratio statistic)** Let $\operatorname{dev}_0$ be the [null deviance](#def-null-deviance) and $\operatorname{dev}$ the [deviance](#def-deviance) of a logistic regression with $q$ predictors besides the intercept. Then the [likelihood ratio statistic](intro-MLEs.llms.md#def-lrt-stat) of $H_0$: all $q$ slopes are zero is
>
> $$\Lambda= \operatorname{dev}_0- \operatorname{dev}.$$

> **NOTE:**
>
> *Proof*. In the notation of the [likelihood ratio statistic](intro-MLEs.llms.md#def-lrt-stat), the unrestricted MLE $\hat\theta_{\text{ML}}$ is the fitted coefficient vector $\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}}$, and $\hat{\theta}_0$ is the fit of the intercept-only model that $H_0$ imposes. Then ${\ell\mathopen{}\left(\hat\theta_{\text{ML}}\right)\mathclose{}} = -\operatorname{dev}/ 2$ and ${\ell\mathopen{}\left(\hat{\theta}_0\right)\mathclose{}} = -\operatorname{dev}_0/ 2$. Substituting both into the definition gives $\Lambda= 2 \mathopen{}\left(-\operatorname{dev}/2 + \operatorname{dev}_0/2\right)\mathclose{} = \operatorname{dev}_0- \operatorname{dev}$.

> **NOTE:**
>
> **Example 10 (The likelihood ratio statistic of the treatment effect)** In the six-patient trial, $q = 1$.
>
> ``` downlit
> # drop in deviance, the likelihood ratio statistic
> wf_g2 <- wf_fit$null.deviance - deviance(wf_fit)
> wf_g2
> #> [1] 0.679596
> ```
>
> The statistic is $0.68$.

> **NOTE:**
>
> **Corollary 2 (Distribution of the drop in deviance)** Suppose the regularity conditions of [Wilks’ theorem](intro-MLEs.llms.md#thm-wilks) hold for the logistic regression model. Then for a large sample the drop in deviance $\operatorname{dev}_0- \operatorname{dev}$ has approximately a $\chi^2_q$ distribution when $H_0$ holds.

> **NOTE:**
>
> *Proof*. By [Theorem 3](#thm-deviance-drop) the drop in deviance is the likelihood ratio statistic of $q$ constraints, and [Wilks’ theorem](intro-MLEs.llms.md#thm-wilks) gives its approximate distribution.

> **NOTE:**
>
> **Example 11 (Testing the treatment effect)** For the statistic of [Example 10](#exm-deviance-drop), the p-value comes from the chi-square distribution with $q = 1$ degree of freedom.
>
> ``` downlit
> # upper tail of the chi-square distribution with 1 degree of freedom
> wf_g2_p <- pchisq(wf_g2, df = 1, lower.tail = FALSE)
> wf_g2_p
> #> [1] 0.409726
> ```
>
> The p-value is $0.41$, so six patients give no evidence of a treatment effect.

# 5 Covariate patterns and the saturated model

> **NOTE:**
>
> **Definition 6 (Covariate pattern)** A **covariate pattern** is a distinct value of the predictor vector among the observations $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_1, \dots, \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_n$. The $K$ distinct values are written $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^{(1)}, \dots, \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^{(K)}$, so $K\le n$.

> **NOTE:**
>
> **Definition 7 (Replicates)** The **replicates** of the [covariate pattern](#def-covariate-pattern) $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^{(k)}$ are the observations $i$ with $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_i= \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^{(k)}$. Their number is written $m_k$, so $\sum_{k=1}^{K}m_k = n$.

> **NOTE:**
>
> Dobson and Barnett [\[7, Sec. 5.5\]](#ref-dobson4e) introduces both terms: observations that share a combination of factor levels and the same values of any continuous predictors have the same covariate pattern, and are called replicates.

> **NOTE:**
>
> **Definition 8 (Events at a covariate pattern)** The number of **events** at the [covariate pattern](#def-covariate-pattern) $\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^{(k)}$ is the sum of the binary outcomes over its [replicates](#def-replicates):
>
> $$s_k = \sum_{i:\, \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_i= \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^{(k)}} y_i,$$
>
> so $0 \le s_k \le m_k$.

> **NOTE:**
>
> **Example 12 (Covariate patterns in the low-birth-weight data)** The `birthwt` data record whether each of 189 babies had low birth weight (`low = 1`, under 2.5 kg), along with the mother’s smoking status and race, among other predictors [\[8\]](#ref-hosmer1989applied). Take `smoke` (0 or 1) and `race` (1, 2 or 3) as the predictors. Counting the distinct pairs, and the babies and low-weight births at each, gives one row per [covariate pattern](#def-covariate-pattern).
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
> There are $K= 6$ covariate patterns among $n= 189$ babies. The pattern with the most [replicates](#def-replicates) has `smoke` = 0 and `race` = 3, and it has 55 of them.

> **NOTE:**
>
> **Definition 9 (Saturated model (full model, maximal model))** The **saturated model** (also called the **full model** or **maximal model** [\[7, Sec. 5.5\]](#ref-dobson4e)) for binary outcomes gives each pattern its own free event [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability):
>
> $${\Pr\mathopen{}\left(Y_i= 1 \mid \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_i= \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}^{(k)}\right)\mathclose{}} = \pi_k,
> \qquad k = 1, \dots, K,
> \tag{5}$$
>
> with the outcomes independent given the predictors.
>
> Source: Wikipedia contributors [\[9\]](#ref-wikipedia_saturated_model).

> **NOTE:**
>
> Dobson and Barnett [\[7, Sec. 5.5\]](#ref-dobson4e) defines the saturated model as the model with the maximum number of parameters that can be estimated, one per distinct covariate pattern, and says it is also called a maximal or full model. In model selection, “full model” often means something else: the model with every candidate predictor [\[7, Sec. 6.3\]](#ref-dobson4e). That model is generally smaller than the saturated model.

> **NOTE:**
>
> **Theorem 4 (The saturated model fits each pattern’s observed proportion)** The maximum likelihood estimate of $\pi_k$ in the [saturated model](#def-saturated-model) is the observed proportion of [events](#def-pattern-events) among the replicates of pattern $k$:
>
> $$\hat\pi_k = \frac{s_k}{m_k}.$$

> **NOTE:**
>
> *Proof*. Independence gives each pattern its own [log-likelihood](intro-MLEs.llms.md#def-loglik) term, and the outcomes at pattern $k$ contribute $s_k \ln \pi_k + \mathopen{}\left(m_k - s_k\right)\mathclose{} {\ln\mathopen{}\left(1 - \pi_k\right)\mathclose{}}$. The terms share no parameters, so each is maximized on its own. First suppose $0 < s_k < m_k$, so that both logarithms are defined for $0 < \pi_k < 1$. Setting the derivative with respect to $\pi_k$ to zero gives $s_k / \pi_k - \mathopen{}\left(m_k - s_k\right)\mathclose{} / \mathopen{}\left(1 - \pi_k\right)\mathclose{} = 0$. Multiplying through by $\pi_k \mathopen{}\left(1 - \pi_k\right)\mathclose{}$ gives $s_k \mathopen{}\left(1 - \pi_k\right)\mathclose{} = \mathopen{}\left(m_k - s_k\right)\mathclose{} \pi_k$. Expanding gives $s_k - s_k \pi_k = m_k \pi_k - s_k \pi_k$. Adding $s_k \pi_k$ to both sides gives $s_k = m_k \pi_k$. Dividing both sides by $m_k$ gives $\hat\pi_k = s_k / m_k$. The log-likelihood term increases to this point and decreases after it, so the point is a maximum. Now suppose $s_k = 0$. A count of $0$ times a logarithm is taken as $0$, so the term is $m_k {\ln\mathopen{}\left(1 - \pi_k\right)\mathclose{}}$, which decreases in $\pi_k$ and so peaks at $\pi_k = 0$. Next suppose $s_k = m_k$. By the same convention, the term is $m_k \ln \pi_k$, which peaks at $\pi_k = 1$. Both agree with $s_k / m_k$.

> **NOTE:**
>
> **Definition 10 (Deviance relative to the saturated model)** The **deviance relative to the saturated model** of a fitted model is twice the amount by which its maximized log-likelihood ${\ell\mathopen{}\left(\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}}$ falls short of the maximized log-likelihood $\ell_{\mathrm{sat}}$ of the [saturated model](#def-saturated-model):
>
> $$\operatorname{dev}_{\mathrm{sat}}= 2 \mathopen{}\left(\ell_{\mathrm{sat}}- {\ell\mathopen{}\left(\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}}\right)\mathclose{}.
> \tag{6}$$

> **NOTE:**
>
> **Theorem 5 (The deviance relative to the saturated model, from grouped counts)** For a fitted logistic regression with fitted event probabilities $\hat\pi_k$ at the $K$ covariate patterns,
>
> $$\operatorname{dev}_{\mathrm{sat}}
> = 2 \sum_{k=1}^{K}\mathopen{}\left\{s_k {\ln\mathopen{}\left(\frac{s_k}{m_k \hat\pi_k}\right)\mathclose{}}
> + \mathopen{}\left(m_k - s_k\right)\mathclose{} {\ln\mathopen{}\left(\frac{m_k - s_k}{m_k \mathopen{}\left(1 - \hat\pi_k\right)\mathclose{}}\right)\mathclose{}}\right\}\mathclose{},
> \tag{7}$$
>
> where a term with $s_k = 0$ or $s_k = m_k$ contributes $0$ in its zero-count part.

> **NOTE:**
>
> *Proof*. Grouping the outcomes by pattern, the [fitted model](model-validation.llms.md#def-fitted-model)’s [log-likelihood](intro-MLEs.llms.md#def-loglik) is ${\ell\mathopen{}\left(\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}} = \sum_{k=1}^{K}\mathopen{}\left\{s_k \ln \hat\pi_k + \mathopen{}\left(m_k - s_k\right)\mathclose{} {\ln\mathopen{}\left(1 - \hat\pi_k\right)\mathclose{}}\right\}\mathclose{}$. By [Theorem 4](#thm-saturated-mle), the saturated log-likelihood is the same sum with $\hat\pi_k$ replaced by $s_k / m_k$. Subtracting the fitted from the saturated log-likelihood, term by term, replaces each ${\ln\mathopen{}\left(s_k / m_k\right)\mathclose{}} - \ln \hat\pi_k$ by ${\ln\mathopen{}\left(s_k / \mathopen{}\left(m_k \hat\pi_k\right)\mathclose{}\right)\mathclose{}}$, and likewise for the non-events. Multiplying by $2$, as [Equation 6](#eq-saturated-deviance) does, gives [Equation 7](#eq-saturated-deviance-grouped). A count of $0$ times $\ln 0$ is taken as $0$, its limit.

> **NOTE:**
>
> Dobson and Barnett [\[7, Sec. 5.6.1\]](#ref-dobson4e) derives the deviance of a binomial model relative to the saturated model, and Section 7.5 writes it in the form of [Equation 7](#eq-saturated-deviance-grouped). Section 7.5 also notes that when every observation has its own covariate pattern, so each count is $0$ or $1$, this deviance is not a useful measure of fit.

> **NOTE:**
>
> **Corollary 3 (The deviance is the saturated-model deviance shifted by a constant)** The [deviance](#def-deviance) of a fitted logistic regression and its [deviance relative to the saturated model](#def-saturated-deviance) differ by a constant that depends on the data and not on the fitted model:
>
> $$\operatorname{dev}= \operatorname{dev}_{\mathrm{sat}}- 2 \ell_{\mathrm{sat}}.$$

> **NOTE:**
>
> *Proof*. [Definition 4](#def-deviance) gives $\operatorname{dev}= -2 {\ell\mathopen{}\left(\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}}$. Distributing the $2$ in [Equation 6](#eq-saturated-deviance) gives $\operatorname{dev}_{\mathrm{sat}}= 2 \ell_{\mathrm{sat}}- 2 {\ell\mathopen{}\left(\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}}$. Substituting $\operatorname{dev}= -2 {\ell\mathopen{}\left(\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}}\right)\mathclose{}}$ into this expression gives $\operatorname{dev}_{\mathrm{sat}}= 2 \ell_{\mathrm{sat}}+ \operatorname{dev}$. Subtracting $2 \ell_{\mathrm{sat}}$ from both sides gives the claim.

> **NOTE:**
>
> *Remark 7* (Why the shift does not change the drop in deviance). The constant $2 \ell_{\mathrm{sat}}$ in [Corollary 3](#cor-deviance-shift) is the same for every model fit to the same data, because the saturated model depends only on the data. So the difference between the deviances of two models, such as the drop in deviance of [Theorem 3](#thm-deviance-drop), is the same whether it is computed from $\operatorname{dev}$ or from $\operatorname{dev}_{\mathrm{sat}}$. The two deviances differ in their size, though: when every pattern has one replicate, the saturated model fits every label exactly, $\ell_{\mathrm{sat}}= 0$, and $\operatorname{dev}_{\mathrm{sat}}= \operatorname{dev}$.

> **NOTE:**
>
> **Example 13 (The deviance of the low-birth-weight model, ungrouped and grouped)** Fit a logistic regression of low birth weight on smoking and race, once to the 189 individual babies and once to the 6 grouped counts of [Example 12](#exm-covariate-patterns). R’s [`deviance()`](https://rdrr.io/r/stats/deviance.html) is the deviance of [Definition 4](#def-deviance) for the first fit and the deviance relative to the saturated model of [Definition 10](#def-saturated-deviance) for the second. We check the second against [Equation 7](#eq-saturated-deviance-grouped) computed by hand.
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
> The deviance relative to the saturated model is $\operatorname{dev}_{\mathrm{sat}}= 3.157$ on the grouped counts, and the deviance is $\operatorname{dev}= 219.975$ on the individual babies.

> **NOTE:**
>
> **Example 14 (The shift between the two deviances)** For the two fits of [Example 13](#exm-saturated-deviance), [Corollary 3](#cor-deviance-shift) says that $\operatorname{dev}- \operatorname{dev}_{\mathrm{sat}}= -2 \ell_{\mathrm{sat}}$. The left side is 216.818. We compute the right side from the observed proportions of [Theorem 4](#thm-saturated-mle).
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

# 6 Confidence intervals for the coefficients

> **NOTE:**
>
> **Theorem 6 (Approximate distribution of the fitted coefficients)** Suppose the outcomes follow the [logistic regression model](#def-logistic-regression). Let $X$ be the matrix whose rows are ${\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{x}}\vphantom{x}}_i}^{\top}$, and let $W$ be the diagonal matrix with entries $\pi_i \mathopen{}\left(1 - \pi_i\right)\mathclose{}$. Under regularity conditions, for a large sample the fitted coefficients are approximately Gaussian,
>
> $$\hat{\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}}\approx \operatorname{N}\mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\beta}}\vphantom{\beta}}, {\mathopen{}\left({X}^{\top} W X\right)\mathclose{}}^{-1}\right)\mathclose{}.
> \tag{8}$$

> **NOTE:**
>
> *Proof*. The log-likelihood has score ${X}^{\top} \mathopen{}\left(\mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{y}}\vphantom{y}}- \mathord{\smash[b]{\underset{\raise.3ex\hbox{$\scriptstyle\sim$}}{\pi}}\vphantom{\pi}}\right)\mathclose{}$, and its [Hessian](intro-MLEs.llms.md#def-hessian) is $-{X}^{\top} W X$, which does not involve the outcomes. The [observed information](intro-MLEs.llms.md#def-oinf) and [expected information](intro-MLEs.llms.md#def-einf) are therefore both ${X}^{\top} W X$. The claim is the Gaussian approximation of the [central limit theorem for MLEs](intro-MLEs.llms.md#thm-dist-mle), with this information in place of the inverse covariance. The result is stated for logistic regression by Hastie et al. [\[6, Sec. 4.4.3\]](#ref-hastie2009elements). For independent but non-identically distributed outcomes it holds under conditions on the predictors that Fahrmeir and Kaufmann [\[10\]](#ref-fahrmeir1985consistency) give.

> **NOTE:**
>
> **Corollary 4 (Wald interval for a logistic coefficient)** Let $\hat W$ be $W$ with each $\pi_i$ replaced by its fitted value. The estimated standard error of $\hat{\beta}_{j}$ is the square root of the diagonal entry of ${\mathopen{}\left({X}^{\top} \hat W X\right)\mathclose{}}^{-1}$ in the row and column of $\beta_{j}$; because $\beta_{0}$ comes first, that is the $(j+1)$th diagonal entry counting from $1$, and a [Wald confidence interval](intro-MLEs.llms.md#def-wald-ci) with level $1 - \alpha$ for $\beta_{j}$ is
>
> $$\hat{\beta}_{j} \pm z_{1 - \alpha/2} \, {\mathop{\widehat{\operatorname{se}}}\nolimits\mathopen{}\left(\hat{\beta}_{j}\right)\mathclose{}}.$$

> **NOTE:**
>
> **Example 15 (A Wald interval from six patients)** For the fit of [Example 1](#exm-logistic-regression), `vcov` returns ${\mathopen{}\left({X}^{\top} \hat W X\right)\mathclose{}}^{-1}$.
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
> The interval for $\beta_{1}$ is $(-1, 2.39)$. It contains $0$, consistent with the test of [Example 11](#exm-deviance-drop-distribution).

> **NOTE:**
>
> **Corollary 5 (Interval for the odds factor of a logistic coefficient)** If $\mathopen{}\left(L, U\right)\mathclose{}$ is a confidence interval for $\beta_{j}$ from [Corollary 4](#cor-logistic-wald), then $\mathopen{}\left(e^{L}, e^{U}\right)\mathclose{}$ is a confidence interval with the same level for $e^{\beta_{j}}$, the factor by which a one-unit increase in $x_j$, holding the other predictors fixed, multiplies the odds of $y= 1$.

> **NOTE:**
>
> *Proof*. The exponential function is increasing, so $L \le \beta_{j} \le U$ holds exactly when $e^{L} \le e^{\beta_{j}} \le e^{U}$.

> **NOTE:**
>
> **Example 16 (How little six patients tell us)** The two groups of [Example 1](#exm-logistic-regression) sit two units apart on the $x$ scale, so the odds ratio between them is $e^{2 \beta_{1}}$.
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
> The fitted odds of recovery in the treatment group are $4$ times those in the control group, with interval $(0.13, 119.2)$. The interval runs from a strong harm to a large benefit. Its width shows how little information six observations carry about the slope.

# 7 Further reading

- [Hua Zhou](https://hua-zhou.github.io/)’s [course page for “UCLA Biostat 257 - Statistical Computing” (2025 Spring)](https://ucla-biostat-257.github.io/2025spring/) has lectures on fitting generalized linear models and on quasi-Newton optimization. Its source is [on GitHub](https://github.com/ucla-biostat-257/2025spring) under the MIT License.
- David Rocke’s EPI 204 lecture [*Logistic Regression and Likelihood*](https://dmrocke.ucdavis.edu/Class/EPI204-Spring-2021/EPI204-2021-04-01.mp4) ([slides](https://dmrocke.ucdavis.edu/Class/EPI204-Spring-2021/EPI204-2%20Logistic%20Regression%20and%20Likelihood.pdf)) fits [logistic regression](#def-logistic-regression) by [maximum likelihood](intro-MLEs.llms.md#def-mle) and compares models by [deviance](#def-deviance) and [AIC](model-validation.llms.md#def-aic) [\[11\]](#ref-rocke2021epi204).
- Josh Starmer’s StatQuest video [*Logistic Regression Details Pt 2: Maximum Likelihood*](https://www.youtube.com/watch?v=BfKanl1aSG0) shows how [maximum likelihood estimation](intro-MLEs.llms.md#def-mle) fits a logistic regression curve [\[12\]](#ref-starmer2018logistic).

# Definitions on this page

- [Definition 1 (Logistic regression)](#def-logistic-regression)
- [Definition 2 (Odds multiplier)](#def-odds-multiplier)
- [Definition 3 (Iteratively reweighted least squares (IRLS))](#def-irls)
- [Definition 4 (Deviance)](#def-deviance)
- [Definition 5 (Null deviance)](#def-null-deviance)
- [Definition 6 (Covariate pattern)](#def-covariate-pattern)
- [Definition 7 (Replicates)](#def-replicates)
- [Definition 8 (Events at a covariate pattern)](#def-pattern-events)
- [Definition 9 (Saturated model (full model, maximal model))](#def-saturated-model)
- [Definition 10 (Deviance relative to the saturated model)](#def-saturated-deviance)

# References

\[1\]

Wikipedia contributors, “Likelihood-ratio test — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Likelihood-ratio_test>

\[2\]

Wikipedia contributors, “Logistic regression — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Logistic_regression>

\[3\]

H. Zhou, “Newton’s method and Fisher scoring.” Lecture notes for Biostat M257, Statistical Computing, University of California, Los Angeles, 2025. Accessed: Oct. 26, 2026. \[Online\]. Available: <https://ucla-biostat-257.github.io/2025spring/slides/23-newton/newton.html>

\[4\]

Wikipedia contributors, “Deviance (statistics) — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Deviance_%28statistics%29>

\[5\]

J. A. Nelder and R. W. M. Wedderburn, “Generalized linear models,” *Journal of the Royal Statistical Society: Series A (General)*, vol. 135, no. 3, pp. 370–384, 1972, doi: [10.2307/2344614](https://doi.org/10.2307/2344614).

\[6\]

T. Hastie, R. Tibshirani, and J. Friedman, *The elements of statistical learning: Data mining, inference, and prediction*, 2nd ed. Springer, 2009. doi: [10.1007/978-0-387-84858-7](https://doi.org/10.1007/978-0-387-84858-7).

\[7\]

A. J. Dobson and A. G. Barnett, *An introduction to generalized linear models*, 4th ed. CRC press, 2018. doi: [10.1201/9781315182780](https://doi.org/10.1201/9781315182780).

\[8\]

D. W. Hosmer and S. Lemeshow, *Applied logistic regression*. New York: Wiley, 1989.

\[9\]

Wikipedia contributors, “Saturated model — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Saturated_model>

\[10\]

L. Fahrmeir and H. Kaufmann, “Consistency and asymptotic normality of the maximum likelihood estimator in generalized linear models,” *The Annals of Statistics*, vol. 13, no. 1, pp. 342–368, 1985, doi: [10.1214/aos/1176346597](https://doi.org/10.1214/aos/1176346597).

\[11\]

D. M. Rocke, “EPI 204 lecture notes, Spring 2021.” University of California, Davis, 2021. Available: <https://dmrocke.ucdavis.edu/Class/EPI204-Spring-2021/EPI204-Spring-2021.html>

\[12\]

J. Starmer, “Logistic regression details, part 2: Maximum likelihood.” StatQuest, video on YouTube, 2018. Available: <https://www.youtube.com/watch?v=BfKanl1aSG0>

Back to top

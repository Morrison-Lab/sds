# Classification and Diagnostic Tests

Code

- [Show All Code](javascript:void(0))

- [Hide All Code](javascript:void(0))

- 

  ------------------------------------------------------------------------

- [View Source](javascript:void(0))

Published

Last modified: 2026-10-23 16:24:11 (PDT)

## 1 Introduction

Classification is a core problem in statistics and machine learning: we seek to assign individuals or observations to one of several discrete categories based on available data. In medicine and epidemiology, classification problems arise constantly; for example, a clinician decides whether a patient has a disease based on evidence such as:

- test results;
- biomarkers;
- clinical signs.

A test can look highly accurate in isolation, yet its predictive value for an individual patient depends heavily on the prevalence of the condition in the population being tested. Understanding this interplay requires [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#thm-bayes) and the [law of total probability](https://morrison-lab.github.io/pds/probability-basics.html#thm-total-prob) [\[1\]](#ref-wikipedia_bayes_theorem).

> **NOTE:**
>
> **Definition 1 (Classification)** A **classification problem** is a statistical problem in which we seek to assign each observation to one of two or more discrete categories based on its observed features or predictors \\x\\.
>
> Source: Wikipedia contributors [\[2\]](#ref-wikipedia_statistical_classification).

> **NOTE:**
>
> **Definition 2 (Class)** The discrete categories of a classification problem ([Definition 1](#def-classification)) are its **classes**. Let \\\mathcal{C}\\ be a set of \\K\\ classes (for example, \\\mathcal{C}= {\mathopen{}\left\\1, \dots, K\right\\\mathclose{}}\\, or a set of text labels).

> **NOTE:**
>
> **Definition 3 (Classification rule)** A **classification rule** \\c\\ maps features to classes ([Definition 2](#def-class)):
>
> \\c: x \mapsto c(x) \in \mathcal{C} \tag{1}\\

> **NOTE:**
>
> **Definition 4 (Binary classification)** A **binary classification problem** is a [classification problem](#def-classification) whose set of [classes](#def-class) \\\mathcal{C}\\ consists of \\K = 2\\ distinct categories, one representing the presence of a condition of interest (\\k_1\\) and the other representing its absence (\\k_0\\):
>
> \\\mathcal{C}= {\mathopen{}\left\\k_1, k_0\right\\\mathclose{}}, \quad \mathopen{}\left\|\mathcal{C}\right\|\mathclose{} = 2 \tag{2}\\
>
> Source: Wikipedia contributors [\[2\]](#ref-wikipedia_statistical_classification).

> **NOTE:**
>
> **Definition 5 (Positive classification)** In a [binary classification problem](#def-binary-classification) with \\\mathcal{C}= {\mathopen{}\left\\k_1, k_0\right\\\mathclose{}}\\, for an observation drawn from a [population](exploratory-descriptive.llms.md#def-population) and assigned [class](#def-class) \\Y \in \mathcal{C}\\ (for example, \\Y = c(X)\\ when a [classification rule](#def-classification-rule) \\c\\ classifies the observation from its feature \\X\\), a **positive classification** (also called **positive**, and written \\{+}\\) is the [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) that the observation is assigned to \\k_1\\:
>
> \\{+}\stackrel{\text{def}}{=}{\mathopen{}\left\\Y = k_1\right\\\mathclose{}} \tag{3}\\
>
> Source: Wikipedia contributors [\[2\]](#ref-wikipedia_statistical_classification); Wikipedia contributors [\[3\]](#ref-wikipedia_sensitivity_and_specificity).

> **NOTE:**
>
> **Definition 6 (Negative classification)** In a [binary classification problem](#def-binary-classification) with \\\mathcal{C}= {\mathopen{}\left\\k_1, k_0\right\\\mathclose{}}\\, for an observation drawn from a [population](exploratory-descriptive.llms.md#def-population) and assigned [class](#def-class) \\Y \in \mathcal{C}\\ (for example, \\Y = c(X)\\ when a [classification rule](#def-classification-rule) \\c\\ classifies the observation from its feature \\X\\), a **negative classification** (also called **negative**, and written \\{-}\\) is the [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) that the observation is assigned to \\k_0\\:
>
> \\{-}\stackrel{\text{def}}{=}{\mathopen{}\left\\Y = k_0\right\\\mathclose{}} \tag{4}\\
>
> Source: Wikipedia contributors [\[2\]](#ref-wikipedia_statistical_classification); Wikipedia contributors [\[3\]](#ref-wikipedia_sensitivity_and_specificity).

> **NOTE:**
>
> **Exercise 1 (Negative classification as a complement)** In a [binary classification problem](#def-binary-classification) with \\\mathcal{C}= {\mathopen{}\left\\k_1, k_0\right\\\mathclose{}}\\, show that when each observation is assigned a [class](#def-class) \\Y \in \mathcal{C}\\, the [negative classification](#def-negative-classification) [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) \\{-}\\ is the [complement](https://morrison-lab.github.io/pds/probability-basics.html#def-complement) of the [positive classification](#def-positive-classification) event \\{+}\\: \\{-}= \neg {+}\\.

> **NOTE:**
>
> *Solution 1*. Because \\\mathcal{C}= {\mathopen{}\left\\k_1, k_0\right\\\mathclose{}}\\ with \\\mathopen{}\left\|\mathcal{C}\right\|\mathclose{} = 2\\ ([Definition 4](#def-binary-classification)), the [classes](#def-class) \\k_1\\ and \\k_0\\ are distinct, so \\Y \in \mathcal{C}\\ equals \\k_0\\ if and only if \\Y \neq k_1\\:
>
> \\ \begin{aligned} {-} &= {\mathopen{}\left\\Y = k_0\right\\\mathclose{}} && \text{(definition of negative classification)} \\ &= {\mathopen{}\left\\Y \neq k_1\right\\\mathclose{}} && \text{(since } Y \in {\mathopen{}\left\\k_1, k_0\right\\\mathclose{}} \text{ with } k_1 \neq k_0\text{)} \\ &= \neg {\mathopen{}\left\\Y = k_1\right\\\mathclose{}} && \text{(definition of complement)} \\ &= \neg {+} && \text{(definition of positive classification)} \end{aligned} \tag{5}\\

> **NOTE:**
>
> **Theorem 1 (Negative classification is the complement of positive classification)** In a [binary classification problem](#def-binary-classification) with \\\mathcal{C}= {\mathopen{}\left\\k_1, k_0\right\\\mathclose{}}\\, when each observation is assigned a [class](#def-class) \\Y \in \mathcal{C}\\, the [negative classification](#def-negative-classification) [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) \\{-}\\ is the [complement](https://morrison-lab.github.io/pds/probability-basics.html#def-complement) of the [positive classification](#def-positive-classification) event \\{+}\\:
>
> \\{-}= \neg {+} \tag{6}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 1](#exr-negative-classification-complement), worked in [Solution 1](#sol-negative-classification-complement).

> **NOTE:**
>
> **Example 1 (A diagnostic test as a classification rule)** In a [binary classification problem](#def-binary-classification), a COVID-19 test assigns each person tested to one of \\K = 2\\ [classes](#def-class), “has COVID-19” (\\k_1\\) or “does not have COVID-19” (\\k_0\\), based on a single feature \\x\\: whether the test’s result is “[positive](#def-positive-classification)” or “[negative](#def-negative-classification)”. The test is the [classification rule](#def-classification-rule) that assigns a positive result to \\k_1\\ and a negative result to \\k_0\\:
>
> \\ c(x) \stackrel{\text{def}}{=} \begin{cases} \text{has COVID-19} & \text{if } x = \text{positive} \\ \text{does not have COVID-19} & \text{if } x = \text{negative} \end{cases} \tag{7}\\
>
> For a person drawn from a [population](exploratory-descriptive.llms.md#def-population) with test result \\X\\, the [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) that the test is positive is \\{+}= {\mathopen{}\left\\c(X) = \text{has COVID-19}\right\\\mathclose{}}\\, and the event that the test is negative is \\{-}= {\mathopen{}\left\\c(X) = \text{does not have COVID-19}\right\\\mathclose{}}\\.

> **NOTE:**
>
> *Remark 1* (Labels in binary classification). In a [binary classification problem](#def-binary-classification), the two [classes](#def-class) \\k_1\\ and \\k_0\\ are often labeled “[positive](#def-positive-classification)” and “[negative](#def-negative-classification)”, or, in medical diagnostic testing, “has the disease” and “does not have the disease”.

## 2 Diagnostic test characteristics

> **NOTE:**
>
> **Definition 7 (Sensitivity)** The **sensitivity** of a diagnostic test is the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) that the test is [positive](#def-positive-classification) (\\{+}\\), given that the person tested has the disease (\\D\\):
>
> \\\text{sensitivity} \stackrel{\text{def}}{=}\Pr({+}\mid D) \tag{8}\\
>
> Source: Wikipedia contributors [\[3\]](#ref-wikipedia_sensitivity_and_specificity).

> **NOTE:**
>
> **Example 2 (Sensitivity of a COVID-19 test)** Suppose a COVID-19 test is [positive](#def-positive-classification) for 99% of the people who have COVID-19. Let \\D\\ be the [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) “the person has COVID-19” and \\{+}\\ the event “the test is positive”. Then the test’s sensitivity ([Definition 7](#def-sensitivity)) is:
>
> \\\Pr({+}\mid D) = 0.99 \tag{9}\\

> **NOTE:**
>
> **Definition 8 (Specificity)** The **specificity** of a diagnostic test is the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) that the test is [negative](#def-negative-classification) (\\{-}\\), given that the person tested does not have the disease (\\\neg D\\):
>
> \\\text{specificity} \stackrel{\text{def}}{=}\Pr({-}\mid \neg D) \tag{10}\\
>
> Source: Wikipedia contributors [\[3\]](#ref-wikipedia_sensitivity_and_specificity).

> **NOTE:**
>
> **Example 3 (Specificity of a COVID-19 test)** Suppose the COVID-19 test of [Example 2](#exm-sensitivity) is [negative](#def-negative-classification) for 99% of the people who do not have COVID-19. Then its specificity ([Definition 8](#def-specificity)) is:
>
> \\\Pr({-}\mid \neg D) = 0.99 \tag{11}\\
>
> By the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0) and [Theorem 1](#thm-negative-classification-complement), its false positive rate is:
>
> \\ \begin{aligned} \Pr({+}\mid \neg D) &= 1 - \Pr(\neg {+}\mid \neg D) && \text{(complement rule, conditional on } \neg D \text{)} \\ &= 1 - \Pr({-}\mid \neg D) && \text{(negative classification is the complement of positive)} \\ &= 1 - 0.99 && \text{(substitute the specificity)} \\ &= 0.01 && \text{(subtract)} \end{aligned} \tag{12}\\

> **NOTE:**
>
> **Definition 9 (Prevalence)** The **prevalence** of a disease in a population is the probability that a person drawn from that population has the disease (\\D\\):
>
> \\\text{prevalence} \stackrel{\text{def}}{=}\Pr(D) \tag{13}\\
>
> Source: Wikipedia contributors [\[4\]](#ref-wikipedia_prevalence).

> **NOTE:**
>
> **Example 4 (Prevalence of COVID-19)** Suppose 7% of the population being tested with the COVID-19 test of [Example 2](#exm-sensitivity) has COVID-19. Then the prevalence ([Definition 9](#def-prevalence)) is:
>
> \\\Pr(D) = 0.07 \tag{14}\\
>
> and, by the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0), the probability that a person drawn from that population does not have COVID-19 is:
>
> \\ \begin{aligned} \Pr(\neg D) &= 1 - \Pr(D) && \text{(complement rule)} \\ &= 1 - 0.07 && \text{(substitute the prevalence)} \\ &= 0.93 && \text{(subtract)} \end{aligned} \tag{15}\\

## 3 Predictive values

> **NOTE:**
>
> **Definition 10 (Positive predictive value (PPV))** The **positive predictive value** of a diagnostic test is the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) that the person tested has the disease (\\D\\), given that the test is [positive](#def-positive-classification) (\\{+}\\):
>
> \\\text{PPV} \stackrel{\text{def}}{=}\Pr(D \mid {+}) \tag{16}\\
>
> Source: Wikipedia contributors [\[5\]](#ref-wikipedia_positive_and_negative_predictive_values).

> **NOTE:**
>
> **Example 5 (PPV of a COVID-19 test)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity), used in the [population](exploratory-descriptive.llms.md#def-population) of [Example 4](#exm-prevalence), [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#exm-bayes) gives the positive predictive value ([Definition 10](#def-ppv)):
>
> \\\Pr(D \mid {+}) \approx 0.88 \tag{17}\\
>
> Even with a highly accurate test (99% sensitive and 99% specific), only about 88% of the people who test [positive](#def-positive-classification) have COVID-19, because the [prevalence](#def-prevalence) (7%) is low enough that false positives make up a meaningful fraction of all positive tests.

> **NOTE:**
>
> **Definition 11 (Negative predictive value (NPV))** The **negative predictive value** of a diagnostic test is the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) that the person tested does not have the disease (\\\neg D\\), given that the test is [negative](#def-negative-classification) (\\{-}\\):
>
> \\\text{NPV} \stackrel{\text{def}}{=}\Pr(\neg D \mid {-}) \tag{18}\\
>
> Source: Wikipedia contributors [\[5\]](#ref-wikipedia_positive_and_negative_predictive_values).

> **NOTE:**
>
> **Example 6 (NPV of a COVID-19 test)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity), used in the [population](exploratory-descriptive.llms.md#def-population) of [Example 4](#exm-prevalence), the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) of a [negative](#def-negative-classification) test for a person with COVID-19 is, by the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0) and [Theorem 1](#thm-negative-classification-complement):
>
> \\ \begin{aligned} \Pr({-}\mid D) &= \Pr(\neg {+}\mid D) && \text{(negative classification is the complement of positive)} \\ &= 1 - \Pr({+}\mid D) && \text{(complement rule, conditional on } D \text{)} \\ &= 1 - 0.99 && \text{(substitute the sensitivity)} \\ &= 0.01 && \text{(subtract)} \end{aligned} \tag{19}\\
>
> By [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#thm-bayes), with the denominator expanded by the [law of total probability](https://morrison-lab.github.io/pds/probability-basics.html#thm-total-prob) over the partition \\{\mathopen{}\left\\D, \neg D\right\\\mathclose{}}\\, the negative predictive value ([Definition 11](#def-npv)) is:
>
> \\ \begin{aligned} \Pr(\neg D \mid {-}) &= \frac{\Pr({-}\mid \neg D) \cdot\Pr(\neg D)}{\Pr({-})} && \text{(Bayes' theorem)} \\ &= \frac{\Pr({-}\mid \neg D) \cdot\Pr(\neg D)}{\Pr({-}\mid \neg D) \cdot\Pr(\neg D) + \Pr({-}\mid D) \cdot\Pr(D)} && \text{(law of total probability)} \\ &= \frac{0.99 \cdot 0.93}{0.99 \cdot 0.93 + 0.01 \cdot 0.07} && \text{(substitute the given values)} \\ &= \frac{0.9207}{0.9207 + 0.0007} && \text{(multiply each term in the numerator and denominator)} \\ &= \frac{0.9207}{0.9214} && \text{(add the denominator's two terms)} \\ &\approx 0.9992 && \text{(divide)} \end{aligned} \tag{20}\\
>
> A negative result from this test is very reliable: only about 8 in 10,000 people who test negative have COVID-19.

## 4 PPV in terms of sensitivity, specificity, and prevalence

> **NOTE:**
>
> **Exercise 2 (Probability of a positive test)** Derive an expression for the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) \\\Pr({+})\\ that a diagnostic test is [positive](#def-positive-classification) in terms of:
>
> - the test’s [sensitivity](#def-sensitivity);
> - the test’s [specificity](#def-specificity);
> - the [prevalence](#def-prevalence) of the disease.

> **NOTE:**
>
> *Solution 2*. By the [law of total probability](https://morrison-lab.github.io/pds/probability-basics.html#thm-total-prob) over the partition \\{\mathopen{}\left\\D, \neg D\right\\\mathclose{}}\\, the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0), and [Theorem 1](#thm-negative-classification-complement):
>
> \\ \begin{aligned} \Pr({+}) &= \Pr({+}\mid D) \cdot\Pr(D) + \Pr({+}\mid \neg D) \cdot\Pr(\neg D) && \text{(law of total probability)} \\ &= \text{sensitivity} \cdot\Pr(D) + \Pr({+}\mid \neg D) \cdot\Pr(\neg D) && \text{(definition of sensitivity)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \Pr({+}\mid \neg D) \cdot\Pr(\neg D) && \text{(definition of prevalence)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \Pr(\neg {+}\mid \neg D)\right)\mathclose{} \cdot\Pr(\neg D) && \text{(complement rule, conditional on } \neg D \text{)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \Pr({-}\mid \neg D)\right)\mathclose{} \cdot\Pr(\neg D) && \text{(negative classification is the complement of positive)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \text{specificity}\right)\mathclose{} \cdot\Pr(\neg D) && \text{(definition of specificity)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \text{specificity}\right)\mathclose{} \cdot\mathopen{}\left(1 - \Pr(D)\right)\mathclose{} && \text{(complement rule)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \text{specificity}\right)\mathclose{} \cdot\mathopen{}\left(1 - \text{prevalence}\right)\mathclose{} && \text{(definition of prevalence)} \end{aligned} \tag{21}\\

> **NOTE:**
>
> **Theorem 2 (Probability of a positive test)** Let \\\text{sens}\\ be the [sensitivity](#def-sensitivity) of a diagnostic test, \\\text{spec}\\ its [specificity](#def-specificity), and \\\pi\\ the [prevalence](#def-prevalence) of the disease. Then the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) \\\Pr({+})\\ that the test is [positive](#def-positive-classification) is:
>
> \\ \Pr({+}) = \text{sens} \cdot\pi + \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{} \tag{22}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 2](#exr-prob-positive), worked in [Solution 2](#sol-prob-positive).

> **NOTE:**
>
> **Exercise 3 (PPV from Bayes’ theorem)** Derive an expression for the [positive predictive value](#def-ppv) of a diagnostic test in terms of:
>
> - its [sensitivity](#def-sensitivity);
> - its [specificity](#def-specificity);
> - the [prevalence](#def-prevalence) of the disease.

> **NOTE:**
>
> *Solution 3*. Abbreviate the [sensitivity](#def-sensitivity) as \\\text{sens}\\, the [specificity](#def-specificity) as \\\text{spec}\\, and the [prevalence](#def-prevalence) as \\\pi\\. By [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#thm-bayes), with the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) of a [positive](#def-positive-classification) test from [Exercise 2](#exr-prob-positive):
>
> \\ \begin{aligned} \text{PPV} &\stackrel{\text{def}}{=}\Pr(D \mid {+}) && \text{(definition of PPV)} \\ &= \frac{\Pr({+}\mid D) \cdot\Pr(D)}{\Pr({+})} && \text{(Bayes' theorem)} \\ &= \frac{\text{sens} \cdot\Pr(D)}{\Pr({+})} && \text{(definition of sensitivity)} \\ &= \frac{\text{sens} \cdot\pi}{\Pr({+})} && \text{(definition of prevalence)} \\ &= \frac{\text{sens} \cdot\pi}{\text{sens} \cdot\pi+ \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}} && \text{(probability of a positive test)} \end{aligned} \tag{23}\\

> **NOTE:**
>
> **Theorem 3 (PPV from Bayes’ theorem)** Let \\\text{sens}\\ be the [sensitivity](#def-sensitivity) of a diagnostic test, \\\text{spec}\\ its [specificity](#def-specificity), and \\\pi\\ the [prevalence](#def-prevalence) of the disease. If the probability of a positive test is positive, \\\text{sens} \cdot\pi+ \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{} \> 0\\, then the [positive predictive value](#def-ppv) of the test is:
>
> \\ \text{PPV} = \frac{\text{sens} \cdot\pi} {\text{sens} \cdot\pi+ \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}} \tag{24}\\
>
> Source: Wikipedia contributors [\[1\]](#ref-wikipedia_bayes_theorem).

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 3](#exr-ppv-bayes), worked in [Solution 3](#sol-ppv-bayes), which builds on [Theorem 2](#thm-prob-positive).

> **NOTE:**
>
> **Exercise 4 (PPV in terms of two ratios)** Rewrite the expression for the positive predictive value from [Theorem 3](#thm-ppv-bayes) so that the sensitivity, specificity, and prevalence appear only through the ratio \\\frac{1 - \text{spec}}{\text{sens}}\\ of the false positive rate to the sensitivity and the ratio \\\frac{1 - \pi}{\pi}\\ of non-diseased to diseased people in the population.

> **NOTE:**
>
> *Solution 4*. Write \\a \stackrel{\text{def}}{=}\text{sens} \cdot\pi\\ and \\b \stackrel{\text{def}}{=}\mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}\\, so that [Theorem 3](#thm-ppv-bayes) reads \\\text{PPV} = \frac{a}{a + b}\\, with \\a \> 0\\ whenever the sensitivity and prevalence are positive. Then:
>
> \\ \begin{aligned} \text{PPV} &= \frac{a}{a + b} && \text{(PPV from Bayes' theorem)} \\ &= \frac{1}{\mathopen{}\left(\frac{a + b}{a}\right)\mathclose{}} && \text{(a fraction equals one over its reciprocal, since } a \> 0 \text{)} \\ &= \frac{1}{\frac{a}{a} + \frac{b}{a}} && \text{(distribute the division over the sum in the numerator)} \\ &= \frac{1}{1 + \frac{b}{a}} && \text{(} \tfrac{a}{a} = 1 \text{)} \\ &= \frac{1}{1 + \frac{\mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}}{\text{sens} \cdot\pi}} && \text{(substitute the definitions of } a \text{ and } b \text{)} \\ &= \frac{1}{1 + \frac{1 - \text{spec}}{\text{sens}} \cdot\frac{1 - \pi}{\pi}} && \text{(a quotient of products is the product of the quotients)} \end{aligned} \tag{25}\\

> **NOTE:**
>
> **Theorem 4 (PPV in terms of sensitivity, specificity, and prevalence)** The positive predictive value of a diagnostic test with positive sensitivity, used in a population with positive prevalence, depends on its sensitivity, its specificity, and the prevalence of the disease only through two ratios:
>
> - the ratio of the false positive rate to the sensitivity;
> - the ratio of non-diseased to diseased people in the population.
>
> Specifically:
>
> \\ \text{PPV} = \frac{1}{1 + \frac{1 - \text{spec}}{\text{sens}} \cdot\frac{1 - \pi}{\pi}} \tag{26}\\

> **NOTE:**
>
> *Proof*. This result is the solution to [Exercise 4](#exr-ppv-ratio-form), worked in [Solution 4](#sol-ppv-ratio-form), which builds on [Theorem 3](#thm-ppv-bayes) and [Theorem 2](#thm-prob-positive).

> **NOTE:**
>
> **Example 7 (PPV of a COVID-19 test, from the two ratios)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity), used in the population of [Example 4](#exm-prevalence), [Theorem 4](#thm-ppv-sens-spec-prev) gives:
>
> \\ \begin{aligned} \text{PPV} &= \frac{1}{1 + \frac{1 - 0.99}{0.99} \cdot\frac{1 - 0.07}{0.07}} && \text{(PPV in terms of the two ratios, with the given values)} \\ &= \frac{1}{1 + \frac{0.01}{0.99} \cdot\frac{0.93}{0.07}} && \text{(subtract in each numerator)} \\ &\approx \frac{1}{1 + 0.0101 \cdot\frac{0.93}{0.07}} && \text{(divide \$0.01 / 0.99\$)} \\ &\approx \frac{1}{1 + 0.0101 \cdot 13.29} && \text{(divide \$0.93 / 0.07\$)} \\ &\approx \frac{1}{1 + 0.134} && \text{(multiply)} \\ &= \frac{1}{1.134} && \text{(add)} \\ &\approx 0.88 && \text{(divide)} \end{aligned} \tag{27}\\
>
> This value matches [Example 5](#exm-ppv).
>
> If the same test were used in a population with prevalence 0.1% instead, and its sensitivity and specificity were still 99% in that population, the ratio of non-diseased to diseased people would be \\0.999 / 0.001 = 999\\, and the PPV would fall to
>
> \\ \begin{aligned} \text{PPV} &= \frac{1}{1 + \frac{0.01}{0.99} \cdot 999} && \text{(PPV in terms of the two ratios, with the new prevalence)} \\ &\approx \frac{1}{1 + 0.0101 \cdot 999} && \text{(divide)} \\ &\approx \frac{1}{1 + 10.09} && \text{(multiply)} \\ &= \frac{1}{11.09} && \text{(add)} \\ &\approx 0.09 && \text{(divide)} \end{aligned} \tag{28}\\
>
> so about 9 in 10 positive results would be false positives.

> **NOTE:**
>
> *Remark 2* (The PPV depends on the population, not only on the test). The sensitivity and specificity describe the test’s performance in a specified setting, and may differ across settings (for example, with the case mix of the people tested or the threshold used to call a result positive), but the ratio \\\frac{1 - \pi}{\pi}\\ in [Theorem 4](#thm-ppv-sens-spec-prev) describes the population being tested. When the disease is rare, that ratio is large, so even a small false positive rate can make the PPV low, as [Example 7](#exm-ppv-sens-spec-prev) shows.

## 5 Agreement between two classifiers

So far, we have compared a test with the true disease status. The same tools apply whenever we compare two classifiers that label the same observations: for example, a new diagnostic test against a reference test, or an automated grader (an “agent”) against a human grader. We call the classifier being evaluated the **agent** and the one we compare it with the **reference**.

> **NOTE:**
>
> **Definition 12 (Agreement table)** For \\n\\ observations that an agent and a reference each classify as [positive](#def-positive-classification) or [negative](#def-negative-classification), the **agreement table** counts the four combinations:
>
> |                    | Reference positive | Reference negative |     Total |
> |--------------------|-------------------:|-------------------:|----------:|
> | **Agent positive** |              \\a\\ |              \\b\\ | \\a + b\\ |
> | **Agent negative** |              \\c\\ |              \\d\\ | \\c + d\\ |
> | **Total**          |          \\a + c\\ |          \\b + d\\ |     \\n\\ |
>
> The cells \\a\\ and \\d\\ count agreements, the cells \\b\\ and \\c\\ count disagreements, and the four cells together count every observation:
>
> \\n \stackrel{\text{def}}{=}a + b + c + d \tag{29}\\
>
> Source: Wikipedia contributors [\[6\]](#ref-wikipedia_confusion_matrix).

> **NOTE:**
>
> **Example 8 (Agreement table for a COVID-19 test)** Apply the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity) to \\n = 10{,}000\\ people from the population of [Example 4](#exm-prevalence), with the true disease status as the reference. With 7% prevalence, \\0.07 \times 10{,}000 = 700\\ people have COVID-19 and \\10{,}000 - 700 = 9{,}300\\ do not. With 99% sensitivity, the test is positive for \\0.99 \times 700 = 693\\ of the 700; with 99% specificity, it is negative for \\0.99 \times 9{,}300 = 9{,}207\\ of the 9,300. So the test is positive for \\9{,}300 - 9{,}207 = 93\\ people without COVID-19 and negative for \\700 - 693 = 7\\ people with it. The agreement table ([Definition 12](#def-agreement-table)) is:
>
> |                   |    COVID-19 |     No COVID-19 |        Total |
> |-------------------|------------:|----------------:|-------------:|
> | **Test positive** | \\a = 693\\ |      \\b = 93\\ |      \\786\\ |
> | **Test negative** |   \\c = 7\\ | \\d = 9{,}207\\ |  \\9{,}214\\ |
> | **Total**         |     \\700\\ |     \\9{,}300\\ | \\10{,}000\\ |
>
> Show R code
>
> ``` downlit
> agree_covid <- c(a = 693, b = 93, c = 7, d = 9207)
> agree_covid
> #>    a    b    c    d 
> #>  693   93    7 9207
> ```

## 6 Agreement proportions

> **NOTE:**
>
> **Definition 13 (Overall agreement)** Let:
>
> - \\A\\ be the [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) that the agent makes a [positive classification](#def-positive-classification) for an observation drawn from a [population](exploratory-descriptive.llms.md#def-population), with [complement](https://morrison-lab.github.io/pds/probability-basics.html#def-complement) \\\neg A\\.
> - \\R\\ be the event that the reference makes a positive classification for the same observation, with complement \\\neg R\\.
>
> The **overall agreement** of the agent and the reference on that population is the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) that they assign the same class to the observation:
>
> \\p_o \stackrel{\text{def}}{=}{\Pr\mathopen{}\left(A \cap R\right)\mathclose{}} + {\Pr\mathopen{}\left(\neg A \cap \neg R\right)\mathclose{}} \tag{30}\\
>
> Source: Cohen [\[7\]](#ref-cohen1960coefficient).

> **NOTE:**
>
> **Example 9 (Overall agreement for the COVID-19 test)** Apply the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity) to the [population](exploratory-descriptive.llms.md#def-population) of [Example 4](#exm-prevalence), with the test as the agent (\\A = {+}\\) and the disease status as the reference (\\R = D\\). By the [multiplication rule for conditional probability](https://morrison-lab.github.io/pds/probability-basics.html#thm-law-conditional-prob), with [sensitivity](#def-sensitivity) \\{\Pr\mathopen{}\left({+}\mid D\right)\mathclose{}} = 0.99\\, [specificity](#def-specificity) \\{\Pr\mathopen{}\left({-}\mid \neg D\right)\mathclose{}} = 0.99\\, [prevalence](#def-prevalence) \\{\Pr\mathopen{}\left(D\right)\mathclose{}} = 0.07\\, and \\{\Pr\mathopen{}\left(\neg D\right)\mathclose{}} = 0.93\\ ([Example 4](#exm-prevalence)), the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) that a person has COVID-19 and tests [positive](#def-positive-classification) is:
>
> \\ \begin{aligned} {\Pr\mathopen{}\left({+}\cap D\right)\mathclose{}} &= {\Pr\mathopen{}\left({+}\mid D\right)\mathclose{}} \cdot{\Pr\mathopen{}\left(D\right)\mathclose{}} && \text{(multiplication rule for conditional probability)} \\ &= 0.99 \cdot 0.07 && \text{(substitute the sensitivity and prevalence)} \\ &= 0.0693 && \text{(multiply)} \end{aligned} \tag{31}\\
>
> and the probability that a person does not have COVID-19 and tests [negative](#def-negative-classification) is:
>
> \\ \begin{aligned} {\Pr\mathopen{}\left({-}\cap \neg D\right)\mathclose{}} &= {\Pr\mathopen{}\left({-}\mid \neg D\right)\mathclose{}} \cdot{\Pr\mathopen{}\left(\neg D\right)\mathclose{}} && \text{(multiplication rule for conditional probability)} \\ &= 0.99 \cdot 0.93 && \text{(substitute the specificity and } {\Pr\mathopen{}\left(\neg D\right)\mathclose{}} \text{)} \\ &= 0.9207 && \text{(multiply)} \end{aligned} \tag{32}\\
>
> Then the [overall agreement](#def-overall-agreement) is:
>
> \\ \begin{aligned} p_o &= {\Pr\mathopen{}\left({+}\cap D\right)\mathclose{}} + {\Pr\mathopen{}\left({-}\cap \neg D\right)\mathclose{}} && \text{(definition of } p_o \text{)} \\ &= 0.0693 + 0.9207 && \text{(substitute the two joint probabilities)} \\ &= 0.99 && \text{(add)} \end{aligned} \tag{33}\\

> **NOTE:**
>
> **Definition 14 (Estimated overall agreement)** The **estimated overall agreement** of an [agreement table](#def-agreement-table) is the [sample proportion](exploratory-descriptive.llms.md#def-sample-proportion) of observations on which the agent and the reference assign the same [class](#def-class), which [estimates](estimation.llms.md#def-estimate) the [overall agreement](#def-overall-agreement) \\p_o\\:
>
> \\\widehat{p}\_o \stackrel{\text{def}}{=}\frac{a + d}{n} \tag{34}\\
>
> Source: Cohen [\[7\]](#ref-cohen1960coefficient).

> **NOTE:**
>
> **Example 10 (Estimated overall agreement for the COVID-19 test)** For the [agreement table](#def-agreement-table) of [Example 8](#exm-agreement-table-covid), the [estimated overall agreement](#def-estimated-overall-agreement) is:
>
> \\ \begin{aligned} \widehat{p}\_o &= \frac{693 + 9{,}207}{10{,}000} && \text{(definition of } \widehat{p}\_o \text{, with the table's counts)} \\ &= \frac{9{,}900}{10{,}000} && \text{(add)} \\ &= 0.99 && \text{(divide)} \end{aligned} \tag{35}\\
>
> This [estimate](estimation.llms.md#def-estimate) equals the [overall agreement](#def-overall-agreement) \\p_o = 0.99\\ of [Example 9](#exm-overall-agreement), because the table’s cell [sample proportions](exploratory-descriptive.llms.md#def-sample-proportion) \\a / n = 0.0693\\ and \\d / n = 0.9207\\ equal the joint [probabilities](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) \\{\Pr\mathopen{}\left({+}\cap D\right)\mathclose{}}\\ and \\{\Pr\mathopen{}\left({-}\cap \neg D\right)\mathclose{}}\\.

> **NOTE:**
>
> **Definition 15 (Positive agreement)** The **positive agreement** (also called the *average positive agreement*) of an agreement table ([Definition 12](#def-agreement-table)) with \\2a + b + c \> 0\\ is the number of [positive classifications](#def-positive-classification) the agent and the reference share, counted once for each classifier, as a proportion of all their positive classifications:
>
> \\p\_{\text{pos}} \stackrel{\text{def}}{=}\frac{2a}{2a + b + c} \tag{36}\\
>
> Source: Cicchetti and Feinstein [\[8\]](#ref-cicchetti1990high).

> **NOTE:**
>
> **Example 11 (Positive agreement for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), the positive agreement ([Definition 15](#def-positive-agreement)) is:
>
> \\ \begin{aligned} p\_{\text{pos}} &= \frac{2 \times 693}{2 \times 693 + 93 + 7} && \text{(definition of } p\_{\text{pos}} \text{, with the table's counts)} \\ &= \frac{1{,}386}{1{,}386 + 93 + 7} && \text{(multiply)} \\ &= \frac{1{,}386}{1{,}486} && \text{(add)} \\ &\approx 0.933 && \text{(divide)} \end{aligned} \tag{37}\\
>
> The positive agreement is lower than the overall agreement ([Example 9](#exm-overall-agreement)), because the 93 false positives are large relative to the 693 true positives.

> **NOTE:**
>
> **Definition 16 (Negative agreement)** The **negative agreement** (also called the *average negative agreement*) of an agreement table ([Definition 12](#def-agreement-table)) with \\2d + b + c \> 0\\ is the number of [negative classifications](#def-negative-classification) the agent and the reference share, counted once for each classifier, as a proportion of all their negative classifications:
>
> \\p\_{\text{neg}} \stackrel{\text{def}}{=}\frac{2d}{2d + b + c} \tag{38}\\
>
> Source: Cicchetti and Feinstein [\[8\]](#ref-cicchetti1990high).

> **NOTE:**
>
> **Example 12 (Negative agreement for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), the negative agreement ([Definition 16](#def-negative-agreement)) is:
>
> \\ \begin{aligned} p\_{\text{neg}} &= \frac{2 \times 9{,}207}{2 \times 9{,}207 + 93 + 7} && \text{(definition of } p\_{\text{neg}} \text{, with the table's counts)} \\ &= \frac{18{,}414}{18{,}414 + 93 + 7} && \text{(multiply)} \\ &= \frac{18{,}414}{18{,}514} && \text{(add)} \\ &\approx 0.995 && \text{(divide)} \end{aligned} \tag{39}\\
>
> The negative agreement is even higher than the overall agreement ([Example 9](#exm-overall-agreement)), because the 100 disagreements are small relative to the 9,207 shared negative calls.

> **NOTE:**
>
> **Definition 17 (Agent-only rate)** The **agent-only rate** of an agreement table ([Definition 12](#def-agreement-table)) is the proportion of observations that the agent calls positive and the reference calls negative:
>
> \\p\_{\text{agent}} \stackrel{\text{def}}{=}\frac{b}{n} \tag{40}\\

> **NOTE:**
>
> **Example 13 (Agent-only rate for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), the agent-only rate ([Definition 17](#def-agent-only-rate)) is:
>
> \\ \begin{aligned} p\_{\text{agent}} &= \frac{93}{10{,}000} && \text{(definition of } p\_{\text{agent}} \text{, with the table's counts)} \\ &= 0.0093 && \text{(divide)} \end{aligned} \tag{41}\\
>
> so about 9 of every 1,000 people tested are called positive by the test and negative by the reference.

> **NOTE:**
>
> **Definition 18 (Test measures estimated from an agreement table)** Treating the reference as the truth, an agreement table ([Definition 12](#def-agreement-table)) estimates four measures of the agent:
>
> - its [sensitivity](#def-sensitivity);
> - its [specificity](#def-specificity);
> - its [positive predictive value](#def-ppv);
> - its [negative predictive value](#def-npv).
>
> Each estimate is the matching proportion of the table’s cells, defined when its denominator is positive:
>
> \\ \begin{aligned} \widehat{\text{sensitivity}} &\stackrel{\text{def}}{=}\frac{a}{a + c}, \\ \widehat{\text{specificity}} &\stackrel{\text{def}}{=}\frac{d}{b + d}, \\ \widehat{\text{PPV}} &\stackrel{\text{def}}{=}\frac{a}{a + b}, \\ \widehat{\text{NPV}} &\stackrel{\text{def}}{=}\frac{d}{c + d}. \end{aligned} \tag{42}\\

> **NOTE:**
>
> **Example 14 (Test measures for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), [Definition 18](#def-agreement-test-measures) gives:
>
> ``` downlit
> test_measures <- with(as.list(agree_covid), c(
>   sensitivity = a / (a + c),
>   specificity = d / (b + d),
>   ppv = a / (a + b),
>   npv = d / (c + d)
> ))
> round(test_measures, 4)
> #> sensitivity specificity         ppv         npv 
> #>      0.9900      0.9900      0.8817      0.9992
> ```
>
> These estimates match the test’s sensitivity (0.99) and specificity (0.99), its positive predictive value (about 0.88, [Example 5](#exm-ppv)), and its negative predictive value (about 0.999, [Example 6](#exm-npv)), because the table’s counts are the expected counts for those values.

## 7 Positive and negative agreement as harmonic means

> **NOTE:**
>
> **Definition 19 (Harmonic mean)** The **harmonic mean** of two positive numbers \\x\\ and \\y\\ is the reciprocal of the average of their reciprocals:
>
> \\H(x, y) \stackrel{\text{def}}{=}\frac{2}{\frac{1}{x} + \frac{1}{y}} \tag{43}\\
>
> Source: Wikipedia contributors [\[9\]](#ref-wikipedia_harmonic_mean).

> **NOTE:**
>
> **Example 15 (Harmonic mean of 0.5 and 1)** By [Definition 19](#def-harmonic-mean):
>
> \\ \begin{aligned} H(0.5, 1) &= \frac{2}{\frac{1}{0.5} + \frac{1}{1}} && \text{(definition of } H \text{)} \\ &= \frac{2}{2 + 1} && \text{(take each reciprocal)} \\ &= \frac{2}{3} && \text{(add)} \\ &\approx 0.667 && \text{(divide)} \end{aligned} \tag{44}\\
>
> The ordinary average of 0.5 and 1 is 0.75; the harmonic mean sits closer to the smaller number.

> **NOTE:**
>
> **Exercise 5 (Positive agreement from PPV and sensitivity)** For an agreement table ([Definition 12](#def-agreement-table)) with \\a \> 0\\, write the [harmonic mean](#def-harmonic-mean) of the estimated positive predictive value and sensitivity ([Definition 18](#def-agreement-test-measures)) in terms of the table’s cells.

> **NOTE:**
>
> *Solution 5*. Because \\a \> 0\\, both \\a + b\\ and \\a + c\\ are positive, so both estimates are defined and positive:
>
> \\ \begin{aligned} H\mathopen{}\left(\widehat{\text{PPV}}, \widehat{\text{sensitivity}}\right)\mathclose{} &= \frac{2}{\frac{1}{\widehat{\text{PPV}}} + \frac{1}{\widehat{\text{sensitivity}}}} && \text{(definition of } H \text{)} \\ &= \frac{2}{\frac{1}{a / (a + b)} + \frac{1}{\widehat{\text{sensitivity}}}} && \text{(definition of } \widehat{\text{PPV}} \text{)} \\ &= \frac{2}{\frac{1}{a / (a + b)} + \frac{1}{a / (a + c)}} && \text{(definition of } \widehat{\text{sensitivity}} \text{)} \\ &= \frac{2}{\frac{a + b}{a} + \frac{1}{a / (a + c)}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{a + b}{a} + \frac{a + c}{a}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{(a + b) + (a + c)}{a}} && \text{(add fractions with a common denominator)} \\ &= \frac{2}{\frac{a + b + a + c}{a}} && \text{(remove parentheses)} \\ &= \frac{2}{\frac{a + a + b + c}{a}} && \text{(reorder terms)} \\ &= \frac{2}{\frac{2a + b + c}{a}} && \text{(} a + a = 2a \text{)} \\ &= 2 \cdot\frac{a}{2a + b + c} && \text{(dividing by a fraction multiplies by its reciprocal)} \\ &= \frac{2a}{2a + b + c} && \text{(multiply)} \end{aligned} \tag{45}\\

> **NOTE:**
>
> **Theorem 5 (Positive agreement is a harmonic mean)** For an agreement table with \\a \> 0\\, the positive agreement ([Definition 15](#def-positive-agreement)) is the harmonic mean ([Definition 19](#def-harmonic-mean)) of the estimated positive predictive value and sensitivity ([Definition 18](#def-agreement-test-measures)):
>
> \\ p\_{\text{pos}} = H\mathopen{}\left(\widehat{\text{PPV}}, \widehat{\text{sensitivity}}\right)\mathclose{} \tag{46}\\

> **NOTE:**
>
> *Proof*. By [Exercise 5](#exr-pos-agreement-harmonic), the harmonic mean equals \\2a / (2a + b + c)\\, which is \\p\_{\text{pos}}\\ by [Definition 15](#def-positive-agreement).

> **NOTE:**
>
> **Example 16 (Positive agreement of the COVID-19 test as a harmonic mean)** For the agreement table of [Example 8](#exm-agreement-table-covid), the estimated positive predictive value is \\693 / 786\\ and the estimated sensitivity is \\693 / 700\\ ([Example 14](#exm-agreement-test-measures)). [Theorem 5](#thm-pos-agreement-harmonic) gives:
>
> \\ \begin{aligned} p\_{\text{pos}} &= \frac{2}{\frac{1}{693 / 786} + \frac{1}{693 / 700}} && \text{(harmonic mean of the two estimates)} \\ &= \frac{2}{\frac{786}{693} + \frac{1}{693 / 700}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{786}{693} + \frac{700}{693}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{1{,}486}{693}} && \text{(add fractions with a common denominator)} \\ &= 2 \cdot\frac{693}{1{,}486} && \text{(dividing by a fraction multiplies by its reciprocal)} \\ &= \frac{1{,}386}{1{,}486} && \text{(multiply)} \\ &\approx 0.933 && \text{(divide)} \end{aligned} \tag{47}\\
>
> which matches [Example 11](#exm-positive-agreement). The lower positive predictive value (about 0.88) pulls the positive agreement down from the sensitivity (0.99), as in [Example 15](#exm-harmonic-mean).

> **NOTE:**
>
> **Exercise 6 (Negative agreement from NPV and specificity)** For an agreement table ([Definition 12](#def-agreement-table)) with \\d \> 0\\, write the [harmonic mean](#def-harmonic-mean) of the estimated negative predictive value and specificity ([Definition 18](#def-agreement-test-measures)) in terms of the table’s cells.

> **NOTE:**
>
> *Solution 6*. Because \\d \> 0\\, both \\c + d\\ and \\b + d\\ are positive, so both estimates are defined and positive:
>
> \\ \begin{aligned} H\mathopen{}\left(\widehat{\text{NPV}}, \widehat{\text{specificity}}\right)\mathclose{} &= \frac{2}{\frac{1}{\widehat{\text{NPV}}} + \frac{1}{\widehat{\text{specificity}}}} && \text{(definition of } H \text{)} \\ &= \frac{2}{\frac{1}{d / (c + d)} + \frac{1}{\widehat{\text{specificity}}}} && \text{(definition of } \widehat{\text{NPV}} \text{)} \\ &= \frac{2}{\frac{1}{d / (c + d)} + \frac{1}{d / (b + d)}} && \text{(definition of } \widehat{\text{specificity}} \text{)} \\ &= \frac{2}{\frac{c + d}{d} + \frac{1}{d / (b + d)}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{c + d}{d} + \frac{b + d}{d}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{(c + d) + (b + d)}{d}} && \text{(add fractions with a common denominator)} \\ &= \frac{2}{\frac{c + d + b + d}{d}} && \text{(remove parentheses)} \\ &= \frac{2}{\frac{d + d + b + c}{d}} && \text{(reorder terms)} \\ &= \frac{2}{\frac{2d + b + c}{d}} && \text{(} d + d = 2d \text{)} \\ &= 2 \cdot\frac{d}{2d + b + c} && \text{(dividing by a fraction multiplies by its reciprocal)} \\ &= \frac{2d}{2d + b + c} && \text{(multiply)} \end{aligned} \tag{48}\\

> **NOTE:**
>
> **Theorem 6 (Negative agreement is a harmonic mean)** For an agreement table with \\d \> 0\\, the negative agreement ([Definition 16](#def-negative-agreement)) is the harmonic mean ([Definition 19](#def-harmonic-mean)) of the estimated negative predictive value and specificity ([Definition 18](#def-agreement-test-measures)):
>
> \\ p\_{\text{neg}} = H\mathopen{}\left(\widehat{\text{NPV}}, \widehat{\text{specificity}}\right)\mathclose{} \tag{49}\\

> **NOTE:**
>
> *Proof*. By [Exercise 6](#exr-neg-agreement-harmonic), the harmonic mean equals \\2d / (2d + b + c)\\, which is \\p\_{\text{neg}}\\ by [Definition 16](#def-negative-agreement).

> **NOTE:**
>
> **Example 17 (Negative agreement of the COVID-19 test as a harmonic mean)** For the agreement table of [Example 8](#exm-agreement-table-covid), the estimated negative predictive value is \\9{,}207 / 9{,}214\\ and the estimated specificity is \\9{,}207 / 9{,}300\\ ([Example 14](#exm-agreement-test-measures)). [Theorem 6](#thm-neg-agreement-harmonic) gives:
>
> \\ \begin{aligned} p\_{\text{neg}} &= \frac{2}{\frac{1}{9{,}207 / 9{,}214} + \frac{1}{9{,}207 / 9{,}300}} && \text{(harmonic mean of the two estimates)} \\ &= \frac{2}{\frac{9{,}214}{9{,}207} + \frac{1}{9{,}207 / 9{,}300}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{9{,}214}{9{,}207} + \frac{9{,}300}{9{,}207}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{18{,}514}{9{,}207}} && \text{(add fractions with a common denominator)} \\ &= 2 \cdot\frac{9{,}207}{18{,}514} && \text{(dividing by a fraction multiplies by its reciprocal)} \\ &= \frac{18{,}414}{18{,}514} && \text{(multiply)} \\ &\approx 0.995 && \text{(divide)} \end{aligned} \tag{50}\\
>
> which matches [Example 12](#exm-negative-agreement).

## 8 Cohen’s kappa

> **NOTE:**
>
> **Definition 20 (Chance agreement)** Let:
>
> - \\A\\ be the [event](https://morrison-lab.github.io/pds/probability-basics.html#def-event) that the agent makes a [positive classification](#def-positive-classification) for an observation drawn from a [population](exploratory-descriptive.llms.md#def-population), with [complement](https://morrison-lab.github.io/pds/probability-basics.html#def-complement) \\\neg A\\.
> - \\R\\ be the event that the reference makes a positive classification for the same observation, with complement \\\neg R\\.
>
> The **chance agreement** of the agent and the reference on that population is the [overall agreement](#def-overall-agreement) they would have if \\A\\ and \\R\\ were [statistically independent](https://morrison-lab.github.io/pds/independence.html#def-indpt) with their marginal [probabilities](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) \\{\Pr\mathopen{}\left(A\right)\mathclose{}}\\ and \\{\Pr\mathopen{}\left(R\right)\mathclose{}}\\:
>
> \\p_e \stackrel{\text{def}}{=}{\Pr\mathopen{}\left(A\right)\mathclose{}} \cdot{\Pr\mathopen{}\left(R\right)\mathclose{}} + {\Pr\mathopen{}\left(\neg A\right)\mathclose{}} \cdot{\Pr\mathopen{}\left(\neg R\right)\mathclose{}} \tag{51}\\
>
> Source: Cohen [\[7\]](#ref-cohen1960coefficient).

> **NOTE:**
>
> **Example 18 (Chance agreement for the COVID-19 test)** Apply the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity) to the [population](exploratory-descriptive.llms.md#def-population) of [Example 4](#exm-prevalence), with the test as the agent (\\A = {+}\\) and the disease status as the reference (\\R = D\\). By [Theorem 2](#thm-prob-positive), with [sensitivity](#def-sensitivity) \\\text{sens} = 0.99\\, [specificity](#def-specificity) \\\text{spec} = 0.99\\, and [prevalence](#def-prevalence) \\\pi= {\Pr\mathopen{}\left(D\right)\mathclose{}} = 0.07\\, the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) of a [positive](#def-positive-classification) test is:
>
> \\ \begin{aligned} {\Pr\mathopen{}\left({+}\right)\mathclose{}} &= \text{sens} \cdot\pi+ \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{} && \text{(probability of a positive test)} \\ &= 0.99 \cdot 0.07 + \mathopen{}\left(1 - 0.99\right)\mathclose{} \cdot\mathopen{}\left(1 - 0.07\right)\mathclose{} && \text{(substitute the given values)} \\ &= 0.99 \cdot 0.07 + 0.01 \cdot 0.93 && \text{(subtract inside each pair of parentheses)} \\ &= 0.0693 + 0.0093 && \text{(multiply each product)} \\ &= 0.0786 && \text{(add)} \end{aligned} \tag{52}\\
>
> By the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0) and [Theorem 1](#thm-negative-classification-complement), the probability of a [negative](#def-negative-classification) test is:
>
> \\ \begin{aligned} {\Pr\mathopen{}\left({-}\right)\mathclose{}} &= {\Pr\mathopen{}\left(\neg {+}\right)\mathclose{}} && \text{(negative classification is the complement of positive)} \\ &= 1 - {\Pr\mathopen{}\left({+}\right)\mathclose{}} && \text{(complement rule)} \\ &= 1 - 0.0786 && \text{(substitute } {\Pr\mathopen{}\left({+}\right)\mathclose{}} \text{)} \\ &= 0.9214 && \text{(subtract)} \end{aligned} \tag{53}\\
>
> With \\{\Pr\mathopen{}\left(D\right)\mathclose{}} = 0.07\\ and \\{\Pr\mathopen{}\left(\neg D\right)\mathclose{}} = 0.93\\ ([Example 4](#exm-prevalence)), the [chance agreement](#def-chance-agreement) is:
>
> \\ \begin{aligned} p_e &= {\Pr\mathopen{}\left({+}\right)\mathclose{}} \cdot{\Pr\mathopen{}\left(D\right)\mathclose{}} + {\Pr\mathopen{}\left({-}\right)\mathclose{}} \cdot{\Pr\mathopen{}\left(\neg D\right)\mathclose{}} && \text{(definition of } p_e \text{)} \\ &= 0.0786 \cdot 0.07 + 0.9214 \cdot 0.93 && \text{(substitute the marginal probabilities)} \\ &= 0.005502 + 0.856902 && \text{(multiply each product)} \\ &= 0.862404 && \text{(add)} \end{aligned} \tag{54}\\
>
> Because nearly everyone tests negative and does not have COVID-19, two [independent](https://morrison-lab.github.io/pds/independence.html#def-indpt) classifiers with \\{\Pr\mathopen{}\left({+}\right)\mathclose{}} = 0.0786\\ and \\{\Pr\mathopen{}\left(D\right)\mathclose{}} = 0.07\\ would agree on about 86% of people by chance alone.

> **NOTE:**
>
> **Definition 21 (Estimated chance agreement)** The **estimated chance agreement** of an [agreement table](#def-agreement-table) [estimates](estimation.llms.md#def-estimate) the [chance agreement](#def-chance-agreement) \\p_e\\ by replacing the marginal [probabilities](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) \\{\Pr\mathopen{}\left(A\right)\mathclose{}}\\, \\{\Pr\mathopen{}\left(R\right)\mathclose{}}\\, \\{\Pr\mathopen{}\left(\neg A\right)\mathclose{}}\\, and \\{\Pr\mathopen{}\left(\neg R\right)\mathclose{}}\\ with the table’s marginal [sample proportions](exploratory-descriptive.llms.md#def-sample-proportion) \\(a + b) / n\\, \\(a + c) / n\\, \\(c + d) / n\\, and \\(b + d) / n\\:
>
> \\\widehat{p}\_e \stackrel{\text{def}}{=}\frac{(a + b)(a + c) + (c + d)(b + d)}{n^2} \tag{55}\\
>
> Source: Cohen [\[7\]](#ref-cohen1960coefficient).

> **NOTE:**
>
> **Example 19 (Estimated chance agreement for the COVID-19 test)** For the [agreement table](#def-agreement-table) of [Example 8](#exm-agreement-table-covid), the [estimated chance agreement](#def-estimated-chance-agreement) is:
>
> \\ \begin{aligned} \widehat{p}\_e &= \frac{786 \times 700 + 9{,}214 \times 9{,}300}{10{,}000^2} && \text{(definition of } \widehat{p}\_e \text{, with the table's counts)} \\ &= \frac{550{,}200 + 85{,}690{,}200}{10{,}000^2} && \text{(multiply)} \\ &= \frac{86{,}240{,}400}{10{,}000^2} && \text{(add)} \\ &= \frac{86{,}240{,}400}{100{,}000{,}000} && \text{(square)} \\ &= 0.862404 && \text{(divide)} \end{aligned} \tag{56}\\
>
> This [estimate](estimation.llms.md#def-estimate) equals the [chance agreement](#def-chance-agreement) \\p_e = 0.862404\\ of [Example 18](#exm-chance-agreement), because the table’s marginal [sample proportions](exploratory-descriptive.llms.md#def-sample-proportion) equal the marginal [probabilities](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) \\{\Pr\mathopen{}\left({+}\right)\mathclose{}}\\, \\{\Pr\mathopen{}\left(D\right)\mathclose{}}\\, \\{\Pr\mathopen{}\left({-}\right)\mathclose{}}\\, and \\{\Pr\mathopen{}\left(\neg D\right)\mathclose{}}\\.

> **NOTE:**
>
> **Definition 22 (Cohen’s kappa)** For an agent and a reference with [chance agreement](#def-chance-agreement) \\p_e \< 1\\, **Cohen’s kappa** is the agreement beyond chance, as a fraction of the largest possible agreement beyond chance, built from the [overall agreement](#def-overall-agreement) \\p_o\\ and the chance agreement \\p_e\\:
>
> \\\kappa \stackrel{\text{def}}{=}\frac{p_o - p_e}{1 - p_e} \tag{57}\\
>
> Source: Cohen [\[7\]](#ref-cohen1960coefficient); Wikipedia contributors [\[10\]](#ref-wikipedia_cohens_kappa).

> **NOTE:**
>
> **Example 20 (Cohen’s kappa for the COVID-19 test)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity) in the [population](exploratory-descriptive.llms.md#def-population) of [Example 4](#exm-prevalence), the [overall agreement](#def-overall-agreement) is \\p_o = 0.99\\ ([Example 9](#exm-overall-agreement)) and the [chance agreement](#def-chance-agreement) is \\p_e = 0.862404\\ ([Example 18](#exm-chance-agreement)), so [Cohen’s kappa](#def-cohen-kappa) is:
>
> \\ \begin{aligned} \kappa &= \frac{0.99 - 0.862404}{1 - 0.862404} && \text{(definition of } \kappa \text{)} \\ &= \frac{0.127596}{1 - 0.862404} && \text{(subtract in the numerator)} \\ &= \frac{0.127596}{0.137596} && \text{(subtract in the denominator)} \\ &\approx 0.927 && \text{(divide)} \end{aligned} \tag{58}\\

> **NOTE:**
>
> **Definition 23 (Estimated Cohen’s kappa)** For an [agreement table](#def-agreement-table) with [estimated chance agreement](#def-estimated-chance-agreement) \\\widehat{p}\_e \< 1\\, the **estimated Cohen’s kappa** [estimates](estimation.llms.md#def-estimate) [Cohen’s kappa](#def-cohen-kappa) \\\kappa\\ from the [estimated overall agreement](#def-estimated-overall-agreement) \\\widehat{p}\_o\\ and the estimated chance agreement \\\widehat{p}\_e\\:
>
> \\\hat{\kappa}\stackrel{\text{def}}{=}\frac{\widehat{p}\_o - \widehat{p}\_e}{1 - \widehat{p}\_e} \tag{59}\\
>
> Source: Cohen [\[7\]](#ref-cohen1960coefficient); Wikipedia contributors [\[10\]](#ref-wikipedia_cohens_kappa).

> **NOTE:**
>
> **Example 21 (Estimated Cohen’s kappa for the COVID-19 test)** For the [agreement table](#def-agreement-table) of [Example 8](#exm-agreement-table-covid), the [estimated overall agreement](#def-estimated-overall-agreement) is \\\widehat{p}\_o = 0.99\\ ([Example 10](#exm-estimated-overall-agreement)) and the [estimated chance agreement](#def-estimated-chance-agreement) is \\\widehat{p}\_e = 0.862404\\ ([Example 19](#exm-estimated-chance-agreement)), so the [estimated Cohen’s kappa](#def-estimated-cohen-kappa) is:
>
> \\ \begin{aligned} \hat{\kappa} &= \frac{0.99 - 0.862404}{1 - 0.862404} && \text{(definition of } \hat{\kappa}\text{)} \\ &= \frac{0.127596}{1 - 0.862404} && \text{(subtract in the numerator)} \\ &= \frac{0.127596}{0.137596} && \text{(subtract in the denominator)} \\ &\approx 0.927 && \text{(divide)} \end{aligned} \tag{60}\\
>
> ``` downlit
> kappa_from_table <- function(a, b, c, d) {
>   n <- a + b + c + d
>   p_o_hat <- (a + d) / n
>   p_e_hat <- ((a + b) * (a + c) + (c + d) * (b + d)) / n^2
>   (p_o_hat - p_e_hat) / (1 - p_e_hat)
> }
> do.call(kappa_from_table, as.list(agree_covid))
> #> [1] 0.927323
> ```
>
> This [estimate](estimation.llms.md#def-estimate) equals [Cohen’s kappa](#def-cohen-kappa) \\\kappa \approx 0.927\\ of [Example 20](#exm-cohen-kappa-covid), because \\\widehat{p}\_o = p_o\\ and \\\widehat{p}\_e = p_e\\.

> **NOTE:**
>
> **Example 22 (High agreement but low kappa)** Now apply the same test to \\n = 100{,}000\\ people in a [population](exploratory-descriptive.llms.md#def-population) where the [prevalence](#def-prevalence) is only 0.5%. Then:
>
> - \\0.005 \times 100{,}000 = 500\\ people have COVID-19 and \\100{,}000 - 500 = 99{,}500\\ do not;
> - with 99% [sensitivity](#def-sensitivity), the test is positive for \\a = 0.99 \times 500 = 495\\ people with COVID-19 and negative for \\c = 500 - 495 = 5\\;
> - with 99% [specificity](#def-specificity), the false positive rate is \\1 - 0.99 = 0.01\\, so the test is positive for \\b = 0.01 \times 99{,}500 = 995\\ people without COVID-19 and negative for \\d = 99{,}500 - 995 = 98{,}505\\.
>
> ``` downlit
> agree_rare <- c(a = 495, b = 995, c = 5, d = 98505)
> rare_metrics <- with(as.list(agree_rare), c(
>   overall = (a + d) / (a + b + c + d),
>   positive = 2 * a / (2 * a + b + c),
>   negative = 2 * d / (2 * d + b + c),
>   kappa = kappa_from_table(a, b, c, d)
> ))
> round(rare_metrics, 4)
> #>  overall positive negative    kappa 
> #>   0.9900   0.4975   0.9949   0.4937
> ```
>
> The [estimated overall agreement](#def-estimated-overall-agreement) is still 0.99, but the [estimated Cohen’s kappa](#def-estimated-cohen-kappa) drops to about 0.49 and the [positive agreement](#def-positive-agreement) to about 0.50, while the [negative agreement](#def-negative-agreement) stays at about 0.995. The positive and negative agreements show where the classifiers disagree: the test and the reference agree on negatives and disagree on about half of the positive calls.
>
> Source: Feinstein and Cicchetti [\[11\]](#ref-feinstein1990high) (the first paradox).

> **NOTE:**
>
> *Remark 3* (Kappa depends on prevalence). When both classifiers call one [class](#def-class) rarely, the [chance agreement](#def-chance-agreement) \\p_e\\ is close to 1, so the same [overall agreement](#def-overall-agreement) leaves little room for agreement beyond chance, and [Cohen’s kappa](#def-cohen-kappa) can be low even when the overall agreement is high, as [Example 22](#exm-kappa-paradox) shows. Cicchetti and Feinstein [\[8\]](#ref-cicchetti1990high) recommend reporting the [positive agreement](#def-positive-agreement) and [negative agreement](#def-negative-agreement) alongside Cohen’s kappa, so that poor agreement on the rarer class is not hidden.
>
> Source: Feinstein and Cicchetti [\[11\]](#ref-feinstein1990high); Cicchetti and Feinstein [\[8\]](#ref-cicchetti1990high).

## References

\[1\]

Wikipedia contributors, “Bayes’ theorem — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Bayes%27_theorem>

\[2\]

Wikipedia contributors, “Statistical classification — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Statistical_classification>

\[3\]

Wikipedia contributors, “Sensitivity and specificity — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Sensitivity_and_specificity>

\[4\]

Wikipedia contributors, “Prevalence — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Prevalence>

\[5\]

Wikipedia contributors, “Positive and negative predictive values — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values>

\[6\]

Wikipedia contributors, “Confusion matrix — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Confusion_matrix>

\[7\]

J. Cohen, “A coefficient of agreement for nominal scales,” *Educational and Psychological Measurement*, vol. 20, no. 1, pp. 37–46, 1960, doi: [10.1177/001316446002000104](https://doi.org/10.1177/001316446002000104).

\[8\]

D. V. Cicchetti and A. R. Feinstein, “High agreement but low kappa: II. Resolving the paradoxes,” *Journal of Clinical Epidemiology*, vol. 43, no. 6, pp. 551–558, 1990, doi: [10.1016/0895-4356(90)90159-M](https://doi.org/10.1016/0895-4356(90)90159-M).

\[9\]

Wikipedia contributors, “Harmonic mean — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Harmonic_mean>

\[10\]

Wikipedia contributors, “Cohen’s kappa — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Cohen%27s_kappa>

\[11\]

A. R. Feinstein and D. V. Cicchetti, “High agreement but low kappa: I. The problems of two paradoxes,” *Journal of Clinical Epidemiology*, vol. 43, no. 6, pp. 543–549, 1990, doi: [10.1016/0895-4356(90)90158-L](https://doi.org/10.1016/0895-4356(90)90158-L).

Back to top

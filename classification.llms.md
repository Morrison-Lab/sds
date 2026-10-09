# Classification and Diagnostic Tests

Code

Published

Last modified: 2026-10-09 13:41:56 (PDT)

## 1 Introduction

Classification is a core problem in statistics and machine learning: we seek to assign individuals or observations to one of several discrete categories based on available data. In medicine and epidemiology, classification problems arise constantly; for example, a clinician decides whether a patient has a disease based on evidence such as:

- test results;
- biomarkers;
- clinical signs.

A test can look highly accurate in isolation, yet its predictive value for an individual patient depends heavily on the prevalence of the condition in the population being tested. Understanding this interplay requires [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#thm-bayes) and the [law of total probability](https://morrison-lab.github.io/pds/probability-basics.html#thm-total-prob).

> **NOTE:**
>
> **Definition 1 (Classification)** A **classification problem** is a statistical problem in which we seek to assign each observation to one of two or more discrete categories (**classes**) based on its observed features or predictors \\x\\, using a **classification rule** \\c\\ that maps features to classes:
>
> \\c: x \mapsto c(x) \in \mathcal{C} \tag{1}\\
>
> where \\\mathcal{C}\\ is a set of \\K\\ classes (for example, \\\mathcal{C}= \mathopen{}\left\\1, \dots, K\right\\\mathclose{}\\, or a set of text labels).
>
> In the binary case (\\K = 2\\), the two classes are often labeled “positive” and “negative”, or “diseased” and “healthy”.

> **NOTE:**
>
> **Example 1 (A diagnostic test as a classification rule)** A COVID-19 test assigns each person tested to one of \\K = 2\\ classes, “has COVID-19” or “does not have COVID-19”, based on a single feature \\x\\: the test’s result, positive (\\+\\) or negative (\\\neg +\\). The test is the classification rule ([Definition 1](#def-classification)) that assigns a positive result to “has COVID-19” and a negative result to “does not have COVID-19”:
>
> \\ c(x) \stackrel{\text{def}}{=} \begin{cases} \text{has COVID-19} & \text{if } x = + \\ \text{does not have COVID-19} & \text{if } x = \neg + \end{cases} \tag{2}\\

## 2 Diagnostic test characteristics

> **NOTE:**
>
> **Definition 2 (Sensitivity)** The **sensitivity** of a diagnostic test is the probability that the test is positive (\\+\\), given that the person tested has the disease (\\D\\):
>
> \\\text{sensitivity} \stackrel{\text{def}}{=}\Pr(+ \mid D) \tag{3}\\

> **NOTE:**
>
> **Example 2 (Sensitivity of a COVID-19 test)** Suppose a COVID-19 test is positive for 99% of the people who have COVID-19. Let \\D\\ be the event “the person has COVID-19” and \\+\\ the event “the test is positive”. Then the test’s sensitivity ([Definition 2](#def-sensitivity)) is:
>
> \\\Pr(+ \mid D) = 0.99 \tag{4}\\

> **NOTE:**
>
> **Definition 3 (Specificity)** The **specificity** of a diagnostic test is the probability that the test is negative (\\\neg +\\), given that the person tested does not have the disease (\\\neg D\\):
>
> \\\text{specificity} \stackrel{\text{def}}{=}\Pr(\neg + \mid \neg D) \tag{5}\\

> **NOTE:**
>
> **Example 3 (Specificity of a COVID-19 test)** Suppose the COVID-19 test of [Example 2](#exm-sensitivity) is negative for 99% of the people who do not have COVID-19. Then its specificity ([Definition 3](#def-specificity)) is:
>
> \\\Pr(\neg + \mid \neg D) = 0.99 \tag{6}\\
>
> By the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0), its false positive rate is:
>
> \\ \begin{aligned} \Pr(+ \mid \neg D) &= 1 - \Pr(\neg + \mid \neg D) && \text{(complement rule, conditional on } \neg D \text{)} \\ &= 1 - 0.99 && \text{(substitute the specificity)} \\ &= 0.01 && \text{(subtract)} \end{aligned} \tag{7}\\

> **NOTE:**
>
> **Definition 4 (Prevalence)** The **prevalence** of a disease in a population is the probability that a person drawn from that population has the disease (\\D\\):
>
> \\\text{prevalence} \stackrel{\text{def}}{=}\Pr(D) \tag{8}\\

> **NOTE:**
>
> **Example 4 (Prevalence of COVID-19)** Suppose 7% of the population being tested with the COVID-19 test of [Example 2](#exm-sensitivity) has COVID-19. Then the prevalence ([Definition 4](#def-prevalence)) is:
>
> \\\Pr(D) = 0.07 \tag{9}\\
>
> and, by the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0), the probability that a person drawn from that population does not have COVID-19 is:
>
> \\ \begin{aligned} \Pr(\neg D) &= 1 - \Pr(D) && \text{(complement rule)} \\ &= 1 - 0.07 && \text{(substitute the prevalence)} \\ &= 0.93 && \text{(subtract)} \end{aligned} \tag{10}\\

## 3 Predictive values

> **NOTE:**
>
> **Definition 5 (Positive predictive value (PPV))** The **positive predictive value** of a diagnostic test is the probability that the person tested has the disease (\\D\\), given that the test is positive (\\+\\):
>
> \\\text{PPV} \stackrel{\text{def}}{=}\Pr(D \mid +) \tag{11}\\

> **NOTE:**
>
> **Example 5 (PPV of a COVID-19 test)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity), used in the population of [Example 4](#exm-prevalence), [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#exm-bayes) gives the positive predictive value ([Definition 5](#def-ppv)):
>
> \\\Pr(D \mid +) \approx 0.88 \tag{12}\\
>
> Even with a highly accurate test (99% sensitive and 99% specific), only about 88% of the people who test positive have COVID-19, because the prevalence (7%) is low enough that false positives make up a meaningful fraction of all positive tests.

> **NOTE:**
>
> **Definition 6 (Negative predictive value (NPV))** The **negative predictive value** of a diagnostic test is the probability that the person tested does not have the disease (\\\neg D\\), given that the test is negative (\\\neg +\\):
>
> \\\text{NPV} \stackrel{\text{def}}{=}\Pr(\neg D \mid \neg +) \tag{13}\\

> **NOTE:**
>
> **Example 6 (NPV of a COVID-19 test)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity), used in the population of [Example 4](#exm-prevalence), the probability of a negative test for a person with COVID-19 is, by the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0):
>
> \\ \begin{aligned} \Pr(\neg + \mid D) &= 1 - \Pr(+ \mid D) && \text{(complement rule, conditional on } D \text{)} \\ &= 1 - 0.99 && \text{(substitute the sensitivity)} \\ &= 0.01 && \text{(subtract)} \end{aligned} \tag{14}\\
>
> By [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#thm-bayes), with the denominator expanded by the [law of total probability](https://morrison-lab.github.io/pds/probability-basics.html#thm-total-prob) over the partition \\\mathopen{}\left\\D, \neg D\right\\\mathclose{}\\, the negative predictive value ([Definition 6](#def-npv)) is:
>
> \\ \begin{aligned} \Pr(\neg D \mid \neg +) &= \frac{\Pr(\neg + \mid \neg D) \cdot\Pr(\neg D)}{\Pr(\neg +)} && \text{(Bayes' theorem)} \\ &= \frac{\Pr(\neg + \mid \neg D) \cdot\Pr(\neg D)}{\Pr(\neg + \mid \neg D) \cdot\Pr(\neg D) + \Pr(\neg + \mid D) \cdot\Pr(D)} && \text{(law of total probability)} \\ &= \frac{0.99 \cdot 0.93}{0.99 \cdot 0.93 + 0.01 \cdot 0.07} && \text{(substitute the given values)} \\ &= \frac{0.9207}{0.9207 + 0.0007} && \text{(multiply each term in the numerator and denominator)} \\ &= \frac{0.9207}{0.9214} && \text{(add the denominator's two terms)} \\ &\approx 0.9992 && \text{(divide)} \end{aligned} \tag{15}\\
>
> A negative result from this test is very reliable: only about 8 in 10,000 people who test negative have COVID-19.

## 4 PPV in terms of sensitivity, specificity, and prevalence

> **NOTE:**
>
> **Exercise 1 (Probability of a positive test)** Write the probability \\\Pr(+)\\ that a diagnostic test is positive in terms of:
>
> - the test’s [sensitivity](#def-sensitivity);
> - the test’s [specificity](#def-specificity);
> - the [prevalence](#def-prevalence) of the disease.

> **NOTE:**
>
> *Solution 1*. By the [law of total probability](https://morrison-lab.github.io/pds/probability-basics.html#thm-total-prob) over the partition \\\mathopen{}\left\\D, \neg D\right\\\mathclose{}\\:
>
> \\ \begin{aligned} \Pr(+) &= \Pr(+ \mid D) \cdot\Pr(D) + \Pr(+ \mid \neg D) \cdot\Pr(\neg D) && \text{(law of total probability)} \\ &= \text{sensitivity} \cdot\Pr(D) + \Pr(+ \mid \neg D) \cdot\Pr(\neg D) && \text{(definition of sensitivity)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \Pr(+ \mid \neg D) \cdot\Pr(\neg D) && \text{(definition of prevalence)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \Pr(\neg + \mid \neg D)\right)\mathclose{} \cdot\Pr(\neg D) && \text{(complement rule, conditional on } \neg D \text{)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \text{specificity}\right)\mathclose{} \cdot\Pr(\neg D) && \text{(definition of specificity)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \text{specificity}\right)\mathclose{} \cdot\mathopen{}\left(1 - \Pr(D)\right)\mathclose{} && \text{(complement rule)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \text{specificity}\right)\mathclose{} \cdot\mathopen{}\left(1 - \text{prevalence}\right)\mathclose{} && \text{(definition of prevalence)} \end{aligned} \tag{16}\\

> **NOTE:**
>
> **Exercise 2 (PPV from Bayes’ theorem)** Write the [positive predictive value](#def-ppv) of a diagnostic test in terms of:
>
> - its [sensitivity](#def-sensitivity);
> - its [specificity](#def-specificity);
> - the [prevalence](#def-prevalence) of the disease.

> **NOTE:**
>
> *Solution 2*. Abbreviate the sensitivity as \\\text{sens}\\, the specificity as \\\text{spec}\\, and the prevalence as \\\pi\\. By [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#thm-bayes), with the probability of a positive test from [Exercise 1](#exr-prob-positive):
>
> \\ \begin{aligned} \text{PPV} &\stackrel{\text{def}}{=}\Pr(D \mid +) && \text{(definition of PPV)} \\ &= \frac{\Pr(+ \mid D) \cdot\Pr(D)}{\Pr(+)} && \text{(Bayes' theorem)} \\ &= \frac{\text{sens} \cdot\Pr(D)}{\Pr(+)} && \text{(definition of sensitivity)} \\ &= \frac{\text{sens} \cdot\pi}{\Pr(+)} && \text{(definition of prevalence)} \\ &= \frac{\text{sens} \cdot\pi}{\text{sens} \cdot\pi+ \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}} && \text{(probability of a positive test)} \end{aligned} \tag{17}\\

> **NOTE:**
>
> **Exercise 3 (PPV in terms of two ratios)** Rewrite the expression for the positive predictive value from [Exercise 2](#exr-ppv-bayes) so that the sensitivity, specificity, and prevalence appear only through the ratio \\\frac{1 - \text{spec}}{\text{sens}}\\ of the false positive rate to the sensitivity and the ratio \\\frac{1 - \pi}{\pi}\\ of non-diseased to diseased people in the population.

> **NOTE:**
>
> *Solution 3*. Write \\a \stackrel{\text{def}}{=}\text{sens} \cdot\pi\\ and \\b \stackrel{\text{def}}{=}\mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}\\, so that [Exercise 2](#exr-ppv-bayes) reads \\\text{PPV} = \frac{a}{a + b}\\, with \\a \> 0\\ whenever the sensitivity and prevalence are positive. Then:
>
> \\ \begin{aligned} \text{PPV} &= \frac{a}{a + b} && \text{(PPV from Bayes' theorem)} \\ &= \frac{1}{\mathopen{}\left(\frac{a + b}{a}\right)\mathclose{}} && \text{(a fraction equals one over its reciprocal, since } a \> 0 \text{)} \\ &= \frac{1}{\frac{a}{a} + \frac{b}{a}} && \text{(split the fraction over the sum in its numerator)} \\ &= \frac{1}{1 + \frac{b}{a}} && \text{(} \tfrac{a}{a} = 1 \text{)} \\ &= \frac{1}{1 + \frac{\mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}}{\text{sens} \cdot\pi}} && \text{(substitute the definitions of } a \text{ and } b \text{)} \\ &= \frac{1}{1 + \frac{1 - \text{spec}}{\text{sens}} \cdot\frac{1 - \pi}{\pi}} && \text{(a quotient of products is the product of the quotients)} \end{aligned} \tag{18}\\

> **NOTE:**
>
> **Theorem 1 (PPV in terms of sensitivity, specificity, and prevalence)** The positive predictive value of a diagnostic test with positive sensitivity, used in a population with positive prevalence, depends on its sensitivity, its specificity, and the prevalence of the disease only through two ratios:
>
> - the ratio of the false positive rate to the sensitivity;
> - the ratio of non-diseased to diseased people in the population.
>
> Specifically:
>
> \\ \text{PPV} = \frac{1}{1 + \frac{1 - \text{spec}}{\text{sens}} \cdot\frac{1 - \pi}{\pi}} \tag{19}\\

> **NOTE:**
>
> *Proof*. This result is the solution to [Exercise 3](#exr-ppv-ratio-form), which builds on [Exercise 2](#exr-ppv-bayes) and [Exercise 1](#exr-prob-positive).

> **NOTE:**
>
> **Example 7 (PPV of a COVID-19 test, from the two ratios)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity), used in the population of [Example 4](#exm-prevalence), [Theorem 1](#thm-ppv-sens-spec-prev) gives:
>
> \\ \begin{aligned} \text{PPV} &= \frac{1}{1 + \frac{1 - 0.99}{0.99} \cdot\frac{1 - 0.07}{0.07}} && \text{(PPV in terms of the two ratios, with the given values)} \\ &= \frac{1}{1 + \frac{0.01}{0.99} \cdot\frac{0.93}{0.07}} && \text{(subtract in each numerator)} \\ &\approx \frac{1}{1 + 0.0101 \cdot\frac{0.93}{0.07}} && \text{(divide \$0.01 / 0.99\$)} \\ &\approx \frac{1}{1 + 0.0101 \cdot 13.29} && \text{(divide \$0.93 / 0.07\$)} \\ &\approx \frac{1}{1 + 0.134} && \text{(multiply)} \\ &= \frac{1}{1.134} && \text{(add)} \\ &\approx 0.88 && \text{(divide)} \end{aligned} \tag{20}\\
>
> This value matches [Example 5](#exm-ppv).
>
> If the same test were used in a population with prevalence 0.1% instead, and its sensitivity and specificity were still 99% in that population, the ratio of non-diseased to diseased people would be \\0.999 / 0.001 = 999\\, and the PPV would fall to
>
> \\ \begin{aligned} \text{PPV} &= \frac{1}{1 + \frac{0.01}{0.99} \cdot 999} && \text{(PPV in terms of the two ratios, with the new prevalence)} \\ &\approx \frac{1}{1 + 0.0101 \cdot 999} && \text{(divide)} \\ &\approx \frac{1}{1 + 10.09} && \text{(multiply)} \\ &= \frac{1}{11.09} && \text{(add)} \\ &\approx 0.09 && \text{(divide)} \end{aligned} \tag{21}\\
>
> so about 9 in 10 positive results would be false positives.

> **NOTE:**
>
> *Remark 1* (The PPV depends on the population, not only on the test). The sensitivity and specificity describe the test’s performance in a specified setting, and may differ across settings (for example, with the case mix of the people tested or the threshold used to call a result positive), but the ratio \\\frac{1 - \pi}{\pi}\\ in [Theorem 1](#thm-ppv-sens-spec-prev) describes the population being tested. When the disease is rare, that ratio is large, so even a small false positive rate can make the PPV low, as [Example 7](#exm-ppv-sens-spec-prev) shows.

Back to top

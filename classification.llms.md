# Classification and Diagnostic Tests

Code

- [Show All Code](javascript:void(0))

- [Hide All Code](javascript:void(0))

- 

  ------------------------------------------------------------------------

- [View Source](javascript:void(0))

Published

Last modified: 2026-10-19 10:06:41 (PDT)

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
> **Example 1 (A diagnostic test as a classification rule)** A COVID-19 test assigns each person tested to one of \\K = 2\\ classes, “has COVID-19” or “does not have COVID-19”, based on a single feature \\x\\: the test’s result, positive (\\+\\) or negative (\\\neg +\\). The test is the classification rule ([Definition 3](#def-classification-rule)) that assigns a positive result to “has COVID-19” and a negative result to “does not have COVID-19”:
>
> \\ c(x) \stackrel{\text{def}}{=} \begin{cases} \text{has COVID-19} & \text{if } x = + \\ \text{does not have COVID-19} & \text{if } x = \neg + \end{cases} \tag{2}\\

> **NOTE:**
>
> *Remark 1* (Labels in binary classification). In the binary case (\\K = 2\\), the two classes are often labeled “positive” and “negative”, or “diseased” and “healthy”.

## 2 Diagnostic test characteristics

> **NOTE:**
>
> **Definition 4 (Sensitivity)** The **sensitivity** of a diagnostic test is the probability that the test is positive (\\+\\), given that the person tested has the disease (\\D\\):
>
> \\\text{sensitivity} \stackrel{\text{def}}{=}\Pr(+ \mid D) \tag{3}\\
>
> Source: Wikipedia contributors [\[3\]](#ref-wikipedia_sensitivity_and_specificity).

> **NOTE:**
>
> **Example 2 (Sensitivity of a COVID-19 test)** Suppose a COVID-19 test is positive for 99% of the people who have COVID-19. Let \\D\\ be the event “the person has COVID-19” and \\+\\ the event “the test is positive”. Then the test’s sensitivity ([Definition 4](#def-sensitivity)) is:
>
> \\\Pr(+ \mid D) = 0.99 \tag{4}\\

> **NOTE:**
>
> **Definition 5 (Specificity)** The **specificity** of a diagnostic test is the probability that the test is negative (\\\neg +\\), given that the person tested does not have the disease (\\\neg D\\):
>
> \\\text{specificity} \stackrel{\text{def}}{=}\Pr(\neg + \mid \neg D) \tag{5}\\
>
> Source: Wikipedia contributors [\[3\]](#ref-wikipedia_sensitivity_and_specificity).

> **NOTE:**
>
> **Example 3 (Specificity of a COVID-19 test)** Suppose the COVID-19 test of [Example 2](#exm-sensitivity) is negative for 99% of the people who do not have COVID-19. Then its specificity ([Definition 5](#def-specificity)) is:
>
> \\\Pr(\neg + \mid \neg D) = 0.99 \tag{6}\\
>
> By the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0), its false positive rate is:
>
> \\ \begin{aligned} \Pr(+ \mid \neg D) &= 1 - \Pr(\neg + \mid \neg D) && \text{(complement rule, conditional on } \neg D \text{)} \\ &= 1 - 0.99 && \text{(substitute the specificity)} \\ &= 0.01 && \text{(subtract)} \end{aligned} \tag{7}\\

> **NOTE:**
>
> **Definition 6 (Prevalence)** The **prevalence** of a disease in a population is the probability that a person drawn from that population has the disease (\\D\\):
>
> \\\text{prevalence} \stackrel{\text{def}}{=}\Pr(D) \tag{8}\\
>
> Source: Wikipedia contributors [\[4\]](#ref-wikipedia_prevalence).

> **NOTE:**
>
> **Example 4 (Prevalence of COVID-19)** Suppose 7% of the population being tested with the COVID-19 test of [Example 2](#exm-sensitivity) has COVID-19. Then the prevalence ([Definition 6](#def-prevalence)) is:
>
> \\\Pr(D) = 0.07 \tag{9}\\
>
> and, by the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0), the probability that a person drawn from that population does not have COVID-19 is:
>
> \\ \begin{aligned} \Pr(\neg D) &= 1 - \Pr(D) && \text{(complement rule)} \\ &= 1 - 0.07 && \text{(substitute the prevalence)} \\ &= 0.93 && \text{(subtract)} \end{aligned} \tag{10}\\

## 3 Predictive values

> **NOTE:**
>
> **Definition 7 (Positive predictive value (PPV))** The **positive predictive value** of a diagnostic test is the probability that the person tested has the disease (\\D\\), given that the test is positive (\\+\\):
>
> \\\text{PPV} \stackrel{\text{def}}{=}\Pr(D \mid +) \tag{11}\\
>
> Source: Wikipedia contributors [\[5\]](#ref-wikipedia_positive_and_negative_predictive_values).

> **NOTE:**
>
> **Example 5 (PPV of a COVID-19 test)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity), used in the population of [Example 4](#exm-prevalence), [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#exm-bayes) gives the positive predictive value ([Definition 7](#def-ppv)):
>
> \\\Pr(D \mid +) \approx 0.88 \tag{12}\\
>
> Even with a highly accurate test (99% sensitive and 99% specific), only about 88% of the people who test positive have COVID-19, because the prevalence (7%) is low enough that false positives make up a meaningful fraction of all positive tests.

> **NOTE:**
>
> **Definition 8 (Negative predictive value (NPV))** The **negative predictive value** of a diagnostic test is the probability that the person tested does not have the disease (\\\neg D\\), given that the test is negative (\\\neg +\\):
>
> \\\text{NPV} \stackrel{\text{def}}{=}\Pr(\neg D \mid \neg +) \tag{13}\\
>
> Source: Wikipedia contributors [\[5\]](#ref-wikipedia_positive_and_negative_predictive_values).

> **NOTE:**
>
> **Example 6 (NPV of a COVID-19 test)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity), used in the population of [Example 4](#exm-prevalence), the probability of a negative test for a person with COVID-19 is, by the [complement rule](https://morrison-lab.github.io/pds/probability-basics.html#cor-p-neg0):
>
> \\ \begin{aligned} \Pr(\neg + \mid D) &= 1 - \Pr(+ \mid D) && \text{(complement rule, conditional on } D \text{)} \\ &= 1 - 0.99 && \text{(substitute the sensitivity)} \\ &= 0.01 && \text{(subtract)} \end{aligned} \tag{14}\\
>
> By [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#thm-bayes), with the denominator expanded by the [law of total probability](https://morrison-lab.github.io/pds/probability-basics.html#thm-total-prob) over the partition \\{\mathopen{}\left\\D, \neg D\right\\\mathclose{}}\\, the negative predictive value ([Definition 8](#def-npv)) is:
>
> \\ \begin{aligned} \Pr(\neg D \mid \neg +) &= \frac{\Pr(\neg + \mid \neg D) \cdot\Pr(\neg D)}{\Pr(\neg +)} && \text{(Bayes' theorem)} \\ &= \frac{\Pr(\neg + \mid \neg D) \cdot\Pr(\neg D)}{\Pr(\neg + \mid \neg D) \cdot\Pr(\neg D) + \Pr(\neg + \mid D) \cdot\Pr(D)} && \text{(law of total probability)} \\ &= \frac{0.99 \cdot 0.93}{0.99 \cdot 0.93 + 0.01 \cdot 0.07} && \text{(substitute the given values)} \\ &= \frac{0.9207}{0.9207 + 0.0007} && \text{(multiply each term in the numerator and denominator)} \\ &= \frac{0.9207}{0.9214} && \text{(add the denominator's two terms)} \\ &\approx 0.9992 && \text{(divide)} \end{aligned} \tag{15}\\
>
> A negative result from this test is very reliable: only about 8 in 10,000 people who test negative have COVID-19.

## 4 PPV in terms of sensitivity, specificity, and prevalence

> **NOTE:**
>
> **Exercise 1 (Probability of a positive test)** Derive an expression for the [probability](https://morrison-lab.github.io/pds/probability-basics.html#def-probability) \\\Pr(+)\\ that a diagnostic test is positive in terms of:
>
> - the test’s [sensitivity](#def-sensitivity);
> - the test’s [specificity](#def-specificity);
> - the [prevalence](#def-prevalence) of the disease.

> **NOTE:**
>
> *Solution 1*. By the [law of total probability](https://morrison-lab.github.io/pds/probability-basics.html#thm-total-prob) over the partition \\{\mathopen{}\left\\D, \neg D\right\\\mathclose{}}\\:
>
> \\ \begin{aligned} \Pr(+) &= \Pr(+ \mid D) \cdot\Pr(D) + \Pr(+ \mid \neg D) \cdot\Pr(\neg D) && \text{(law of total probability)} \\ &= \text{sensitivity} \cdot\Pr(D) + \Pr(+ \mid \neg D) \cdot\Pr(\neg D) && \text{(definition of sensitivity)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \Pr(+ \mid \neg D) \cdot\Pr(\neg D) && \text{(definition of prevalence)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \Pr(\neg + \mid \neg D)\right)\mathclose{} \cdot\Pr(\neg D) && \text{(complement rule, conditional on } \neg D \text{)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \text{specificity}\right)\mathclose{} \cdot\Pr(\neg D) && \text{(definition of specificity)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \text{specificity}\right)\mathclose{} \cdot\mathopen{}\left(1 - \Pr(D)\right)\mathclose{} && \text{(complement rule)} \\ &= \text{sensitivity} \cdot\text{prevalence} + \mathopen{}\left(1 - \text{specificity}\right)\mathclose{} \cdot\mathopen{}\left(1 - \text{prevalence}\right)\mathclose{} && \text{(definition of prevalence)} \end{aligned} \tag{16}\\

> **NOTE:**
>
> **Theorem 1 (Probability of a positive test)** Let \\\text{sens}\\ be the [sensitivity](#def-sensitivity) of a diagnostic test, \\\text{spec}\\ its [specificity](#def-specificity), and \\\pi\\ the [prevalence](#def-prevalence) of the disease. Then the probability \\\Pr(+)\\ that the test is positive is:
>
> \\ \Pr(+) = \text{sens} \cdot\pi + \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{} \tag{17}\\

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 1](#exr-prob-positive), worked in [Solution 1](#sol-prob-positive).

> **NOTE:**
>
> **Exercise 2 (PPV from Bayes’ theorem)** Derive an expression for the [positive predictive value](#def-ppv) of a diagnostic test in terms of:
>
> - its [sensitivity](#def-sensitivity);
> - its [specificity](#def-specificity);
> - the [prevalence](#def-prevalence) of the disease.

> **NOTE:**
>
> *Solution 2*. Abbreviate the sensitivity as \\\text{sens}\\, the specificity as \\\text{spec}\\, and the prevalence as \\\pi\\. By [Bayes’ theorem](https://morrison-lab.github.io/pds/probability-basics.html#thm-bayes), with the probability of a positive test from [Exercise 1](#exr-prob-positive):
>
> \\ \begin{aligned} \text{PPV} &\stackrel{\text{def}}{=}\Pr(D \mid +) && \text{(definition of PPV)} \\ &= \frac{\Pr(+ \mid D) \cdot\Pr(D)}{\Pr(+)} && \text{(Bayes' theorem)} \\ &= \frac{\text{sens} \cdot\Pr(D)}{\Pr(+)} && \text{(definition of sensitivity)} \\ &= \frac{\text{sens} \cdot\pi}{\Pr(+)} && \text{(definition of prevalence)} \\ &= \frac{\text{sens} \cdot\pi}{\text{sens} \cdot\pi+ \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}} && \text{(probability of a positive test)} \end{aligned} \tag{18}\\

> **NOTE:**
>
> **Theorem 2 (PPV from Bayes’ theorem)** Let \\\text{sens}\\ be the [sensitivity](#def-sensitivity) of a diagnostic test, \\\text{spec}\\ its [specificity](#def-specificity), and \\\pi\\ the [prevalence](#def-prevalence) of the disease. If the probability of a positive test is positive, \\\text{sens} \cdot\pi+ \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{} \> 0\\, then the [positive predictive value](#def-ppv) of the test is:
>
> \\ \text{PPV} = \frac{\text{sens} \cdot\pi} {\text{sens} \cdot\pi+ \mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}} \tag{19}\\
>
> Source: Wikipedia contributors [\[1\]](#ref-wikipedia_bayes_theorem).

> **NOTE:**
>
> *Proof*. This is the solution to [Exercise 2](#exr-ppv-bayes), worked in [Solution 2](#sol-ppv-bayes), which builds on [Theorem 1](#thm-prob-positive).

> **NOTE:**
>
> **Exercise 3 (PPV in terms of two ratios)** Rewrite the expression for the positive predictive value from [Theorem 2](#thm-ppv-bayes) so that the sensitivity, specificity, and prevalence appear only through the ratio \\\frac{1 - \text{spec}}{\text{sens}}\\ of the false positive rate to the sensitivity and the ratio \\\frac{1 - \pi}{\pi}\\ of non-diseased to diseased people in the population.

> **NOTE:**
>
> *Solution 3*. Write \\a \stackrel{\text{def}}{=}\text{sens} \cdot\pi\\ and \\b \stackrel{\text{def}}{=}\mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}\\, so that [Theorem 2](#thm-ppv-bayes) reads \\\text{PPV} = \frac{a}{a + b}\\, with \\a \> 0\\ whenever the sensitivity and prevalence are positive. Then:
>
> \\ \begin{aligned} \text{PPV} &= \frac{a}{a + b} && \text{(PPV from Bayes' theorem)} \\ &= \frac{1}{\mathopen{}\left(\frac{a + b}{a}\right)\mathclose{}} && \text{(a fraction equals one over its reciprocal, since } a \> 0 \text{)} \\ &= \frac{1}{\frac{a}{a} + \frac{b}{a}} && \text{(split the fraction over the sum in its numerator)} \\ &= \frac{1}{1 + \frac{b}{a}} && \text{(} \tfrac{a}{a} = 1 \text{)} \\ &= \frac{1}{1 + \frac{\mathopen{}\left(1 - \text{spec}\right)\mathclose{} \cdot\mathopen{}\left(1 - \pi\right)\mathclose{}}{\text{sens} \cdot\pi}} && \text{(substitute the definitions of } a \text{ and } b \text{)} \\ &= \frac{1}{1 + \frac{1 - \text{spec}}{\text{sens}} \cdot\frac{1 - \pi}{\pi}} && \text{(a quotient of products is the product of the quotients)} \end{aligned} \tag{20}\\

> **NOTE:**
>
> **Theorem 3 (PPV in terms of sensitivity, specificity, and prevalence)** The positive predictive value of a diagnostic test with positive sensitivity, used in a population with positive prevalence, depends on its sensitivity, its specificity, and the prevalence of the disease only through two ratios:
>
> - the ratio of the false positive rate to the sensitivity;
> - the ratio of non-diseased to diseased people in the population.
>
> Specifically:
>
> \\ \text{PPV} = \frac{1}{1 + \frac{1 - \text{spec}}{\text{sens}} \cdot\frac{1 - \pi}{\pi}} \tag{21}\\

> **NOTE:**
>
> *Proof*. This result is the solution to [Exercise 3](#exr-ppv-ratio-form), worked in [Solution 3](#sol-ppv-ratio-form), which builds on [Theorem 2](#thm-ppv-bayes) and [Theorem 1](#thm-prob-positive).

> **NOTE:**
>
> **Example 7 (PPV of a COVID-19 test, from the two ratios)** For the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity), used in the population of [Example 4](#exm-prevalence), [Theorem 3](#thm-ppv-sens-spec-prev) gives:
>
> \\ \begin{aligned} \text{PPV} &= \frac{1}{1 + \frac{1 - 0.99}{0.99} \cdot\frac{1 - 0.07}{0.07}} && \text{(PPV in terms of the two ratios, with the given values)} \\ &= \frac{1}{1 + \frac{0.01}{0.99} \cdot\frac{0.93}{0.07}} && \text{(subtract in each numerator)} \\ &\approx \frac{1}{1 + 0.0101 \cdot\frac{0.93}{0.07}} && \text{(divide \$0.01 / 0.99\$)} \\ &\approx \frac{1}{1 + 0.0101 \cdot 13.29} && \text{(divide \$0.93 / 0.07\$)} \\ &\approx \frac{1}{1 + 0.134} && \text{(multiply)} \\ &= \frac{1}{1.134} && \text{(add)} \\ &\approx 0.88 && \text{(divide)} \end{aligned} \tag{22}\\
>
> This value matches [Example 5](#exm-ppv).
>
> If the same test were used in a population with prevalence 0.1% instead, and its sensitivity and specificity were still 99% in that population, the ratio of non-diseased to diseased people would be \\0.999 / 0.001 = 999\\, and the PPV would fall to
>
> \\ \begin{aligned} \text{PPV} &= \frac{1}{1 + \frac{0.01}{0.99} \cdot 999} && \text{(PPV in terms of the two ratios, with the new prevalence)} \\ &\approx \frac{1}{1 + 0.0101 \cdot 999} && \text{(divide)} \\ &\approx \frac{1}{1 + 10.09} && \text{(multiply)} \\ &= \frac{1}{11.09} && \text{(add)} \\ &\approx 0.09 && \text{(divide)} \end{aligned} \tag{23}\\
>
> so about 9 in 10 positive results would be false positives.

> **NOTE:**
>
> *Remark 2* (The PPV depends on the population, not only on the test). The sensitivity and specificity describe the test’s performance in a specified setting, and may differ across settings (for example, with the case mix of the people tested or the threshold used to call a result positive), but the ratio \\\frac{1 - \pi}{\pi}\\ in [Theorem 3](#thm-ppv-sens-spec-prev) describes the population being tested. When the disease is rare, that ratio is large, so even a small false positive rate can make the PPV low, as [Example 7](#exm-ppv-sens-spec-prev) shows.

## 5 Agreement between two classifiers

So far, we have compared a test with the true disease status. The same tools apply whenever we compare two classifiers that label the same observations: for example, a new diagnostic test against a reference test, or an automated grader (an “agent”) against a human grader. We call the classifier being evaluated the **agent** and the one we compare it with the **reference**.

> **NOTE:**
>
> **Definition 9 (Agreement table)** For \\n\\ observations that an agent and a reference each classify as positive or negative, the **agreement table** counts the four combinations:
>
> |                    | Reference positive | Reference negative |     Total |
> |--------------------|-------------------:|-------------------:|----------:|
> | **Agent positive** |              \\a\\ |              \\b\\ | \\a + b\\ |
> | **Agent negative** |              \\c\\ |              \\d\\ | \\c + d\\ |
> | **Total**          |          \\a + c\\ |          \\b + d\\ |     \\n\\ |
>
> The cells \\a\\ and \\d\\ count agreements, the cells \\b\\ and \\c\\ count disagreements, and the four cells together count every observation:
>
> \\n \stackrel{\text{def}}{=}a + b + c + d \tag{24}\\
>
> Source: Wikipedia contributors [\[6\]](#ref-wikipedia_confusion_matrix).

> **NOTE:**
>
> **Example 8 (Agreement table for a COVID-19 test)** Apply the COVID-19 test of [Example 2](#exm-sensitivity) and [Example 3](#exm-specificity) to \\n = 10{,}000\\ people from the population of [Example 4](#exm-prevalence), with the true disease status as the reference. With 7% prevalence, \\0.07 \times 10{,}000 = 700\\ people have COVID-19 and \\10{,}000 - 700 = 9{,}300\\ do not. With 99% sensitivity, the test is positive for \\0.99 \times 700 = 693\\ of the 700; with 99% specificity, it is negative for \\0.99 \times 9{,}300 = 9{,}207\\ of the 9,300. So the test is positive for \\9{,}300 - 9{,}207 = 93\\ people without COVID-19 and negative for \\700 - 693 = 7\\ people with it. The agreement table ([Definition 9](#def-agreement-table)) is:
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
> **Definition 10 (Overall agreement)** The **overall agreement** of an agreement table ([Definition 9](#def-agreement-table)) is the proportion of observations on which the agent and the reference agree:
>
> \\p_o \stackrel{\text{def}}{=}\frac{a + d}{n} \tag{25}\\

> **NOTE:**
>
> **Example 9 (Overall agreement for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), the overall agreement ([Definition 10](#def-overall-agreement)) is:
>
> \\ \begin{aligned} p_o &= \frac{693 + 9{,}207}{10{,}000} && \text{(definition of } p_o \text{, with the table's counts)} \\ &= \frac{9{,}900}{10{,}000} && \text{(add)} \\ &= 0.99 && \text{(divide)} \end{aligned} \tag{26}\\

> **NOTE:**
>
> **Definition 11 (Positive agreement)** The **positive agreement** (also called the *average positive agreement*) of an agreement table ([Definition 9](#def-agreement-table)) with \\2a + b + c \> 0\\ is the number of positive calls the agent and the reference share, counted once for each classifier, as a proportion of all their positive calls:
>
> \\p\_{\text{pos}} \stackrel{\text{def}}{=}\frac{2a}{2a + b + c} \tag{27}\\
>
> Source: Cicchetti and Feinstein [\[7\]](#ref-cicchetti1990high).

> **NOTE:**
>
> **Example 10 (Positive agreement for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), the positive agreement ([Definition 11](#def-positive-agreement)) is:
>
> \\ \begin{aligned} p\_{\text{pos}} &= \frac{2 \times 693}{2 \times 693 + 93 + 7} && \text{(definition of } p\_{\text{pos}} \text{, with the table's counts)} \\ &= \frac{1{,}386}{1{,}386 + 93 + 7} && \text{(multiply)} \\ &= \frac{1{,}386}{1{,}486} && \text{(add)} \\ &\approx 0.933 && \text{(divide)} \end{aligned} \tag{28}\\
>
> The positive agreement is lower than the overall agreement ([Example 9](#exm-overall-agreement)), because the 93 false positives are large relative to the 693 true positives.

> **NOTE:**
>
> **Definition 12 (Negative agreement)** The **negative agreement** (also called the *average negative agreement*) of an agreement table ([Definition 9](#def-agreement-table)) with \\2d + b + c \> 0\\ is the number of negative calls the agent and the reference share, counted once for each classifier, as a proportion of all their negative calls:
>
> \\p\_{\text{neg}} \stackrel{\text{def}}{=}\frac{2d}{2d + b + c} \tag{29}\\
>
> Source: Cicchetti and Feinstein [\[7\]](#ref-cicchetti1990high).

> **NOTE:**
>
> **Example 11 (Negative agreement for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), the negative agreement ([Definition 12](#def-negative-agreement)) is:
>
> \\ \begin{aligned} p\_{\text{neg}} &= \frac{2 \times 9{,}207}{2 \times 9{,}207 + 93 + 7} && \text{(definition of } p\_{\text{neg}} \text{, with the table's counts)} \\ &= \frac{18{,}414}{18{,}414 + 93 + 7} && \text{(multiply)} \\ &= \frac{18{,}414}{18{,}514} && \text{(add)} \\ &\approx 0.995 && \text{(divide)} \end{aligned} \tag{30}\\
>
> The negative agreement is even higher than the overall agreement ([Example 9](#exm-overall-agreement)), because the 100 disagreements are small relative to the 9,207 shared negative calls.

> **NOTE:**
>
> **Definition 13 (Agent-only rate)** The **agent-only rate** of an agreement table ([Definition 9](#def-agreement-table)) is the proportion of observations that the agent calls positive and the reference calls negative:
>
> \\p\_{\text{agent}} \stackrel{\text{def}}{=}\frac{b}{n} \tag{31}\\

> **NOTE:**
>
> **Example 12 (Agent-only rate for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), the agent-only rate ([Definition 13](#def-agent-only-rate)) is:
>
> \\ \begin{aligned} p\_{\text{agent}} &= \frac{93}{10{,}000} && \text{(definition of } p\_{\text{agent}} \text{, with the table's counts)} \\ &= 0.0093 && \text{(divide)} \end{aligned} \tag{32}\\
>
> so about 9 of every 1,000 people tested are called positive by the test and negative by the reference.

> **NOTE:**
>
> **Definition 14 (Test measures estimated from an agreement table)** Treating the reference as the truth, an agreement table ([Definition 9](#def-agreement-table)) estimates four measures of the agent:
>
> - its [sensitivity](#def-sensitivity);
> - its [specificity](#def-specificity);
> - its [positive predictive value](#def-ppv);
> - its [negative predictive value](#def-npv).
>
> Each estimate is the matching proportion of the table’s cells, defined when its denominator is positive:
>
> \\ \begin{aligned} \widehat{\text{sensitivity}} &\stackrel{\text{def}}{=}\frac{a}{a + c}, \\ \widehat{\text{specificity}} &\stackrel{\text{def}}{=}\frac{d}{b + d}, \\ \widehat{\text{PPV}} &\stackrel{\text{def}}{=}\frac{a}{a + b}, \\ \widehat{\text{NPV}} &\stackrel{\text{def}}{=}\frac{d}{c + d}. \end{aligned} \tag{33}\\

> **NOTE:**
>
> **Example 13 (Test measures for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), [Definition 14](#def-agreement-test-measures) gives:
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
> **Definition 15 (Harmonic mean)** The **harmonic mean** of two positive numbers \\x\\ and \\y\\ is the reciprocal of the average of their reciprocals:
>
> \\H(x, y) \stackrel{\text{def}}{=}\frac{2}{\frac{1}{x} + \frac{1}{y}} \tag{34}\\
>
> Source: Wikipedia contributors [\[8\]](#ref-wikipedia_harmonic_mean).

> **NOTE:**
>
> **Example 14 (Harmonic mean of 0.5 and 1)** By [Definition 15](#def-harmonic-mean):
>
> \\ \begin{aligned} H(0.5, 1) &= \frac{2}{\frac{1}{0.5} + \frac{1}{1}} && \text{(definition of } H \text{)} \\ &= \frac{2}{2 + 1} && \text{(take each reciprocal)} \\ &= \frac{2}{3} && \text{(add)} \\ &\approx 0.667 && \text{(divide)} \end{aligned} \tag{35}\\
>
> The ordinary average of 0.5 and 1 is 0.75; the harmonic mean sits closer to the smaller number.

> **NOTE:**
>
> **Exercise 4 (Positive agreement from PPV and sensitivity)** For an agreement table ([Definition 9](#def-agreement-table)) with \\a \> 0\\, write the [harmonic mean](#def-harmonic-mean) of the estimated positive predictive value and sensitivity ([Definition 14](#def-agreement-test-measures)) in terms of the table’s cells.

> **NOTE:**
>
> *Solution 4*. Because \\a \> 0\\, both \\a + b\\ and \\a + c\\ are positive, so both estimates are defined and positive:
>
> \\ \begin{aligned} H\mathopen{}\left(\widehat{\text{PPV}}, \widehat{\text{sensitivity}}\right)\mathclose{} &= \frac{2}{\frac{1}{\widehat{\text{PPV}}} + \frac{1}{\widehat{\text{sensitivity}}}} && \text{(definition of } H \text{)} \\ &= \frac{2}{\frac{1}{a / (a + b)} + \frac{1}{\widehat{\text{sensitivity}}}} && \text{(definition of } \widehat{\text{PPV}} \text{)} \\ &= \frac{2}{\frac{1}{a / (a + b)} + \frac{1}{a / (a + c)}} && \text{(definition of } \widehat{\text{sensitivity}} \text{)} \\ &= \frac{2}{\frac{a + b}{a} + \frac{1}{a / (a + c)}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{a + b}{a} + \frac{a + c}{a}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{(a + b) + (a + c)}{a}} && \text{(add fractions with a common denominator)} \\ &= \frac{2}{\frac{a + b + a + c}{a}} && \text{(remove parentheses)} \\ &= \frac{2}{\frac{a + a + b + c}{a}} && \text{(reorder terms)} \\ &= \frac{2}{\frac{2a + b + c}{a}} && \text{(} a + a = 2a \text{)} \\ &= 2 \cdot\frac{a}{2a + b + c} && \text{(dividing by a fraction multiplies by its reciprocal)} \\ &= \frac{2a}{2a + b + c} && \text{(multiply)} \end{aligned} \tag{36}\\

> **NOTE:**
>
> **Theorem 4 (Positive agreement is a harmonic mean)** For an agreement table with \\a \> 0\\, the positive agreement ([Definition 11](#def-positive-agreement)) is the harmonic mean ([Definition 15](#def-harmonic-mean)) of the estimated positive predictive value and sensitivity ([Definition 14](#def-agreement-test-measures)):
>
> \\ p\_{\text{pos}} = H\mathopen{}\left(\widehat{\text{PPV}}, \widehat{\text{sensitivity}}\right)\mathclose{} \tag{37}\\

> **NOTE:**
>
> *Proof*. By [Exercise 4](#exr-pos-agreement-harmonic), the harmonic mean equals \\2a / (2a + b + c)\\, which is \\p\_{\text{pos}}\\ by [Definition 11](#def-positive-agreement).

> **NOTE:**
>
> **Example 15 (Positive agreement of the COVID-19 test as a harmonic mean)** For the agreement table of [Example 8](#exm-agreement-table-covid), the estimated positive predictive value is \\693 / 786\\ and the estimated sensitivity is \\693 / 700\\ ([Example 13](#exm-agreement-test-measures)). [Theorem 4](#thm-pos-agreement-harmonic) gives:
>
> \\ \begin{aligned} p\_{\text{pos}} &= \frac{2}{\frac{1}{693 / 786} + \frac{1}{693 / 700}} && \text{(harmonic mean of the two estimates)} \\ &= \frac{2}{\frac{786}{693} + \frac{1}{693 / 700}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{786}{693} + \frac{700}{693}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{1{,}486}{693}} && \text{(add fractions with a common denominator)} \\ &= 2 \cdot\frac{693}{1{,}486} && \text{(dividing by a fraction multiplies by its reciprocal)} \\ &= \frac{1{,}386}{1{,}486} && \text{(multiply)} \\ &\approx 0.933 && \text{(divide)} \end{aligned} \tag{38}\\
>
> which matches [Example 10](#exm-positive-agreement). The lower positive predictive value (about 0.88) pulls the positive agreement down from the sensitivity (0.99), as in [Example 14](#exm-harmonic-mean).

> **NOTE:**
>
> **Exercise 5 (Negative agreement from NPV and specificity)** For an agreement table ([Definition 9](#def-agreement-table)) with \\d \> 0\\, write the [harmonic mean](#def-harmonic-mean) of the estimated negative predictive value and specificity ([Definition 14](#def-agreement-test-measures)) in terms of the table’s cells.

> **NOTE:**
>
> *Solution 5*. Because \\d \> 0\\, both \\c + d\\ and \\b + d\\ are positive, so both estimates are defined and positive:
>
> \\ \begin{aligned} H\mathopen{}\left(\widehat{\text{NPV}}, \widehat{\text{specificity}}\right)\mathclose{} &= \frac{2}{\frac{1}{\widehat{\text{NPV}}} + \frac{1}{\widehat{\text{specificity}}}} && \text{(definition of } H \text{)} \\ &= \frac{2}{\frac{1}{d / (c + d)} + \frac{1}{\widehat{\text{specificity}}}} && \text{(definition of } \widehat{\text{NPV}} \text{)} \\ &= \frac{2}{\frac{1}{d / (c + d)} + \frac{1}{d / (b + d)}} && \text{(definition of } \widehat{\text{specificity}} \text{)} \\ &= \frac{2}{\frac{c + d}{d} + \frac{1}{d / (b + d)}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{c + d}{d} + \frac{b + d}{d}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{(c + d) + (b + d)}{d}} && \text{(add fractions with a common denominator)} \\ &= \frac{2}{\frac{c + d + b + d}{d}} && \text{(remove parentheses)} \\ &= \frac{2}{\frac{d + d + b + c}{d}} && \text{(reorder terms)} \\ &= \frac{2}{\frac{2d + b + c}{d}} && \text{(} d + d = 2d \text{)} \\ &= 2 \cdot\frac{d}{2d + b + c} && \text{(dividing by a fraction multiplies by its reciprocal)} \\ &= \frac{2d}{2d + b + c} && \text{(multiply)} \end{aligned} \tag{39}\\

> **NOTE:**
>
> **Theorem 5 (Negative agreement is a harmonic mean)** For an agreement table with \\d \> 0\\, the negative agreement ([Definition 12](#def-negative-agreement)) is the harmonic mean ([Definition 15](#def-harmonic-mean)) of the estimated negative predictive value and specificity ([Definition 14](#def-agreement-test-measures)):
>
> \\ p\_{\text{neg}} = H\mathopen{}\left(\widehat{\text{NPV}}, \widehat{\text{specificity}}\right)\mathclose{} \tag{40}\\

> **NOTE:**
>
> *Proof*. By [Exercise 5](#exr-neg-agreement-harmonic), the harmonic mean equals \\2d / (2d + b + c)\\, which is \\p\_{\text{neg}}\\ by [Definition 12](#def-negative-agreement).

> **NOTE:**
>
> **Example 16 (Negative agreement of the COVID-19 test as a harmonic mean)** For the agreement table of [Example 8](#exm-agreement-table-covid), the estimated negative predictive value is \\9{,}207 / 9{,}214\\ and the estimated specificity is \\9{,}207 / 9{,}300\\ ([Example 13](#exm-agreement-test-measures)). [Theorem 5](#thm-neg-agreement-harmonic) gives:
>
> \\ \begin{aligned} p\_{\text{neg}} &= \frac{2}{\frac{1}{9{,}207 / 9{,}214} + \frac{1}{9{,}207 / 9{,}300}} && \text{(harmonic mean of the two estimates)} \\ &= \frac{2}{\frac{9{,}214}{9{,}207} + \frac{1}{9{,}207 / 9{,}300}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{9{,}214}{9{,}207} + \frac{9{,}300}{9{,}207}} && \text{(reciprocal of a fraction)} \\ &= \frac{2}{\frac{18{,}514}{9{,}207}} && \text{(add fractions with a common denominator)} \\ &= 2 \cdot\frac{9{,}207}{18{,}514} && \text{(dividing by a fraction multiplies by its reciprocal)} \\ &= \frac{18{,}414}{18{,}514} && \text{(multiply)} \\ &\approx 0.995 && \text{(divide)} \end{aligned} \tag{41}\\
>
> which matches [Example 11](#exm-negative-agreement).

## 8 Cohen’s kappa

> **NOTE:**
>
> **Definition 16 (Chance agreement)** The **chance agreement** of an agreement table ([Definition 9](#def-agreement-table)) is the overall agreement we would expect if the agent and the reference classified independently, each with its observed proportion of positive calls:
>
> \\p_e \stackrel{\text{def}}{=}\frac{(a + b)(a + c) + (c + d)(b + d)}{n^2} \tag{42}\\
>
> Source: Cohen [\[9\]](#ref-cohen1960coefficient).

> **NOTE:**
>
> **Example 17 (Chance agreement for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), the chance agreement ([Definition 16](#def-chance-agreement)) is:
>
> \\ \begin{aligned} p_e &= \frac{786 \times 700 + 9{,}214 \times 9{,}300}{10{,}000^2} && \text{(definition of } p_e \text{, with the table's counts)} \\ &= \frac{550{,}200 + 85{,}690{,}200}{10{,}000^2} && \text{(multiply)} \\ &= \frac{86{,}240{,}400}{10{,}000^2} && \text{(add)} \\ &= \frac{86{,}240{,}400}{100{,}000{,}000} && \text{(square)} \\ &= 0.862404 && \text{(divide)} \end{aligned} \tag{43}\\
>
> Because nearly everyone tests negative and is negative, two independent classifiers with these margins would agree on about 86% of people by chance alone.

> **NOTE:**
>
> **Definition 17 (Cohen’s kappa)** For an agreement table with \\p_e \< 1\\, **Cohen’s kappa** is the agreement beyond chance, as a fraction of the largest possible agreement beyond chance, built from the overall agreement ([Definition 10](#def-overall-agreement)) and the chance agreement ([Definition 16](#def-chance-agreement)) [\[10\]](#ref-wikipedia_cohens_kappa):
>
> \\\kappa \stackrel{\text{def}}{=}\frac{p_o - p_e}{1 - p_e} \tag{44}\\
>
> > **NOTE:**
> >
> > Cohen [\[9\]](#ref-cohen1960coefficient); Wikipedia contributors [\[10\]](#ref-wikipedia_cohens_kappa).

> **NOTE:**
>
> **Example 18 (Cohen’s kappa for the COVID-19 test)** For the agreement table of [Example 8](#exm-agreement-table-covid), \\p_o = 0.99\\ ([Example 9](#exm-overall-agreement)) and \\p_e = 0.862404\\ ([Example 17](#exm-chance-agreement)), so Cohen’s kappa ([Definition 17](#def-cohen-kappa)) is:
>
> \\ \begin{aligned} \kappa &= \frac{0.99 - 0.862404}{1 - 0.862404} && \text{(definition of } \kappa \text{)} \\ &= \frac{0.127596}{1 - 0.862404} && \text{(subtract in the numerator)} \\ &= \frac{0.127596}{0.137596} && \text{(subtract in the denominator)} \\ &\approx 0.927 && \text{(divide)} \end{aligned} \tag{45}\\
>
> Show R code
>
> ``` downlit
> kappa_from_table <- function(a, b, c, d) {
>   n <- a + b + c + d
>   p_o <- (a + d) / n
>   p_e <- ((a + b) * (a + c) + (c + d) * (b + d)) / n^2
>   (p_o - p_e) / (1 - p_e)
> }
> do.call(kappa_from_table, as.list(agree_covid))
> #> [1] 0.927323
> ```

> **NOTE:**
>
> **Example 19 (High agreement but low kappa)** Now apply the same test to \\n = 100{,}000\\ people in a population where the prevalence is only 0.5%. Then:
>
> - \\0.005 \times 100{,}000 = 500\\ people have COVID-19 and \\100{,}000 - 500 = 99{,}500\\ do not;
> - with 99% sensitivity, the test is positive for \\a = 0.99 \times 500 = 495\\ people with COVID-19 and negative for \\c = 500 - 495 = 5\\;
> - with 99% specificity, the false positive rate is \\1 - 0.99 = 0.01\\, so the test is positive for \\b = 0.01 \times 99{,}500 = 995\\ people without COVID-19 and negative for \\d = 99{,}500 - 995 = 98{,}505\\.
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
> The overall agreement is still 0.99, but kappa drops to about 0.49 and the positive agreement to about 0.50, while the negative agreement stays at about 0.995. The two specific agreements show where the disagreement lies: the test and the reference agree on negatives and disagree on about half of the positive calls.
>
> Source: Feinstein and Cicchetti [\[11\]](#ref-feinstein1990high) (the first paradox).

> **NOTE:**
>
> *Remark 3* (Kappa depends on prevalence). When both classifiers call one category rarely, the chance agreement \\p_e\\ is close to 1, so the same overall agreement leaves little room for agreement beyond chance, and kappa can be low even when the overall agreement is high, as [Example 19](#exm-kappa-paradox) shows. Cicchetti and Feinstein [\[7\]](#ref-cicchetti1990high) recommend reporting the positive and negative agreements alongside kappa, so that poor agreement on the rarer category is not hidden.
>
> Source: Feinstein and Cicchetti [\[11\]](#ref-feinstein1990high); Cicchetti and Feinstein [\[7\]](#ref-cicchetti1990high).

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

D. V. Cicchetti and A. R. Feinstein, “High agreement but low kappa: II. Resolving the paradoxes,” *Journal of Clinical Epidemiology*, vol. 43, no. 6, pp. 551–558, 1990, doi: [10.1016/0895-4356(90)90159-M](https://doi.org/10.1016/0895-4356(90)90159-M).

\[8\]

Wikipedia contributors, “Harmonic mean — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Harmonic_mean>

\[9\]

J. Cohen, “A coefficient of agreement for nominal scales,” *Educational and Psychological Measurement*, vol. 20, no. 1, pp. 37–46, 1960, doi: [10.1177/001316446002000104](https://doi.org/10.1177/001316446002000104).

\[10\]

Wikipedia contributors, “Cohen’s kappa — Wikipedia, the free encyclopedia.” 2026. Available: <https://en.wikipedia.org/wiki/Cohen%27s_kappa>

\[11\]

A. R. Feinstein and D. V. Cicchetti, “High agreement but low kappa: I. The problems of two paradoxes,” *Journal of Clinical Epidemiology*, vol. 43, no. 6, pp. 543–549, 1990, doi: [10.1016/0895-4356(90)90158-L](https://doi.org/10.1016/0895-4356(90)90158-L).

Back to top

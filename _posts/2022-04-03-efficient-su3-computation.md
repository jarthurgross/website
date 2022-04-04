---
layout: post
comments: true
title: Efficient SU(3) calculation
tags:
- group theory
- mathematics
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

[Last time]({{ relative }}2021/11/27/numerical-su3-irreps.html) I shared some numerical code for generating the projector onto the SU(3) irrep $(p,q)$ within $(\mathbf{C}^3)^{\otimes p}\otimes(\mathbf{C}^{3*})^{\otimes q}$.
This is an incredibly inefficient way to work with SU(3) irreps, though, since the dimenion of the ambient vector space in which everything is described is exponential in $p$ and $q$.
This post is going to take a step towards understanding a more intrinsic way of representing SU(3) irreps by focusing on the simplest irreps, which are of the form $(p,0)$.
These irreps are simply defined as the totally symmetric subspaces of $(\mathbf{C}^3)^p$, and we can define a concrete basis for that subspace, identifying each element of that basis by the number of times 0, 1, and 2 show up in the tensor product:
$$\begin{aligned}
    |a_0a_1a_2\rangle
    &=
    \frac{\sum_{\pi\in S_p}P_\pi|0\rangle^{\otimes a_0}|1\rangle^{\otimes a_1}|2\rangle^{\otimes a_2}}
    {a_0!a_1!a_2!\sqrt{\frac{p!}{a_0!a_1!a_2!}}}
    \\
    &=
    \frac{\sum_{\pi\in S_p}P_\pi|0\rangle^{\otimes a_0}|1\rangle^{\otimes a_1}|2\rangle^{\otimes a_2}}
    {\sqrt{p!a_0!a_1!a_2!}}
\end{aligned}$$
$S_p$ is the symmetric group on $p$ elements, and $P_\pi$ is the linear operator that permutes the tensor product components according to the permutation $\pi$.
The various factors in the denominator are to normalize these vectors, so $\langle\ell_0\ell_1\ell_2|r_0r_1r_2\rangle=\delta_{\ell_0r_0}\delta_{\ell_1r_1}\delta_{\ell_2r_2}$.

With a concrete basis in hand for the irrep, the next question becomes how are we going to calculate matrix elements for the unitaries and Lie-algebra elements.
The Lie-algebra elements are the easiest to figure out:
$$\begin{aligned}
    \langle\ell_0\ell_1\ell_2|H^{\oplus p}|r_0r_1r_2\rangle
    &=
    \begin{cases}
        \ell_0H_{00}+\ell_1H_{11}+\ell_2H_{22}\,,
        &
        \ell_0=r_0,\,\ell_1=r_1,\,\ell_2=r_2
        \\
        \sqrt{\ell_ar_b}H_{ab}\,,
        &
        \ell_a=r_a+1,\,\ell_b+1=r_b,\,\ell_c=r_c
        \\
        0\,,
        &
        \text{otherwise.}
    \end{cases}
\end{aligned}$$
The reasoning behind this is that $H^{\otimes p}=H\otimes1\otimes\cdots1+\otimes1\otimes H\otimes\cdots\otimes1+\cdots$ is made of terms that act as identity on all but one of the tensor-product factors, so any matrix elements that are non zero must be between symmetric states where 0, 1, and 2 appear either an identical number of times ($\ell_0=r_0,\,\ell_1=r_1,\,\ell_2=r_2$) or a single basis element has been exchanged for another ($\ell_a=r_a+1,\,\ell_b+1=r_b,\,\ell_c=r_c$).
Any other combination will result in two orthogonal $\mathbf{C}^3$ basis elements sandwhiching an identity, which leads to 0.
The "diagonal" case where 0, 1, and 2 show up in equal numbers on the left and the right works out like
$$\begin{aligned}
\langle a_0a_1a_2|H^{\oplus p}|a_0a_1a_2\rangle
&=
\sum_{\pi,\pi^\prime\in S_p, 1\leq j\leq p}
\frac{
\langle0|^{a_0}\langle1|^{a_1}\langle2|^{a_2}
P_{\pi^\prime}^\dagger H^{(j)}P_\pi
|0\rangle^{a_0}|1\rangle^{a_1}|2\rangle^{a_2}
}{p!a_0!a_1!a_2!}
\\
&=
\sum_{\pi,\in S_p, 1\leq j\leq p}
\frac{
\langle0|^{a_0}\langle1|^{a_1}\langle2|^{a_2}
H^{(j)}P_\pi
|0\rangle^{a_0}|1\rangle^{a_1}|2\rangle^{a_2}
}{a_0!a_1!a_2!}
\\
&=
a_0H_{00}+a_1H_{11}+a_2H_{22}
\end{aligned}$$
using the fact that $P_\pi^\dagger H^{\oplus p}P_\pi=H^{\oplus p}$ (summing over the $\pi^\prime$ then cancels the $p!$ in the denominator), counting all the permutations that keep the $\mathbf{C}^3$ basis elements paired up (which cancels the $a_0!a_1!a_2!$ in the denominator), and finally tallying up all the terms in $H^{\oplus p}=\sum_jH^{(j)}$.

Calculating the surviving off-diagonal terms proceeds similarly (to make the notation easier I'll take $a=0$, $b=1$, and $c=2$):
$$\begin{aligned}
\langle a_0(a_1-1)a_2|H^{\oplus p}|(a_0-1)a_1a_2\rangle
&=
\sum_{\pi,\in S_p, 1\leq j\leq p}
\frac{
\langle0|^{a_0}\langle1|^{a_1-1}\langle2|^{a_2}
H^{(j)}P_\pi
|0\rangle^{a_0-1}|1\rangle^{a_1}|2\rangle^{a_2}
}{(a_0-1)!(a_1-1)!a_2!\sqrt{a_0a_1}}
\\
&=
\frac{
a_1a_0!(a_1-1)!a_2!\langle0|H|1\rangle
\big(\langle0|^{a_0-1}\langle1|^{a_1-1}\langle2|^{a_2}\big)
\big(|0\rangle^{a_0-1}|1\rangle^{a_1-1}|2\rangle^{a_2}\big)
}{(a_0-1)!(a_1-1)!a_2!\sqrt{a_0a_1}}
\\
&=
\sqrt{a_0a_1}H_{01}
\end{aligned}$$
Going from the first to the second line above, you can see there are $a_1$ different choices for the 1 on the right which we will match up with a 0 on the left.
For each of those choices, there are $a_0!(a_1-1)!a_2!$ permutations permuting the 2s such that they match up with 2s on the left, permuting the remaining 1s such that they match up the the 1s on the left, and permuting the remaining 1 and all the 0s among the 0s on the left.
Each of these permutations determines a single term in $H^{\oplus p}$ that is non zero, and that's the one where the $H$ is between the 0 and the 1.

The unitary matrix elements are a little more involved, since there aren't so many terms that are identically zero like for the Lie-algebra elements.

[hall2000]: http://arxiv.org/abs/math-ph/0005032
[wiki-dual]: https://en.wikipedia.org/wiki/Dual_representation
[github-irreps]: https://github.com/jarthurgross/irrep-codes-code
[encoding-paper]: https://doi.org/10.1103/PhysRevLett.127.010504
[encoding-self]: {{ relative }}docs/papers/gross_designing_2021.pdf
[comp-over-inher]: https://en.wikipedia.org/wiki/Composition_over_inheritance
[std-rep-cls]: https://github.com/jarthurgross/irrep-codes-code/blob/f97daad003d9e26fdd164862dcd9b0a9c0a71937/irrep_codes/su3/symm_tensor_prod.py#L95
[dual-rep-cls]: https://github.com/jarthurgross/irrep-codes-code/blob/f97daad003d9e26fdd164862dcd9b0a9c0a71937/irrep_codes/su3/symm_tensor_prod.py#L149
[tens-rep-cls]: https://github.com/jarthurgross/irrep-codes-code/blob/f97daad003d9e26fdd164862dcd9b0a9c0a71937/irrep_codes/su3/symm_tensor_prod.py#L185
[abs-rep-cls]: https://github.com/jarthurgross/irrep-codes-code/blob/f97daad003d9e26fdd164862dcd9b0a9c0a71937/irrep_codes/su3/symm_tensor_prod.py#L12
[apply-raise-method]: https://github.com/jarthurgross/irrep-codes-code/blob/f97daad003d9e26fdd164862dcd9b0a9c0a71937/irrep_codes/su3/symm_tensor_prod.py#L219
[proj-method]: https://github.com/jarthurgross/irrep-codes-code/blob/f97daad003d9e26fdd164862dcd9b0a9c0a71937/irrep_codes/su3/symm_tensor_prod.py#L254
[^threshold]: Numerically one must set a threshold below which one considers the singular values to be 0.
[^adjoints]: I'm being a bit sloppy with the distinction between vectors $|\psi\rangle$ and dual vectors $\langle\psi|$, here, which I think I'm getting away with because the vectors are all real in the basis I've chosen to represent them. In reality, this matrix of linearly-independent rows should be thought of as a projection from the full tensor-product space to some abstract basis of the irrep, so using the right singular vectors would be most correct, since they're dual vectors.

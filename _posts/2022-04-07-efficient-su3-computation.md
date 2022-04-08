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
This is an incredibly inefficient way to work with SU(3) irreps, though, since the dimension of the ambient vector space in which everything is described is exponential in $p$ and $q$.
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
Any other combination will result in two orthogonal $\mathbf{C}^3$ basis elements sandwiching an identity, which leads to 0.
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
For each of those choices, there are $a_0!(a_1-1)!a_2!$ permutations permuting the 2s such that they match up with the 2s on the left, permuting the remaining 1s such that they match up with the 1s on the left, and permuting the remaining 1 and all the 0s among the 0s on the left.
Each of these permutations determines a single term in $H^{\oplus p}$ that is non zero, and that's the one where the $H$ is between the 0 and the 1.

The unitary matrix elements are a little more involved, since there aren't so many terms that are identically zero like for the Lie-algebra elements.
$$\begin{aligned}
    \langle\ell_0\ell_1\ell_2|U^{\otimes n}|r_0r_1r_2\rangle
    &=
    \frac{n!\sum_{\pi\in S_n}\langle0|^{\otimes\ell_0}\langle1|^{\otimes\ell_1}\langle2|^{\otimes\ell_2}
    U^{\otimes n}P_\pi|0\rangle^{\otimes r_0}|1\rangle^{\otimes r_1}|2\rangle^{\otimes r_2}}
    {n!\sqrt{\ell_0!\ell_1!\ell_2!r_0!r_1r!_2!}}
    \\
    &=
    \frac{\sum_d\prod_{j,k}U_{j,k}^{d_{jk}}N_d}
    {\sqrt{\ell_0!\ell_1!\ell_2!r_0!r_1r!_2!}}
\end{aligned}$$
To deal with the calculation I've introduced a sum over matrices $d$ having the property that their rows sum up to the left multiplicities and their columns sum up to the right multiplicities:
$$\begin{aligned}
    \sum_kd_{jk}
    &=
    \ell_j
    \\
    \sum_jd_{jk}
    &=
    r_k
\end{aligned}$$
Saying much in general about these matrices seems hard (see [this answer][matrix-sums-se] to a Mathematics Stack Exchange question for a link to a review paper), but we can fairly easily enumerate all these matrices with a bit of Python, like I do in my recently-added function [`generate_row_col_sum_constrained_posint_matrices`][posint-fn].
The factor $N_d$ counts the number of permutations $P_\pi$ that result in $d_{jk}$ $\langle j|$s matched up with $|k\rangle$s in the same tensor-product position, since each of these will give a factor of $U_{jk}$.
We calculate $N_d$ by first finding how many ways to permute the groups of identical elements on the right among themselves (which is $r_0!r_1!r_2!$), and then how many ways to split each of the groups on the left into the appropriately sized groups matched with 0, 1, and 2 (which are the multinomial coefficients $\ell_j!/d_{j0}!d_{j1}!d_{j2}!$).
Putting these together gives us
$$\begin{aligned}
    N_d
    &=
    \frac{\ell_0!\ell_1!\ell_2!r_0!r_1!_2!}{\prod_{j,k}(d_{jk})!}
\end{aligned}$$
and substituting that back into the unitary-matrix-element expression gives us
$$\begin{aligned}
    \langle\ell_0\ell_1\ell_2|U^{\otimes n}|r_0r_1r_2\rangle
    &=
    \sqrt{\ell_0!\ell_1!\ell_2!r_0!r_1r!_2!}
    \sum_d\prod_{j,k}\frac{U_{j,k}^{d_{jk}}}
    {d_{jk}!}
\end{aligned}$$

The code for calculating explicit matrices for the representative unitaries in the symmetric basis is now in my github repo (the slow code using the exponentially growing ambient space is in [`irrep_codes.su3.symm_tensor_prod.py`][slow] and the fast code using the intrinsic symmetric-space basis is in [`irrep_codes.su3.efficient_symm_rep.py`][fast]).
Even for p=5, using the intrinsic basis makes a huge difference (cutting down the calculation time for a single matrix from 20 s to 90 ms).
My code for the Lie-algebra elements, and for doing these calculations analytically using `sympy`, are still in a jupyter notebook, which I intend to push into the same repository.
After finishing up that bit of code release, we'll be ready to try tackling a more intrinsic approach to the general (p, q) irreps.

[matrix-sums-se]: https://math.stackexchange.com/a/10528
[posint-fn]: https://github.com/jarthurgross/irrep-codes-code/blob/80a8671f17f4e4b0ee643b30d5708427a723c8a9/irrep_codes/su3/efficient_symm_rep.py#L13
[slow]: https://github.com/jarthurgross/irrep-codes-code/blob/80a8671f17f4e4b0ee643b30d5708427a723c8a9/irrep_codes/su3/symm_tensor_prod.py
[fast]: https://github.com/jarthurgross/irrep-codes-code/blob/80a8671f17f4e4b0ee643b30d5708427a723c8a9/irrep_codes/su3/efficient_symm_rep.py

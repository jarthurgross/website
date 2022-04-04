---
layout: post
comments: true
title: Numerical SU(3) irreps
tags:
- group theory
- mathematics
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

Representation theory is a beautiful subject.
The representation theory of SU(2) is fairly well known, largely because of it's importance in physics for describing angular momentum.
As is usually the case, though, spending too much time with a particular example blinds you to much of the general theory.
To expand my horizons, I'm familiarizing myself with the representation theory of SU(3), which provides just enough additional complication to make things interesting.
I'm also taking an incremental approach that involves some concrete numerical computations as I start to understand the concepts, which some might appreciate.

## Background

Brian Hall's notes *An Elementary Introduction to Groups and Representations*, arXiv:[math-ph/0005032][hall2000], have a nice treatment of SU(3) representations that's approachable for a lowly quantum-information theorist such as myself.
A major takeaway is that, while SU(2) only has one "fundamental" representation (the defining representation of unitary matrices on $\mathbf{C}^2$ with determinant 1), SU(3) has *two* "fundamental" representations:

1. The defining representation of unitary matrices on $\mathbf{C}^3$ with determinant 1
2. The corresponding dual representation

For SU(2), the dual representation is equivalent to the defining representation, so we miss out on this additional feature.

The Wikipedia definition of the [dual representation][wiki-dual] feels strange to me with its use of transpose (usually associated with some basis dependence), so I like to think of it in a more quantum-information kind of way.
If the representation $D$ maps $g\in\mathrm{SU}(3)$ to $U_g:|\psi\rangle\mapsto U_g|\psi\rangle$, then the dual representation maps $g$ to $U_g^\dagger:\langle\psi|\mapsto\langle\psi|U_g^\dagger$.
The dagger $\dagger$ corresponds to the inverse in the Wikipedia definition, and acting on the bra $\langle\psi|$ from the right corresponds to the transpose in the Wikipedia definition.

Since SU(2) has only one fundamental representation, every SU(2) irrep shows up as a subspace of some tensor power of that fundamental representation.
In particular, the $d$ dimensional irrep is the totally symmetric subspace of $(\mathbf{C}^2)^{\otimes d-1}$.
Since SU(3) has two fundamental representations, every SU(3) irrep shows up as a subspace of tensor powers of both representations: $(\mathbf{C}^3)^{\otimes p}\otimes(\mathbf{C}^{3*})^{\otimes q}$.

A prescription for generating the irrep associated with $p$ tensor powers of the standard irrep $\mathbf{C}^3$ and $q$ tensor powers of the dual irrep $\mathbf{C}^{3*}$ is to start with a "highest-weight" vector and apply lowering operators to that vector in all sequences until the vector is annihilated.
Weights are determined by a maximal linearly-independent set of commuting generators for the Lie algebra.

For SU(2), the Lie algebra is the span of $\{-i\sigma_x,-i\sigma_y,-i\sigma_z\}$.
No pair of these commute, so the maximal linearly-independent set of commuting generators has only one element, conventionally taken to be $-i\sigma_z$.
For "reasons", it's nicer to work with the complexified Lie algebra, which lets us look at $\sigma_z$ without the $-i$.
The eigenvalue equations for $\sigma_z$ are $\sigma_z|0\rangle=|0\rangle$ and $\sigma_z|1\rangle=-|1\rangle$.
The highest-weight vector for the fundamental representation is $|0\rangle$, and when we take tensor powers of the fundamental representation the highest-weight vector is a tensor power of this vector: $|0\rangle^{\otimes p}$.
The "lowering operator" $\sigma_-$ lowers the weight, so takes $|0\rangle\mapsto|1\rangle$.
The representation for elements like $\sigma_z$ and $\sigma_-$ on tensor powers of the fundamental irrep is a sum of terms with the operator acting on different components of the tensor product:
$$\sigma_-\mapsto\sum_{k=0}^{p-1}I^{\otimes k}\otimes\sigma_-\otimes I^{p-k-1}$$

For SU(3) the Lie algebra is 8-dimensional, and one can find pairs of linearly-independent elements that commute.
Brian Hall picks two he calls $H_1$ and $H_2$:
$$\begin{aligned}
H_1
&=
\begin{bmatrix}1 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & 0\end{bmatrix}
&
H_2
&=
\begin{bmatrix}0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & -1\end{bmatrix}
\end{aligned}$$
Because these are like $\sigma_z$ operators on two-dimensional subspaces, I'll notate them $Z_{01}$ and $Z_{12}$.
We need a "joint eigenvalue" to serve as the weight for these larger sets of commuting operators, so we'll say the weight of $|0\rangle$ is $(1,0)$, the weight of $|1\rangle$ is $(-1,1)$, and the weight of $|2\rangle$ is $(0,-1)$, since
$$\begin{align}
Z_{01}|0\rangle
&=
|0\rangle
&
Z_{12}|0\rangle
&=
0
\\
Z_{01}|1\rangle
&=
-|1\rangle
&
Z_{12}|1\rangle
&=
|1\rangle
\\
Z_{01}|2\rangle
&=
0
&
Z_{12}|2\rangle
&=
-|2\rangle
\end{align}$$
The highest weight for the standard irrep is $(1,0)$.
The dual irrep transposes and takes the negative of the Lie-algebra elements.
As with the unitaries, this corresponds to inversion (we get the inverse unitary by exponentiating the negative Lie-algebra element) and acting on the dual vectors from the right.
The weights are then
$$\begin{multline}
|0\rangle:
(-1,0)
\\
|1\rangle:
(1,-1)
\\
|2\rangle:
(0,1)
\end{multline}$$
We then call $|2\rangle$ the highest-weight vector of the dual irrep (or perhaps better, we call $\langle 2|$ the highest-weight vector).
The highest-weight vector for $(\mathbf{C}^3)^{\otimes p}\otimes(\mathbf{C}^{3*})^{\otimes q}$ is then $|0\rangle^{\otimes p}\otimes\langle 2|^{\otimes q}$.
The action of a Lie-algebra element $H$ on these tensor-product representations is again given by a sum of the action on each component, so, for example,
$$H:|0\rangle\otimes|0\rangle\otimes\langle 2|\mapsto
H|0\rangle\otimes|0\rangle\otimes\langle 2|+
|0\rangle\otimes H|0\rangle\otimes\langle 2|-
|0\rangle\otimes|0\rangle\otimes\langle 2|H$$
This should look like a generalization of the commutator (it is the commutator for $p=q=1$).
The highest weight in the $(\mathbf{C}^3)^{\otimes p}\otimes(\mathbf{C}^{3*})^{\otimes q}$ representation is $(p,q)$, so we'll use that to label the irrep we get by successively applying the lowering operators to the highest-weight vector.
Because we have two linearly-independent commuting operators ($Z_{01}$ and $Z_{12}$), we have two lowering operators $S^-_{01}=|1\rangle\langle 0|$ and $S^-_{12}=|1\rangle\langle 2|$ that lower the eigenvalue of each of these operators.
With that background, we're ready to code up our first construction of the SU(3) irreps.

## Putting it in code

I'm using my [github repository][github-irreps] where I stored the code for calculations in my recent paper [*Designing codes around interactions: the case of a spin*][encoding-paper] (self-hosted version [here][encoding-self]) to store these new SU(3) explorations.
I'm writing everything in Python, and to practice the design principle of favor [composition over inheritance][comp-over-inher] I'm starting with a class [`StandardSL3CRep`][std-rep-cls] to represent the standard representation for SU(3) and composing it with classes to create the dual ([`DualSL3CRep`][dual-rep-cls]) and tensor-product ([`TensorProductSL3CRep`][tens-rep-cls]) representations (although inheritance is apparently still too alluring for me, as these all inherit a method `get_basis` for getting all basis elements and the `__repr__` method for displaying the object from the abstract class [`SL3CRep`][abs-rep-cls]...).

With these tools in place I can now automate the process of building the subspace for the various irreps within their "parent" tensor-product irreps.
The function [`get_iterative_raising_operator_applications`][apply-raise-method] iteratively applies what I've been calling lowering operators in this post to an initial vector until annihilation[^threshold] (I'm inconsistent in whether I call them raising or lowering operators, since they raise the basis index but lower the weight).
When I do this for the $(2,0)$ irrep I get the original vector as well as 7 image vectors, represented as rows in the matrix visualized below:

![]({{ relative }}images/2-0-lowered-vectors.png)

The columns 0 through 8 correspond to the tensor-product basis vectors $|00\rangle$, $|01\rangle$, $|02\rangle$, $|10\rangle$, $|11\rangle$, $|12\rangle$, $|20\rangle$, $|21\rangle$, and $|22\rangle$.
Not all of these rows are linearly independent, so to get a basis for the irrep we can perform the SVD of the matrix of row vectors, keeping the right singular vectors with nonzero singular value.
I have the function [`make_projector_out_of_image_vectors`][proj-method] do this, although I transpose the array in that method and take the left singular vectors.[^adjoints]
For the $(2,0)$ irrep that gives us:

![]({{ relative }}images/2-0-isometry.png)

This shows us a choice of basis for the $(2,0)$ irrep, which you can fairly easily see in this case is made up of the symmetric vectors.

If we do this for the $(2,1)$ irrep, you get something that's not as easy (at least for me) to interpret:

![]({{ relative }}/images/2-1-isometry.png)

With the numerical procedure I'm using to generate the basis vectors, there's no guarantee they're "sensible" basis vectors, as opposed to some arbitrary unitary scrambling of the basis vectors.
We can remove some of this arbitrariness by looking at the projector onto the irrep within the tensor-product irrep, which given the matrix of right singular vectors $V^\dagger$ we construct as $VV^\dagger$:

![]({{ relative }}/images/2-1-projector.png)

In addition to giving basis vectors that can be hard to interpret, this approach to generating the irrep basis is very inefficient.
We can compute the matrix elements for arbitrary SU(3) unitaries or Lie algebra elements within an irrep, but even though the size of the irrep $(p,q)$ grows only polynomially with respect to $p$ and $q$, our current approach requires us to build the intermediate tensor-product representation, which grows exponentially with $p$ and $q$.
This will really limit how large of irreps we can play around with using this approach.
To go to larger irreps, next time we'll look at calculating the matrix elements directly in a basis for the irrep.

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

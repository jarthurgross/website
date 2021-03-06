---
layout: post
comments: true
title: Which Pauli group?
tags:
- group theory
- mathematics
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

It dawned on me today that when I refer to the single-qubit Pauli group there
are several different groups to which I could be referring.

Take the group generated by the
[Pauli matrices](https://en.wikipedia.org/wiki/Pauli_matrices): $\sigma_x$,
$\sigma_y$, and $\sigma_z$. Multiplying these together in different
combinations yields the Pauli matrices, together with the identity, multiplied
by factors of $\pm1$ and $\pm i$. This is a group with 16 elements, and
masquerades under the name [$\mathrm{C}_4\circ
\mathrm{D}_4$](https://people.maths.bris.ac.uk/~matyd/GroupNames/1/C4oD4.html)
on [GroupNames](https://people.maths.bris.ac.uk/~matyd/GroupNames/index.html),
though happily "Pauli group" is given as one of its aliases.

This is very nice. However, it's also useful to think of the Pauli group as
a finite-dimensional version of the [Heisenberg
group](https://en.wikipedia.org/wiki/Heisenberg_group). This group is generated
by $\sigma_x$ and $\sigma_z$, and has only 8 elements:
$\{\pm1,\pm\sigma_x,\pm\sigma_z,\pm i\sigma_y\}$. It's sometimes notated
$\mathrm{He}_2$, and is isomorphic to the Dihedral group
[$\mathrm{D}_4$](https://people.maths.bris.ac.uk/~matyd/GroupNames/1/D4.html).

In quantum mechanics, one usually thinks of the unitaries that act on a qubit
as elements of the [special unitary
group](https://en.wikipedia.org/wiki/Special_unitary_group) $\mathrm{SU}(2)$.
The way we've constructed the previous two Pauli groups as groups of matrices
gives us many matrices with non unit determinant---for example,
$\mathrm{det}(\sigma_x)=-1$. If we instead take the group generated by
$i\sigma_x$ and $i\sigma_z$, we get the subgroup of
$\mathrm{C}_4\circ\mathrm{D}_4$ with unit determinant, which is known as the
quaternion group
[$\mathrm{Q}_8$](https://people.maths.bris.ac.uk/~matyd/GroupNames/1/Q8.html),
since Pauli matrices with $i$s in front of them behave just like the $i$, $j$,
and $k$ elements of the [quaternions](https://en.wikipedia.org/wiki/Quaternion).

But that's not all! Even the special unitaries have some redundancy, since the
element $-1$ only puts a phase on quantum states, which is a trivial action. If
we want the group of actions the Pauli matrices perform on quantum states, we
need to remove this trivial action to get a subgroup of the [projective unitary
group](https://en.wikipedia.org/wiki/Projective_unitary_group)
$\mathrm{PU}(2)$. This means identifying the matrices in the quaternion group
that differ only by a minus sign (or, equivalently, identifying the matrices in
$\mathrm{C}_4\circ\mathrm{D}_4$ that differ by a complex phase), and gives us
an abelian group with four elements, known as the [Klein
four-group](https://en.wikipedia.org/wiki/Klein_four-group) and notated several
ways including $\mathrm{V}_4$ and
[$\mathrm{C}_2^2$](https://people.maths.bris.ac.uk/~matyd/GroupNames/1/C2%5E2.html)

So, next time you hear someone mention the single-qubit Pauli group, make sure
to ask them *which* single-qubit Pauli group they have in mind!

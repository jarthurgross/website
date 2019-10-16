---
layout: post
comments: true
title: Cramer's rule
tags:
- differential geometry
- mathematics
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

[Grant Sanderson](https://www.3blue1brown.com/) uploaded a
[new video](https://youtu.be/jBsC34PxzoM) the other day explaining
[Cramer's rule](https://en.wikipedia.org/wiki/Cramer's_rule)
by drawing on the connection between determinants and parallelepiped areas. I
enjoyed the explanation, and it motivated me to express the derivation in the
language of
[differential forms](https://en.wikipedia.org/wiki/Differential_form), which
would make the parametrization independence more obvious for statements about
area that on first glance appear to have some parametrization dependence.

Like Grant did, I'll write everything out for a two-dimensional problem, and you
can test your understanding by generalizing it to arbitrary dimensions. 😉

The equation we want to solve is
$$Ad\alpha=d\beta.$$
The forms $d\alpha$ and $d\beta$ are vectors in a two dimensional vector space
with basis $\{dx,dy\}$, and $A$ is a linear map on that vector space. Because
of the antisymmetry of the
[wedge product](https://en.wikipedia.org/wiki/Exterior_algebra), we can get the
components of $d\alpha$ by taking wedge products with the basis vectors.
Choosing to write $d\alpha$ in component form as $d\alpha=xdx+ydy$ we see that
$$d\alpha\wedge dy=x\,dx\wedge dy+y\,dy\wedge dy=x\,dx\wedge dy$$
and
$$dx\wedge d\alpha=x\,dx\wedge dx+y\,dx\wedge dy=y\,dx\wedge dy.$$

The form $dx\wedge dy$ is a vector in a one-dimensional vector space. There's a
useful linear map to define on this vector space which simply applies a linear
operator to each of the vectors in the wedge product:
$$f_A:dx\wedge dy\mapsto (Adx)\wedge(Ady).$$
Since the only linear map on a one-dimensional vector space is multiplication
by a scalar, this map multiplies $dx\wedge dy$ by a scalar that depends on $A$.
That scalar is the determinant of $A$, which from this definition is clearly
independent of any parametrization of the forms used:
$$(Adx)\wedge(Ady)=\det(A)\,dx\wedge dy.$$

Now let's play around with our equation a bit to try and get determinants into
the picture. Start by wedging $Ady$ on the right of both sides of the equation:
$$Ad\alpha\wedge Ady=d\beta\wedge Ady.$$
The left-hand side looks promising, so develop it further:
$$Ad\alpha\wedge Ady=\det(A)\,d\alpha\wedge dy=\det(A)x\,dx\wedge dy.$$
Now what to do about the right hand side? Let's define two new linear maps by
their action on the basis vectors $dx$ and $dy$:
$$A_x:dx\mapsto d\beta,\quad dy\mapsto Ady$$
and
$$A_y:dx\mapsto Adx,\quad dy\mapsto d\beta.$$
These are the equivalent of replacing different columns in $A$ that you find in
Grant's derivation and the presentation on Wikipedia. The nice thing about these
maps is that they let us get a determinant on the right-hand side of our wedged
equation:
$$d\beta\wedge Ady=A_xdx\wedge A_xdy=\det(A_x)\,dx\wedge dy.$$
Now we've solved for the $x$ component!
$$x\det(A)\,dx\wedge dy=\det(A_x)\,dx\wedge dy.$$
The $y$ component is obtained in an analogous way using $A_y$ instead of $A_x$.

One aspect I like about using forms is that the arbitrariness of what measure
one uses to compute areas clearly cancels out. Different measures will assign
different areas to $dx\wedge dy$, but it doesn't matter since the same factor
appears on both sides of the equation.

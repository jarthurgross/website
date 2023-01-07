---
layout: post
comments: true
title: Four-component probability distributions
tags:
- javascript
- mathematics
- explorable
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

Trying to get better at rapidly iterating on things by putting out these little interactive javascript diagrams.
Since I just need to practice making a bunch of them, most of these aren't really going to be true "explorable explanations", though that's still my inspiration, and maybe I'll come back and rework some of these into proper explorables later.
For today, I wanted to put out a generalization of the 2d simplex I made for the [majorization]({% post_url 2022-10-19-majorization %}) explorable a couple months ago.
There, I let the user specify a probability distribution over three outcomes by dragging around a point inside a triangle (a 2d simplex).
I really like this kind of intuitive way to specify a distribution, rather than typing in numbers or modifying one of the bars in the bar-plot representations of the distribution.
Can we do something like that for 4-component distributions?
I think the answer is yes, and here's my almost certainly terribly confusing prototype! (with explanation to follow):


<div id="demo">
  <svg viewBox="0 0 550 220" style="background:white">
  </svg>
</div>

The bars on the left represent the probabilities for four different outcomes, colored red, green, blue, and yellow.
I have 5 triangles to the right, but ignore the rightmost yellow triangle for now, as it's redundant but included to illustrate an extension I'd like to eventually make.
The other four small triangles can be thought of as faces of the regular tetrahedron (3d simplex) made of all the 4-component probability distributions.
The colors in these triangles correspond to the color of the vertex opposite that face (each vertex corresponds to a distribution where one of the colored outcomes happens with certainty), and the black dots in these triangles indicate the probabilities of the other three outcomes.

These interior colored triangles change size as the distributions change, since they depict allowed probabilities to assign to the other three outcomes if the probability of the fourth outcome is fixed.
Take for example the green triangle in the lower left.
When the green bar is maximum size (green occurs with probability 1), the interior green triangle shrinks to no size, since there is only one set of probabilities for red, blue, and yellow that is allowed (they all must be zero).
When the green bar vanishes (green occurs with probability 0), the interior green triangle grows to its maximum size, since the full set of probability distributions over three outcomes may be assigned to the red, blue, and yellow outcomes.

This is difficult to explain in words, but the idea of making it interactive is you can drag around the black dots and see how the bars change height and the triangles change size in real time, so perhaps to will provide intuition for this 2d representation of a 3d space.

There are many things that I would like to improve about this diagram.
I would like the triangles to have little separation between them, so the black dots don't obscure one another when they get close to an edge.
This would also allow me to put colored dots at the vertices, which might help make the directions more intelligible.
It would also be nice to have the dual method of changing the distribution implemented, where one drags the bars directly to change one probability while uniformly shifting the others (currently, when one drags a dot in a triangle one changes three of the probabilities while leaving the one associated with the triangle's color fixed).

A more esoteric thing I'm unhappy with is that this diagram spoils some of the symmetry of the probability space.
Here, the red triangle is squarely in the middle, but there's nothing special about the red triangle.
It might as well be the blue, or the green triangle in the middle.
Here's where that extra yellow triangle comes in.
We've unfolded the faces of a tetrahedron and laid it flat on the screen, but this leaves many triangles with edges that have no neighbors.
We can give them neighbors again by putting copies of the faces they should be neighboring (that is what the rightmost yellow triangle is, a copy of the top yellow triangle, where the vertices of the yellow triangles that touch each other are the same).
One might wonder if you run into inconsistencies when doing this repeatedly.
Fortunately, for the tetrahedron, everything works out (you would run into inconsistencies if you did it with the other Platonic solids with triangular faces, the octahedron and the icosahedron).

![]({{ relative  }}images/tetrahedral-tiling.svg){.smallimg}

The colors you get from this tiling are shown above (and you can convince yourself that the vertices of the triangles can be consistently assigned to the color that they don't touch).
It would be fun to expand the interactive visualization to have this infinite tiling, to restore the symmetry between all the different outcomes, but that will have to wait for another time.

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="{{ relative }}js/blog/2023-01-06-four-component-dists.js"></script>


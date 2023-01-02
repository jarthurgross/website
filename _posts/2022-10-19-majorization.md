---
layout: post
comments: true
title: Exploring majorization
tags:
- javascript
- mathematics
- explorable
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

[Explorable explainations](https://explorabl.es/) are really cool.
One of my first exposures to the genre was through [Michael Nielsen](https://michaelnielsen.org/), who has written extensively on "tools for thought" and exposed me to people like [Bret Victor](http://worrydream.com/), [Nicky Case](https://ncase.me/), and [Amit Patel](https://www.redblobgames.com/), all of whom have "explorables" featured at the first link.
I'd like to try my hand at making some of these, so I'm going to start posting some rough products and see how it goes.

My first attempt aims to illustrate the concept of the [majorization](https://en.wikipedia.org/wiki/Majorization) relation between probability distributions.
This relation tells us whether one probability distribution can be tranformed into another via a doubly stochastic matrix, and also, as shown by Michael Nielsen[^majorization-prl], whether an entangled quantum state can be transformed into a different entangled quantum state using only local operations and classical communication.
Before I explain more details, here is the illustration:

<div id="demo">
  <svg viewBox="0 0 550 220" style="background:white">
  </svg>
</div>

The red and blue dots in the middle triangle represent probability distributions, and the polygon shaded in the respective color represents all the probability distributions that are more random than that distribution.
Play around with the diagram by clicking and dragging the dots, and when you're ready you can read the explanation below to clarify additional parts of the diagram.

Intuitively, one probability distribution majorizes another distribution if it is less random than the other.
The quantitative way to measure this is to compare the probability of obtaining one of the $k$ most likely outcomes of each distribution for all different values of $k$.
If the probabilities are more concentrated in the $k$ most likely outcomes for one distribution for all $k$, then that distribution majorizes the other (see the Wikipedia link or Nielsen's paper for a more detailed definition).

The majorization relation is a more complicated relation than the "greater than" relation on real numbers because you can have pairs of probability distributions where neither is "less random" than the other.
To really understand this, I had to graphically depict these probability distributions, first on paper, but eventually on a computer so I could more quickly explore all the different cases.
The interesting cases for majorization don't show up for probability distributions over two outcomes, so I spent time with probability distributions over three outcomes.
The explorable above is an extension of the computer visualization I originally wrote to illustrate the set of all probability distributions majorized by a particular distribution, enhanced to allow the comparison of a pair of distributions.

The triangle in the middle depicts the space of probability distributions over three outcomes as a [simplex](https://en.wikipedia.org/wiki/Simplex) (triangle).
The corners are distributions that return one of the outcomes a, b, or c with certainty, and points in the middle are distributions that return outcomes with probabilities proportional to how close they are to the corresponding corner.
The bar plot on the left illustrates the probabilities of obtaining the different outcomes for the red and blue distributions.
The bar plot on the right shows the same probabilities, but ordered to descend from high to low.
The red and blue lines above the bars show the probability of obtaining one of the $k$ most likely outcomes, so if one of the lines is always above the other line, that distribution majorizes the other.
It's easy to find pairs of points neither of which lie inside the other's shaded polygon.
For these pairs, you'll notice the colored lines in the right plot cross one another, so neither line is always above the other line.
By dragging the points around to different places, one can develop intuition for the symmetries of the probability simplex and the interesting structure of majorization.

I want to acknowledge Amit Patel specifically for influencing this blog post.
Amit not only writes amazing explorables explaining concepts related to game development, but has also written a [tutorial](https://www.redblobgames.com/making-of/line-drawing/) for making these kinds of interactive tutorials, which was very helpful in getting me started with the basic `d3.js` I used for this explorable.

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="{{ relative }}js/blog/2022-10-19-majorization.js"></script>

[^majorization-prl]: *Conditions for a Class of Entanglement Transformations*, Phys. Rev. Lett. **83**, 436 (1999), DOI:[10.1103/PhysRevLett.83.436](https://doi.org/10.1103/PhysRevLett.83.436), [Published PDF](https://michaelnielsen.org/papers/majorization.pdf)

---
layout: post
comments: true
title: Brouwer's fixed-point
tags:
- javascript
- mathematics
- explorable
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

My latest messing around with javascript has been to look at Brouwer's fixed-point theorem.
This came up as I was looking at Nash equilibria for an online [game-theory course](https://www.complexityexplorer.org/courses/69-game-theory-i-static-games) some of us in the [LAR](https://losangelesrationality.com/) group were doing, since the theorem is used to prove that every finite game has a Nash equilibrium.

I wanted to get a tactile feel for what the theorem was telling me, so I thought some interactive diagrams would be nice.
The theorm says that a continuous mapping from a convex set to itself will map at least one point to itself (that is the fixed point).
Ideally, I'd have a way for the user to specify their own function, but I didn't want to sink that much time into this short project, so I chose to do four examples mapping the square $0\leq x,y\leq1$ to itself.
Each of these four diagrams consists of a square on the left with a red dot you can drag around to select an input value, and then a square on the right with a blue dot indicating the output value, with the red dot reproduced so you can see when the input is equal to the output.

First example is inverting around 0.5, 0.5:

<div id="demo1" style="width:50%">
  <svg viewBox="0 0 430 240" style="background:white">
  </svg>
</div>

This has a single fixed point (0.5, 0.5).

If instead we map $(x,y)\mapsto(x^2,y^2)$, we get four fixed points at (0, 0), (0, 1), (1, 0), (1, 1):

<div id="demo2" style="width:50%">
  <svg viewBox="0 0 430 240" style="background:white">
  </svg>
</div>

Both of these examples were surjective, in the the image of the square was the whole square.
As an non surjective example, we can rotate the square 45-degrees into a diamond:

<div id="demo3" style="width:50%">
  <svg viewBox="0 0 430 240" style="background:white">
  </svg>
</div>

This has a fixed point again at the center, (0.5, 0.5).

Finally, to break some of the symmetry in the previous examples, we can first map $x\mapsto x^2$ and $y\mapsto y^3$, and then do the rotation to a diamond:

<div id="demo4" style="width:50%">
  <svg viewBox="0 0 430 240" style="background:white">
  </svg>
</div>

I've additionally used this project as an excuse to start streaming on Twitch, which is something I've wanted to try for a while.
My channel is <https://www.twitch.tv/jarthurgross>, and I've uploaded the two videos in which I put together these diagrams to my YouTube channel:

<iframe width="560" height="315" src="https://www.youtube.com/embed/PLBP1R7FZSA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/in12xUbSWOo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="{{ relative }}js/blog/2023-03-27-brouwer-fixed-point.js"></script>

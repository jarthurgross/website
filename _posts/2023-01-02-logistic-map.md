---
layout: post
comments: true
title: Exploring the Logistic Map
tags:
- javascript
- mathematics
- explorable
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

Time for my second explorable on this blog.
Some of us in the [Los Angeles Rationality](https://losangelesrationality.com/) meetup are going through the Santa Fe Institute's [Introduction to Complexity](https://www.complexityexplorer.org/courses/144-introduction-to-complexity) course together, and one of the topics covered is the [logistic map](https://en.wikipedia.org/wiki/Logistic_map).
I remember studying the stability behavior of maps like these before with a slight variation of a [cobweb plot](https://en.wikipedia.org/wiki/Cobweb_plot), so I went ahead and implemented one in javascript:

<div id="demo">
  <svg viewBox="0 0 550 220" style="background:white">
  </svg>
</div>

You can click and drag the red dot to change the initial value $x_0$ that's fed into the logistic map, and you can click on the number to the right of the diagram and move horizontally to change the parameter $R$ between 1 and 4.
The pale trajectory emitting from the red dot shows the path of successive applications of the logistic map $x_{n+1}=Rx_n(1-x_n)$, by alternating between updating the x and y components of a point.
One starts on the x axis at the point $(x_0,0)$, and then moves vertically to the point $(x_0,x_1)$ on the "vertical" parabola, then moves horizontally to the point $(x_2,x_1)$ on the "horizontal" parabola, and so forth, bouncing back and forth between the two parabolas encoding the update rule $x_{n+1}=Rx_n(1-x_n)$.
This explorable is pretty rudimentary, and it applies the map for a fixed 64 iterations, but this is enough for you to see the transition from the map having a stable fixed point to having "attractors" that are loops that the trajectory gets sucked into.
I am displaying the trajectory with transparency so one can easily see when the trajectory settles into a stable orbit, as the orbit darkens up as lines pile up on each other.

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="{{ relative }}js/blog/2023-01-02-logistic-map.js"></script>

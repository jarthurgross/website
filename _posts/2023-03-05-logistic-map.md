---
layout: post
comments: true
title: Exploring the Logistic Map (part 2)
tags:
- javascript
- mathematics
- explorable
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

I made a fancier version of my [previous]({% post_url 2023-01-02-logistic-map %}) logistic-map diagram:

<div id="demo">
  <svg viewBox="0 0 432 220" style="background:white">
  </svg>
</div>

This version has the old representation on the left, the more traditional cobweb diagram in the middle, and a cumulative distribution of all the x values on the right, along with giving you the ability to change the number of iterations to go up to 256.
Rather than trying to explain everything in detain in text, I made a 10-minute [YouTube video](https://youtu.be/xZBi6PgOo2M) (which you can probably get away with watching at 2x speed, as I was perhaps being too deliberate with my statements...):

<iframe width="560" height="315" src="https://www.youtube.com/embed/xZBi6PgOo2M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="{{ relative }}js/blog/2023-03-05-logistic-map.js"></script>

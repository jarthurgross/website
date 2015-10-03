---
layout: default
title: Jonathan Gross's homepage
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

Welcome!
========

<img id='portrait' src='{{ relative }}images/jonathan-a-gross.jpg'
  alt='Portrait of Jonathan A. Gross' />

My name is Jonathan A. Gross, and I am a Ph.D. candidate at the University of
New Mexico studying the theory of quantum information. I hope for this website
to keep a public record of my research activities (such as talks and
publications), as well as to provide a platform for sharing interesting things I
happen upon during the course of my work.

I have a bachelor's degree in computer engineering from the University of
Arizona, so much of what I find interesting outside my immediate research field
involves software. I am a volunteer instructor for the [Software carpentry
foundation][swc], and am committed to promoting open standards (such as the use
of HTML as an open presentation format via tools like [reveal.js][rjs]).

[swc]: http://software-carpentry.org/
[rjs]: http://lab.hakim.se/reveal-js

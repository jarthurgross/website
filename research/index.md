---
layout: default
title: Research interests
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

# Research interests

My research interests currently include quantum measurement theory and
geometric properties of quantum state space. I have also done work studying
open-quantum-system dynamics (particularly stochastic evolution) and evaluating
tomographic schemes employing weak measurements.

* ResearcherID: [M-5661-2014][rid]
* ORCID: [0000-0001-7049-6206][orcid]
* [Google Scholar][scholar]

## Papers

Here is a list of my papers.

* *Novelty, efficacy, and significance of weak measurements for quantum
  tomography*, Phys. Rev. A **92**, 062133 (2015),
  doi:[10.1103/PhysRevA.92.062133][weakmeastomodoi],
  arXiv:[1506.08892][weakmeastomoarxiv].

## Talks

Here is a list of talks I have given (currently only external talks are listed).
I give them in two formats: [browsercast][browsercast] (which plays the audio
back in sync with the slideshow in your browser) or slides only (which allows
you to view the HTML slides at your own pace in your browser).

If you are watching a browsercast and the play/pause button is not responding to
clicks, the spacebar works to pause or resume playback (I may have messed
something up when playing with the CSS...)

Some of my slides also use MathML for equations, which looks great in Firefox
but doesn't have good support in Chrome (although I just started playing around
with the [Math anywhere][mathanywhere] Chrome extension, which does a decent
job).

* *Fisher symmetry and the geometry of quantum states*, CQuIC internal talk,
  Albuquerque, NM, September 16, 2015 ([browsercast][fsgqsbc])
* *On the efficacy of weak measurement tomography*, 2015 APS March Meeting, San
  Antonio, TX, March 4, 2015 ([abstract][aps15abs], [browsercast][aps15bc])
* *On the efficacy of weak measurement tomography*,
  [17th annual SQuInT workshop][squint15],
  Berkeley, CA, February 20, 2015 ([browsercast][bc], [slides][slides])

[browsercast]: https://github.com/ReDEnergy/Browsercast
[png]: http://www.libpng.org/pub/png/
[svg]: http://www.w3.org/Graphics/SVG/
[bc]: {{ relative }}talks/squint2015/squint2015browsercast
[slides]: {{ relative }}talks/squint2015/squint2015slides
[zip]: {{ relative }}talks/squint2015/squint2015.zip
[aps15bc]: http://jarthurgross.github.io/apsmarch2015
[aps15abs]: http://meetings.aps.org/link/BAPS.2015.MAR.M38.4
[squint15]: http://physics.unm.edu/SQuInT/2015/index.php
[weakmeastomoarxiv]: http://arxiv.org/abs/1506.08892
[weakmeastomodoi]: http://dx.doi.org/10.1103/PhysRevA.92.062133
[fsgqsbc]: http://jarthurgross.github.io/fisher-symmetric-2015
[mathanywhere]: https://github.com/andrusha/mathml-chrome
[rid]: http://www.researcherid.com/rid/M-5661-2014
[orcid]: http://orcid.org/0000-0001-7049-6206
[scholar]: https://scholar.google.com/citations?user=yo_et60AAAAJ

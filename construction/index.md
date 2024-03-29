---
layout: default
title: How it's made
---

How it's made
=============

This website is statically generated on my computer using [jekyll][jk] and
uploaded to my webserver using [rsync][rs].
This allows me many of the
conveniences of a <dfn title="Content Management System">CMS</dfn> without
requiring the use of backend scripting (such as
<dfn title="PHP: Hypertext Preprocessor">PHP</dfn>).
This was more of an issue for me when I hosted this site on servers at <dfn
title="University of New Mexico">UNM</dfn>.
An additional benefit is that jekyll gives me very low-level control over the
creation of the <dfn title="HyperText Markup Language">HTML</dfn>, so I can
make attempts to be more standards-compliant than some other systems.

I have made use of several pieces of code in addition to the standard jekyll
distribution.
For interpreting [Markdown][md] I prefer to use [pandoc][pd] for its extended
Markdown syntax and ability to display math with [MathJax][mj].
In order to accomplish this I use the [jekyll-pandoc][jekyllpandoc] plugin.
The fix from [this][so] thread allows me to view my pages both locally and
online, which again was more important on the UNM servers when my homepage did
not reside at the root of the domain that was serving it.
For the Atom and <dfn title="Rich Site Summary">RSS</dfn> feeds I use templates
put together by [Dave Coyle][dc].

If there is anything on my site you are curious to see the source for, I have a
public Git [repository][gh] with all my source files.

[jk]: http://jekyllrb.com/ "jekyll"
[rs]: https://rsync.samba.org/ "rsync"
[md]: http://daringfireball.net/projects/markdown/ "Markdown"
[pd]: http://johnmacfarlane.net/pandoc/ "pandoc"
[jekyllpandoc]: https://github.com/mfenner/jekyll-pandoc "Jekyll Pandoc markdown converter as Ruby gem"
[mj]: http://www.mathjax.org/ "MathJax"
[so]: http://stackoverflow.com/questions/7985081/how-to-deploy-a-jekyll-site-locally-with-css-js-and-background-images-included "How to deploy a jekyll site locally with css, js and background images included?"
[dc]: http://davecoyle.com/tech-notes/jekyll-templates-for-atom-rss/ "Jekyll Templates for Atom, RSS"
[gh]: https://github.com/jarthurgross/website

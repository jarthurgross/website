---
layout: default
title: How it's Made
---

How it's Made
=============

This website is statically generated on my computer using [jekyll][jk] and
uploaded to UNM's servers using [rsync][rs]. This allows me many of the
conveniences of a <dfn title="Content Management System">CMS</dfn> without
requiring the use of backend scripting (such as
<dfn title="PHP: Hypertext Preprocessor">PHP</dfn>), which is not available for
the server space I have with UNM. An additional benefit is that jekyll gives me
very low-level control over the creation of the
<dfn title="HyperText Markup Language">HTML</dfn>, so I can make attempts to be
more standards-compliant than some other systems.

I have made use of several pieces of code in addition to the standard jekyll
distribution. For interpreting [Markdown][md] I prefer to use [pandoc][pd] for
its extended Markdown syntax and ability to display math with [MathJax][mj]. In
order to accomplish this I use the pandoc [plugin][pi] provided by David
Sanson. I am also currently using this [stylesheet][css] from github for syntax
highlighting. The fix from [this][so] thread allows me to view my pages both
locally and online, given that my homepage does not reside at the root of the
domain that is serving it. For the Atom and
<dfn title="Rich Site Summary">RSS</dfn> feeds I use templates put together by
[Dave Coyle][dc].

If there is anything on my site you are curious to see the source for, I have a
public Git [repository][gh] with all my source files.

[jk]: http://jekyllrb.com/ "jekyll"
[rs]: https://rsync.samba.org/ "rsync"
[md]: http://daringfireball.net/projects/markdown/ "Markdown"
[pd]: http://johnmacfarlane.net/pandoc/ "pandoc"
[mj]: http://www.mathjax.org/ "MathJax"
[pi]: https://github.com/dsanson/jekyll-pandoc-plugin "jekyll-pandoc-plugin"
[css]: http://github.com/mojombo/tpw/tree/master/css/syntax.css "syntax.css"
[so]: http://stackoverflow.com/questions/7985081/how-to-deploy-a-jekyll-site-locally-with-css-js-and-background-images-included "How to deploy a jekyll site locally with css, js and background images included?"
[dc]: http://davecoyle.com/tech-notes/jekyll-templates-for-atom-rss/ "Jekyll Templates for Atom, RSS"
[gh]: https://github.com/jarthurgross/website

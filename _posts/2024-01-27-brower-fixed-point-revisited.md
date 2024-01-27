---
layout: post
comments: true
title: Brouwer's fixed-point revisited
tags:
- javascript
- mathematics
- explorable
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

A while back I had to opportunity to chat with [Amit Patel](https://www.redblobgames.com/) about explorables, which was a delight and provided some helpful perspective.
One specific encouragement that came out of the conversation was to try and leverage Bret Victor's idea of the [ladder of abstraction](http://worrydream.com/LadderOfAbstraction/) more, with my [prototypes]({{ relative }}2023/03/27/brouwer-fixed-point.html) exploring the Brouwer fixed-point theorem being a good candidate for trying this.
Here's how the prototype looks now:

<div>
<input type="radio" id="function1" name="colorFunction" value="function1" checked>
<label for="function1">(1&minus;x, 1&minus;y)</label>

<input type="radio" id="function2" name="colorFunction" value="function2">
<label for="function2">(x<sup>2</sup>, y<sup>2</sup>)</label>

<input type="radio" id="function3" name="colorFunction" value="function3">
<label for="function3">((x&minus;y+1)/2, (x+y)/2)</label>

<input type="radio" id="function4" name="colorFunction" value="function4">
<label for="function4">((x<sup>2</sup>&minus;y<sup>3</sup>+1)/2, (x<sup>2</sup>+y<sup>3</sup>)/2)</label>
</div>

<canvas id="myCanvas" width="500" height="500"></canvas>
<canvas id="staticCanvas" width="250" height="250"></canvas>

I've compressed the four different endomorphisms into a single diagram where you can select the endomorphism using radio buttons.
More importantly, though, you can now see how the input changes to the output for the entire domain at a glance, using both arrows and colors.
The arrows point from a particular function input to the correponding function output, with the length proportional to the distance between these points.
This is a little coarse, since you can only pack arrows so tightly, so I've also represented these vectors with the background pixel colors, where the saturation maps to the magnitude and the hue maps to the direction (as illustrated in the reference disc).
Now you can find the fixed point by looking for where the image goes white.
You can of course also move the input red dot around and see where the output blue dot moves, to connect the very concrete input/output relation from the previous prototype with this higher-level abstraction.

The code's a mess, but it feels good to make another prototype, and the end result is actually pretty much how I envisioned in my mind.

<script src="{{ relative  }}js/blog/2024-01-27-brouwer.js"></script>
<script>
window.addEventListener('load', function() {
document.getElementById('function1').checked = true;
});
</script>

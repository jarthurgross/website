---
layout: post
comments: true
title: Repetition code explorable
tags:
- javascript
- quantum
- explorable
---

{% capture lvl %}{{ page.url | append:'index.html' | split:'/' | size }}{% endcapture %}
{% capture relative %}{% for i in (3..lvl) %}../{% endfor %}{% endcapture %}

<style>
.parent-container {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

.container {
display: flex;
align-items: center;
justify-content: center;
}

.grid-container {
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 10px;
justify-content: center;
align-items: center;
}

.triple-box {
display: flex;
align-items: center;
justify-content: center;
}

#toggleBox, .outputBox, .conditionalBox, #decodeBox {
width: 50px;
height: 50px;
border: 1px solid white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
font-weight: bold;
}

#toggleBox {
cursor: pointer;
}

.outputBox {
background-color: #7570b3;
}

.conditionalBox {
background-color: #66a61e;
}

#decodeBox {
background-color: #d95f02;
}

button {
margin: 10px;
}

.noiseBox {
width: 50px;
height: 50px;
border: 1px solid white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
background-color: #1b9e77;
}
</style>

Made a little diagram for seeing how the repetition code works:

<div class="grid-container">
<div id="toggleBox" onclick="toggle()">0</div>
<button id="populateButton" onclick="populateBoxes()">Encode</button>
<div class="triple-box">
<div id="box1" class="outputBox"></div>
<div id="box2" class="outputBox"></div>
<div id="box3" class="outputBox"></div>
</div>
<div></div>
<button id="noiseButton" onclick="generateNoise()">Generate noise</button>
<div class="triple-box">
<div id="noiseBox1" class="noiseBox"></div>
<div id="noiseBox2" class="noiseBox"></div>
<div id="noiseBox3" class="noiseBox"></div>
</div>
<div id="decodeBox"></div>
<button id="decodeButton" onclick="decode()">Decode</button>
<div class="triple-box">
<div id="conditionalBox1" class="conditionalBox"></div>
<div id="conditionalBox2" class="conditionalBox"></div>
<div id="conditionalBox3" class="conditionalBox"></div>
</div>
</div>

The upper left box is in the input, which you can toggle between 0 and 1 by clicking on it.
If you click the "encode" button, it is encoded in the three boxes to the right as a distance-3 repetition code.
The bottom three boxes in the column show what happens to the encoding after it is corrupted by noise.
To start with there is no noise, but when you click the "generate noise" button, the middle three boxes in the column are randomly populated with lightening bolts that flip the bits.
Finally, so see whether you successfully recover the information, click the "decode" button to take a majority vote and populate the bottom left box, seeing if it's the same as the upper left box.

Things I immediately would like to iterate on:

1. Add arrows or something to communicate the flow.
2. Label some more things (like the input and output).
3. Let one vary the probability of the lightening bolts, and the distance of the repetition code.

Varying the parameters is probably something that could be introduced in a subsequent diagram if I were to make this a proper explorable trying to teach someone the repetition code.
Then could start marching up the layers of abstraction by looking at how the probability of recovering the information depends on these parameters.

<script src="{{ relative  }}js/blog/2024-02-05-repetition.js"></script>

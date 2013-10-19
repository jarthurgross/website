---
layout: default
title: PHYC 262
---

<header>

PHYC 262
========

</header>
<div role="main">

Problem Sessions
----------------

Problem sessions will be held at the following times and locations:
<dl>
  <dt>Monday</dt>
  <dd>1100&ndash;1200 in RH 111</dd>
  <dt>Tuesday</dt>
  <dd>1000&ndash;1100 in RH 111</dd>
  <dt>Friday</dt>
  <dd>1000&ndash;1100 in RH 111</dd>
</dl>

Plotting Tutorial
-----------------

I have included some code that can be used on the Sage notebook server to plot
various functions we are discussing in class so you can play around with
observing the effects of varying different parameters.

To start with, you will need to log into the [Sage notebook server][snb]. You
can either create a new account or log in using an OpenID provider such as
Google. Once you log in, there will be a link near the top of the page titled
"New Worksheet" that you should use to create the worksheet we will be plotting
on. Once you open up a new worksheet you will see an empty cell into which you
can enter code. In the first cell, copy and paste the following and then press
"Shift-Enter" while your cursor is in the cell to execute the code:

{% highlight python %}
L_min = 1
L_max = 8
d_min = 1
d_max = 8
theta_min = -pi/2
theta_max = pi/2

var('d')
var('L')
@interact
def _(L=(L_min, L_max), d=(d_min, d_max)):
    I_small_angle = lambda theta: cos(2*pi*d*sin(theta)/L)**2
    I_exact = lambda theta: cos(2*pi*d*theta/L)**2
    small_angle_plot = plot(I_small_angle, theta_min, theta_max,
        rgbcolor=(0.2,0.2,0.6))
    exact_plot = plot(I_exact, theta_min, theta_max,
        rgbcolor=(0.2,0.6,0.2))
    show(small_angle_plot + exact_plot)
{% endhighlight %}

This code will make an example plot showing the difference in the intensity
pattern for a double slit experiment both with (green) and without (blue) the
small angle approximation made. Values for theta are plotted from theta_min to
theta_max. The sliders allow you to change values of L (the wavelength) from
L_min to L_max and the values of d (slit separation) from d_min to d_max. You
can change these ranges by modifying the values assigned to these variables in
the first couple lines.

Another piece of example code is below:

{% highlight python %}
L_min = 1
L_max = 8
a_min = 1
a_max = 8
theta_min = -pi/2
theta_max = pi/2

var('a')
var('L')
@interact
def _(L=(L_min, L_max), a=(a_min, a_max)):
    I = lambda theta: (sin(a*pi*theta/L)/(a*pi*theta/L))**2
    intensity_plot = plot(I, theta_min, theta_max, rgbcolor=(0.2,0.2,0.6))
    show(intensity_plot)
{% endhighlight %}

This code makes a plot for single slit diffraction where you can adjust the
wavelength and slit width with sliders.

You should be able to modify the lines with the "lambda" keyword to different
functions you want to plot. If you feel more ambitious, you can look at the
[Sage plotting documentation][spd]. If you have any problems getting this to
work or any other questions feel free to email me.

</div>

[snb]: http://www.sagenb.org "Sage notebook server"
[spd]: http://www.sagemath.org/doc/tutorial/tour_plotting.html "Sage plotting documentation"

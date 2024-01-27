function invert_endo(x, y) {
  return {x: 1 - x, y: 1 - y};
}

function endo_22(x, y) {
  return {x: x**2, y: y**2};
}

function diamond_endo(x, y) {
  return {x: (x - y) / 2 + 1 / 2, y: (x + y) / 2}
}

function diamond_endo_23(x, y) {
  return {x: (x**2 - y**3) / 2 + 1 / 2, y: (x**2 + y**3) / 2}
}

function collapse_endo(x, y) {
  // Used for drawing the reference color/direction disc.
  return {x: 0.5, y: 0.5};
}

// Function that takes an input x and y and a function to feed them to
// and returns the magnitude and direction of the vector pointing to the
// output value of the function.
function vector(x, y, endo) {
  let output = endo(x, y);
  let dx = output.x - x;
  let dy = output.y - y;
  let magnitude = Math.sqrt(dx**2 + dy**2);
  let direction = Math.atan2(dy, dx);
  return {magnitude: magnitude, direction: direction};
}

// function hsvToRgb(h, s, v) {
//   // From https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
//   var r, g, b, i, f, p, q, t;
//   if (arguments.length === 1) {
//       s = h.s, v = h.v, h = h.h;
//   }
//   i = Math.floor(h * 6);
//   f = h * 6 - i;
//   p = v * (1 - s);
//   q = v * (1 - f * s);
//   t = v * (1 - (1 - f) * s);
//   switch (i % 6) {
//       case 0: r = v, g = t, b = p; break;
//       case 1: r = q, g = v, b = p; break;
//       case 2: r = p, g = v, b = t; break;
//       case 3: r = p, g = q, b = v; break;
//       case 4: r = t, g = p, b = v; break;
//       case 5: r = v, g = p, b = q; break;
//   }
//   return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
// }
function hslToRgb(h, s, l){
  var r, g, b;

  if(s == 0){
      r = g = b = l; // achromatic
  }else{
      function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [r * 255, g * 255, b * 255];
}

function hsvToRgb(h, s, v){
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch(i % 6){
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }

  return [r * 255, g * 255, b * 255];
}

// Function that takes a magnitude and direction, along with a maximum magnitude,
// and returns an RBG triple where the brightness of the triple corresponds to the
// magnitude and the hue corresponds to the direction.
function color(magnitude, direction, max_magnitude) {
  let hue = direction / (2 * Math.PI);
  let saturation = 1;
  let value = magnitude / max_magnitude;
  return hsvToRgb(
    hue + 1,  // Make sure it's not negative
    value,  // Swap saturation and value so that zero corresponds to white.
    saturation,
  );
}

function setStaticCanvasColors() {
  var canvas = document.getElementById('staticCanvas');
  var ctx = canvas.getContext('2d');
  var imageData = ctx.createImageData(canvas.width, canvas.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
      // Get the row and column indices from the flattened imageData index
      let col = (i / 4) % canvas.width;
      let row = Math.floor((i / 4) / canvas.width);
      // Transform the row and column indices into x and y coordinates between 0 and 1
      let x = col / (canvas.width - 1);
      let y = 1 - row / (canvas.height - 1);
      mag_dir = vector(x, y, collapse_endo);
      var alpha = 255;
      if (mag_dir.magnitude > 0.5) {
        alpha = 0;
      }
      // mag_dir.direction = mag_dir.dirction +0.1;
      rgb = color(mag_dir.magnitude, mag_dir.direction + Math.PI, 0.5);
      // Modify these values to set your pixel colors
      imageData.data[i+0] = rgb[0];    // Red
      imageData.data[i+1] = rgb[1];    // Green
      imageData.data[i+2] = rgb[2];    // Blue
      // imageData.data[i+0] = Math.round(mag_dir.magnitude * 255);    // Red
      // imageData.data[i+1] = Math.round(mag_dir.magnitude * 255);    // Green
      // imageData.data[i+2] = Math.round(mag_dir.magnitude * 255);    // Blue
      imageData.data[i+3] = alpha;    // Alpha (transparency)
  }

  ctx.putImageData(imageData, 0, 0);
}

function drawVectorField(ctx, spacing) {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;

  for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
          var vector = {magnitude: 1, angle: 0};
          drawArrow(ctx, x, y, vector.angle, vector.magnitude);
      }
  }
}

function drawArrow(ctx, x, y, angle, magnitude) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-angle + Math.PI / 2);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -magnitude); // Adjust these to change arrow size/shape
  ctx.lineTo(3, -magnitude + 3);
  ctx.moveTo(0, -magnitude);
  ctx.lineTo(-3, -magnitude + 3);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  var imageData = ctx.createImageData(canvas.width, canvas.height);
  var dragging = false;
  var dotRadius = 10;
  var dot = { x: canvas.width / 2, y: canvas.height / 2 };
  var image_dot = { x: canvas.width / 2, y: canvas.height / 2 };
  var currentFunction = 'function1';
  var endo = invert_endo;
  setStaticCanvasColors();

  document.querySelectorAll('input[name="colorFunction"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
          currentFunction = this.value;
          switch(currentFunction) {
              case 'function1':
                  endo = invert_endo;
                  break;
              case 'function2':
                  endo = endo_22;
                  break;
              case 'function3':
                  endo = diamond_endo;
                  break;
              case 'function4':
                  endo = diamond_endo_23;
                  break;
          }
          updateImagePosition();
          drawCanvas();
      });
  });

  function drawCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Redraw the background or any other elements
      max_magnitude = 0;
      for (let i = 0; i < imageData.data.length; i += 4) {
        // Get the row and column indices from the flattened imageData index
        let col = (i / 4) % canvas.width;
        let row = Math.floor((i / 4) / canvas.width);
        // Transform the row and column indices into x and y coordinates between 0 and 1
        let x = col / (canvas.width - 1);
        let y = 1 - row / (canvas.height - 1);
        mag_dir = vector(x, y, endo);
        if (mag_dir.magnitude > max_magnitude) {
          max_magnitude = mag_dir.magnitude;
        }
    }

      for (let i = 0; i < imageData.data.length; i += 4) {
          // Get the row and column indices from the flattened imageData index
          let col = (i / 4) % canvas.width;
          let row = Math.floor((i / 4) / canvas.width);
          // Transform the row and column indices into x and y coordinates between 0 and 1
          let x = col / (canvas.width - 1);
          let y = 1 - row / (canvas.height - 1);
          mag_dir = vector(x, y, endo);
          rgb = color(mag_dir.magnitude, mag_dir.direction, max_magnitude);
          // Modify these values to set your pixel colors
          imageData.data[i+0] = rgb[0];    // Red
          imageData.data[i+1] = rgb[1];    // Green
          imageData.data[i+2] = rgb[2];    // Blue
          // imageData.data[i+0] = Math.round(mag_dir.magnitude * 255);    // Red
          // imageData.data[i+1] = Math.round(mag_dir.magnitude * 255);    // Green
          // imageData.data[i+2] = Math.round(mag_dir.magnitude * 255);    // Blue
          imageData.data[i+3] = 255;    // Alpha (transparency)
      }

      ctx.putImageData(imageData, 0, 0);

      for (let x = 20; x < ctx.canvas.width; x += 20) {
          for (let y = 20; y < ctx.canvas.height; y += 20) {
              let normalized_x = x / (canvas.width - 1);
              let normalized_y = 1 - y / (canvas.height - 1);
              var mag_dir = vector(normalized_x, normalized_y, endo);
              drawArrow(ctx, x, y, mag_dir.direction, 20 * mag_dir.magnitude / max_magnitude);
          }
      }

      // for (let i = 0; i < imageData.data.length; i += 4) {
      //     // Get the row and column indices from the flattened imageData index
      //     let col = (i / 4) % canvas.width;
      //     let row = Math.floor((i / 4) / canvas.width);
      //     // Transform the row and column indices into x and y coordinates between 0 and 1
      //     let x = col / (canvas.width - 1);
      //     let y = 1 - row / (canvas.height - 1);
      //     mag_dir = vector(x, y, endo);
      //     drawArrow(ctx, row, col, mag_dir.direction, mag_dir.magnitude);
      // }

      // drawVectorField(ctx, 20);

      // Draw the image dot
      ctx.beginPath();
      ctx.arc(image_dot.x, image_dot.y, dotRadius, 0, Math.PI * 2, true);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.strokeStyle = 'black'; // Color of the outline
      ctx.lineWidth = 1;         // Width of the outline
      ctx.stroke();              // Apply the outline

      // Draw the dot
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2, true);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.strokeStyle = 'black'; // Color of the outline
      ctx.lineWidth = 1;         // Width of the outline
      ctx.stroke();              // Apply the outline
  }

  canvas.addEventListener('mousedown', function(e) {
      if (isDotClicked(e)) {
          dragging = true;
      }
  });

  canvas.addEventListener('mousemove', function(e) {
      if (dragging) {
          updateDotPosition(e);
          drawCanvas();
      }
  });

  canvas.addEventListener('mouseup', function() {
      dragging = false;
  });

  function isDotClicked(e) {
      var rect = canvas.getBoundingClientRect();
      var mouseX = e.clientX - rect.left;
      var mouseY = e.clientY - rect.top;
      var dx = mouseX - dot.x;
      var dy = mouseY - dot.y;
      return dx * dx + dy * dy <= dotRadius * dotRadius;
  }

  function updateDotPosition(e) {
      var rect = canvas.getBoundingClientRect();
      dot.x = e.clientX - rect.left;
      dot.y = e.clientY - rect.top;
      updateImagePosition();
  }

  function updateImagePosition() {
    // Transform x and y into coordinates between 0 and 1.
    var normalized_x = dot.x / canvas.width;
    var normalized_y = 1 - dot.y / canvas.height;
    var normalized_image = endo(normalized_x, normalized_y);
    // Transform the normalized coordinated back into pixel coordinates
    image_dot.x = normalized_image.x * canvas.width;
    image_dot.y = (1 - normalized_image.y) * canvas.height;
  }

  drawCanvas();
});

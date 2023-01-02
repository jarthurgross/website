const scale = 96;
const width = 550;
const height = 220;
const offset = {x: 275, y: 120};
let root = d3.select("#demo svg");

function triplet_coords_to_xy(a, b, c, scale, offset) {
  let angles = [-Math.PI/6, Math.PI/2, 7*Math.PI/6];
  return {
    x: scale * (b - c)/Math.sqrt(2) + offset.x,
    y: scale * (b + c - 2*a)/Math.sqrt(6) + offset.y,
  }
}

function xy_to_unit_sum_triplet_coords(point, scale, offset) {
  base_point = {
    x: (point.x - offset.x)/scale,
    y: (point.y - offset.y)/scale,
  }
  a = -2*base_point.y/Math.sqrt(6) + 1/3;
  b = base_point.y/Math.sqrt(6) + base_point.x/Math.sqrt(2) + 1/3;
  c = base_point.y/Math.sqrt(6) - base_point.x/Math.sqrt(2) + 1/3;
  return {a: a, b: b, c: c};
}

function prob_dist_to_permutations(a, b, c) {
  if (((a <= b) && (b <= c)) || ((c <= b) && (b <= a))) {
    permutations = [
      [a, b, c],
      [b, a, c],
      [c, a, b],
      [c, b, a],
      [b, c, a],
      [a, c, b],
    ];
  }
  else if (((a <= c) && (c <= b)) || ((b <= c) && (c <= a))) {
    permutations = [
      [a, b, c],
      [c, b, a],
      [b, c, a],
      [b, a, c],
      [c, a, b],
      [a, c, b],
    ];
  }
  else if (((b <= a) && (a <= c)) || ((c <= a) && (a <= b))) {
    permutations = [
      [a, b, c],
      [b, a, c],
      [b, c, a],
      [a, c, b],
      [c, a, b],
      [c, b, a],
    ];
  }
  return permutations;
}

let triangle_points = [
  triplet_coords_to_xy(1, 0, 0, scale, offset),
  triplet_coords_to_xy(0, 1, 0, scale, offset),
  triplet_coords_to_xy(0, 0, 1, scale, offset),
];
points_string = triangle_points.map((p) => `${p.x},${p.y}`).join(' ');

let triangle = root.append('polygon').attr('points', points_string).attr('stroke', 'black').attr('fill', 'white');
root.append('text')
  .attr('x', triangle_points[0].x - 5)
  .attr('y', triangle_points[0].y - 5)
  .attr('font-size', 12)
  .text('a');
root.append('text')
  .attr('x', triangle_points[1].x + 5)
  .attr('y', triangle_points[1].y + 5)
  .attr('font-size', 12)
  .text('b');
root.append('text')
  .attr('x', triangle_points[2].x - 12)
  .attr('y', triangle_points[2].y + 5)
  .attr('font-size', 12)
  .text('c');

let plot_0_xy = {x: 100, y: height/2};

root.append('line')
  .attr('x1', plot_0_xy.x - 10)
  .attr('x2', plot_0_xy.x + 90)
  .attr('y1', plot_0_xy.y)
  .attr('y2', plot_0_xy.y)
  .attr('style', "stroke:rgb(0,0,0);stroke-width:1");
root.append('line')
  .attr('x1', plot_0_xy.x - 10)
  .attr('x2', plot_0_xy.x + 90)
  .attr('y1', plot_0_xy.y - scale)
  .attr('y2', plot_0_xy.y - scale)
  .attr('style', "stroke:rgb(0,0,0);stroke-width:1");
root.append('text')
  .attr('x', plot_0_xy.x - 20)
  .attr('y', plot_0_xy.y + 2)
  .attr('font-size', 8)
  .text('0');
root.append('text')
  .attr('x', plot_0_xy.x - 20)
  .attr('y', plot_0_xy.y + 2 - scale)
  .attr('font-size', 8)
  .text('1');
root.append('text')
  .attr('x', plot_0_xy.x)
  .attr('y', plot_0_xy.y + 12)
  .attr('font-size', 8)
  .text('Pr(a)');
root.append('text')
  .attr('x', plot_0_xy.x + 30)
  .attr('y', plot_0_xy.y + 12)
  .attr('font-size', 8)
  .text('Pr(b)');
root.append('text')
  .attr('x', plot_0_xy.x + 60)
  .attr('y', plot_0_xy.y + 12)
  .attr('font-size', 8)
  .text('Pr(c)');

let plot_1_xy = {x: 400, y: height/2};

root.append('line')
  .attr('x1', plot_1_xy.x - 10)
  .attr('x2', plot_1_xy.x + 90)
  .attr('y1', plot_1_xy.y)
  .attr('y2', plot_1_xy.y)
  .attr('style', "stroke:rgb(0,0,0);stroke-width:1");
root.append('line')
  .attr('x1', plot_1_xy.x - 10)
  .attr('x2', plot_1_xy.x + 90)
  .attr('y1', plot_1_xy.y - scale)
  .attr('y2', plot_1_xy.y - scale)
  .attr('style', "stroke:rgb(0,0,0);stroke-width:1");
root.append('text')
  .attr('x', plot_1_xy.x - 20)
  .attr('y', plot_1_xy.y + 2)
  .attr('font-size', 8)
  .text('0');
root.append('text')
  .attr('x', plot_1_xy.x - 20)
  .attr('y', plot_1_xy.y + 2 - scale)
  .attr('font-size', 8)
  .text('1');
root.append('text')
  .attr('x', plot_1_xy.x)
  .attr('y', plot_1_xy.y + 12)
  .attr('font-size', 8)
  .text('P0');
root.append('text')
  .attr('x', plot_1_xy.x + 30)
  .attr('y', plot_1_xy.y + 12)
  .attr('font-size', 8)
  .text('P1');
root.append('text')
  .attr('x', plot_1_xy.x + 60)
  .attr('y', plot_1_xy.y + 12)
  .attr('font-size', 8)
  .text('P2');

function project_to_three_outcome_dist(a, b, c) {
  var two_outcome_dist;
  if (a < 0) {
    two_outcome_dist = project_to_two_outcome_dist(b + a/2, c + a/2);
    return {a: 0, b: two_outcome_dist.a, c: two_outcome_dist.b};
  }
  if (b < 0) {
    two_outcome_dist = project_to_two_outcome_dist(a + b/2, c + b/2);
    return {a: two_outcome_dist.a, b: 0, c: two_outcome_dist.b};
  }
  if (c < 0) {
    two_outcome_dist = project_to_two_outcome_dist(a + c/2, b + c/2);
    return {a: two_outcome_dist.a, b: two_outcome_dist.b, c: 0};
  }
  return {a: a, b: b, c: c};
}

function project_to_two_outcome_dist(a, b) {
  if (a < 0) {
    return {a: 0, b: a + b};
  }
  if (b < 0) {
    return {a: a + b, b: 0};
  }
  return {a: a, b: b};
}

function makeDraggableCircle(a, b, c, color, idx) {
  let point = triplet_coords_to_xy(a, b, c, scale, offset);
  let polygon = root.append('polygon').attr('stroke', 'black').attr('fill', color).attr('fill-opacity', 0.5);
  let circle = root.append('circle')
    .attr('class', "draggable")
    .attr('r', 6)
    .attr('fill', color)
    .call(d3.drag().on('drag', onDrag));

  let pa_rect = root.append('rect')
    .attr('stroke', 'black')
    .attr('fill', color)
    .attr('fill-opacity', 0.5)
    .attr('x', plot_0_xy.x + idx*10)
    .attr('y', plot_0_xy.y - scale*a)
    .attr('width', 10)
    .attr('height', scale*a);
  let pb_rect = root.append('rect')
    .attr('stroke', 'black')
    .attr('fill', color)
    .attr('fill-opacity', 0.5)
    .attr('x', plot_0_xy.x + 30 + idx*10)
    .attr('y', plot_0_xy.y - scale*b)
    .attr('width', 10)
    .attr('height', scale*b);
  let pc_rect = root.append('rect')
    .attr('stroke', 'black')
    .attr('fill', color)
    .attr('fill-opacity', 0.5)
    .attr('x', plot_0_xy.x + 60 + idx*10)
    .attr('y', plot_0_xy.y - scale*c)
    .attr('width', 10)
    .attr('height', scale*c);

  sorted_probs = [a, b, c].sort();

  let p0_rect = root.append('rect')
    .attr('stroke', 'black')
    .attr('fill', color)
    .attr('fill-opacity', 0.5)
    .attr('x', plot_1_xy.x + idx*10)
    .attr('y', plot_1_xy.y - scale*sorted_probs[2])
    .attr('width', 10)
    .attr('height', scale*sorted_probs[2]);
  let p1_rect = root.append('rect')
    .attr('stroke', 'black')
    .attr('fill', color)
    .attr('fill-opacity', 0.5)
    .attr('x', plot_1_xy.x + 30 + idx*10)
    .attr('y', plot_1_xy.y - scale*sorted_probs[1])
    .attr('width', 10)
    .attr('height', scale*sorted_probs[1]);
  let p2_rect = root.append('rect')
    .attr('stroke', 'black')
    .attr('fill', color)
    .attr('fill-opacity', 0.5)
    .attr('x', plot_1_xy.x + 60 + idx*10)
    .attr('y', plot_1_xy.y - scale*sorted_probs[0])
    .attr('width', 10)
    .attr('height', scale*sorted_probs[0]);

  let line_01 = root.append('line')
    .attr('x1', plot_1_xy.x + 10)
    .attr('y1', plot_1_xy.y - scale*sorted_probs[2])
    .attr('x2', plot_1_xy.x + 40)
    .attr('y2', plot_1_xy.y - scale*(sorted_probs[1] + sorted_probs[2]))
    .attr('style', `stroke:${color};stroke-width:1.5`);

  let line_12 = root.append('line')
    .attr('x1', plot_1_xy.x + 40)
    .attr('y1', plot_1_xy.y - scale*(sorted_probs[1] + sorted_probs[2]))
    .attr('x2', plot_1_xy.x + 70)
    .attr('y2', plot_1_xy.y - scale)
    .attr('style', `stroke:${color};stroke-width:1.5`);

  function updatePosition() {
    free_triplet_coords = xy_to_unit_sum_triplet_coords({x: point.x, y: point.y}, scale, offset);
    triplet_coords = project_to_three_outcome_dist(free_triplet_coords.a, free_triplet_coords.b, free_triplet_coords.c);
    permutations = prob_dist_to_permutations(triplet_coords.a, triplet_coords.b, triplet_coords.c);
    constrained_point = triplet_coords_to_xy(triplet_coords.a, triplet_coords.b, triplet_coords.c, scale, offset);
    polygon_points = []
    for (let permutation of permutations) {
      polygon_points.push(triplet_coords_to_xy(permutation[0], permutation[1], permutation[2], scale, offset));
    }
    polygon_points_string = polygon_points.map((p) => `${p.x},${p.y}`).join(' ');
    polygon.attr('points', polygon_points_string);
    circle.attr('transform', `translate(${constrained_point.x}, ${constrained_point.y})`);

    pa_rect.attr('y', plot_0_xy.y - scale*triplet_coords.a)
      .attr('height', scale*triplet_coords.a);
    pb_rect.attr('y', plot_0_xy.y - scale*triplet_coords.b)
      .attr('height', scale*triplet_coords.b);
    pc_rect.attr('y', plot_0_xy.y - scale*triplet_coords.c)
      .attr('height', scale*triplet_coords.c);

    sorted_probs = [triplet_coords.a, triplet_coords.b, triplet_coords.c].sort();
    p0_rect.attr('y', plot_1_xy.y - scale*sorted_probs[2])
      .attr('height', scale*sorted_probs[2]);
    p1_rect.attr('y', plot_1_xy.y - scale*sorted_probs[1])
      .attr('height', scale*sorted_probs[1]);
    p2_rect.attr('y', plot_1_xy.y - scale*sorted_probs[0])
      .attr('height', scale*sorted_probs[0]);
    line_01.attr('y1', plot_1_xy.y - scale*sorted_probs[2])
      .attr('y2', plot_1_xy.y - scale*(sorted_probs[1] + sorted_probs[2]));
    line_12.attr('y1', plot_1_xy.y - scale*(sorted_probs[1] + sorted_probs[2]));
  }

  function onDrag() {
    point.x = d3.event.x
    point.y = d3.event.y
    updatePosition();
  }

  updatePosition();
}

makeDraggableCircle(1/2, 1/3, 1/6, 'red', 0);
makeDraggableCircle(1/5, 3/5, 1/5, 'blue', 1);

d3.select('circle').raise();


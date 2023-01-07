const colors = ['red', 'green', 'blue', 'orange'];

function array_sum(array) {
  return array.reduce((a, b) => a + b);
}

class BarPlot {
  constructor(diagram, bar_box, probabilities) {
    this.diagram = diagram;
    this.bar_box = bar_box;
    this.rect_width = this.bar_box.width / 8;
    this.rectangles = [];
    for (let i = 0; i < 4; i++) {
      this.rectangles.push(
        this.diagram.root.append('rect')
          .attr('width', this.rect_width)
          .attr('height', probabilities[i] * this.bar_box.height)
          .attr('x', this.bar_box.x + (2 * i + 1/2) * this.rect_width)
          .attr('y', this.bar_box.y + (1 - probabilities[i]) * this.bar_box.height)
          .attr('fill', colors[i])
      )
    }
  }

  update(probabilities) {
    for (let i = 0; i < 4; i++) {
      this.rectangles[i].attr('height', probabilities[i] * this.bar_box.height)
        .attr('y', this.bar_box.y + (1 - probabilities[i]) * this.bar_box.height)
    }
  }
}

function triplet_coords_to_xy(a, b, c, triangle_box) {
  return {
    x: triangle_box.width*(b - c + 1)/2 + triangle_box.x,
    y: triangle_box.height*(b + c - 2*a + 2)/3 + triangle_box.y,
  }
}

function xy_to_unit_sum_triplet_coords(point, triangle_box, fourth_coord) {
  let base_point = {
    x: (point.x - triangle_box.x)/triangle_box.width,
    y: (point.y - triangle_box.y)/triangle_box.height,
  };
  a = 1 - base_point.y - fourth_coord/3;
  b = (base_point.y + 2*base_point.x - 1)/2 - fourth_coord/3;
  c = (base_point.y - 2*base_point.x + 1)/2 - fourth_coord/3;
  return [a, b, c];
}

function get_triangle_points(sum, triangle_box) {
  return triangle_points = [
      triplet_coords_to_xy(sum, 0, 0, triangle_box),
      triplet_coords_to_xy(0, sum, 0, triangle_box),
      triplet_coords_to_xy(0, 0, sum, triangle_box),
    ];
}

const tri_shrink = 0.9;

class TwoSimplex {
  constructor(diagram, triangle_box, probabilities, two_simplex_index, color) {
    this.diagram = diagram;
    this.triangle_box = triangle_box;
    this.two_simplex_index = two_simplex_index;
    let triangle_points = get_triangle_points(1, this.triangle_box);
    let points_string = triangle_points.map((p) => `${p.x},${p.y}`).join(' ');
    this.triangle = this.diagram.root.append('polygon')
      .attr('points', points_string)
      .attr('stroke', 'black')
      .attr('fill', 'white');
    let center_point = triplet_coords_to_xy(1/3, 1/3, 1/3, this.triangle_box);
    for (let i = 0; i < 3; i++) {
      this.diagram.root.append('line')
        .attr('x1', center_point.x)
        .attr('y1', center_point.y)
        .attr('x2', triangle_points[i].x)
        .attr('y2', triangle_points[i].y)
        .attr('style', "stroke:gray;stroke-width:1");
    }
    let sub_sum = probabilities[0] + probabilities[1] + probabilities[2];
    let sub_triangle_points = get_triangle_points(sub_sum, this.triangle_box);
    let sub_triangle_points_string = sub_triangle_points.map((p) => `${p.x},${p.y}`).join(' ');
    this.sub_triangle = this.diagram.root.append('polygon')
      .attr('points', sub_triangle_points_string)
      .attr('stroke', 'black')
      .attr('fill', color)
      .attr('fill-opacity', 0.5);
    this.point = triplet_coords_to_xy(
      probabilities[0],
      probabilities[1],
      probabilities[2],
      this.triangle_box,
    );
    this.circle = this.diagram.root.append('circle')
      .attr('r', 6)
      .attr('fill', 'black')
      .attr('cx', this.point.x)
      .attr('cy', this.point.y)
      .call(d3.drag().on('drag', () => onDrag(this.diagram, this.two_simplex_index)));

  }


  update(probabilities) {
    let sub_sum = probabilities[0] + probabilities[1] + probabilities[2];
    let sub_triangle_points = get_triangle_points(sub_sum, this.triangle_box);
    let sub_triangle_points_string = sub_triangle_points.map((p) => `${p.x},${p.y}`).join(' ');
    this.sub_triangle.attr('points', sub_triangle_points_string);
    this.point = triplet_coords_to_xy(
      probabilities[0],
      probabilities[1],
      probabilities[2],
      this.triangle_box,
    )
    this.circle.attr('cx', this.point.x)
      .attr('cy', this.point.y);
  }
}

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

function onDrag(diagram, two_simplex_index) {
  let fixed_prob_index = diagram.three_simplex.fixed_prob_indices[two_simplex_index];
  let fixed_prob = diagram.probabilities[fixed_prob_index];
  let two_simplex_probabilities = xy_to_unit_sum_triplet_coords(
    d3.event,
    diagram.three_simplex.triangles[two_simplex_index].triangle_box,
    fixed_prob,
  );
  two_simplex_probabilities = project_to_three_outcome_dist(
    two_simplex_probabilities[0],
    two_simplex_probabilities[1],
    two_simplex_probabilities[2],
  );
  two_simplex_probabilities = [
    two_simplex_probabilities.a,
    two_simplex_probabilities.b,
    two_simplex_probabilities.c,
  ]
  let three_simplex_probabilities = diagram.probabilities;
  let prob_indices = diagram.three_simplex.prob_indices[two_simplex_index];
  for (let i = 0; i < 3; i++) {
    three_simplex_probabilities[prob_indices[i]] = two_simplex_probabilities[i];
  }
  diagram.update(three_simplex_probabilities);
}

class ThreeSimplex {
  constructor(diagram, triangles_box, probabilities) {
    this.diagram = diagram;
    this.triangles = []
    var triangle_box;
    this.prob_indices = [
      [0, 1, 2],
      [2, 3, 0],
      [3, 1, 2],
      [1, 0, 3],
      [0, 2, 1],
    ];
    this.fixed_prob_indices = [3, 1, 0, 2, 3];
    for (let i = 0; i < 5; i++) {
      if (i == 0) {
        triangle_box = {
          x: triangles_box.x + triangles_box.width/4,
          y: triangles_box.y,
          width: triangles_box.width/2,
          height: triangles_box.height/2,
        }
      }
      else {
        triangle_box = {
          x: triangles_box.x + (i - 1)*triangles_box.width/4,
          y: triangles_box.y + (1 + (1 + Math.pow(-1, i))/2)*triangles_box.height/2,
          width: triangles_box.width/2,
          height: Math.pow(-1, i + 1)*triangles_box.height/2,
        }
      }
      this.triangles.push(
        new TwoSimplex(
          this.diagram,
          triangle_box,
          [
            probabilities[this.prob_indices[i][0]],
            probabilities[this.prob_indices[i][1]],
            probabilities[this.prob_indices[i][2]],
          ],
          i,
          colors[this.fixed_prob_indices[i]],
        )
      );
    }
  }

  update(probabilities) {
    for (let i = 0; i < 5; i++) {
      this.triangles[i].update(
        [
          probabilities[this.prob_indices[i][0]],
          probabilities[this.prob_indices[i][1]],
          probabilities[this.prob_indices[i][2]],
        ]
      )
    }
  }
}

class FourOutcomeDiagram {
  constructor(containerId, bar_box, triangles_box, probabilities) {
    this.root = d3.select(`#${containerId} svg`);
    this.bar_plot = new BarPlot(this, bar_box, probabilities);
    this.three_simplex = new ThreeSimplex(this, triangles_box, probabilities)
    this.probabilities = probabilities;
  }

  update(probabilities) {
    this.probabilities = probabilities;
    this.bar_plot.update(probabilities);
    this.three_simplex.update(probabilities);
  }
}

let diagram = new FourOutcomeDiagram(
  "demo",
  {x: 10, y: 10, width: 200, height: 160},
  {x: 220, y: 10, width: 200, height: 160},
  [4/10, 3/10, 2/10, 1/10],
);

let positionToValue = d3.scaleLinear()
  .clamp(true)
  .domain([-100, +100])
  .range([1, 4]);

let positionToValueN = d3.scaleLinear()
  .clamp(true)
  .domain([-100, +100])
  .range([1, 256]);

function onDragR(parent, diagrams) {
  parent.R = positionToValue(d3.event.x);
  parent.r_text.text(`R = ${parent.R}`);
  parent.points = getPoints(parent.R, parent.x0, parent.N);
  for (let diagram of diagrams) {
    diagram.updateR(parent);
  }
}

function onDragN(parent, diagrams) {
  parent.N = Math.round(positionToValueN(d3.event.x));
  parent.n_text.text(`N = ${parent.N}`);
  parent.points = getPoints(parent.R, parent.x0, parent.N);
  for (let diagram of diagrams) {
    diagram.updateN();
  }
}

function onDragX0(parent, diagram) {
  let x0 = ((d3.event.x) - diagram.x) / diagram.width;
  parent.x0 = Math.max(Math.min(1, x0), 0);
  parent.x0_text.text(`x0 = ${parent.x0}`);
  parent.points = getPoints(parent.R, parent.x0, parent.N);
  for (let d of parent.diagrams) {
    d.updateLines();
  }
}

function logisticUpdate(R, x) {
  return R * x * (1 - x);
}

const line_style = "stroke:#e41a1c;stroke-width:1;stroke-opacity:0.2";


function getPoints(R, x0, N) {
  points = [x0];
  for (let i = 0; i < N; i++) {
    points.push(logisticUpdate(R, points[i]));
  }
  return points;
}

class IntegratedHistogram {
  constructor(parent, x, y, width, height) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    parent.root.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', x)
      .attr('y', y)
      .attr('stroke', "black")
      .attr('fill', 'white');

    this.gLines = parent.root.append('g');

    this.lines = this.makeLines(parent.points);
  }

  updateN() {
    this.gLines.selectAll('line').remove();
    this.lines = this.makeLines(this.parent.points);
  }

  updateR(parent) {
    this.updateLines();
  }

  makeLines(points) {
    let sorted_points = [...points];
    sorted_points.sort(function(a, b){return a - b});
    let num_points = points.length;
    let vertical_height = this.height / num_points;
    let vertical_lines = [];
    let horizontal_lines = [];
    for (let i = 0; i < num_points; i++) {
      let x = this.x + sorted_points[i] * this.width;
      vertical_lines.push(
        this.gLines.append('line')
          .attr('x1', x)
          .attr('x2', x)
          .attr('y1', this.y + this.height - i * vertical_height)
          .attr('y2', this.y + this.height - (i + 1) * vertical_height)
          .attr('style', "stroke:#e41a1c;stroke-width:1;")
      );
    }
    for (let i = 1; i < num_points; i++) {
      let y = this.y + this.height - i * vertical_height;
      horizontal_lines.push(
        this.gLines.append('line')
          .attr('x1', this.x + sorted_points[i - 1] * this.width)
          .attr('x2', this.x + sorted_points[i] * this.width)
          .attr('y1', y)
          .attr('y2', y)
          .attr('style', "stroke:#e41a1c;stroke-width:1;")
      );
    }
    return {'vertical': vertical_lines, 'horizontal': horizontal_lines};
  }

  updateLines() {
    let sorted_points = [...this.parent.points];
    sorted_points.sort(function(a, b){return a - b});
    let num_points = sorted_points.length;
    let vertical_height = this.height / num_points;
    for (let i = 0; i < num_points; i++) {
      let x = this.x + sorted_points[i] * this.width;
      this.lines.vertical[i]
        .attr('x1', x)
        .attr('x2', x);
    }
    for (let i = 1; i < num_points; i++) {
      this.lines.horizontal[i - 1]
        .attr('x1', this.x + sorted_points[i - 1] * this.width)
        .attr('x2', this.x + sorted_points[i] * this.width);
    }
  }
}

class DoubleParabola {
  constructor(parent, x, y, width, height, R, x0, N, dot_radius) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    parent.root.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', x)
      .attr('y', y)
      .attr('stroke', "black")
      .attr('fill', 'white');

    this.parabola_v = parent.root.append('path')
      .attr('d', `M${x},${y + height} q${width / 2},-${R * height / 2} ${width},0`)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    this.parabola_h = parent.root.append('path')
      .attr('d', `M${x},${y} q${R * this.width / 2},${height / 2} 0,${height}`)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    this.initial_dot = parent.root.append('circle')
      .attr('r', dot_radius)
      .attr('fill', '#e41a1c')
      .attr('cx', this.x + x0 * this.width)
      .attr('cy', this.y + this.height)
      .call(d3.drag().on('drag', () => onDragX0(parent, this)));

    this.gLines = parent.root.append('g');

    this.lines = this.makeLines(parent.points);
  }

  updateN() {
    this.gLines.selectAll('line').remove();
    this.lines = this.makeLines(this.parent.points);
  }

  updateR(parent) {
    this.parabola_v.attr('d', `M${this.x},${this.y + this.height} q${this.width / 2},-${parent.R * this.height / 2} ${this.width},0`);
    this.parabola_h.attr('d', `M${this.x},${this.y} q${parent.R * this.width / 2},${this.height / 2} 0,${this.height}`);
    this.updateLines();
  }

  updateLines() {
    let ps = [0].concat(this.parent.points);
    let x = this.width * this.parent.x0 + this.x;
    this.initial_dot.attr('cx', x);
    let vertical = true;
    for (let i = 2; i < ps.length; i++) {
      this.updateLine(this.lines[i - 2], ps[i - 2], ps[i - 1], ps[i], vertical);
      vertical = !vertical;
    }
  }

  updateLine(line, x1, x2, x3, vertical) {
    if (vertical) {
      line.attr('x1', this.x + x2 * this.width)
        .attr('x2', this.x + x2 * this.width)
        .attr('y1', this.y + (1 - x1) * this.height)
        .attr('y2', this.y + (1 - x3) * this.height);
    }
    else {
      line.attr('x1', this.x + x1 * this.width)
        .attr('x2', this.x + x3 * this.width)
        .attr('y1', this.y + (1 - x2) * this.height)
        .attr('y2', this.y + (1 - x2) * this.height)
    }
  }

  newLine(x1, x2, x3, vertical) {
    var line;
    if (vertical) {
      line = this.gLines.append('line')
        .attr('x1', this.x + x2 * this.width)
        .attr('x2', this.x + x2 * this.width)
        .attr('y1', this.y + (1 - x1) * this.height)
        .attr('y2', this.y + (1 - x3) * this.height)
        .attr('style', line_style);
    }
    else {
      line = this.gLines.append('line')
        .attr('x1', this.x + x1 * this.width)
        .attr('x2', this.x + x3 * this.width)
        .attr('y1', this.y + (1 - x2) * this.height)
        .attr('y2', this.y + (1 - x2) * this.height)
        .attr('style', line_style);
    }
    return line;
  }

  makeLines(points) {
    let ps = [0].concat(points);
    let lines = [];
    let vertical = true;
    for (let i = 2; i < ps.length; i++) {
      lines.push(this.newLine(ps[i - 2], ps[i - 1], ps[i], vertical));
      vertical = !vertical;
    }
    return lines;
  }
}


class CobwebDiagram {
  constructor(parent, x, y, width, height, R, x0, N, dot_radius) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    parent.root.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', x)
      .attr('y', y)
      .attr('stroke', "black")
      .attr('fill', 'white');

    this.parabola_v = parent.root.append('path')
      .attr('d', `M${x},${y + height} q${width / 2},-${R * height / 2} ${width},0`)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    this.diag_line = parent.root.append('line')
      .attr('x1', x)
      .attr('x2', x + width)
      .attr('y1', y + height)
      .attr('y2', y)
      .attr('stroke', 'black');

    this.initial_dot = parent.root.append('circle')
      .attr('r', dot_radius)
      .attr('fill', '#e41a1c')
      .attr('cx', this.x + x0 * this.width)
      .attr('cy', this.y + this.height)
      .call(d3.drag().on('drag', () => onDragX0(parent, this)));

    this.gLines = parent.root.append('g');


    this.lines = this.makeLines(parent.points);
  }

  updateR(parent) {
    this.parabola_v.attr('d', `M${this.x},${this.y + this.height} q${this.width / 2},-${parent.R * this.height / 2} ${this.width},0`);
    this.updateLines();
  }

  updateN() {
    this.gLines.selectAll('line').remove();
    this.lines = this.makeLines(this.parent.points);
  }

  updateLines() {
    let ps = this.parent.points;
    let x = this.width * this.parent.x0 + this.x;
    this.initial_dot.attr('cx', x);
    this.updateLine(this.lines[0], 0, ps[0], ps[1], true);
    for (let i = 2; i < ps.length; i++) {
      this.updateLine(this.lines[2 * i - 3], ps[i - 2], ps[i - 1], ps[i - 1], false);
      this.updateLine(this.lines[2 * i - 2], ps[i - 1], ps[i - 1], ps[i], true);
    }
  }

  updateLine(line, x1, x2, x3, vertical) {
    if (vertical) {
      line.attr('x1', this.x + x2 * this.width)
        .attr('x2', this.x + x2 * this.width)
        .attr('y1', this.y + (1 - x1) * this.height)
        .attr('y2', this.y + (1 - x3) * this.height);
    }
    else {
      line.attr('x1', this.x + x1 * this.width)
        .attr('x2', this.x + x3 * this.width)
        .attr('y1', this.y + (1 - x2) * this.height)
        .attr('y2', this.y + (1 - x2) * this.height)
    }
  }

  newLine(x1, x2, x3, vertical) {
    var line;
    if (vertical) {
      line = this.gLines.append('line')
        .attr('x1', this.x + x2 * this.width)
        .attr('x2', this.x + x2 * this.width)
        .attr('y1', this.y + (1 - x1) * this.height)
        .attr('y2', this.y + (1 - x3) * this.height)
        .attr('style', line_style);
    }
    else {
      line = this.gLines.append('line')
        .attr('x1', this.x + x1 * this.width)
        .attr('x2', this.x + x3 * this.width)
        .attr('y1', this.y + (1 - x2) * this.height)
        .attr('y2', this.y + (1 - x2) * this.height)
        .attr('style', line_style);
    }
    return line;
  }

  makeLines(points) {
    let lines = [this.newLine(0, points[0], points[1], true)];
    for (let i = 2; i < points.length; i++) {
      lines.push(this.newLine(points[i - 2], points[i - 1], points[i - 1], false));
      lines.push(this.newLine(points[i - 1], points[i - 1], points[i], true));
    }
    return lines;
  }
}

const box_size = 128;

class LogisticExplorable {
  constructor(containerId) {
    this.root = d3.select(`#${containerId} svg`);
    this.R = 1;
    this.x0 = 0.4;
    this.N = 32;
    this.points = getPoints(this.R, this.x0, this.N);

    this.double_parabola = new DoubleParabola(
      this, 12, 12, box_size, box_size, this.R, this.x0, this.N, 6,
    );
    this.cobweb = new CobwebDiagram(
      this, 24 + box_size, 12, box_size, box_size, this.R, this.x0, this.N, 6,
    );
    this.hist = new IntegratedHistogram(
      this, 36 + 2 * box_size, 12, box_size, box_size,
    )
    this.diagrams = [this.double_parabola, this.cobweb, this.hist];

    this.r_text = this.root.append('text')
      .attr('x', 32)
      .attr('y', 40 + box_size)
      .text(`R = ${this.R}`)
      .call(
        d3.drag()
          .subject(() => ({x: positionToValue.invert(this.R), y: 0}))
          .on('drag', () => onDragR(this, this.diagrams))
      );
    this.x0_text = this.root.append('text')
      .attr('x', 32)
      .attr('y', 60 + box_size)
      .text(`x0 = ${this.x0}`)
    this.n_text = this.root.append('text')
      .attr('x', 32)
      .attr('y', 80 + box_size)
      .text(`N = ${this.N}`)
      .call(
        d3.drag()
          .subject(() => ({x: positionToValueN.invert(this.N), y: 0}))
          .on('drag', () => onDragN(this, this.diagrams))
      );
  }
}
let diagram = new LogisticExplorable('demo');




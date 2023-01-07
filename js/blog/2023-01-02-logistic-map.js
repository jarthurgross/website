const width = 394;
const height = 394;
const padding = 6;

let positionToValue = d3.scaleLinear()
  .clamp(true)
  .domain([-100, +100])
  .range([1, 4]);

function onDragR(diagram) {
  diagram.R = positionToValue(d3.event.x);
  diagram.r_text.text(`R = ${diagram.R}`);
  diagram.parabola_v.attr('d', `M${padding},${height / 2 + padding} q${height / 4},-${diagram.R * height / 4} ${height / 2},0`);
  diagram.parabola_h.attr('d', `M${padding},${padding} q${diagram.R * width / 4},${width / 4} 0,${width / 2}`);
  diagram.points = getPoints(diagram.R, diagram.x0, diagram.N);
  updateLines(diagram);
}

function onDragX0(diagram) {
  let x0 = ((d3.event.x) - padding) / (width / 2);
  diagram.x0 = Math.max(Math.min(1, x0), 0);
  let x = (width / 2) * diagram.x0 + padding;
  diagram.initial_dot.attr('cx', x);
  diagram.points = getPoints(diagram.R, diagram.x0, diagram.N);
  updateLines(diagram);
}

function logisticUpdate(R, x) {
  return R * x * (1 - x);
}

function updateLine(line, x1, x2, x3, vertical) {
  if (vertical) {
    line.attr('x1', padding + x2 * width / 2)
      .attr('x2', padding + x2 * width / 2)
      .attr('y1', padding + (1 - x1) * height / 2)
      .attr('y2', padding + (1 - x3) * height / 2);
  }
  else {
    line.attr('x1', padding + x1 * width / 2)
      .attr('x2', padding + x3 * width / 2)
      .attr('y1', padding + (1 - x2) * height / 2)
      .attr('y2', padding + (1 - x2) * height / 2)
  }
}

function updateLines(diagram) {
  ps = [0].concat(diagram.points);
  let vertical = true;
  for (let i = 2; i < ps.length; i++) {
    updateLine(diagram.lines[i - 2], ps[i - 2], ps[i - 1], ps[i], vertical);
    vertical = !vertical;
  }
}

const line_style = "stroke:#e41a1c;stroke-width:1;stroke-opacity:0.2";

function newLine(diagram, x1, x2, x3, vertical) {
  var line;
  if (vertical) {
    line = diagram.gLines.append('line')
      .attr('x1', padding + x2 * width / 2)
      .attr('x2', padding + x2 * width / 2)
      .attr('y1', padding + (1 - x1) * height / 2)
      .attr('y2', padding + (1 - x3) * height / 2)
      .attr('style', line_style);
  }
  else {
    line = diagram.gLines.append('line')
      .attr('x1', padding + x1 * width / 2)
      .attr('x2', padding + x3 * width / 2)
      .attr('y1', padding + (1 - x2) * height / 2)
      .attr('y2', padding + (1 - x2) * height / 2)
      .attr('style', line_style);
  }
  return line;
}

function makeLines(diagram, points) {
  ps = [0].concat(points);
  let lines = [];
  let vertical = true;
  for (let i = 2; i < ps.length; i++) {
    lines.push(newLine(diagram, ps[i - 2], ps[i - 1], ps[i], vertical));
    vertical = !vertical;
  }
  return lines;
}

function getPoints(R, x0, N) {
  points = [x0];
  for (let i = 0; i < N; i++) {
    points.push(logisticUpdate(R, points[i]));
  }
  return points;
}



class CobwebDiagram {
  constructor(containerId) {
    this.root = d3.select(`#${containerId} svg`);
    this.root.append('rect')
      .attr('width', width / 2)
      .attr('height', height / 2)
      .attr('transform', `translate(${padding}, ${padding})`)
      .attr('stroke', "black")
      .attr('fill', 'white');

    this.R = 1;

    this.parabola_v = this.root.append('path')
      .attr('d', `M${padding},${height / 2 + padding} q${width / 4},-${this.R * height / 4} ${height / 2},0`)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 0.5);

    this.parabola_h = this.root.append('path')
      .attr('d', `M${padding},${padding} q${this.R * width / 4},${width / 4} 0,${width / 2}`)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 0.5);

    this.r_text = this.root.append('text')
      .attr('x', width / 2 + 4 * padding)
      .attr('y', height / 2)
      .text(`R = ${this.R}`)
      .call(
        d3.drag()
          .subject(() => ({x: positionToValue.invert(this.R), y: 0}))
          .on('drag', () => onDragR(this))
      );

    this.x0 = 0.4;
    this.initial_dot = this.root.append('circle')
      .attr('r', padding)
      .attr('fill', '#e41a1c')
      .attr('cx', padding + this.x0 * width / 2)
      .attr('cy', padding + height / 2)
      .call(d3.drag().on('drag', () => onDragX0(this)));

    this.gLines = this.root.append('g');

    this.N = 64;

    this.points = getPoints(this.R, this.x0, this.N);
    this.lines = makeLines(this, this.points);
  }
}

let diagram = new CobwebDiagram('demo');



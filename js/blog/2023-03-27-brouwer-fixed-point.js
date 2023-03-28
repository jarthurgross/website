// const width = 512;
// const height = 512;

function onDragInput(parent, diagram) {
  let x0 = ((d3.event.x) - diagram.x) / diagram.width;
  let y0 = 1 - ((d3.event.y) - diagram.y) / diagram.height;
  parent.dot_x = Math.max(Math.min(1, x0), 0);
  parent.dot_y = Math.max(Math.min(1, y0), 0);
  for (let d of parent.diagrams) {
   d.updateDot();
  }
}

const line_style = "stroke:#e41a1c;stroke-width:1;stroke-opacity:0.2";

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

class OutputBox {
  constructor(parent, x, y, width, height, dot_x0, dot_y0, dot_radius, endo) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.input_x = dot_x0;
    this.input_y = dot_y0;
    this.endo = endo;
    let output = endo(dot_x0, dot_y0);
    this.dot_x = output.x;
    this.dot_y = output.y;

    parent.root.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', x)
      .attr('y', y)
      .attr('stroke', "black")
      .attr('fill', 'white');

    this.input_dot = parent.root.append('circle')
      .attr('r', dot_radius)
      .attr('fill', '#e41a1c')
      .attr('cx', this.x + dot_x0 * this.width)
      .attr('cy', this.y + (1 - dot_y0) * this.height)
    this.output_dot = parent.root.append('circle')
      .attr('r', dot_radius)
      .attr('fill', 'blue')
      .attr('cx', this.x + output.x * this.width)
      .attr('cy', this.y + (1 - output.y) * this.height)
  }

  updateDot() {
    let x = this.width * this.parent.dot_x + this.x;
    let y = this.height * (1 - this.parent.dot_y) + this.y;
    this.input_dot.attr('cx', x);
    this.input_dot.attr('cy', y);
    let output = this.endo(this.parent.dot_x, this.parent.dot_y);
    let out_x = this.width * output.x + this.x;
    let out_y = this.height * (1 - output.y) + this.y;
    this.output_dot.attr('cx', out_x);
    this.output_dot.attr('cy', out_y);
  }
}

class InputBox {
  constructor(parent, x, y, width, height, dot_x0, dot_y0, dot_radius) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.dot_x = dot_x0;
    this.dot_y = dot_y0;

    parent.root.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('x', x)
      .attr('y', y)
      .attr('stroke', "black")
      .attr('fill', 'white');

    this.initial_dot = parent.root.append('circle')
      .attr('r', dot_radius)
      .attr('fill', '#e41a1c')
      .attr('cx', this.x + dot_x0 * this.width)
      .attr('cy', this.y + (1 - dot_y0) * this.height)
      .call(d3.drag().on('drag', () => onDragInput(parent, this)));
  }

  updateDot() {
    let x = this.width * this.parent.dot_x + this.x;
    let y = this.height * (1 - this.parent.dot_y) + this.y;
    this.initial_dot.attr('cx', x);
    this.initial_dot.attr('cy', y);
  }
}

class BrouwerExplorable {
  constructor(containerId, endo) {
    this.root = d3.select(`#${containerId} svg`);
    this.dot_x = 0.4;
    this.dot_y = 0.3;

    this.input_box = new InputBox(
      this, 12, 12, 200, 200, this.dot_x, this.dot_y, 6,
    );
    this.output_box = new OutputBox(
      this, 224, 12, 200, 200, this.dot_x, this.dot_y, 6, endo,
    );
    this.diagrams = [this.input_box, this.output_box];
  }
}
let diagram1 = new BrouwerExplorable('demo1', invert_endo);
let diagram2 = new BrouwerExplorable('demo2', endo_22);
let diagram3 = new BrouwerExplorable('demo3', diamond_endo);
let diagram4 = new BrouwerExplorable('demo4', diamond_endo_23);


function FunctionGrapher(name = '', width = 400, height = 100)
{
  let graph_container = document.querySelector('.function_grapher_container');
  if (graph_container === null)
  {
    graph_container = document.createElement('div');
    graph_container.classList.add('function_grapher_container');
    graph_container.style.display = 'flex';
    graph_container.style['flex-direction'] = 'column';
    graph_container.style['z-index'] = 999;
    graph_container.style['pointer-events'] = 'none';
    graph_container.style.height = '100%';
    graph_container.style['flex-wrap'] = 'wrap';
    document.body.appendChild(graph_container);
  }

  let label = document.createElement('div');
  label.textContent = name;
  label.style.color = '#000000';
  label.style.marginLeft = '5px';
  label.style.marginTop = '5px';
  graph_container.appendChild(label);

  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  canvas.style.width  = width + 'px';
  canvas.style.height = height + 'px';
  canvas.style.margin = '5px';
  canvas.style.marginTop = '2px';

  graph_container.appendChild(canvas);

  this.ctx = canvas.getContext('2d');

  this.live_data_array = [];
  for (let i = 0; i < width; i++)
  {
    this.live_data_array.push(0);
  }
}

FunctionGrapher.prototype.lerp = function(a, b, t)
{
  return (1 - t) * a + b * t;
};
FunctionGrapher.prototype.draw = function(func, min_x = 0, max_x = 1, graph_height = 1, color = '#FF0000', thick = 1)
{
  let ctx = this.ctx;
  let canvas_length = ctx.canvas.width;

  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  this.showAxes();

  ctx.beginPath();
  ctx.lineWidth = thick;
  ctx.strokeStyle = color;

  for (var i = 0; i < canvas_length; i++)
  {
    let result = func(this.lerp(min_x, max_x, i / canvas_length)) / graph_height;

    let y = ctx.canvas.height - result * (ctx.canvas.height - thick);

    if (i === 0)
    {
      ctx.moveTo(i, y);
    }
    else
    {
      ctx.lineTo(i, y);
    }
  }

  ctx.stroke();
};

FunctionGrapher.prototype.draw_array = function(array, graph_height = 1, baseline = 0, centered_origin = false, color = '#FF0000', thick = 1)
{
  let ctx = this.ctx;
  let canvas_length = ctx.canvas.width;

  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.beginPath();
  ctx.lineWidth = thick;
  ctx.strokeStyle = color;

  let use_center = centered_origin === true ? 0.5 : 1;

  for (let i = 0; i < canvas_length; i++)
  {
    let array_i = Math.floor((i / canvas_length) * array.length);
    let result = (array[array_i] - baseline) / graph_height;

    let y = ctx.canvas.height * use_center - result * (ctx.canvas.height * use_center - thick);

    if (i === 0)
    {
      ctx.moveTo(i, y);
    }
    else
    {
      ctx.lineTo(i, y);
    }
  }

  ctx.stroke();

  if (centered_origin)
  {
    this.draw_min_max_labels(graph_height);
  }
  else
  {
    this.draw_max_label(graph_height);
  }
};

FunctionGrapher.prototype.draw_live_array = function(value, graph_height = 1, baseline = 0, centered_origin = false, color = '#FF0000', thick = 1)
{
  this.live_data_array.push(value);
  this.live_data_array.shift();
  this.draw_array(this.live_data_array, graph_height, baseline, centered_origin, color, thick);
  if (centered_origin)
  {
    this.draw_min_max_labels(graph_height);
  }
  else
  {
    this.draw_max_label(graph_height);
  }
};

FunctionGrapher.prototype.draw_dynamic_live_array = function(value, baseline = 0, centered_origin = false, color = '#FF0000', thick = 1)
{
  this.live_data_array.push(value);
  this.live_data_array.shift();

  let max_value = 1;
  for (let i = 0; i < this.live_data_array.length; i++)
  {
    if (Math.abs(this.live_data_array[i]) > max_value)
    {
      max_value = Math.abs(this.live_data_array[i]);
    }
  }

  this.draw_array(this.live_data_array, max_value, baseline, centered_origin, color, thick);

  if (centered_origin)
  {
    this.draw_min_max_labels(max_value);
  }
  else
  {
    this.draw_max_label(max_value);
  }
};
FunctionGrapher.prototype.draw_min_max_labels = function(value)
{
  this.ctx.font = '20px Arial';
  this.ctx.fillStyle  = '#ffff00';
  this.ctx.textBaseline = 'alphabetic';
  this.ctx.fillText('-' + value.toFixed(1), 5, this.ctx.canvas.height - 8);
  this.ctx.textBaseline = 'hanging';
  this.ctx.fillText(value.toFixed(1), 5, 8);

  // Center line
  this.ctx.beginPath();
  this.ctx.lineWidth = 1;
  this.ctx.strokeStyle = '#FFFF00';
  this.ctx.moveTo(0, this.ctx.canvas.height / 2);
  this.ctx.lineTo(this.ctx.canvas.width , this.ctx.canvas.height / 2);
  this.ctx.stroke();
};
FunctionGrapher.prototype.draw_max_label = function(value)
{
  this.ctx.font = '20px Arial';
  this.ctx.fillStyle  = '#ffff00';
  this.ctx.textBaseline = 'hanging';
  this.ctx.fillText(value.toFixed(1), 5, 8);
};

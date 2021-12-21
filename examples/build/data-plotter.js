class DataPlotter
{
  constructor({ name = '', container_class = undefined, width = 400, height = 100 })
  {
    let graph_container = document.querySelector(`.${container_class}`);

    if (!graph_container)
    {
      graph_container = document.createElement('div');
      graph_container.classList.add('data-plotter');
      graph_container.style.display = 'flex';

      graph_container.style['flex-direction'] = 'column';
      graph_container.style['z-index'] = 999;
      graph_container.style['pointer-events'] = 'none';
      graph_container.style['flex-wrap'] = 'wrap';

      graph_container.style.width = 'fit-content';
      graph_container.style.position = 'relative';

      document.body.appendChild(graph_container);
    }

    const name_label = document.createElement('div');
    name_label.textContent = name;
    name_label.style.color = '#000000';
    name_label.style.marginLeft = '5px';
    name_label.style.marginTop = '5px';
    name_label.style.fontFamily = 'Arial';
    graph_container.appendChild(name_label);

    const canvas = document.createElement('canvas');
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    canvas.style.width  = width + 'px';
    canvas.style.height = height + 'px';
    canvas.style.margin = '5px';
    canvas.style.marginTop = '2px';
    graph_container.appendChild(canvas);

    this.raw_data_label = document.createElement('div');
    this.raw_data_label.style.position = 'absolute';
    this.raw_data_label.style.bottom = '6px';
    this.raw_data_label.style.right = '10px';
    this.raw_data_label.style['font-family'] = 'Arial';
    this.raw_data_label.style['font-size'] = '12px';
    graph_container.appendChild(this.raw_data_label);

    this.ctx = canvas.getContext('2d');

    this.live_data_array = [];

    for (let i = 0; i < width; i++)
    {
      this.live_data_array.push(0);
    }
  }

  draw_function(func, min_x = 0, max_x = 1, graph_height = 1, color = '#FF0000', thick = 1)
  {
    let ctx = this.ctx;
    let canvas_length = ctx.canvas.width;

    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.showAxes();

    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (let i = 0; i < canvas_length; i++)
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
  }

  draw_array(array, graph_height = 1, baseline = 0, centered_origin = false, color = '#70b9fc', thick = 1)
  {
    let ctx = this.ctx;
    let canvas_length = ctx.canvas.width;

    ctx.fillStyle = '#f2f2f2';
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
  }

  draw_static_live_array(value, graph_height = 1, baseline = 0, centered_origin = false, color = '#70b9fc', thick = 1)
  {
    this.raw_data_label.textContent = value.toFixed(2);

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
  }

  draw_dynamic_live_array(value, baseline = 0, centered_origin = false, color = '#70b9fc', thick = 1)
  {
    this.raw_data_label.textContent = value.toFixed(2);

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
  }

  draw_min_max_labels(value)
  {
    const top_bottom_padding = 12;
    const left_right_padding = 10;

    this.ctx.font = '20px Arial';
    this.ctx.fillStyle  = '#000000';
    this.ctx.textBaseline = 'alphabetic';
    this.ctx.fillText('-' + value.toFixed(1), left_right_padding, this.ctx.canvas.height - top_bottom_padding);
    this.ctx.textBaseline = 'hanging';
    this.ctx.fillText(value.toFixed(1), left_right_padding, top_bottom_padding);

    // Center line
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#BBBBBB';
    this.ctx.moveTo(0, this.ctx.canvas.height / 2);
    this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height / 2);
    this.ctx.stroke();
  }

  draw_max_label(value)
  {
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle  = '#000000';
    this.ctx.textBaseline = 'hanging';
    this.ctx.fillText(value.toFixed(1), 5, 8);
  }

  lerp(a, b, t)
  {
    return (1 - t) * a + b * t;
  }
}

export { DataPlotter };
//# sourceMappingURL=data-plotter.js.map

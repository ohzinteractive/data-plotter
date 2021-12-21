# OHZI Data Plotter

Data Plotter is a tiny javascript library that allows you to draw live data in a 2D graph.


### Dependencies

Data Plotter has no external dependencies

### Installation

```sh
$ npm install data-plotter --save
```


### Usage

```javascript
import { DataPlotter } from 'data-plotter';

class AwesomeGraph
{
  constructor()
  {
    this.graph = new DataPlotter({ name:'Graph of Sine function' });
  }

  update(sample)
  {
    this.graph.draw_dynamic_live_array(sample, 0, true, '#70b9fc');
  }
}

class RenderLoop
{
  start()
  {
    this.awesome_graph = new AwesomeGraph();
    this.t = 0;

    this.update();
  }

  update()
  {
    this.awesome_graph.update(Math.sin(this.t));

    this.t += 0.016;

    requestAnimationFrame(this.update.bind(this));
  }
}

new RenderLoop().start();
```

### API

- `draw_function(func: any, min_x?: number, max_x?: number, graph_height?: number, color?: string, thick?: number): void;`

- `draw_array(array: any, graph_height?: number, baseline?: number, centered_origin?: boolean, color?: string, thick?: number): void;`

- `draw_static_live_array(value: any, graph_height?: number, baseline?: number, centered_origin?: boolean, color?: string, thick?: number): void;`

- `draw_dynamic_live_array(value: any, baseline?: number, centered_origin?: boolean, color?: string, thick?: number): void;`


### Running the examples
You can check out the examples folder, all you need to do is set up an http server for it to work, using something like `http-server` package.

```sh
npm install -g http-server
cd examples
http-server -p 1234
```
This will mount an http server on the examples folder on port 1234

License
----

MIT

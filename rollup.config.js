import sourcemaps from 'rollup-plugin-sourcemaps';

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: 'examples/build/data-plotter.js',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      sourcemaps()
    ]
  }
];

import sourceMap from 'rollup-plugin-sourcemaps';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import { uglify } from 'rollup-plugin-uglify';

import pkg  from './package.json';

export default {
  input: 'lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    sourceMap(),
    // uglify(),
    // nodeResolve(),
    // commonjs(),
  ],
};
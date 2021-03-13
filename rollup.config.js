import sourceMap from 'rollup-plugin-sourcemaps';
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";

import pkg  from './package.json';

export default {
	input: 'lib/index.js',
	output: [
    {
      file: pkg.rollupBuild,
      format: "cjs",
      sourcemap: true
    },
    // {
    //   file: pkg.module,
    //   format: "es",
    //   sourcemap: true
    // }
  ],
	plugins: [
		sourceMap(),
		external(),
    resolve(),
    commonjs()
	]
}
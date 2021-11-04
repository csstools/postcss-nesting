import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/index.js',
	output: [
		{ file: 'dist/index.js', format: 'cjs', sourcemap: true, exports: 'default' },
		{ file: 'dist/index.mjs', format: 'esm', sourcemap: true, exports: 'default' }
	],
	plugins: [
		commonjs(),
		nodeResolve({
			resolveOnly: ['postcss-selector-parser']
		}),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			presets: [
				['@babel/preset-env', {
					corejs: 3,
					loose: true,
					modules: false,
					targets: { node: 12 },
					useBuiltIns: 'usage'
				}]
			]
		}),
	]
}

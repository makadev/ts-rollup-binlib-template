import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = ['fs', 'path'];

export default [
  // Library Part
  {
    input: './src/index.ts',
    external,
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        babelHelpers: 'bundled',
        include: ['src/**/*'],
      }),
    ],

    output: [
      // ECMAScript Module + SourceMaps (Node.js)
      {
        file: 'dist/lib/lib.esm.js',
        format: 'es',
        sourcemap: true,
      },
    ],
  },

  // CLI
  {
    input: './cli/main.ts',
    external,
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        babelHelpers: 'bundled',
        include: ['cli/**/*', 'src/**/*'],
      }),
    ],

    output: [
      /* only works when module is called *.mjs, otherwise will output:
         Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
      {
        banner: '#!/usr/bin/env node',
        file: 'dist/bin/bin.mjs',
        format: 'es',
      },
      */
      {
        banner: '#!/usr/bin/env node',
        file: 'dist/bin/bin.cjs.js',
        format: 'cjs',
        exports: 'default',
      },
    ],
  },
];

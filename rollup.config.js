import typescript from '@rollup/plugin-typescript';

const external = ['fs', 'path'];

export default [
  // ES5 CommonJS Library Part
  {
    input: './src/index.ts',
    external,
    plugins: [
      typescript({
        declaration: false,
        exclude: ['cli/**', 'tests/**'],
        rootDir: 'src/',
        outDir: 'dist/cjs',
        target: 'es5',
      }),
    ],

    output: [
      // ECMAScript Module + SourceMaps (Node.js)
      {
        dir: 'dist/cjs',
        format: 'cjs',
        sourcemap: true,
      },
    ],
  },

  // ES2015 ESM Library Part
  {
    input: './src/index.ts',
    external,
    plugins: [
      typescript({
        declaration: false,
        exclude: ['cli/**', 'tests/**'],
        rootDir: 'src/',
        outDir: 'dist/esm',
        target: 'es2015',
      }),
    ],

    output: [
      // ECMAScript Modules + SourceMaps (Node.js)
      {
        format: 'esm',
        sourcemap: true,
        dir: 'dist/esm',
      },
    ],
  },

  // CLI (ES5 CommonJS)
  {
    input: './cli/main.ts',
    external,
    plugins: [
      typescript({
        declaration: false,
        exclude: ['tests/**'],
        rootDirs: ['src/', 'cli/'],
        outDir: 'dist/cli',
        target: 'es5',
      }),
    ],

    output: [
      {
        banner: '#!/usr/bin/env node',
        file: 'dist/bin/bin.js',
        format: 'cjs',
        exports: 'default',
      },
    ],
  },
];

# ts-rollup-binlib

This is a Binary/Library Template preconfigured with:
* rollup (as bundler)
* typescript (TypeScript part)
* babel (eslint / cjs/esm transformation)
* eslint (for linting)
* prettier (for source code formatting)
* jest (for testing / coverage)

The input is:
* a cli main and option handling lib `cli/`
* library files under `lib/*.ts`
* a library bottle file `lib/index.ts`

The output will be
* the cli program `dist/bin/bin.cjs.js`
* the esm library `dist/lib/lib.esm.js`
* the ts type definitions `types/*.d.ts`

# ts-rollup-binlib-template

## What's this?

#### This is a Binary/Library Template preconfigured with:
* [rollup](https://rollupjs.org) (as bundler or build tool)
* [typescript](https://www.typescriptlang.org) (for typed codebase, type extraction and type checking)
* [babel](https://babel.dev) (for eslint and cjs,esm transformation)
* [eslint](https://eslint.org) (for linting/formatting checks)
* [prettier](https://prettier.io) (for source code formatting)
* [jest](https://jestjs.io) (for testing / coverage)

#### The input is:
* a small cli main and option handling library under `cli/*.ts`
* library files under `lib/*.ts`
* a library bottle file `lib/index.ts`

#### The output will be:
* the cli program `dist/bin/bin.cjs.js`
* the esm library `dist/lib/lib.esm.js` and external source map `dist/lib/lib.esm.js.map`
* the ts type definitions `types/*.d.ts`

#### Additional notes:
* `package.json` contains a `prepare` command such that the resulting npm package can be installed via git/github instead of npm (useful for private packages)
* package is not using any minifier/terser

## Usage Checklist

1. change `package.json` fields
   * `name`
   * `version`
   * `description`
   * `author`
   * `license`
   * If you want to create a cli program, change the key `resulting-binary-name` to whatever binary name you want. Otherwise, you can just remove the `bin` section.
2. run `npm install` (after `package.json` modifications), you may want to add the generated `package-lock.json` to your repository
3. check operations:
    * `npm run prepare` should create `dist/`
    * `npm run test` should complete without errors
    * `npm run test:coverage` should complete without errors and create `coverage/`
    
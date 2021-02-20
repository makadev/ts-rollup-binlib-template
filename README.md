# Binary/Library Template with TypeScript and Rollup

## What's this?

#### This is a Binary/Library Template preconfigured with:

* [rollup](https://rollupjs.org) (as bundler or build tool)
* [typescript](https://www.typescriptlang.org) (for typed codebase, type extraction and type checking, cjs/esm
  transformation)
* [eslint](https://eslint.org) (for linting/formatting checks)
* [prettier](https://prettier.io) (for source code formatting)
* [jest](https://jestjs.io) (for testing / coverage)
* [babel](https://babel.dev) (for jest)

#### The input is:

* a small cli main and option handling library under `cli/*.ts`
* library files under `lib/*.ts`
* a library bottle file `lib/index.ts`

#### The output will be:

* the cli program `dist/bin.js`
* the cjs library `dist/cjs/index.js` and external source map `dist/cjs/index.js.map`
* the esm library `dist/esm/index.js` and external source map `dist/esm/index.js.map`
* the ts type definitions `types/*.d.ts`

#### Docker Bundler:

* use `.docker/build/bundler.sh` to configure and startup a nodejs bundler container with a clean environment for
  development, checkout respective configuration, Dockerfile and scripts

#### Additional notes:

* `package.json` contains a `_prepare` command which can be renamed to `prepare` such that the resulting npm package can
  be installed via git/github instead of npm (useful for private packages)
* package is not using any minifier/terser

## Usage Checklist

1. change `package.json` fields
    * `name`
    * `version`
    * `description`
    * `author`
    * `license`
    * If you want to create a cli program, change the key `resulting-binary-name` to whatever binary name you want.
      Otherwise, you can just remove the `bin` section.
2. run `npm install` (after `package.json` modifications), you may want to add the generated `package-lock.json` to your
   repository
3. check operations:
    * `npm run build` should create `dist/`
    * `npm run test` should complete without errors
    * `npm run test:coverage` should complete without errors and create `coverage/`
4. rename `_prepare` script in `package.json` to `prepare`, this will automatically trigger a build on install which is
   especially useful when installing directly from a git repository or file system bundle
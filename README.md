# Binary/Library Template with TypeScript and Rollup

## What's this?

#### This is a Binary/Library Template preconfigured with:

* [rollup](https://rollupjs.org) (as bundler or build tool)
* [typescript](https://www.typescriptlang.org) (for typed codebase, type extraction and type checking, cjs/esm
  transformation)
* [eslint](https://eslint.org) (for linting/formatting checks)
* [prettier](https://prettier.io) (for source code formatting)
* [jest](https://jestjs.io) (for testing / coverage)
* [ts-jest](https://kulshekhar.github.io/ts-jest) (for jest with ts support)

#### The input is:

* a small cli main and option handling library under `cli/*.ts`
* library files under `lib/*.ts`
* a library bottle file `lib/index.ts`

#### The output will be:

* the cli program `dist/bin.js`
* the cjs library `dist/cjs/index.js` and external source map `dist/cjs/index.js.map`
* the esm library `dist/esm/index.js` and external source map `dist/esm/index.js.map`
* the ts type definitions `types/*.d.ts`

#### Docker Compose for Dev:

* for simplicity and common development environment there is a `docker-compose.yml` which can be used to create a nodejs container
* use `docker compose run --rm bash` to start up a container

## Usage Checklist

1. change `package.json` fields
    * `name`
    * `version`
    * `description`
    * `author`
    * `license`
    * If you want to create a cli program, change the key `resulting-binary-name` to whatever binary name you want.
      Otherwise, you can just remove the `bin` section and the `cli`. Be aware that after removing `cli` some commands and configurations need to be fixed.
2. run `npm install`
3. check operations:
    * `npm run check` should complete without errors
    * `npm run lint` should complete without errors
    * `npm run test` should complete without errors
    * `npm run build` should create `dist/`
    * `npm run coverage` should complete without errors and create `coverage/`

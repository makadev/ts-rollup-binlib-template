import typescript from "@rollup/plugin-typescript";

const external = ["fs", "path"];

const cliExcludes = ["tests/**", "{cli,src}/**/*.{spec,test}.{ts,js}", "{cli,src}/**/__test__/*.{ts,js}"];

const libraryExcludes = [...cliExcludes, "cli/**"];

// ES5 CommonJS Library Part
const libraryCJSBuild = {
    input: "./src/index.ts",
    external,
    plugins: [
        typescript({
            declaration: false,
            exclude: libraryExcludes,
            rootDir: "src/",
            outDir: "dist/cjs",
            target: "es5",
        }),
    ],

    output: [
        // CommonJS Module + SourceMaps (Node.js)
        {
            dir: "dist/cjs",
            format: "cjs",
            sourcemap: true,
        },
    ],
};

// ES2015 ESM Library Part
const libraryESMBuild = {
    input: "./src/index.ts",
    external,
    plugins: [
        typescript({
            declaration: false,
            exclude: libraryExcludes,
            rootDir: "src/",
            outDir: "dist/esm",
            target: "es2015",
        }),
    ],

    output: [
        // ESM + SourceMaps (Node.js)
        {
            format: "esm",
            sourcemap: true,
            dir: "dist/esm",
        },
    ],
};

// CLI (ES5 CommonJS)
const cliCJSBuild = {
    input: "./cli/main.ts",
    external,
    plugins: [
        typescript({
            declaration: false,
            exclude: cliExcludes,
            rootDirs: ["src/", "cli/"],
            outDir: "dist/cli",
            target: "es5",
        }),
    ],

    output: [
        {
            banner: "#!/usr/bin/env node",
            file: "dist/bin/bin.js",
            format: "cjs",
            exports: "default",
        },
    ],
};

export default [libraryCJSBuild, libraryESMBuild, cliCJSBuild];

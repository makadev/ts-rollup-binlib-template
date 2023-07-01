module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        node: true,
    },
    plugins: ["@typescript-eslint"],
    extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:jest/recommended"],
    rules: {
        // disable error on explicit types where type could be inferred
        "@typescript-eslint/no-inferrable-types": 0,
        // enforcing LF since we expect to run in docker linux containers and unix
        "prettier/prettier": ["error", { endOfLine: "lf" }],
    },
};

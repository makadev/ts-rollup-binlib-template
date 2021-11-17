module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    env: {
        browser: true,
        node: true,
    },
    plugins: ["@typescript-eslint"],
    extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended", "plugin:jest/recommended"],
    rules: {
        // disable error on explicit types where type could be inferred
        "@typescript-eslint/no-inferrable-types": 0,
    },
};

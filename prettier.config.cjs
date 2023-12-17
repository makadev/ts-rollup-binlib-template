// see https://prettier.io/docs/en/options.html
module.exports = {
    // indentation type & wide
    tabWidth: 4,
    useTabs: false,
    // max line length, modernized
    printWidth: 160,
    // use semicolon at line ends
    semi: true,
    // use double quotes for strings and jsxprops
    singleQuote: false,
    jsxSingleQuote: false,
    // remove quotes from JSON properties if possible
    quoteProps: "as-needed",
    // add trailing comma where possible with es5 (objects, arrays, ..)
    trailingComma: "es5",
    // add spaces between brackets in object literals for readibility
    bracketSpacing: true,
    // on multiline jsx/html/.. tag move the ending ">" on a new line
    bracketSameLine: false,
    // always add parentheses around around arrow function parameter
    arrowParens: "always",
    // wrap mawrkdown as-is
    proseWrap: "preserve",
    // format whitespaces according to default display property of the element (f.e. div/span/..)
    htmlWhitespaceSensitivity: "css",
    // enforce eol
    endOfLine: "lf",
    // use pragma for formatted files
    //requirePragma: false,
    // insert pragma on formatting
    //insertPragma: false,
    // vue script formatting
    //vueIndentScriptAndStyle: false,
};

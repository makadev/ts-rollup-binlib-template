/**
 * CLI Option Object
 */
export interface CLIOption {
    /**
     * short char with leading -, f.e. for -ve
     */
    short: string | null;
    /**
     * long name with leading --, f.e. for --verbose
     */
    long: string | null;
    /**
     * number of parameter that follow, 0 = none, positive = exact, negative means unlimited
     */
    params: number;
    /**
     * command description for output
     */
    description: string;
    /**
     * wether this is optional or not
     */
    optional: boolean;
    /**
     * default option, this is ONLY meant and used for output
     */
    defaultInfo: string | null;
    /**
     * allow short/long option to be prefixed like f.e.
     * --debug=FLAG and -dFLAG rather than --debug FLAG and -d FLAG
     */
    allowPrefixed: boolean;
    /**
     * handler to be executed for that option
     */
    handler: (params: string[]) => void;
}

export type CLIOptionList = CLIOption[];

/**
 * Helper for creating CLIOption entries
 * @param param0
 */
export function makeCLIOption({
    allowPrefixed = true,
    description = "None",
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handler = () => {},
    long = null,
    optional = true,
    params = 0,
    short = null,
    defaultInfo = null,
}: Partial<CLIOption>): CLIOption {
    return {
        allowPrefixed,
        description,
        handler,
        long,
        optional,
        params,
        short,
        defaultInfo,
    } as CLIOption;
}

/**
 * Find Short Argument (like -v) which matches given Argument
 * @param expected
 * @param arg
 */
function findShortArg(expected: CLIOptionList, arg: string): CLIOption | null {
    for (let i = 0; i < expected.length; i++) {
        const element = expected[i];
        if (element.short === null) continue;
        if (element.short === arg) {
            return element;
        } else if (arg.startsWith(element.short) && element.params === 1 && element.allowPrefixed) {
            // short argument prefix
            return element;
        }
    }
    return null;
}

/**
 * Find Long Argument (like --verbose) which matches given Argument
 * @param expected
 * @param arg
 */
function findLongArg(expected: CLIOptionList, arg: string): CLIOption | null {
    for (let i = 0; i < expected.length; i++) {
        const element = expected[i];
        if (element.long === null) continue;
        if (element.long === arg) {
            return element;
        } else if (arg.startsWith(element.long) && element.params === 1 && element.allowPrefixed) {
            // short argument prefix
            return element;
        }
    }
    return null;
}

/**
 * Print typical cli usage information with given options
 * @param cliOptions
 */
export function printCLIOptions(cliOptions: CLIOptionList): void {
    console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <options>`);
    console.group();
    for (let i = 0; i < cliOptions.length; i++) {
        const o = cliOptions[i];
        if (o.short === null && o.long === null) continue;
        if (o.short !== null && o.long !== null) {
            console.group(`${o.short}, ${o.long}`);
        } else {
            console.group(o.short === null ? o.long : o.short);
        }
        console.info(o.description);
        if (o.defaultInfo) {
            console.info(`(default: ${o.defaultInfo})`);
        }
        console.groupEnd();
    }
    console.groupEnd();
}

/**
 * Handle given Arguments and process them as Options
 * @param expected Expected list of Options to be handled
 * @param args Arguments or null for using process.argv
 * @param error Error handler for wrong or missing arguments
 */
export function handleCLIOptions(expected: CLIOptionList, args: string[] | null, error: (msg: string) => void): boolean {
    const argv = args === null ? process.argv.slice(2) : args;
    const optionsHandled: { [name: string]: boolean } = {};
    let i = 0;
    while (i < argv.length) {
        let argument: CLIOption | null = null;
        const list: string[] = [];
        let arg = argv[i];
        const trimmed = arg.trim();
        if (trimmed.startsWith("--")) {
            // long arg
            argument = findLongArg(expected, arg);
            if (argument && arg !== argument.long) {
                // separate f.e. --define=DEBUG in arg "--define" and parameter "DEBUG"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const param = arg.substr(argument.long!.length + 1);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                arg = argument.long!;
                list.push(param);
            }
        } else if (trimmed.startsWith("-")) {
            // short arg
            argument = findShortArg(expected, arg);
            if (argument && arg !== argument.short) {
                // separate f.e. -dDEBUG in arg "-d" and parameter "DEBUG"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const param = arg.substr(argument.short!.length);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                arg = argument.short!;
                list.push(param);
            }
        }
        // handle parameter lists
        if (argument !== null) {
            const a = argument;
            if (a.params > list.length || a.params < 0) {
                // if we can/need to consume params check the next arguments
                i++;
                while (i < argv.length && (a.params > list.length || a.params < 0)) {
                    if (a.params < 0) {
                        // for unlimited parameters, check that parameter is not an option
                        const tmpArg = argv[i];
                        const tmpTrimmed = tmpArg.trim();
                        if (tmpTrimmed.startsWith("--")) {
                            if (findLongArg(expected, tmpArg)) {
                                // long arg found, go one step back and let it be handled in next iteration
                                i--;
                                break;
                            }
                        } else if (tmpTrimmed.startsWith("-")) {
                            // short arg found, go one step back and let it be handled in next iteration
                            if (findShortArg(expected, tmpArg)) {
                                i--;
                                break;
                            }
                        }
                    }
                    list.push(argv[i]);
                }
            }
        }
        // command handling
        if (argument === null) {
            // unhandled command -> error & exit
            error(`Unknown argument: ${arg}`);
            return false;
        } else {
            // parameter missmatch -> if params >= 0 parameterlist needs to match exactly
            // otherwise (params < 0) we expect at least 1 argument
            if ((argument.params >= 0 && argument.params !== list.length) || (argument.params < 0 && list.length <= 0)) {
                error(`Missing arguments for ${arg}`);
                return false;
            }
            argument.handler(list);
            if (!argument.optional) {
                optionsHandled[`${argument.long}-${argument.short}`] = true;
            }
        }
        // next
        i++;
    }
    // check that all needed options where handled
    for (let i = 0; i < expected.length; i++) {
        const e = expected[i];
        if (!e.optional && !(`${e.long}-${e.short}` in optionsHandled)) {
            error(`Missing option ${e.long !== null ? e.long : e.short}`);
            return false;
        }
    }
    return true;
}

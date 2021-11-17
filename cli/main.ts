import { CLIOptionList, handleCLIOptions, makeCLIOption, printCLIOptions } from "./options";
import { StringQueue } from "../src";

const queue = new StringQueue();
let verbose = false;

/**
 * Options presented and processed by CLI
 */
const cliOptions: CLIOptionList = [
    makeCLIOption({
        short: "-h",
        long: "--help",
        description: "show (this) help and exit",
        params: 0,
        handler: () => {
            printCLIOptions(cliOptions);
            process.exit(0);
        },
    }),
    makeCLIOption({
        short: "-p",
        long: "--push",
        description: "push value to queue",
        params: 1,
        defaultInfo: "none",
        handler: (params: string[]) => {
            queue.push(params[0]);
        },
    }),
    makeCLIOption({
        short: "-v",
        long: "--verbose",
        description: "output more",
        params: 0,
        handler: () => {
            verbose = true;
        },
    }),
];

function optionsError(msg: string): void {
    console.error(msg);
    printCLIOptions(cliOptions);
    process.exit(1);
}

/**
 * MAIN
 */
export default (function (): void {
    // handle command line arguments
    const handled = handleCLIOptions(cliOptions, null, optionsError);
    if (!handled) {
        printCLIOptions(cliOptions);
        process.exit(1);
    }
    // process
    if (queue.isEmpty()) {
        optionsError("Queue is empty, nothing todo");
    }
    let itemCount = 0;
    if (verbose) {
        const queue2 = new StringQueue();
        while (!queue.isEmpty()) {
            queue2.push(queue.pop() as string);
            itemCount++;
        }

        while (!queue2.isEmpty()) {
            queue.push(queue2.pop() as string);
        }
    }
    let currentItem = itemCount;
    while (!queue.isEmpty()) {
        const item = queue.pop();
        if (verbose) {
            console.log("popped ", item, `${currentItem} of ${itemCount}`);
            currentItem--;
        } else {
            console.log("popped ", item);
        }
    }
})();

export interface Command {

    /**
     * @returns a script that is executable
     */
    generateScript(): string;

    /**
     * @returns whether `this` and `that` are the same command
     */
    equalValue(that: Command): boolean

}



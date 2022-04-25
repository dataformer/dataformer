export interface Command {

    /**
     * @returns the label of the command
     */
    getLabel(): string;
    
    /**
     * @returns a script that is executable
     */
    generateScript(): string;

    /**
     * @returns whether `this` and `that` are the same command
     */
    equalValue(that: Command): boolean;

    /**
     * @returns a human-readable representation of `this`
     */
    toString(): string;

}



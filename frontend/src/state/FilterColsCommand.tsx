import { Command } from "./Command";

export class FilterColsCommand implements Command {

    // private readonly scriptTemplate: string = "grep/sed/awk | something | something else"

    constructor() {
        this.checkRep();
    }

    /**
     * @inheritdoc
     */
    public generateScript(): string {
        // TODO - populate script here
        return "";
    }

    public equalValue(that: Command): boolean {
        this.checkRep();
        return that instanceof FilterColsCommand;
    }

    public toString(): string {
        this.checkRep();

        return `This is a Filter Columns command with script template ${this.generateScript()}`;
    }

    private checkRep(): void {}

}

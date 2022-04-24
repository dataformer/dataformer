import { Command } from "./Command";

export class State {

    private readonly commands: Array<Command>;
    // TODO - we may eventually incorporate setState but need to worry about React changing the function under the hood
    // public readonly setState: (() => void) | undefined;

    constructor(commands: Array<Command>) {
        this.commands = commands.map(command => command);
        // this.setState = undefined;

        this.checkRep();
    }

    public getCommands(): Array<Command> {
        return [];
    }

    public equalValue(that: State): boolean {
        this.checkRep();
        return this.commands.every((thisCommand, index) => {
            const thatCommand = that.commands[index];

            return (thatCommand !== undefined) && thisCommand.equalValue(thatCommand);
        });
    }

    public toString(): string {
        this.checkRep();
        return this.commands.map(command => command.toString()).join(" | ");
    }

    private checkRep(): void {}

}

export function createState(commands: Array<Command>): State {
    return new State(commands);
}


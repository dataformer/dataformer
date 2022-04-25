import { Command } from "./Command";

export class State {
  private readonly commands: Array<Command>;
  // TODO - we may eventually incorporate setState but need to worry about React changing the function under the hood
  // public readonly setState: (() => void) | undefined;
  private readonly inputDataText: string;

  constructor(commands: Array<Command>, inputDataText: string) {
    this.commands = commands.map((command) => command);
    // this.setState = undefined;
    this.inputDataText = inputDataText;
    this.checkRep();
  }

  public getCommands(): Array<Command> {
    return this.commands;
  }

  public addCommand(newCommand: Command): State {
    return new State(
      [...this.getCommands(), newCommand],
      this.getInputDataText()
    );
  }

  public getInputDataText(): string {
    return this.inputDataText;
  }

  public setInputDataText(inputDataText: string): State {
    return new State(this.getCommands(), inputDataText);
  }

  public equalValue(that: State): boolean {
    this.checkRep();

    var commandsEqual: boolean = this.getCommands().every(
      (thisCommand, index) => {
        const thatCommand = that.getCommands()[index];
        return thatCommand !== undefined && thisCommand.equalValue(thatCommand);
      }
    );
    var inputDataTextEqual: boolean =
      this.getInputDataText() === that.getInputDataText();

    return commandsEqual && inputDataTextEqual;
  }

  public toString(): string {
    this.checkRep();
    var commandsString: string = this.getCommands()
      .map((command) => command.toString())
      .join(" | ");
    var inputDataTextString: string = this.getInputDataText();
    return (
      "Commands: " +
      commandsString +
      "\n" +
      "InputDataText: " +
      inputDataTextString
    );
  }

  private checkRep(): void {}
}

export function createState(): State {
  return new State([], "");
}

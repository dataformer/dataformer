import { Command } from "./Command";

export class State {
  private readonly commands: Array<Command>;
  // TODO - we may eventually incorporate setState but need to worry about React changing the function under the hood
  // public readonly setState: (() => void) | undefined;
  private readonly inputDataText: string;
  private readonly outputDataText: string;

  constructor(
    commands: Array<Command>,
    inputDataText: string,
    outputDataText: string
  ) {
    this.commands = commands.map((command) => command);
    // this.setState = undefined;
    this.inputDataText = inputDataText;
    this.outputDataText = outputDataText;
    this.checkRep();
  }

  public getCommands(): Array<Command> {
    return this.commands;
  }

  public addCommand(newCommand: Command): State {
    return new State(
      [...this.getCommands(), newCommand],
      this.getInputDataText(),
      this.getOutputDataText()
    );
  }
  public removeCommand(commandId: number): State {
    var newCommands: Array<Command> = this.getCommands().filter(
      (c) => c.getId() !== commandId
    );
    return new State(
      newCommands,
      this.getInputDataText(),
      this.getOutputDataText()
    );
  }

  public parseCommandSequence(): string {
    var commandsString: string = this.getCommands()
      .map((command) => command.generateScript())
      .join("\n");
    var fullCommand: string =
      "text = " +
      '"""' +
      this.getInputDataText() +
      '"""\n' +
      commandsString +
      "\nprint(text)";
    return fullCommand;
  }

  public getInputDataText(): string {
    return this.inputDataText;
  }

  public setInputDataText(inputDataText: string): State {
    return new State(
      this.getCommands(),
      inputDataText,
      this.getOutputDataText()
    );
  }

  public getOutputDataText(): string {
    return this.outputDataText;
  }

  public setOutputDataText(outputDataText: string): State {
    return new State(
      this.getCommands(),
      this.getInputDataText(),
      outputDataText
    );
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
    var outputDataTextEqual: boolean =
      this.getOutputDataText() === that.getOutputDataText();
    return commandsEqual && inputDataTextEqual && outputDataTextEqual;
  }

  public toString(): string {
    this.checkRep();
    var commandsString: string = this.getCommands()
      .map((command) => "{" + command.toString() + "}")
      .join(" | ");
    var inputDataTextString: string = this.getInputDataText();
    var outputDataTextString: string = this.getOutputDataText();

    return (
      "Commands: " +
      commandsString +
      "\nInputDataText: " +
      inputDataTextString +
      "\nOutputDataText: " +
      outputDataTextString
    );
  }

  private checkRep(): void {}
}

export function createState(): State {
  return new State([], "", "");
}

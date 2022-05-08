import { CodeCommand } from "./CodeCommand";
import { Command } from "./Command";

type StateData = {
  commands: Array<Command>;
  inputDataText: string;
  outputDataText: string;
  counter: number;
};
export class State {
  // // TODO - we may eventually incorporate setState but need to worry about React changing the function under the hood
  // // public readonly setState: (() => void) | undefined;
  private readonly data: StateData;

  constructor(data: StateData) {
    this.data = {
      ...data,
      commands: data.commands.map((command) => command),
    };
    this.checkRep();
  }

  public getCounterValue(): number {
    return this.data.counter;
  }

  public getCommands(): Array<Command> {
    return this.data.commands;
  }

  public addCommand(newCommand: Command): State {
    return new State({
      ...this.data,
      commands: [...this.getCommands(), newCommand],
      counter: this.data.counter + 1,
    });
  }

  public removeCommand(commandId: number): State {
    return new State({
      ...this.data,
      commands: this.getCommands().filter((c) => c.getId() !== commandId),
    });
  }

  public editCommand(commandId: number): State {
    const newCommands = this.getCommands().map((c) =>
      c.getId() === commandId
        ? new CodeCommand(
            c.getIsEnabled(),
            c.getId(),
            c.generateScript().trim()
          )
        : c
    );
    console.log(newCommands);
    return new State({
      ...this.data,
      commands: newCommands,
    });
  }

  public toggleCommmand(commandId: number): State {
    const newCommands: Array<Command> = [];

    for (const command of this.getCommands()) {
      if (command.getId() === commandId) {
        newCommands.push(command.getToggledCommand());
      } else {
        newCommands.push(command);
      }
    }

    return new State({ ...this.data, commands: newCommands });
  }

  public parseCommandSequence(isBeingExported = false): string {
    var commandsString: string = this.getCommands()
      .filter((command) => command.getIsEnabled())
      .map((command) => command.generateScript())
      .join("\n");
    var fullCommand = "";
    if (isBeingExported) {
      fullCommand += `
from sys import stdin

text = ""
for line in stdin:
  text += line
`
    } else {
      fullCommand += "text = " +
      '"""' +
      this.getInputDataText() +
      '"""\n'
    }
    fullCommand += commandsString +
      "\nprint(text)";
    return fullCommand;
  }

  public getInputDataText(): string {
    return this.data.inputDataText;
  }

  public setInputDataText(inputDataText: string): State {
    return new State({ ...this.data, inputDataText });
  }

  public getOutputDataText(): string {
    return this.data.outputDataText;
  }

  public setOutputDataText(outputDataText: string): State {
    return new State({ ...this.data, outputDataText });
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
  return new State({
    commands: [],
    inputDataText: "",
    outputDataText: "",
    counter: 0,
  });
}

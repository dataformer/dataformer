import React from "react";
import ReplaceCommandContent from "../components/pipeline/commands/ReplaceCommandContent";
import { Command } from "./Command";
interface ReplaceCommandArguments {
  find: string;
  replace: string;
}

export class ReplaceCommand implements Command {
  private readonly label = "Replace";
  private arguments: ReplaceCommandArguments = {
    find: "",
    replace: "",
  };
  private readonly component = (
    <ReplaceCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: ReplaceCommandArguments) =>
        (this.arguments = newArguments)
      }
    />
  );

  constructor() {
    this.checkRep();
  }

  /**
   * @inheritdoc
   */
  public getLabel(): string {
    return this.label;
  }

  /**
   * @inheritdoc
   */
  public getComponent(): JSX.Element {
    return this.component;
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `sed 's/${this.arguments.find}/${this.arguments.replace}/g'`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return that instanceof ReplaceCommand;
  }

  public toString(): string {
    this.checkRep();

    return `This is a Replace command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

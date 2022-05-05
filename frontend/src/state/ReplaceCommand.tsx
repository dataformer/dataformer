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
  private readonly id = Math.floor(Math.random() * 100000);

  constructor(public readonly isEnabled = true) {
    this.checkRep();
  }

  /**
   * @inheritdoc
   */
  public getId(): number {
    return this.id;
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
  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * @inheritdoc
   */
  public getToggledCommand(): Command {
    return new ReplaceCommand(!this.isEnabled);
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `
import re
def replace(text):

    return re.sub(${this.arguments.find}, ${this.arguments.replace}, text)
    
text = replace(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Replace command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

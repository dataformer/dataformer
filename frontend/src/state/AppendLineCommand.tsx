import React from "react";
import { Command } from "./Command";
import AppendLineCommandContent from "../components/pipeline/commands/AppendLineCommandContent";

interface AppendLineCommandArguments {
  line: string;
}

export class AppendLineCommand implements Command {
  private readonly label = "Append line";
  private arguments: AppendLineCommandArguments = {
    line: "",
  };
  private readonly component = (
    <AppendLineCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: AppendLineCommandArguments) =>
        (this.arguments = newArguments)
      }
    />
  );
  private readonly isEnabled;
  private readonly id;

  constructor(isEnabled: boolean, id: number) {
    this.checkRep();
    this.isEnabled = isEnabled;
    this.id = id;
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
    return new AppendLineCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `

def append_line(text):
  if not text:
    return "${this.arguments.line}"
    
  return text + """\n""" + "${this.arguments.line}"    
text = append_line(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is an Append Line command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

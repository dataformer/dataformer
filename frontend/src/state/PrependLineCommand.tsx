import React from "react";
import { Command } from "./Command";
import PrependLineCommandContent from "../components/pipeline/commands/PrependLineCommandContent";

interface PrependLineCommandArguments {
  line: string;
}

export class PrependLineCommand implements Command {
  private readonly label = "Prepend line";
  private arguments: PrependLineCommandArguments = {
    line: "",
  };
  private readonly component = (
    <PrependLineCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: PrependLineCommandArguments) =>
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
    return new PrependLineCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `

def prepend_line(text):
  return "${this.arguments.line}" + """\n""" + text    
text = prepend_line(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Prepend Line command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

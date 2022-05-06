import React from "react";
import CodeCommandContent from "../components/pipeline/commands/CodeCommandContent";
import { Command } from "./Command";

interface CodeCommandArguments {
  code: string;
}

export class CodeCommand implements Command {
  // private readonly scriptTemplate: string = "grep/sed/awk | something | something else"

  private readonly label = "Code";
  private arguments: CodeCommandArguments = { code: "" };
  private readonly component = (
    <CodeCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: CodeCommandArguments) =>
        (this.arguments = newArguments)
      }
      template={this.template}
    />
  );

  constructor(
    private readonly isEnabled: boolean,
    private readonly id: number,
    private readonly template = `def code_command(text):
  return text

text = code_command(text)
`
  ) {
    this.checkRep();
    console.log(this.template);
    this.component = (
      <CodeCommandContent
        label={this.label}
        onArgumentsChange={(newArguments: CodeCommandArguments) =>
          (this.arguments = newArguments)
        }
        template={this.template}
      />
    );
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
    return new CodeCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return "\n" + this.arguments.code;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Code command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

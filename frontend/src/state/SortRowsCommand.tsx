import React from "react";
import SortRowsCommandContent from "../components/pipeline/commands/SortRowsCommandContent";
import { Command } from "./Command";

interface SortRowsCommandArguments {
  isAscending: boolean;
}

export class SortRowsCommand implements Command {
  private readonly label = "Sort Rows";
  private arguments: SortRowsCommandArguments = {
    isAscending: true,
  };
  private readonly component = (
    <SortRowsCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: SortRowsCommandArguments) =>
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
    return new SortRowsCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `
def sort_rows(text):

    rows = sorted(text.split(\n), reverse=${this.arguments.isAscending ? "False" : "True"})

    return """\n""".join(rows)
    
text = sort_rows(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Sort Rows command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

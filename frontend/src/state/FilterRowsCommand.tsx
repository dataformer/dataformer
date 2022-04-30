import React from "react";
import { Command } from "./Command";
import FilterRowsCommandContent from "../components/pipeline/commands/FilterRowsCommandContent";
interface FilterRowsCommandArguments {
  separator: string;
  regEx: string;
}

export class FilterRowsCommand implements Command {
  private readonly label = "Filter Rows";
  private arguments: FilterRowsCommandArguments = {
    separator: "",
    regEx: "",
  };
  private readonly component = (
    <FilterRowsCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: FilterRowsCommandArguments) =>
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
    return `
import re

def filter_rows(text):
    
  rows = text.split(${this.arguments.separator})
   
  output = [row for row in rows if re.search(${this.arguments.regEx}) is not None]

  return """\n""".join(rows)
    
text = filter_rows(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return that instanceof FilterRowsCommand;
  }

  public toString(): string {
    this.checkRep();

    return `This is a Filter Rows command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

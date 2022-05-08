import React from "react";
import { Command } from "./Command";
import FilterRowsCommandContent from "../components/pipeline/commands/FilterRowsCommandContent";

interface FilterRowsCommandArguments {
  filter: string;
  isRegex: boolean;
  isInverse: boolean;
}

export class FilterRowsCommand implements Command {
  private readonly label = "Filter Rows";
  private arguments: FilterRowsCommandArguments = {
    filter: "",
    isRegex: true,
    isInverse: false,
  };
  private readonly component = (
    <FilterRowsCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: FilterRowsCommandArguments) =>
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
    return new FilterRowsCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    let strategy = "";
    if (this.arguments.isRegex) {
      strategy = `[row for row in rows if re.search(r"${
        this.arguments.filter
      }", row) is${this.arguments.isInverse ? "" : " not"} None]`;
    } else {
      strategy = `[row for row in rows if """${this.arguments.filter}"""${
        this.arguments.isInverse ? " not" : ""
      } in row]`;
    }

    return `
import re

def filter_rows(text):
    
  rows = text.split(\n)
   
  output = ${strategy}

  return """\n""".join(output)
    
text = filter_rows(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Filter Rows command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

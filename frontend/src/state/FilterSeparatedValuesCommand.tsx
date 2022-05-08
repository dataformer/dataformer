import React from "react";
import { Command } from "./Command";
import FilterSeparatedValuesCommandContent from "../components/pipeline/commands/FilterSeparatedValuesCommandContent";

interface FilterSeparatedValuesCommandArguments {
  filter: string;
  isRegex: boolean;
  isInverse: boolean;
  separator: string;
}

export class FilterSeparatedValuesCommand implements Command {
  private readonly label = "Filter Separated Values";
  private arguments: FilterSeparatedValuesCommandArguments = {
    filter: "",
    isRegex: true,
    isInverse: false,
    separator: "",
  };
  private readonly component = (
    <FilterSeparatedValuesCommandContent
      label={this.label}
      onArgumentsChange={(
        newArguments: FilterSeparatedValuesCommandArguments
      ) => (this.arguments = newArguments)}
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
    return new FilterSeparatedValuesCommand(!this.isEnabled, this.getId());
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

def filter_separated_values(text):

  separator = """${this.arguments.separator}"""
    
  rows = text.split(separator)
   
  output = ${strategy}

  return separator.join(output)
    
text = filter_separated_values(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Filter Separated Values command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

import React from "react";
import { Command } from "./Command";
import FilterSeparatedValuesCommandContent from "../components/pipeline/commands/FilterSeparatedValuesCommandContent";

interface FilterSeparatedValuesCommandArguments {
  separator: string;
  regEx: string;
}

export class FilterSeparatedValuesCommand implements Command {
  private readonly label = "Filter Separated Values";
  private arguments: FilterSeparatedValuesCommandArguments = {
    separator: "",
    regEx: "",
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
    return `
import re

def filter_separated_values(text):
    
  rows = text.split(${this.arguments.separator})
   
  output = [row for row in rows if re.search(r"${this.arguments.regEx}", row) is not None]

  return """${this.arguments.separator}""".join(rows)
    
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

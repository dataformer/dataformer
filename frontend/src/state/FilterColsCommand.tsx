import React from "react";
import { Command } from "./Command";
import FilterColsCommandContent from "../components/pipeline/commands/FilterColsCommandContent";

interface FilterColsCommandArguments {
  separator: string;
  columns: string;
}

export class FilterColsCommand implements Command {
  private readonly label = "Filter Columns";
  private arguments: FilterColsCommandArguments = {
    separator: "",
    columns: "",
  };
  private readonly component = (
    <FilterColsCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: FilterColsCommandArguments) =>
        (this.arguments = newArguments)
      }
    />
  );
  private readonly id = Math.floor(Math.random() * 100);

  constructor() {
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
  public generateScript(): string {
    return `
def filter_cols(text):
    
  def get_column_nums(column_input):
      if "-" not in column_input:
          return [int(column_input)]
      range_string = column_input.split("-")
      start, end = int(range_string[0]), int(range_string[1])
      return range(start, end+1)
        
  separator = "${this.arguments.separator}"
  columns_string = "${this.arguments.columns}"

  columns_inputs = columns_string.split(",")
  column_nums = []
  for column_input in columns_inputs:
      column_nums += get_column_nums(column_input)
    
  output = []
  lines = text.splitlines()
  for line in lines:
      filtered_cols = []
      tokens = line.split(separator)
      for col in column_nums:
          idx = col-1
          if idx < len(tokens):
              filtered_cols.append(tokens[idx])
      output.append(",".join(filtered_cols))

  return """\n""".join(output)
    
text = filter_cols(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return that instanceof FilterColsCommand && Number(this.getId())===Number(that.getId());
  }

  public toString(): string {
    this.checkRep();

    return `This is a Filter Columns command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

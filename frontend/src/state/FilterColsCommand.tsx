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
    return (
      "cut -d " + this.arguments.separator + " -f " + this.arguments.columns
    );
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return that instanceof FilterColsCommand;
  }

  public toString(): string {
    this.checkRep();

    return `This is a Filter Columns command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

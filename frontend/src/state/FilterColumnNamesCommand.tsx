import React from "react";
import { Command } from "./Command";
import FilterColumnNamesCommandContent from "../components/pipeline/commands/FilterColumnNamesCommandContent";

interface FilterColumnNamesCommandArguments {
  columnNames: string;
}

export class FilterColumnNamesCommand implements Command {
  private readonly label = "Filter Column Names";
  private arguments: FilterColumnNamesCommandArguments = {
    columnNames: "",
  };
  private readonly component = (
    <FilterColumnNamesCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: FilterColumnNamesCommandArguments) =>
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
    return new FilterColumnNamesCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `
import pandas as pd
from io import StringIO

def filter_column_names(text):
    text_io = StringIO(text)
    df = pd.read_csv(text_io)
    df = df.infer_objects()
    column_names = "${this.arguments.columnNames}".split(",")
    column_names = [cn.strip() for cn in column_names]
    df = df[column_names]
    return df.to_csv(index=False)

text = filter_column_names(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Filter Column Names command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

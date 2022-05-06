import React from "react";
import ImputeCommandContent from "../components/pipeline/commands/ImputeCommandContent";
import { Command } from "./Command";

interface ImputeCommandArguments {
  columnName: string;
  strategy: string;
  constant: number;
}

export class ImputeCommand implements Command {
  // private readonly scriptTemplate: string = "grep/sed/awk | something | something else"

  private readonly label = "Impute";
  private arguments: ImputeCommandArguments = {
    columnName: "",
    strategy: "",
    constant: 0,
  };
  private readonly component = (
    <ImputeCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: ImputeCommandArguments) =>
        (this.arguments = newArguments)
      }
    />
  );

  constructor(
    private readonly isEnabled: boolean,
    private readonly id: number
  ) {
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
  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * @inheritdoc
   */
  public getToggledCommand(): Command {
    return new ImputeCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    // TODO: Handle special characters (mainly ') in arguments
    let strategy_code = "df[[column_name]] = df[[column_name]].fillna";
    switch (this.arguments.strategy) {
      case "average":
        strategy_code += "(df[[column_name]].mean())";
        break;
      case "constant":
        strategy_code += `(${this.arguments.constant})`;
        break;
      case "forward":
        strategy_code += "(method='ffill')";
        break;
      case "backward":
        strategy_code += "(method='bfill')";
        break;
    }

    return `
import pandas as pd
from io import StringIO

def impute_command(text):
  # Load the data into a Pandas dataframe
  text_io = StringIO(text)
  df = pd.read_csv(text_io)
  df = df.infer_objects()
  column_name = """${this.arguments.columnName}"""

  # Impute the missing values
  ${strategy_code}

  # Return the result as a CSV
  return df.to_csv(index=False)

text = impute_command(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is an Impute command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}

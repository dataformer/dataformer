import React from "react";
import AggregationCommandContent from "../components/pipeline/commands/AggregationCommandContent";
import { Command } from "./Command";

enum Functions {
  "max",
  "min",
  "mean",
  "sum",
  "size",
  "count",
  "std",
  "var",
  "sem",
}
interface AggregationCommandArguments {
  fn: Functions | "";
  columns: string;
}

export class AggregationCommand implements Command {
  private readonly label = "Aggregation";
  private arguments: AggregationCommandArguments = {
    fn: "",
    columns: "",
  };
  private readonly component = (
    <AggregationCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: AggregationCommandArguments) =>
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
    return new AggregationCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `
import pandas as pd
from io import StringIO

def aggregation_command(text):
  # Load the data into a Pandas dataframe
  text_io = StringIO(text)
  df = pd.read_csv(text_io)
  df = df.infer_objects()

  columns = [column for column in """${
    this.arguments.columns
  }""".split(',') if column != ""]

  # Aggregation
  if ${this.arguments.columns.length === 0 ? "True" : "False"}:
    df = df.aggregate("""${this.arguments.fn}""")
  else:
    df = df.groupby(columns).agg("""${this.arguments.fn}""")
  df = df.reset_index()

  # Return the result as a CSV
  return df.to_csv(index=False)

text = aggregation_command(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is an Aggregation command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}
